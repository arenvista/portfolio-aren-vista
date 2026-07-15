/**
 * reveal.ts — lightweight scroll-reveal.
 *
 * Any element with [data-reveal] starts offset (via the --offset-y custom
 * property, read by CSS) and gains the `is-in-view` class the first time it
 * crosses into the viewport, at which point CSS transitions it to rest.
 * Respects prefers-reduced-motion by revealing everything immediately.
 */
export function initScrollReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    targets.forEach((el) => el.classList.add('is-in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
