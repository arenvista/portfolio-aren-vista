/**
 * previews.ts — live canvas "footage" for the work showcase.
 *
 * Instead of pre-rendered video files, each project frame plays a small
 * real-time simulation of the project itself: Conway's grid actually runs,
 * the chess opening actually plays, TinyOS actually boots. Every scene is
 * drawn from the site palette (read from CSS custom properties).
 *
 * If you later record real footage, add `video: '/previews/<slug>.mp4'`
 * to the project in src/data/projects.ts — the showcase prefers a video
 * element when one is provided and falls back to these scenes otherwise.
 *
 * mountPreview(canvas, key) → { play, pause, renderStatic, destroy }
 */

type Ctx = CanvasRenderingContext2D;

export interface PreviewController {
    play(): void;
    pause(): void;
    renderStatic(): void;
    destroy(): void;
}

interface Scene {
    /** Advance + draw one frame. t is seconds since mount, dt seconds since last frame. */
    draw(ctx: Ctx, w: number, h: number, t: number, dt: number): void;
}

function cssVar(name: string, fallback: string): string {
    const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
    return v || fallback;
}

function palette() {
    return {
        ink: cssVar("--ink", "#262920"),
        paper: cssVar("--paper", "#f6efdc"),
        olive: cssVar("--dusty-olive", "#797d62"),
        palm: cssVar("--palm-leaf", "#9b9b7a"),
        sand: cssVar("--desert-sand", "#d9ae94"),
        peach: cssVar("--soft-peach", "#f1dca7"),
        pollen: cssVar("--golden-pollen", "#ffcb69"),
        almond: cssVar("--toasted-almond", "#d08c60"),
        taupe: cssVar("--dusty-taupe", "#997b66"),
    };
}

type Pal = ReturnType<typeof palette>;

const MONO = '"IBM Plex Mono", ui-monospace, monospace';

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */

/** Conway's Game of Life — golden colonies on dark ground. */
function lifeScene(pal: Pal): Scene {
    const COLS = 56;
    let rows = 0;
    let grid: Uint8Array = new Uint8Array(0);
    let next: Uint8Array = new Uint8Array(0);
    let age: Uint8Array = new Uint8Array(0);
    let acc = 0;

    function seed() {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = Math.random() < 0.18 ? 1 : 0;
            age[i] = 0;
        }
    }

    function ensure(w: number, h: number) {
        const r = Math.max(8, Math.round((h / w) * COLS));
        if (r !== rows) {
            rows = r;
            grid = new Uint8Array(COLS * rows);
            next = new Uint8Array(COLS * rows);
            age = new Uint8Array(COLS * rows);
            seed();
        }
    }

    function step() {
        let pop = 0;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < COLS; x++) {
                let n = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx === 0 && dy === 0) continue;
                        const xx = (x + dx + COLS) % COLS;
                        const yy = (y + dy + rows) % rows;
                        n += grid[yy * COLS + xx];
                    }
                }
                const i = y * COLS + x;
                const alive = grid[i] === 1 ? n === 2 || n === 3 : n === 3;
                next[i] = alive ? 1 : 0;
                age[i] = alive ? Math.min(age[i] + 1, 40) : 0;
                pop += next[i];
            }
        }
        [grid, next] = [next, grid];
        if (pop < COLS * rows * 0.03) seed();
    }

    return {
        draw(ctx, w, h, _t, dt) {
            ensure(w, h);
            acc += dt;
            while (acc > 0.11) {
                acc -= 0.11;
                step();
            }
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);
            const cell = w / COLS;
            const pad = Math.max(1, cell * 0.14);
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < COLS; x++) {
                    const i = y * COLS + x;
                    if (!grid[i]) continue;
                    ctx.fillStyle =
                        age[i] > 6
                            ? pal.olive
                            : age[i] > 2
                              ? pal.almond
                              : pal.pollen;
                    ctx.fillRect(
                        x * cell + pad,
                        y * cell + pad,
                        cell - pad * 2,
                        cell - pad * 2,
                    );
                }
            }
        },
    };
}

