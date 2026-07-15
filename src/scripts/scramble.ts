/**
 * scramble.ts — glitch/scramble text transition.
 *
 * Replaces an element's text by briefly cycling random characters across
 * its length before settling into the target string, left-to-right.
 */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';

export function scrambleTo(el: HTMLElement, nextText: string, duration = 500): Promise<void> {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = nextText;
    return Promise.resolve();
  }

  const fromText = el.textContent ?? '';
  const maxLen = Math.max(fromText.length, nextText.length);
  const start = performance.now();

  return new Promise((resolve) => {
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const revealCount = Math.floor(progress * maxLen);

      let out = '';
      for (let i = 0; i < maxLen; i++) {
        if (i < revealCount) {
          out += nextText[i] ?? '';
        } else if (i < nextText.length) {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      el.textContent = out;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = nextText;
        resolve();
      }
    }
    requestAnimationFrame(tick);
  });
}
