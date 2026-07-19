/**
 * showcase.ts — the wodniack-style work section.
 *
 * The section is (N + 1) viewports tall. A sticky child pins to the
 * viewport while frames — one per project — take over in sequence as you
 * scroll. Each unit of scroll is one project: the first half is dwell time
 * (the frame just plays), the rest drives a bottom-up wipe revealing the
 * next frame.
 *
 * Smoothness: raw scroll progress is only a *target*. A rAF loop eases the
 * displayed progress toward it (frame-rate independent exponential
 * smoothing), so wheel steps and trackpad flicks land with inertia instead
 * of jump-cuts. On top of that, the wipe fraction is passed through a
 * smoothstep ease, the outgoing frame recedes (scales down and dims), and
 * the incoming frame carries a feathered leading edge. Reduced-motion users
 * get discrete cuts with none of this.
 *
 * Each frame is a link; its media is either a real <video> (if the project
 * provides one) or a live canvas simulation from previews.ts.
 */
import { mountPreview, type PreviewController } from '@/scripts/previews';

const DWELL = 0.5; // fraction of each unit spent resting on a frame
const SMOOTH_RATE = 9; // higher = progress catches up to the scrollbar faster

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function initShowcase(rootSelector: string): () => void {
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root) return () => {};

  const frames = Array.from(root.querySelectorAll<HTMLElement>('[data-frame]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-rail-dot]'));
  const counterCol = root.querySelector<HTMLElement>('[data-counter-col]');
  const N = frames.length;
  if (N === 0) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mount media controllers. A single scene that fails to mount must not
  // abort the whole showcase — otherwise frame navigation, the meta header,
  // and the counter all fall back to the CSS "first frame only" state.
  const controllers: Array<PreviewController | HTMLVideoElement | null> = frames.map((frame) => {
    const media = frame.querySelector<HTMLElement>('[data-media]');
    if (!media) return null;
    if (media instanceof HTMLVideoElement) return media;
    if (media instanceof HTMLCanvasElement) {
      try {
        return mountPreview(media, media.dataset.preview ?? 'boot');
      } catch {
        return null; // degrade to a blank frame, keep the rest working
      }
    }
    return null;
  });

  const playing = new Array<boolean>(N).fill(false);

  function setPlaying(i: number, on: boolean) {
    if (i < 0 || i >= N) return;
    if (playing[i] === on) return;
    playing[i] = on;
    const ctl = controllers[i];
    if (!ctl) return;
    if (ctl instanceof HTMLVideoElement) {
      if (on) ctl.play().catch(() => {});
      else ctl.pause();
    } else {
      if (on && !reduceMotion) ctl.play();
      else {
        ctl.pause();
        if (reduceMotion) ctl.renderStatic();
      }
    }
  }

  // Static first paint for every canvas so nothing is blank pre-scroll.
  controllers.forEach((ctl) => {
    if (ctl && !(ctl instanceof HTMLVideoElement)) {
      try {
        ctl.renderStatic();
      } catch {
        /* a bad first paint must not abort setup below */
      }
    }
  });

  let vh = window.innerHeight;
  let top = 0;
  let scrollable = 1;

  function measure() {
    vh = window.innerHeight;
    const rect = root!.getBoundingClientRect();
    top = rect.top + window.scrollY;
    scrollable = Math.max(1, root!.offsetHeight - vh);
  }

  const computeTarget = () => clamp01((window.scrollY - top) / scrollable);
  const nearViewport = () =>
    window.scrollY > top - vh * 1.5 && window.scrollY < top + scrollable + vh * 1.5;

  let lastShownIdx = -1;

  function apply(p: number) {
    const u = p * N;
    const i = Math.min(N - 1, Math.floor(u));
    const f = u - i;
    const localRaw = i >= N - 1 ? 0 : f <= DWELL ? 0 : (f - DWELL) / (1 - DWELL);
    const local = reduceMotion ? (localRaw < 0.5 ? 0 : 1) : smoothstep(localRaw);

    frames.forEach((frame, j) => {
      const media = frame.querySelector<HTMLElement>('[data-media]');
      if (j === i) {
        frame.style.visibility = 'visible';
        frame.style.zIndex = '1';
        frame.style.clipPath = 'none';
        frame.style.setProperty('--edge', '0');
        if (!reduceMotion) {
          // Recede under the incoming frame: shrink slightly, drift up, dim.
          frame.style.transform =
            local > 0 ? `scale(${(1 - local * 0.05).toFixed(4)}) translateY(${(local * -2).toFixed(2)}%)` : '';
          frame.style.setProperty('--dim', (local * 0.55).toFixed(3));
          if (media) {
            media.style.transform = `scale(1.06) translateY(${((f - 0.5) * 2.4).toFixed(2)}%)`;
          }
        }
      } else if (j === i + 1) {
        frame.style.visibility = 'visible';
        frame.style.zIndex = '2';
        frame.style.clipPath = `inset(${((1 - local) * 100).toFixed(3)}% 0 0 0)`;
        frame.style.transform = '';
        frame.style.setProperty('--dim', '0');
        frame.style.setProperty('--wipe', `${((1 - local) * 100).toFixed(3)}%`);
        frame.style.setProperty('--edge', !reduceMotion && local > 0.001 && local < 0.995 ? '1' : '0');
        if (media && !reduceMotion) {
          media.style.transform = `scale(${(1.14 - local * 0.08).toFixed(4)}) translateY(${((1 - local) * 5).toFixed(2)}%)`;
        }
      } else {
        frame.style.visibility = 'hidden';
        frame.style.zIndex = '0';
        frame.style.transform = '';
        frame.style.setProperty('--dim', '0');
        frame.style.setProperty('--edge', '0');
      }
    });

    // Which index the rail/counter should show.
    const shown = local > 0.5 ? Math.min(N - 1, i + 1) : i;
    if (shown !== lastShownIdx) {
      lastShownIdx = shown;
      dots.forEach((dot, d) => dot.classList.toggle('is-active', d === shown));
      // The column stacks all N numbers, so a full -100% would scroll the
      // whole strip out of the clip window. Each step is one number: -100%/N.
      if (counterCol) counterCol.style.transform = `translateY(${(shown * -100) / N}%)`;
    }

    // Keep the active frame and the incoming one alive; rest paused.
    for (let j = 0; j < N; j++) {
      setPlaying(j, j === i || j === i + 1);
    }
  }

  // --- Inertia loop: displayed progress eases toward the scroll target ---
  let target = 0;
  let smooth = 0;
  let rafId = 0;
  let running = false;
  let lastNow = 0;

  function loop(now: number) {
    if (!running) return;
    const dt = Math.min(0.05, (now - lastNow) / 1000);
    lastNow = now;

    if (reduceMotion) {
      smooth = target;
    } else {
      smooth += (target - smooth) * (1 - Math.exp(-dt * SMOOTH_RATE));
      if (Math.abs(target - smooth) < 0.0004) smooth = target;
    }

    apply(smooth);

    if (smooth === target) {
      // Settled — idle until the next scroll wakes us.
      running = false;
      return;
    }
    rafId = requestAnimationFrame(loop);
  }

  function ensureLoop() {
    if (running) return;
    running = true;
    lastNow = performance.now();
    rafId = requestAnimationFrame(loop);
  }

  const onScroll = () => {
    if (!nearViewport() && smooth === target) {
      target = computeTarget();
      smooth = target; // far away: don't animate a catch-up nobody can see
      return;
    }
    target = computeTarget();
    ensureLoop();
  };

  const onResize = () => {
    measure();
    target = computeTarget();
    smooth = target;
    apply(smooth);
  };

  // Rail dots jump to the start of a project's dwell.
  const dotHandlers = dots.map((dot, d) => {
    const handler = () => {
      const jump = top + (d + 0.02) * (scrollable / N);
      window.scrollTo({ top: jump, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    dot.addEventListener('click', handler);
    return handler;
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  measure();
  target = computeTarget();
  smooth = target;
  apply(smooth);

  return function destroy() {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    dots.forEach((dot, d) => dot.removeEventListener('click', dotHandlers[d]));
    controllers.forEach((ctl) => {
      if (ctl && !(ctl instanceof HTMLVideoElement)) ctl.destroy();
    });
  };
}
