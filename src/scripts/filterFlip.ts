/**
 * filterFlip.ts — tag-based filtering with FLIP animation.
 *
 * Expects a container of items, each with [data-tags] (space-separated,
 * lowercase) and a set of filter buttons with [data-filter] (a tag, or
 * "all"). On filter change, items that no longer match are hidden; the
 * remaining items animate from their previous position to their new one
 * (FLIP: First, Last, Invert, Play) so the re-flow reads as a smooth
 * rearrangement rather than a jump-cut.
 */
export function initFilterFlip(
  gridSelector: string,
  filterBarSelector: string,
  hiddenClass = 'is-filtered-out'
): () => void {
  const grid = document.querySelector<HTMLElement>(gridSelector);
  const filterBar = document.querySelector<HTMLElement>(filterBarSelector);
  if (!grid || !filterBar) return () => {};

  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-tags]'));
  const buttons = Array.from(filterBar.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyFilter(tag: string) {
    // FIRST: record current positions.
    const first = new Map<HTMLElement, DOMRect>();
    cards.forEach((card) => first.set(card, card.getBoundingClientRect()));

    // Update visibility.
    cards.forEach((card) => {
      const tags = (card.dataset.tags ?? '').split(' ');
      const match = tag === 'all' || tags.includes(tag);
      card.classList.toggle(hiddenClass, !match);
    });

    if (reduceMotion) return;

    // LAST: new positions, then INVERT + PLAY.
    requestAnimationFrame(() => {
      cards.forEach((card) => {
        if (card.classList.contains(hiddenClass)) return;
        const firstRect = first.get(card);
        const lastRect = card.getBoundingClientRect();
        if (!firstRect) return;

        const dx = firstRect.left - lastRect.left;
        const dy = firstRect.top - lastRect.top;

        if (dx || dy) {
          card.style.transition = 'none';
          card.style.transform = `translate(${dx}px, ${dy}px)`;
          requestAnimationFrame(() => {
            card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transform = '';
          });
        }
      });
    });
  }

  function handleClick(e: MouseEvent) {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    buttons.forEach((b) => b.classList.toggle('filter-btn--active', b === btn));
    applyFilter(btn.dataset.filter ?? 'all');
  }

  filterBar.addEventListener('click', handleClick);
  return () => filterBar.removeEventListener('click', handleClick);
}
