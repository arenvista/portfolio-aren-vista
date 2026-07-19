/**
 * wave.ts — hero background engine (topographic contour field).
 *
 * A different idea from the old sine-ribbon version: instead of drawing wavy
 * horizontal lines, we treat the hero as a slowly morphing elevation map and
 * draw its *isolines* — the contour loops you'd see on a survey map. The field
 * is a small sum of sines (cheap, smooth, endlessly morphing); the contours
 * are extracted with marching squares each frame. This leans into the site's
 * cartographic motif ("field:", "fig.", "Field specimens").
 *
 * Interaction: the cursor raises a soft Gaussian "hill" in the field (via an
 * eased chaser that lags the pointer), so contours bunch into concentric rings
 * and bend around it — an elevation echo of the old "lift nearby points" idea.
 *
 * Conventions kept from the previous engine: colors read live from CSS custom
 * properties, DPR-aware sizing, a single static frame under reduced motion,
 * and the same `initWaveField(canvas) -> destroy()` contract so the caller in
 * WaveHero.astro is unchanged.
 */

interface Level {
  /** Elevation threshold this contour traces. */
  t: number;
  color: string;
  alpha: number;
  width: number;
}

function cssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.replace(/(.)/g, '$1$1') : h;
  const n = parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(n)) return [250, 243, 230];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const CELL = 30; // px between field samples — smaller = smoother, heavier
const CHASE_EASE = 0.08; // how quickly the raised hill catches the cursor
const HILL_STRENGTH = 2.8; // elevation added at the cursor's center
const HILL_RADIUS = 135; // px, spread of the raised hill

// Spatial + temporal frequencies of the field. Small time factors keep the
// terrain drifting slowly rather than shimmering.
const SX = 0.0055;
const SY = 0.006;

