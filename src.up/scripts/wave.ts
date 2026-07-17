/**
 * wave.ts — hero background engine.
 *
 * Draws several layered wave ribbons made of a chain of points. Each point
 * oscillates on its own sine timeline; a "chaser" dot lerps toward the real
 * cursor position (or the last touch point) and physically pushes nearby
 * points away as it passes, so the wave visibly dents wherever the dot goes.
 *
 * A small particle field also orbits loosely near the chaser: on pointer
 * idle they drift in a soft cloud; on movement they scatter away from the
 * cursor and drift back once it settles.
 */

interface WaveLayer {
  color: string;
  baseline: number; // 0..1, fraction of canvas height
  amplitude: number; // px
  frequency: number; // radians per px
  speed: number; // radians per second
  lineWidth: number;
  alpha: number;
  phase: number;
}

interface Point {
  x: number;
  baseY: number;
  y: number;
}

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  driftPhase: number;
}

const LAYERS: Omit<WaveLayer, 'phase'>[] = [
  { color: '#ca9ee6', baseline: 0.62, amplitude: 26, frequency: 0.012, speed: 0.55, lineWidth: 2, alpha: 0.55 }, // mauve
  { color: '#8caaee', baseline: 0.72, amplitude: 34, frequency: 0.009, speed: 0.4, lineWidth: 2, alpha: 0.45 },  // blue
  { color: '#81c8be', baseline: 0.82, amplitude: 20, frequency: 0.016, speed: 0.7, lineWidth: 1.5, alpha: 0.35 }, // teal
];

const POINT_SPACING = 8; // px between sample points along x
const DISTORT_RADIUS = 140; // px, influence radius of the chaser dot
const DISTORT_STRENGTH = 46; // max px displacement at the dot's center
const CHASE_EASE = 0.08; // 0..1, how quickly the dot catches the cursor

const PARTICLE_COUNT = 34;
const PARTICLE_COLORS = ['#ca9ee6', '#8caaee', '#81c8be', '#ef9f76'];
const PARTICLE_SCATTER_RADIUS = 110;
const PARTICLE_SCATTER_STRENGTH = 3.2;
const PARTICLE_RETURN_EASE = 0.04;
const PARTICLE_DRIFT_AMOUNT = 10;