/** A terminal typing out lines — used for TinyOS boot and TextEdit. */
function terminalScene(pal: Pal, lines: string[], title: string): Scene {
    const CPS = 34; // characters per second
    const HOLD = 2.2; // seconds to hold the finished screen
    const total = lines.reduce((s, l) => s + Math.max(l.length, 1), 0);
    const cycle = total / CPS + HOLD;

    return {
        draw(ctx, w, h, t) {
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);

            const size = Math.max(11, Math.min(w / 42, h / 20));
            const lh = size * 1.55;
            const x0 = size * 1.4;
            let y = size * 2.6;

            // Title bar
            ctx.fillStyle = "rgba(246,239,220,0.08)";
            ctx.fillRect(0, 0, w, size * 1.7);
            ctx.font = `500 ${size * 0.8}px ${MONO}`;
            ctx.fillStyle = pal.palm;
            ctx.fillText(title, x0, size * 1.15);
            ctx.fillStyle = pal.almond;
            ctx.beginPath();
            ctx.arc(w - size * 1.2, size * 0.85, size * 0.28, 0, Math.PI * 2);
            ctx.fill();

            const phase = t % cycle;
            let budget = Math.floor(phase * CPS);
            ctx.font = `400 ${size}px ${MONO}`;

            for (const line of lines) {
                if (budget <= 0) break;
                const shown = line.slice(0, budget);
                budget -= Math.max(line.length, 1);
                const isPrompt =
                    line.startsWith(">") ||
                    line.startsWith("$") ||
                    line.startsWith(":");
                ctx.fillStyle = isPrompt
                    ? pal.pollen
                    : line.includes("ok") || line.includes("✓")
                      ? pal.palm
                      : pal.paper;
                ctx.fillText(shown, x0, y);
                if (budget < 0 || (budget === 0 && phase * CPS < total)) {
                    // caret at end of the partially typed line
                    if (Math.floor(t * 2.6) % 2 === 0) {
                        const cw = ctx.measureText(shown).width;
                        ctx.fillStyle = pal.pollen;
                        ctx.fillRect(
                            x0 + cw + size * 0.15,
                            y - size * 0.85,
                            size * 0.55,
                            size,
                        );
                    }
                }
                y += lh;
                if (y > h - lh * 0.4) break;
            }

            // Finished screen: blinking caret on last line
            if (phase * CPS >= total && Math.floor(t * 2.6) % 2 === 0) {
                ctx.fillStyle = pal.pollen;
                ctx.fillRect(
                    x0,
                    Math.min(y, h - lh) - size * 0.85,
                    size * 0.55,
                    size,
                );
            }
        },
    };
}

