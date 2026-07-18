/**
 * countup.ts — animated number count-up, plus a rotating stat highlight.
 *
 * initCountUp(el) reads a numeric target from [data-count-to] and animates
 * from 0 to that value once the element scrolls into view.
 *
 * initStatRotator(el) expects [data-stats] on the element: a JSON array of
 * { value, label } pairs. It cycles through them, count-up-animating the
 * number each time, cross-fading the label, and lighting the matching
 * [data-stat-dot] indicator (fix: the dots previously never updated).
 */

interface StatEntry {
  value: number;
  suffix?: string;
  label: string;
}

function animateValue(el: HTMLElement, from: number, to: number, duration: number, suffix = '') {
  const start = performance.now();
  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out-cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (to - from) * eased);
    el.textContent = `${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export function initCountUp(selector: string): () => void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const to = Number(el.dataset.countTo ?? '0');
        const suffix = el.dataset.countSuffix ?? '';
        if (reduceMotion) {
          el.textContent = `${to}${suffix}`;
        } else {
          animateValue(el, 0, to, 1400, suffix);
        }
        observer.unobserve(el);
      }
    },
    { threshold: 0.4 }
  );

  els.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

export function initStatRotator(selector: string, intervalMs = 3200): () => void {
  const root = document.querySelector<HTMLElement>(selector);
  if (!root) return () => {};

  const numberEl = root.querySelector<HTMLElement>('[data-stat-number]');
  const labelEl = root.querySelector<HTMLElement>('[data-stat-label]');
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-stat-dot]'));
  if (!numberEl || !labelEl) return () => {};

  let stats: StatEntry[] = [];
  try {
    stats = JSON.parse(root.dataset.stats ?? '[]');
  } catch {
    return () => {};
  }
  if (stats.length === 0) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let started = false;
  let timerId = 0;

  function setDot(i: number) {
    dots.forEach((dot, d) => dot.classList.toggle('is-active', d === i));
  }

  function show(i: number, animate: boolean) {
    const entry = stats[i];
    labelEl!.classList.add('stat-fade');
    numberEl!.classList.add('stat-fade');
    setDot(i);

    window.setTimeout(() => {
      labelEl!.textContent = entry.label;
      if (animate && !reduceMotion) {
        animateValue(numberEl!, 0, entry.value, 1000, entry.suffix ?? '');
      } else {
        numberEl!.textContent = `${entry.value}${entry.suffix ?? ''}`;
      }
      labelEl!.classList.remove('stat-fade');
      numberEl!.classList.remove('stat-fade');
    }, reduceMotion ? 0 : 260);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !started) {
          started = true;
          show(0, true);
          if (stats.length > 1) {
            timerId = window.setInterval(() => {
              index = (index + 1) % stats.length;
              show(index, true);
            }, intervalMs);
          }
          observer.unobserve(root!);
        }
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(root);

  return function destroy() {
    observer.disconnect();
    window.clearInterval(timerId);
  };
}