export function initWaveField(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let layers: WaveLayer[] = LAYERS.map((l) => ({ ...l, phase: Math.random() * Math.PI * 2 }));
  let pointsByLayer: Point[][] = [];
  let particles: Particle[] = [];

  // Real pointer target and the eased "chaser" dot that lags behind it.
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

    const count = Math.ceil(width / POINT_SPACING) + 2;
    pointsByLayer = layers.map((layer) => {
      const pts: Point[] = [];
      for (let i = 0; i < count; i++) {
        const x = i * POINT_SPACING;
        const baseY = height * layer.baseline;
        pts.push({ x, baseY, y: baseY });
      }
      return pts;
    });

    // (Re)seed particles scattered across the upper portion of the hero,
    // above the wave baselines, so they read as ambient dust rather than
    // colliding visually with the ribbons.
    if (particles.length === 0) {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const homeX = Math.random() * width;
        const homeY = Math.random() * height * 0.55;
        return {
          homeX,
          homeY,
          x: homeX,
          y: homeY,
          vx: 0,
          vy: 0,
          radius: 1 + Math.random() * 1.8,
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
          driftPhase: Math.random() * Math.PI * 2,
        };
      });
    } else {
      // Re-clamp homes into the new bounds on resize.
      particles.forEach((p) => {
        p.homeX = Math.min(p.homeX, width);
        p.homeY = Math.min(p.homeY, height * 0.55);
      });
    }
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

  let rafId = 0;

  function drawLayer(layer: WaveLayer, points: Point[], t: number) {
    // Update each point's base oscillation, then apply chaser-dot distortion.
    for (const p of points) {
      const wave = Math.sin(p.x * layer.frequency + t * layer.speed + layer.phase) * layer.amplitude;
      let y = layer.baseline * height + wave;

      if (pointerActive || reduceMotion === false) {
        const dx = p.x - chaserX;
        const dy = y - chaserY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DISTORT_RADIUS) {
          const falloff = 1 - dist / DISTORT_RADIUS;
          const push = Math.pow(falloff, 2) * DISTORT_STRENGTH;
          // Lift the wave up and away from the dot; strength eases off with distance.
          y -= push;
        }
      }

      p.y = y;
    }

    ctx!.beginPath();
    ctx!.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const cur = points[i];
      const next = points[i + 1];
      const midX = (cur.x + next.x) / 2;
      const midY = (cur.y + next.y) / 2;
      ctx!.quadraticCurveTo(cur.x, cur.y, midX, midY);
    }
    ctx!.strokeStyle = layer.color;
    ctx!.globalAlpha = layer.alpha;
    ctx!.lineWidth = layer.lineWidth;
    ctx!.lineJoin = 'round';
    ctx!.lineCap = 'round';
    ctx!.stroke();
    ctx!.globalAlpha = 1;
  }

  function drawParticles(t: number) {
    for (const p of particles) {
      // Gentle idle drift around the home position (Lissajous-ish wander).
      const driftX = Math.sin(t * 0.6 + p.driftPhase) * PARTICLE_DRIFT_AMOUNT;
      const driftY = Math.cos(t * 0.5 + p.driftPhase) * PARTICLE_DRIFT_AMOUNT * 0.6;
      const homeX = p.homeX + driftX;
      const homeY = p.homeY + driftY;

      if (pointerActive) {
        const dx = p.x - chaserX;
        const dy = p.y - chaserY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < PARTICLE_SCATTER_RADIUS) {
          const falloff = 1 - dist / PARTICLE_SCATTER_RADIUS;
          p.vx += (dx / dist) * falloff * PARTICLE_SCATTER_STRENGTH;
          p.vy += (dy / dist) * falloff * PARTICLE_SCATTER_STRENGTH;
        }
      }

      // Spring back toward home, damped by velocity decay.
      p.vx += (homeX - p.x) * PARTICLE_RETURN_EASE;
      p.vy += (homeY - p.y) * PARTICLE_RETURN_EASE;
      p.vx *= 0.9;
      p.vy *= 0.9;
      p.x += p.vx;
      p.y += p.vy;

      ctx!.beginPath();
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = 0.5;
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }
  }

  function drawChaser() {
    if (!pointerActive) return;
    const gradient = ctx!.createRadialGradient(chaserX, chaserY, 0, chaserX, chaserY, 10);
    gradient.addColorStop(0, 'rgba(239, 159, 118, 0.9)'); // peach core
    gradient.addColorStop(1, 'rgba(239, 159, 118, 0)');
    ctx!.beginPath();
    ctx!.fillStyle = gradient;
    ctx!.arc(chaserX, chaserY, 10, 0, Math.PI * 2);
    ctx!.fill();

    ctx!.beginPath();
    ctx!.fillStyle = '#ef9f76';
    ctx!.arc(chaserX, chaserY, 3, 0, Math.PI * 2);
    ctx!.fill();
  }

  function frame(now: number) {
    const t = now / 1000;

    chaserX += (targetX - chaserX) * CHASE_EASE;
    chaserY += (targetY - chaserY) * CHASE_EASE;

    ctx!.clearRect(0, 0, width, height);

    drawParticles(t);
    layers.forEach((layer, i) => drawLayer(layer, pointsByLayer[i], t));
    drawChaser();

    rafId = requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    // Draw a single static frame, no animation loop, no chaser, no particle motion.
    drawParticles(0);
    layers.forEach((layer, i) => drawLayer(layer, pointsByLayer[i], 0));
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