/** Chess — the Italian Game plays itself on a sand/taupe board. */
function chessScene(pal: Pal): Scene {
    type Board = (string | null)[]; // 64, glyphs; uppercase = white
    const START: Board = [];
    const back = "rnbqkbnr";
    for (let i = 0; i < 8; i++) START.push(back[i]);
    for (let i = 0; i < 8; i++) START.push("p");
    for (let i = 0; i < 32; i++) START.push(null);
    for (let i = 0; i < 8; i++) START.push("P");
    for (let i = 0; i < 8; i++) START.push(back[i].toUpperCase());

    const GLYPH: Record<string, string> = {
        k: "♚",
        q: "♛",
        r: "♜",
        b: "♝",
        n: "♞",
        p: "♟",
        K: "♚",
        Q: "♛",
        R: "♜",
        B: "♝",
        N: "♞",
        P: "♟",
    };

    const sq = (file: string, rank: string) =>
        (8 - Number(rank)) * 8 + (file.charCodeAt(0) - 97);
    const MOVES = [
        "e2e4",
        "e7e5",
        "g1f3",
        "b8c6",
        "f1c4",
        "f8c5",
        "c2c3",
        "g8f6",
        "d2d4",
        "e5d4",
        "c3d4",
        "c5b4",
    ];
    const MOVE_T = 0.55;
    const PAUSE_T = 0.75;
    const RESET_T = 1.4;
    const cycle = MOVES.length * (MOVE_T + PAUSE_T) + RESET_T;

    return {
        draw(ctx, w, h, t) {
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);

            const size = Math.min(w, h) * 0.82;
            const cell = size / 8;
            const ox = (w - size) / 2;
            const oy = (h - size) / 2;

            // Board
            for (let r = 0; r < 8; r++) {
                for (let f = 0; f < 8; f++) {
                    ctx.fillStyle = (r + f) % 2 === 0 ? pal.peach : pal.taupe;
                    ctx.fillRect(ox + f * cell, oy + r * cell, cell, cell);
                }
            }
            ctx.strokeStyle = pal.olive;
            ctx.lineWidth = 2;
            ctx.strokeRect(ox, oy, size, size);

            // Replay moves up to current phase
            const phase = t % cycle;
            const board = START.slice();
            const per = MOVE_T + PAUSE_T;
            const done = Math.min(MOVES.length, Math.floor(phase / per));
            for (let m = 0; m < done; m++) {
                const mv = MOVES[m];
                const from = sq(mv[0], mv[1]);
                const to = sq(mv[2], mv[3]);
                board[to] = board[from];
                board[from] = null;
            }

            // In-flight move
            let flying: { glyph: string; x: number; y: number } | null = null;
            let flightTo = -1;
            if (done < MOVES.length) {
                const local = phase - done * per;
                if (local < MOVE_T) {
                    const mv = MOVES[done];
                    const from = sq(mv[0], mv[1]);
                    const to = sq(mv[2], mv[3]);
                    const p = local / MOVE_T;
                    const e = 1 - Math.pow(1 - p, 3);
                    const fx = ox + (from % 8) * cell + cell / 2;
                    const fy = oy + Math.floor(from / 8) * cell + cell / 2;
                    const tx = ox + (to % 8) * cell + cell / 2;
                    const ty = oy + Math.floor(to / 8) * cell + cell / 2;
                    flying = {
                        glyph: board[from]!,
                        x: fx + (tx - fx) * e,
                        y: fy + (ty - fy) * e,
                    };
                    flightTo = to;
                    board[from] = null;
                    // highlight target
                    ctx.fillStyle = "rgba(255,203,105,0.4)";
                    ctx.fillRect(
                        ox + (to % 8) * cell,
                        oy + Math.floor(to / 8) * cell,
                        cell,
                        cell,
                    );
                }
            }

            const drawPiece = (glyph: string, x: number, y: number) => {
                const white = glyph === glyph.toUpperCase();
                ctx.font = `${cell * 0.78}px Georgia, serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = white ? pal.paper : pal.ink;
                ctx.strokeStyle = white ? pal.ink : pal.paper;
                ctx.lineWidth = 1;
                ctx.fillText(GLYPH[glyph], x, y + cell * 0.04);
                ctx.strokeText(GLYPH[glyph], x, y + cell * 0.04);
            };

            board.forEach((glyph, i) => {
                if (!glyph || (i === flightTo && flying)) return;
                drawPiece(
                    glyph,
                    ox + (i % 8) * cell + cell / 2,
                    oy + Math.floor(i / 8) * cell + cell / 2,
                );
            });
            if (flying) drawPiece(flying.glyph, flying.x, flying.y);

            // Reset veil at end of cycle
            if (phase > cycle - RESET_T) {
                const p = (phase - (cycle - RESET_T)) / RESET_T;
                ctx.fillStyle = `rgba(38,41,32,${Math.sin(p * Math.PI) * 0.85})`;
                ctx.fillRect(0, 0, w, h);
            }
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";
        },
    };
}

/** SnapDaemon — two keys, raw input lanes, and last-input-wins resolution. */
function keysScene(pal: Pal): Scene {
    // 4-second loop: press A → press D while A held (output snaps to D) →
    // release D (snaps back to A) → release A.
    const aHeld = (p: number) => p >= 0.08 && p < 0.86;
    const dHeld = (p: number) => p >= 0.3 && p < 0.62;

    return {
        draw(ctx, w, h, t) {
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);
            const p = (t % 4) / 4;
            const a = aHeld(p);
            const d = dHeld(p);
            const out: "A" | "D" | null = d ? "D" : a ? "A" : null;

            // Keycaps
            const kw = Math.min(w * 0.2, h * 0.34);
            const gap = kw * 0.35;
            const kx = w / 2 - kw - gap / 2;
            const ky = h * 0.14;
            const drawKey = (
                x: number,
                letter: "A" | "D",
                pressed: boolean,
            ) => {
                const dy = pressed ? kw * 0.07 : 0;
                ctx.fillStyle = "rgba(246,239,220,0.12)";
                roundRect(ctx, x, ky + kw * 0.09, kw, kw, kw * 0.16);
                ctx.fill();
                ctx.fillStyle = pressed ? pal.pollen : pal.paper;
                roundRect(ctx, x, ky + dy, kw, kw * 0.96, kw * 0.16);
                ctx.fill();
                ctx.fillStyle = pal.ink;
                ctx.font = `600 ${kw * 0.44}px ${MONO}`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(letter, x + kw / 2, ky + dy + kw * 0.5);
            };
            drawKey(kx, "A", a);
            drawKey(kx + kw + gap, "D", d);

            // Signal lanes
            const laneX = w * 0.12;
            const laneW = w * 0.76;
            const laneH = Math.max(8, h * 0.055);
            const lanes: Array<{
                label: string;
                test: (q: number) => boolean;
                color: string;
            }> = [
                { label: "raw A", test: aHeld, color: pal.olive },
                { label: "raw D", test: dHeld, color: pal.taupe },
                {
                    label: "resolved",
                    test: (q) => aHeld(q) || dHeld(q),
                    color: pal.almond,
                },
            ];
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";
            lanes.forEach((lane, li) => {
                const y = h * 0.58 + li * laneH * 2.3;
                ctx.font = `500 ${Math.max(10, laneH * 0.85)}px ${MONO}`;
                ctx.fillStyle = pal.palm;
                ctx.fillText(lane.label, laneX, y - laneH * 0.45);
                ctx.fillStyle = "rgba(246,239,220,0.08)";
                ctx.fillRect(laneX, y, laneW, laneH);
                // Bars: sample the loop at fine resolution
                const N = 120;
                for (let i = 0; i < N; i++) {
                    const q = i / N;
                    if (q > p) break;
                    if (!lane.test(q)) continue;
                    let color = lane.color;
                    if (lane.label === "resolved")
                        color = dHeld(q) ? pal.pollen : pal.almond;
                    ctx.fillStyle = color;
                    ctx.fillRect(laneX + q * laneW, y, laneW / N + 0.5, laneH);
                }
            });
            // Playhead
            ctx.strokeStyle = pal.pollen;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(laneX + p * laneW, h * 0.55);
            ctx.lineTo(laneX + p * laneW, h * 0.58 + 2 * laneH * 2.3 + laneH);
            ctx.stroke();

            // Output badge
            ctx.font = `500 ${Math.max(11, h * 0.045)}px ${MONO}`;
            ctx.fillStyle = out ? pal.pollen : pal.palm;
            ctx.fillText(
                out ? `→ output: ${out}  (last input wins)` : "→ output: —",
                laneX,
                h * 0.53,
            );
        },
    };
}

/** Audio recommender — waveform bars + embedding points drifting into clusters. */
function waveformScene(pal: Pal): Scene {
    const DOTS = 42;
    const dots = Array.from({ length: DOTS }, (_, i) => ({
        x: Math.random(),
        y: Math.random() * 0.4,
        c: i % 3,
        seed: Math.random() * Math.PI * 2,
    }));
    const centers = [
        { x: 0.22, y: 0.2 },
        { x: 0.52, y: 0.13 },
        { x: 0.8, y: 0.24 },
    ];
    const colors: Array<keyof Pal> = ["pollen", "almond", "sand"];

    return {
        draw(ctx, w, h, t, dt) {
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);

            // Embedding scatter (upper half) drifting toward genre clusters
            dots.forEach((d) => {
                const c = centers[d.c];
                d.x +=
                    (c.x - d.x) * dt * 0.22 +
                    Math.sin(t * 0.9 + d.seed) * 0.0007;
                d.y +=
                    (c.y - d.y) * dt * 0.22 +
                    Math.cos(t * 0.8 + d.seed) * 0.0007;
                ctx.fillStyle = pal[colors[d.c]];
                ctx.globalAlpha = 0.85;
                ctx.beginPath();
                ctx.arc(
                    d.x * w,
                    d.y * h + h * 0.06,
                    Math.max(1.6, w * 0.004),
                    0,
                    Math.PI * 2,
                );
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Waveform (lower half)
            const N = 72;
            const mid = h * 0.72;
            const bw = w / (N * 1.6);
            for (let i = 0; i < N; i++) {
                const x = (i + 0.5) * (w / N);
                const env =
                    Math.sin(i * 0.21 + t * 2.1) * 0.5 +
                    Math.sin(i * 0.53 - t * 1.4) * 0.32 +
                    Math.sin(i * 0.11 + t * 0.6) * 0.5;
                const amp = (Math.abs(env) * 0.65 + 0.08) * h * 0.2;
                const hot = Math.abs(i / N - (t % 6) / 6) < 0.04;
                ctx.fillStyle = hot ? pal.pollen : pal.olive;
                ctx.fillRect(x - bw / 2, mid - amp, bw, amp * 2);
            }
            // Playhead label
            ctx.font = `500 ${Math.max(10, h * 0.04)}px ${MONO}`;
            ctx.fillStyle = pal.palm;
            ctx.fillText("audio ⟷ lyric embeddings", w * 0.05, h * 0.94);
        },
    };
}

/** Math-o-nomicon — a rose curve draws itself; k cycles through petals. */
function mathScene(pal: Pal): Scene {
    return {
        draw(ctx, w, h, t) {
            ctx.fillStyle = pal.paper;
            ctx.fillRect(0, 0, w, h);

            const cx = w / 2;
            const cy = h / 2;
            const R = Math.min(w, h) * 0.36;

            // Faint axes + grid ring
            ctx.strokeStyle = "rgba(121,125,98,0.35)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx - R * 1.2, cy);
            ctx.lineTo(cx + R * 1.2, cy);
            ctx.moveTo(cx, cy - R * 1.2);
            ctx.lineTo(cx, cy + R * 1.2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.setLineDash([3, 6]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Rose r = R·cos(kθ), k cycling 2..6, drawn progressively
            const CYCLE = 7;
            const phase = (t % CYCLE) / CYCLE;
            const k = 2 + Math.floor((t / CYCLE) % 5);
            const thetaMax = Math.PI * 2 * Math.min(phase * 1.15, 1);
            ctx.strokeStyle = pal.almond;
            ctx.lineWidth = 2;
            ctx.beginPath();
            const steps = 420;
            for (let i = 0; i <= steps; i++) {
                const th = (i / steps) * thetaMax;
                const r = R * Math.cos(k * th);
                const x = cx + r * Math.cos(th);
                const y = cy + r * Math.sin(th);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Pen
            const th = thetaMax;
            const r = R * Math.cos(k * th);
            ctx.fillStyle = pal.pollen;
            ctx.beginPath();
            ctx.arc(
                cx + r * Math.cos(th),
                cy + r * Math.sin(th),
                Math.max(3, R * 0.03),
                0,
                Math.PI * 2,
            );
            ctx.fill();
            ctx.strokeStyle = pal.ink;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Caption
            ctx.font = `500 ${Math.max(11, h * 0.045)}px ${MONO}`;
            ctx.fillStyle = pal.olive;
            ctx.fillText(`r = cos(${k}θ)`, w * 0.06, h * 0.1);
        },
    };
}

/** Blood on the Clocktower — a clock sweeps while role tokens take turns. */
function clockScene(pal: Pal): Scene {
    const TOKENS = 8;
    const tokenColors: Array<keyof Pal> = [
        "pollen",
        "almond",
        "sand",
        "palm",
        "peach",
        "taupe",
        "olive",
        "pollen",
    ];
    return {
        draw(ctx, w, h, t) {
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);
            const cx = w / 2;
            const cy = h / 2;
            const R = Math.min(w, h) * 0.36;

            // Face
            ctx.strokeStyle = pal.paper;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.stroke();
            for (let i = 0; i < 12; i++) {
                const a = (i / 12) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(
                    cx + Math.cos(a) * R * 0.9,
                    cy + Math.sin(a) * R * 0.9,
                );
                ctx.lineTo(
                    cx + Math.cos(a) * R * 0.98,
                    cy + Math.sin(a) * R * 0.98,
                );
                ctx.stroke();
            }

            // Hands (night passes quickly in Clocktower)
            const ha = t * 0.7 - Math.PI / 2;
            const ma = t * 3.1 - Math.PI / 2;
            ctx.strokeStyle = pal.peach;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(
                cx + Math.cos(ha) * R * 0.5,
                cy + Math.sin(ha) * R * 0.5,
            );
            ctx.stroke();
            ctx.strokeStyle = pal.pollen;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(
                cx + Math.cos(ma) * R * 0.72,
                cy + Math.sin(ma) * R * 0.72,
            );
            ctx.stroke();

            // Player tokens around the rim; the "nominated" one pulses in turn
            const active = Math.floor(t / 1.8) % TOKENS;
            for (let i = 0; i < TOKENS; i++) {
                const a = (i / TOKENS) * Math.PI * 2 - Math.PI / 2;
                const tx = cx + Math.cos(a) * R * 1.28;
                const ty = cy + Math.sin(a) * R * 1.28;
                const isActive = i === active;
                const rad =
                    R * (isActive ? 0.12 + Math.sin(t * 6) * 0.012 : 0.09);
                if (isActive) {
                    ctx.strokeStyle = pal.pollen;
                    ctx.setLineDash([4, 5]);
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(tx, ty);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                ctx.fillStyle = pal[tokenColors[i]];
                ctx.beginPath();
                ctx.arc(tx, ty, rad, 0, Math.PI * 2);
                ctx.fill();
                if (isActive) {
                    ctx.strokeStyle = pal.paper;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }

            ctx.font = `500 ${Math.max(10, h * 0.04)}px ${MONO}`;
            ctx.fillStyle = pal.palm;
            ctx.textAlign = "center";
            ctx.fillText(`nomination: player ${active + 1}`, cx, h * 0.95);
            ctx.textAlign = "left";
        },
    };
}

/** A browser wireframe assembling itself — storefront / web builds. */
function browserScene(pal: Pal): Scene {
    return {
        draw(ctx, w, h, t) {
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);
            const bw = Math.min(w * 0.78, h * 1.2);
            const bh = bw * 0.62;
            const bx = (w - bw) / 2;
            const by = (h - bh) / 2;

            // Window
            ctx.fillStyle = pal.paper;
            roundRect(ctx, bx, by, bw, bh, bw * 0.02);
            ctx.fill();
            ctx.fillStyle = pal.peach;
            roundRect(ctx, bx, by, bw, bh * 0.11, bw * 0.02);
            ctx.fill();
            [pal.almond, pal.pollen, pal.palm].forEach((c, i) => {
                ctx.fillStyle = c;
                ctx.beginPath();
                ctx.arc(
                    bx + bw * 0.035 + i * bw * 0.035,
                    by + bh * 0.055,
                    bw * 0.011,
                    0,
                    Math.PI * 2,
                );
                ctx.fill();
            });

            // Blocks appear in sequence; loop every 7s
            const phase = (t % 7) / 7;
            const blocks: Array<[number, number, number, number, string]> = [
                [0.06, 0.18, 0.5, 0.1, pal.olive], // headline
                [0.06, 0.32, 0.34, 0.06, pal.taupe], // sub
                [0.06, 0.46, 0.26, 0.4, pal.sand], // product card
                [0.37, 0.46, 0.26, 0.4, pal.sand],
                [0.68, 0.46, 0.26, 0.4, pal.sand],
                [0.68, 0.18, 0.26, 0.14, pal.pollen], // CTA
            ];
            blocks.forEach((b, i) => {
                const appear = (i + 1) / (blocks.length + 1);
                if (phase < appear) return;
                const grow = Math.min(1, (phase - appear) * 14);
                const [x, y, ww, hh, c] = b;
                ctx.fillStyle = c;
                ctx.globalAlpha = 0.4 + grow * 0.6;
                roundRect(
                    ctx,
                    bx + x * bw,
                    by + y * bh,
                    ww * bw * grow,
                    hh * bh,
                    4,
                );
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            // Cursor moves toward the CTA and clicks near end of loop
            const cx0 = bx + bw * 0.5;
            const cy0 = by + bh * 0.85;
            const cx1 = bx + bw * 0.81;
            const cy1 = by + bh * 0.25;
            const cp = Math.min(1, Math.max(0, (phase - 0.72) / 0.2));
            const e = 1 - Math.pow(1 - cp, 3);
            const mx = cx0 + (cx1 - cx0) * e;
            const my = cy0 + (cy1 - cy0) * e;
            if (phase > 0.7) {
                if (phase > 0.93) {
                    ctx.strokeStyle = pal.pollen;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(mx, my, (phase - 0.93) * 260, 0, Math.PI * 2);
                    ctx.stroke();
                }
                ctx.fillStyle = pal.ink;
                ctx.beginPath();
                ctx.moveTo(mx, my);
                ctx.lineTo(mx + 11, my + 4);
                ctx.lineTo(mx + 5, my + 5);
                ctx.lineTo(mx + 4, my + 12);
                ctx.closePath();
                ctx.fill();
            }
        },
    };
}

/** Autopayroll — timesheet rows fill themselves and get checked off. */
function formScene(pal: Pal): Scene {
    const ROWS = 6;
    const CELLS = 4;
    const ROW_T = 1.35;
    const cycle = ROWS * ROW_T + 2;
    return {
        draw(ctx, w, h, t) {
            ctx.fillStyle = pal.ink;
            ctx.fillRect(0, 0, w, h);
            const sw = Math.min(w * 0.8, h * 1.15);
            const sh = sw * 0.66;
            const sx = (w - sw) / 2;
            const sy = (h - sh) / 2;

            ctx.fillStyle = pal.paper;
            roundRect(ctx, sx, sy, sw, sh, 8);
            ctx.fill();

            const headH = sh * 0.13;
            ctx.fillStyle = pal.olive;
            roundRect(ctx, sx, sy, sw, headH, 8);
            ctx.fill();
            ctx.font = `600 ${Math.max(10, headH * 0.42)}px ${MONO}`;
            ctx.fillStyle = pal.paper;
            ctx.fillText(
                "PeopleSoft — weekly timesheet",
                sx + sw * 0.04,
                sy + headH * 0.64,
            );

            const phase = t % cycle;
            const rowH = (sh - headH) / ROWS;
            const cellW = (sw * 0.78) / CELLS;
            const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            for (let r = 0; r < ROWS; r++) {
                const y = sy + headH + r * rowH;
                const rowStart = r * ROW_T;
                const rowP = Math.min(
                    1,
                    Math.max(0, (phase - rowStart) / (ROW_T * 0.82)),
                );
                const activeRow = phase >= rowStart && phase < rowStart + ROW_T;

                if (activeRow) {
                    ctx.fillStyle = "rgba(255,203,105,0.28)";
                    ctx.fillRect(sx, y, sw, rowH);
                }
                ctx.strokeStyle = "rgba(38,41,32,0.15)";
                ctx.beginPath();
                ctx.moveTo(sx, y + rowH);
                ctx.lineTo(sx + sw, y + rowH);
                ctx.stroke();

                ctx.font = `500 ${Math.max(9, rowH * 0.34)}px ${MONO}`;
                ctx.fillStyle = pal.taupe;
                ctx.fillText(labels[r], sx + sw * 0.03, y + rowH * 0.62);

                // Cells scribble in left → right
                for (let c = 0; c < CELLS; c++) {
                    const cellP = Math.min(1, Math.max(0, rowP * CELLS - c));
                    if (cellP <= 0) continue;
                    const cx0 = sx + sw * 0.16 + c * cellW;
                    ctx.strokeStyle = pal.ink;
                    ctx.lineWidth = Math.max(1.4, rowH * 0.09);
                    ctx.beginPath();
                    const scribbleW = cellW * 0.6 * cellP;
                    for (let s = 0; s <= 12 * cellP; s++) {
                        const xx = cx0 + (s / 12) * scribbleW;
                        const yy =
                            y +
                            rowH * 0.55 +
                            Math.sin(s * 1.7 + r) * rowH * 0.08;
                        s === 0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy);
                    }
                    ctx.stroke();
                }

                // Checkmark once row is complete
                if (rowP >= 1) {
                    ctx.strokeStyle = pal.almond;
                    ctx.lineWidth = Math.max(2, rowH * 0.13);
                    ctx.lineCap = "round";
                    const mx = sx + sw * 0.92;
                    const my = y + rowH * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(mx - rowH * 0.18, my);
                    ctx.lineTo(mx - rowH * 0.04, my + rowH * 0.16);
                    ctx.lineTo(mx + rowH * 0.22, my - rowH * 0.18);
                    ctx.stroke();
                    ctx.lineCap = "butt";
                }
            }

            // Submitted stamp
            if (phase > ROWS * ROW_T + 0.3) {
                const p = Math.min(1, (phase - ROWS * ROW_T - 0.3) / 0.35);
                ctx.save();
                ctx.translate(sx + sw / 2, sy + sh / 2);
                ctx.rotate(-0.14);
                ctx.globalAlpha = p;
                ctx.font = `700 ${sh * 0.16}px ${MONO}`;
                ctx.fillStyle = pal.almond;
                ctx.textAlign = "center";
                ctx.fillText("SUBMITTED", 0, 0);
                ctx.strokeStyle = pal.almond;
                ctx.lineWidth = 3;
                ctx.strokeRect(-sw * 0.3, -sh * 0.13, sw * 0.6, sh * 0.2);
                ctx.restore();
                ctx.textAlign = "left";
            }
        },
    };
}

function roundRect(
    ctx: Ctx,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

/* ------------------------------------------------------------------ */
/* Scene registry + runner                                             */
/* ------------------------------------------------------------------ */

const BOOT_LINES = [
    "TinyOS v0.3 — bootloader ok",
    "[mem ] paging enabled ... 64 MiB",
    "[cpu ] GDT / IDT loaded",
    "[irq ] PIC remapped",
    "[disk] ATA PIO ready",
    "[vfs ] mounting ramfs ... ok",
    "[sh  ] starting shell",
    "> _",
];

const EDIT_LINES = [
    "#include <ncurses.h>",
    "",
    "int main() {",
    "  initscr(); raw();",
    "  keypad(stdscr, TRUE);",
    "  run_editor();",
    "  endwin();",
    "}",
    ":wq   ✓ written 214B",
];

function makeScene(key: string, pal: Pal): Scene {
    switch (key) {
        case "life":
            return lifeScene(pal);
        case "chess":
            return chessScene(pal);
        case "keys":
            return keysScene(pal);
        case "waveform":
            return waveformScene(pal);
        case "math":
            return mathScene(pal);
        case "clock":
            return clockScene(pal);
        case "browser":
            return browserScene(pal);
        case "form":
            return formScene(pal);
        case "boot":
            return terminalScene(pal, BOOT_LINES, "qemu — tinyos.img");
        case "edit":
            return terminalScene(pal, EDIT_LINES, "textedit — main.cpp");
        default:
            return terminalScene(pal, BOOT_LINES, key);
    }
}

export function mountPreview(
    canvas: HTMLCanvasElement,
    key: string,
): PreviewController {
    const ctx = canvas.getContext("2d");
    const pal = palette();
    const scene = makeScene(key, pal);

    let rafId = 0;
    let playing = false;
    let last = 0;
    let elapsed = Math.random() * 2; // desync loops between frames

    function fit() {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const bw = Math.max(1, Math.round(rect.width * dpr));
        const bh = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== bw || canvas.height !== bh) {
            canvas.width = bw;
            canvas.height = bh;
        }
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        return rect;
    }

    function frame(now: number) {
        if (!playing) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        elapsed += dt;
        const rect = fit();
        scene.draw(ctx!, rect.width, rect.height, elapsed, dt);
        rafId = requestAnimationFrame(frame);
    }

    const onResize = () => {
        if (!playing) renderStatic();
    };
    window.addEventListener("resize", onResize);

    function play() {
        if (!ctx || playing) return;
        playing = true;
        last = performance.now();
        rafId = requestAnimationFrame(frame);
    }

    function pause() {
        playing = false;
        cancelAnimationFrame(rafId);
    }

    function renderStatic() {
        if (!ctx) return;
        const rect = fit();
        // Advance a bit so static frames aren't all t=0-empty.
        scene.draw(ctx, rect.width, rect.height, 2.4, 0.016);
    }

    return {
        play,
        pause,
        renderStatic,
        destroy() {
            pause();
            window.removeEventListener("resize", onResize);
        },
    };
}
