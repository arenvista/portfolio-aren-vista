/**
 * textReveal.ts — splits an element's text into words, wraps each in a
 * span, and staggers them in on load (translateY + opacity).
 */
export function initTextReveal(selector: string): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  els.forEach((el) => {
    const words = (el.textContent ?? '').split(' ').filter(Boolean);
    el.innerHTML = words
      .map((word, i) => `<span class="tr-word" style="--tr-i:${i}">${word}</span>`)
      .join(' ');
    el.classList.add('tr-ready');

    if (reduceMotion) {
      el.classList.add('tr-done');
    } else {
      requestAnimationFrame(() => el.classList.add('tr-done'));
    }
  });
}
