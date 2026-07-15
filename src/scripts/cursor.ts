/**
 * cursor.ts — custom cursor + magnetic-element helper.
 *
 * initCustomCursor() drives a small dot + trailing ring that replaces the
 * system cursor on pointer (non-touch) devices. It grows/highlights when
 * hovering anything with [data-cursor-hover], and elements can additionally
 * opt into initMagnetic() to physically pull toward the pointer when nearby.
 */

export function initCustomCursor(): () => void {
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || reduceMotion) return () => {};

  const dot = document.createElement('div');
  dot.className = 'cc-dot';
  const ring = document.createElement('div');
  ring.className = 'cc-ring';
  document.body.append(dot, ring);
  document.documentElement.classList.add('cc-active');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let hovering = false;

  const handleMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  };

  const handleOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    hovering = !!target.closest('[data-cursor-hover]');
    ring.classList.toggle('cc-ring--hover', hovering);
    dot.classList.toggle('cc-dot--hover', hovering);
  };

  window.addEventListener('mousemove', handleMove, { passive: true });
  window.addEventListener('mouseover', handleOver, { passive: true });

  let rafId = 0;
  function frame() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    rafId = requestAnimationFrame(frame);
  }
  rafId = requestAnimationFrame(frame);

  return function destroy() {
    cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseover', handleOver);
    dot.remove();
    ring.remove();
    document.documentElement.classList.remove('cc-active');
  };
}

/**
 * Makes elements matching `selector` pull toward the pointer when it's
 * within `radius` px, and springs back on leave. Pass a smaller `strength`
 * (0..1) for a subtler pull.
 */
export function initMagnetic(selector: string, radius = 90, strength = 0.35): () => void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return () => {};

  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return () => {};

  const handlers: Array<() => void> = [];

  els.forEach((el) => {
    el.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        el.style.transform = 'translate(0, 0)';
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    handlers.push(() => window.removeEventListener('mousemove', handleMove));
  });

  return function destroy() {
    handlers.forEach((h) => h());
    els.forEach((el) => (el.style.transform = ''));
  };
}
