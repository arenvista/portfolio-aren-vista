/**
 * showcase.ts — the wodniack-style work section.
 *
 * The section is (N + 1) viewports tall. A sticky child pins to the
 * viewport while frames — one per project — take over in sequence as you
 * scroll. Each unit of scroll is one project: the first ~55% is dwell time
 * (the frame just plays), the rest scrubs a bottom-up wipe that reveals
 * the next frame. Scrolling backwards runs the same wipe in reverse.
 *
 * Each frame is a link; its media is either a real <video> (if the project
 * provides one) or a live canvas simulation from previews.ts.
 */
import { mountPreview, type PreviewController } from '@/scripts/previews';

const DWELL = 0.55; // fraction of each unit spent resting on a frame

export function initShowcase(rootSelector: string): () => void {
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root) return () => {};

  const frames = Array.from(root.querySelectorAll<HTMLElement>('[data-frame]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-rail-dot]'));
  const counterCol = root.querySelector<HTMLElement>('[data-counter-col]');
  const N = frames.length;
  if (N === 0) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mount media controllers.
  const controllers: Array<PreviewController | HTMLVideoElement | null> = frames.map((frame) => {
    const media = frame.querySelector<HTMLElement>('[data-media]');
    if (!media) return null;
    if (media instanceof HTMLVideoElement) return media;
    if (media instanceof HTMLCanvasElement) {
      return mountPreview(media, media.dataset.preview ?? 'boot');
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
    if (ctl && !(ctl instanceof HTMLVideoElement)) ctl.renderStatic();
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

  let lastShownIdx = -1;

  function apply() {
    const p = Math.min(1, Math.max(0, (window.scrollY - top) / scrollable));
    const u = p * N;
    const i = Math.min(N - 1, Math.floor(u));
    const f = u - i;
    let local = i >= N - 1 ? 0 : f <= DWELL ? 0 : (f - DWELL) / (1 - DWELL);
    if (reduceMotion) local = local < 0.5 ? 0 : 1;

    frames.forEach((frame, j) => {
      const media = frame.querySelector<HTMLElement>('[data-media]');
      if (j === i) {
        frame.style.visibility = 'visible';
        frame.style.zIndex = '1';
        frame.style.clipPath = 'none';
        if (media && !reduceMotion) {
          media.style.transform = `scale(1.06) translateY(${(f - 0.5) * 2.4}%)`;
        }
      } else if (j === i + 1) {
        frame.style.visibility = 'visible';
        frame.style.zIndex = '2';
        frame.style.clipPath = `inset(${(1 - local) * 100}% 0 0 0)`;
        if (media && !reduceMotion) {
          media.style.transform = `scale(${1.14 - local * 0.08}) translateY(${(1 - local) * 5}%)`;
        }
      } else {
        frame.style.visibility = 'hidden';
        frame.style.zIndex = '0';
      }
    });

    // Which index the rail/counter should show.
    const shown = local > 0.5 ? Math.min(N - 1, i + 1) : i;
    if (shown !== lastShownIdx) {
      lastShownIdx = shown;
      dots.forEach((dot, d) => dot.classList.toggle('is-active', d === shown));
      if (counterCol) counterCol.style.transform = `translateY(${shown * -100}%)`;
    }

    // Keep the active frame and its immediate neighbours alive; rest paused.
    for (let j = 0; j < N; j++) {
      setPlaying(j, Math.abs(j - i) <= 1 && j <= i + 1 && j >= i);
    }
    // Also warm the incoming frame while wiping.
    if (local > 0) setPlaying(i + 1, true);
  }

  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  };
  const onResize = () => {
    measure();
    apply();
  };

  // Rail dots jump to the start of a project's dwell.
  const dotHandlers = dots.map((dot, d) => {
    const handler = () => {
      const target = top + (d + 0.02) * (scrollable / N);
      window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    dot.addEventListener('click', handler);
    return handler;
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  measure();
  apply();

  return function destroy() {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    dots.forEach((dot, d) => dot.removeEventListener('click', dotHandlers[d]));
    controllers.forEach((ctl) => {
      if (ctl && !(ctl instanceof HTMLVideoElement)) ctl.destroy();
    });
  };
}
