/**
 * commandPalette.ts — ⌘K / Ctrl+K quick nav.
 *
 * Expects the markup produced by CommandPalette.astro: a dialog-like
 * overlay with a text input [data-cp-input] and a results list
 * [data-cp-results] populated from static <li data-cp-item> entries
 * (rendered server-side, then shown/hidden client-side by filter text).
 */
export function initCommandPalette(): () => void {
  const root = document.querySelector<HTMLElement>('[data-command-palette]');
  if (!root) return () => {};

  const input = root.querySelector<HTMLInputElement>('[data-cp-input]');
  const list = root.querySelector<HTMLElement>('[data-cp-results]');
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-cp-item]'));
  const trigger = document.querySelector<HTMLElement>('[data-cp-trigger]');
  if (!input || !list) return () => {};

  let activeIndex = 0;
  let isOpen = false;

  function visibleItems() {
    return items.filter((el) => el.style.display !== 'none');
  }

  function setActive(i: number) {
    const visible = visibleItems();
    if (visible.length === 0) return;
    activeIndex = ((i % visible.length) + visible.length) % visible.length;
    visible.forEach((el, idx) => el.classList.toggle('cp-item--active', idx === activeIndex));
    visible[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function open() {
    isOpen = true;
    root!.classList.add('cp-open');
    document.body.style.overflow = 'hidden';
    input!.value = '';
    items.forEach((el) => (el.style.display = ''));
    activeIndex = 0;
    window.setTimeout(() => {
      input!.focus();
      setActive(0);
    }, 10);
  }

  function close() {
    isOpen = false;
    root!.classList.remove('cp-open');
    document.body.style.overflow = '';
    trigger?.focus();
  }

  function filter() {
    const q = input!.value.trim().toLowerCase();
    items.forEach((el) => {
      const haystack = (el.dataset.cpKeywords ?? el.textContent ?? '').toLowerCase();
      el.style.display = haystack.includes(q) ? '' : 'none';
    });
    setActive(0);
  }

  function handleGlobalKey(e: KeyboardEvent) {
    const isMeta = e.metaKey || e.ctrlKey;
    if (isMeta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isOpen ? close() : open();
      return;
    }
    if (e.key === 'Escape' && isOpen) {
      close();
    }
  }

  function handleInputKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(activeIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const visible = visibleItems();
      const target = visible[activeIndex];
      const href = target?.dataset.cpHref;
      if (href) {
        close();
        window.location.href = href;
      }
    }
  }

  function handleItemClick(e: MouseEvent) {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cp-item]');
    if (!el) return;
    const href = el.dataset.cpHref;
    if (href) {
      close();
      window.location.href = href;
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === root) close();
  }

  window.addEventListener('keydown', handleGlobalKey);
  input.addEventListener('keydown', handleInputKey);
  input.addEventListener('input', filter);
  list.addEventListener('click', handleItemClick);
  root.addEventListener('click', handleBackdropClick);
  trigger?.addEventListener('click', open);

  return function destroy() {
    window.removeEventListener('keydown', handleGlobalKey);
    input.removeEventListener('keydown', handleInputKey);
    input.removeEventListener('input', filter);
    list.removeEventListener('click', handleItemClick);
    root.removeEventListener('click', handleBackdropClick);
    trigger?.removeEventListener('click', open);
  };
}
