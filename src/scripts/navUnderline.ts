/**
 * navUnderline.ts — a single underline element that slides beneath
 * whichever nav link is hovered/focused, and springs back to the active
 * (current-hash) link on mouse leave — or hides entirely when no section
 * is active (previously it wrongly parked under the first link).
 */
export function initNavUnderline(navSelector: string): () => void {
  const nav = document.querySelector<HTMLElement>(navSelector);
  if (!nav) return () => {};

  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a'));
  if (links.length === 0) return () => {};

  const underline = document.createElement('span');
  underline.className = 'nav-underline';
  nav.style.position = 'relative';
  nav.appendChild(underline);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  underline.style.transition = reduceMotion
    ? 'opacity 0.2s ease'
    : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';

  function moveTo(link: HTMLAnchorElement) {
    const navRect = nav!.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const x = linkRect.left - navRect.left;
    underline.style.width = `${linkRect.width}px`;
    underline.style.transform = `translateX(${x}px)`;
    underline.style.opacity = '1';
  }

  function findActiveLink(): HTMLAnchorElement | undefined {
    if (!window.location.hash) return undefined;
    return links.find((l) => l.getAttribute('href') === window.location.hash);
  }

  const handleEnter = (e: Event) => moveTo(e.currentTarget as HTMLAnchorElement);
  const handleLeave = () => {
    const active = findActiveLink();
    if (active) moveTo(active);
    else underline.style.opacity = '0';
  };

  links.forEach((link) => {
    link.addEventListener('mouseenter', handleEnter);
    link.addEventListener('focus', handleEnter);
  });
  nav.addEventListener('mouseleave', handleLeave);

  window.setTimeout(handleLeave, 50);
  window.addEventListener('resize', handleLeave);
  window.addEventListener('hashchange', handleLeave);

  return function destroy() {
    links.forEach((link) => {
      link.removeEventListener('mouseenter', handleEnter);
      link.removeEventListener('focus', handleEnter);
    });
    nav.removeEventListener('mouseleave', handleLeave);
    window.removeEventListener('resize', handleLeave);
    window.removeEventListener('hashchange', handleLeave);
    underline.remove();
  };
}
