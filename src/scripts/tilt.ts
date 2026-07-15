/**
 * tilt.ts — perspective tilt-on-hover, plus an optional cursor spotlight.
 *
 * Attaches to every element matching `selector`. On mousemove within the
 * element, rotates it slightly toward the cursor (rotateX/rotateY) and,
 * if the element has [data-spotlight], updates --spot-x/--spot-y custom
 * properties so a CSS radial-gradient can follow the cursor.
 */
export function initTilt(selector: string, maxDeg = 8): () => void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (reduceMotion || isTouch) return () => {};

  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return () => {};

  const handlers: Array<() => void> = [];

  els.forEach((el) => {
    el.style.transformStyle = 'preserve-3d';
    el.style.transition = 'transform 0.15s ease-out';
    const hasSpotlight = el.hasAttribute('data-spotlight');

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1

      const rotateY = (px - 0.5) * maxDeg * 2;
      const rotateX = (0.5 - py) * maxDeg * 2;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;

      if (hasSpotlight) {
        el.style.setProperty('--spot-x', `${px * 100}%`);
        el.style.setProperty('--spot-y', `${py * 100}%`);
      }
    };

    const handleLeave = () => {
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      window.setTimeout(() => {
        el.style.transition = 'transform 0.15s ease-out';
      }, 400);
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    handlers.push(() => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    });
  });

  return function destroy() {
    handlers.forEach((h) => h());
  };
}