export function initWaveField(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const slate = cssVar('--slate', '#5484a4');
  const steel = cssVar('--steel', '#acc0d3');
  const teal = cssVar('--teal', '#09a1a1');
  const rose = cssVar('--rose', '#d396a6');
  const coral = cssVar('--coral', '#fa6e81');
  const paperRgb = hexToRgb(cssVar('--paper', '#faf3e6'));

  // Elevation bands, low → high, colored cool → warm like a real relief map.
  // Every other band is an "index contour": darker and thicker.
  const ramp = [steel, slate, slate, teal, teal, teal, rose, rose, coral];
  const levels: Level[] = ramp.map((color, k) => {
    const t = -2.6 + k * 0.65; // -2.6 .. +2.6
    const index = k % 2 === 0;
    return { t, color, alpha: index ? 0.3 : 0.17, width: index ? 1.7 : 1 };
  });

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cols = 0;
  let rows = 0;
  let vals = new Float64Array(0); // field sampled at every grid corner

  // Real pointer target and the eased "chaser" that lags behind it.
  let targetX = -9999;
  let targetY = -9999;
  let chaserX = -9999;
  let chaserY = -9999;
  let pointerActive = false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.max(1, Math.ceil(width / CELL));
    rows = Math.max(1, Math.ceil(height / CELL));
    vals = new Float64Array((cols + 1) * (rows + 1));
  }

  function onPointerMove(clientX: number, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    targetX = clientX - rect.left;
    targetY = clientY - rect.top;
    pointerActive = true;
  }

  const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
  const handleTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) onPointerMove(t.clientX, t.clientY);
  };
  const handlePointerLeave = () => {
    pointerActive = false;
  };

  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
  canvas.addEventListener('mouseleave', handlePointerLeave);
  canvas.addEventListener('touchend', handlePointerLeave);

  resize();

  // Sample the elevation field into `vals` for the current time, folding in the
  // cursor's raised hill when the pointer is active.
  function sample(t: number) {
    const useHill = pointerActive;
    const inv2s2 = 1 / (2 * HILL_RADIUS * HILL_RADIUS);
    let k = 0;
    for (let j = 0; j <= rows; j++) {
      const y = j * CELL;
      const ySY = y * SY;
      for (let i = 0; i <= cols; i++, k++) {
        const x = i * CELL;
        const xSX = x * SX;
        let f =
          Math.sin(xSX + t * 0.18) +
          Math.sin(ySY - t * 0.15) +
          Math.sin((xSX + ySY) * 0.75 + t * 0.11) +
          0.7 * Math.sin((xSX * 0.6 - ySY * 0.9) - t * 0.21);

        if (useHill) {
          const dx = x - chaserX;
          const dy = y - chaserY;
          f += HILL_STRENGTH * Math.exp(-(dx * dx + dy * dy) * inv2s2);
        }
        vals[k] = f;
      }
    }
  }

  // Marching squares for one elevation threshold. Assumes ctx.beginPath() was
  // already called; batches every crossing segment into that one path.
  function marchLevel(T: number) {
    const stride = cols + 1;
    for (let j = 0; j < rows; j++) {
      const y0 = j * CELL;
      const y1 = y0 + CELL;
      const row0 = j * stride;
      const row1 = row0 + stride;
      for (let i = 0; i < cols; i++) {
        const x0 = i * CELL;
        const x1 = x0 + CELL;
        const va = vals[row0 + i]; // top-left
        const vb = vals[row0 + i + 1]; // top-right
        const vc = vals[row1 + i + 1]; // bottom-right
        const vd = vals[row1 + i]; // bottom-left

        let c = 0;
        if (va > T) c |= 8;
        if (vb > T) c |= 4;
        if (vc > T) c |= 2;
        if (vd > T) c |= 1;
        if (c === 0 || c === 15) continue;

        // Interpolated edge crossings (only the ones a case needs are read).
        const top = x0 + CELL * clamp01((T - va) / (vb - va)); // y = y0
        const right = y0 + CELL * clamp01((T - vb) / (vc - vb)); // x = x1
        const bottom = x0 + CELL * clamp01((T - vd) / (vc - vd)); // y = y1
        const left = y0 + CELL * clamp01((T - va) / (vd - va)); // x = x0

        switch (c) {
          case 1:
          case 14:
            ctx!.moveTo(x0, left);
            ctx!.lineTo(bottom, y1);
            break;
          case 2:
          case 13:
            ctx!.moveTo(bottom, y1);
            ctx!.lineTo(x1, right);
            break;
          case 3:
          case 12:
            ctx!.moveTo(x0, left);
            ctx!.lineTo(x1, right);
            break;
          case 4:
          case 11:
            ctx!.moveTo(top, y0);
            ctx!.lineTo(x1, right);
            break;
          case 6:
          case 9:
            ctx!.moveTo(top, y0);
            ctx!.lineTo(bottom, y1);
            break;
          case 7:
          case 8:
            ctx!.moveTo(top, y0);
            ctx!.lineTo(x0, left);
            break;
          case 5: // saddle
            ctx!.moveTo(top, y0);
            ctx!.lineTo(x0, left);
            ctx!.moveTo(bottom, y1);
            ctx!.lineTo(x1, right);
            break;
          case 10: // saddle
            ctx!.moveTo(top, y0);
            ctx!.lineTo(x1, right);
            ctx!.moveTo(x0, left);
            ctx!.lineTo(bottom, y1);
            break;
        }
      }
    }
  }

  function render(t: number) {
    sample(t);
    ctx!.clearRect(0, 0, width, height);
    ctx!.lineJoin = 'round';
    ctx!.lineCap = 'round';

    for (const lvl of levels) {
      ctx!.beginPath();
      marchLevel(lvl.t);
      ctx!.strokeStyle = lvl.color;
      ctx!.globalAlpha = lvl.alpha;
      ctx!.lineWidth = lvl.width;
      ctx!.stroke();
    }
    ctx!.globalAlpha = 1;

    // Wash out the upper area so the contours read as a base layer under the
    // title, staying dense toward the bottom (where the old waves lived).
    const [pr, pg, pb] = paperRgb;
    const fade = ctx!.createLinearGradient(0, 0, 0, height * 0.5);
    fade.addColorStop(0, `rgba(${pr}, ${pg}, ${pb}, 0.9)`);
    fade.addColorStop(1, `rgba(${pr}, ${pg}, ${pb}, 0)`);
    ctx!.fillStyle = fade;
    ctx!.fillRect(0, 0, width, height * 0.5);

    // A soft warm bloom trailing the cursor — a light "you are here" marker.
    if (pointerActive && !reduceMotion) {
      const [cr, cg, cb] = hexToRgb(coral);
      const glow = ctx!.createRadialGradient(chaserX, chaserY, 0, chaserX, chaserY, 90);
      glow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.12)`);
      glow.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(chaserX, chaserY, 90, 0, Math.PI * 2);
      ctx!.fill();
    }
  }

  let rafId = 0;

  function frame(now: number) {
    chaserX += (targetX - chaserX) * CHASE_EASE;
    chaserY += (targetY - chaserY) * CHASE_EASE;
    render(now / 1000);
    rafId = requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    render(0); // single static relief map, no loop, no cursor hill
  } else {
    rafId = requestAnimationFrame(frame);
  }

  return function destroy() {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('touchmove', handleTouchMove);
    canvas.removeEventListener('mouseleave', handlePointerLeave);
    canvas.removeEventListener('touchend', handlePointerLeave);
  };
}
