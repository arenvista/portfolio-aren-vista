/**
 * readingProgress.ts — fills [data-progress-fill] based on how far the
 * reader has scrolled through `articleSelector`, from 0% (top of article
 * in view) to 100% (bottom of article scrolled past).
 */
export function initReadingProgress(articleSelector: string, fillSelector: string): () => void {
  const article = document.querySelector<HTMLElement>(articleSelector);
  const fill = document.querySelector<HTMLElement>(fillSelector);
  if (!article || !fill) return () => {};

  function update() {
    const rect = article!.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height - viewportH;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    const progress = total > 0 ? (scrolled / total) * 100 : 0;
    fill!.style.width = `${Math.min(progress, 100)}%`;
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
}
