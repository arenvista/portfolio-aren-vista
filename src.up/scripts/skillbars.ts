/**
 * skillbars.ts — animates [data-skill-fill] elements from 0 width to their
 * target (read from --target custom property, a 0-100 number) once they
 * scroll into view. Staggers slightly by index within each group for a
 * cascading fill effect.
 */
export function initSkillBars(selector: string): () => void {
  const bars = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (bars.length === 0) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, groupIndex) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = el.dataset.skillLevel ?? '0';
        const delay = reduceMotion ? 0 : groupIndex * 40;

        window.setTimeout(() => {
          el.style.width = `${target}%`;
        }, delay);

        observer.unobserve(el);
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
  );

  bars.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
