/**
 * drawline.ts — animates SVG paths/lines from invisible to fully drawn
 * using the stroke-dasharray/stroke-dashoffset trick, triggered on scroll
 * into view. Works on any <path> or <line> matching `selector`.
 */
export function initDrawLines(selector: string): () => void {
  const paths = Array.from(document.querySelectorAll<SVGPathElement | SVGLineElement>(selector));
  if (paths.length === 0) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  paths.forEach((path) => {
    const length = 'getTotalLength' in path ? path.getTotalLength() : 100;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = reduceMotion ? '0' : `${length}`;
  });

  if (reduceMotion) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const path = entry.target as SVGPathElement;
        path.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
        path.style.strokeDashoffset = '0';
        observer.unobserve(path);
      }
    },
    { threshold: 0.4 }
  );

  paths.forEach((path) => observer.observe(path));
  return () => observer.disconnect();
}
