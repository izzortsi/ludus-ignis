// Intro scene ASCII art.
//
// Present-day only. The world is what the apprentice has always known —
// every visible anomaly (sky-bow overhead, yellowed trees, red dawn sun,
// the Hearth riding in its bronze cart) is just normal. Nothing about
// "before" is shown or explained.

import { mulberry32 } from '../ascii/prng';

// Default (camp) scene dimensions — used by everything except the portrait
// flashback 1 (Rio + Miyake). Each scene declares its own dims via the
// SceneDims interface below; the IntroScene reads them per phase.
export const COLS = 64;
export const ROWS = 22;
export const ROW_PX = 14;
export const FRAMES = 15;

export interface SceneDims {
  cols: number;
  rows: number;
  rowPx: number;
}

export const CAMP_DIMS: SceneDims = { cols: 64, rows: 22, rowPx: 14 };
export const RIO_DIMS: SceneDims = { cols: 50, rows: 46, rowPx: 14 };

function blank(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(' '));
}

function gridToArt(grid: string[][]): string[] {
  const cols = grid[0]?.length ?? 0;
  return grid.map((r) => {
    const s = r.join('');
    return s.length >= cols ? s.slice(0, cols) : s + ' '.repeat(cols - s.length);
  });
}

function placeBlock(grid: string[][], block: string[], row: number, col: number): void {
  for (let r = 0; r < block.length; r++) {
    const dest = row + r;
    if (dest < 0 || dest >= grid.length) continue;
    for (let c = 0; c < block[r].length; c++) {
      const dc = col + c;
      if (dc < 0 || dc >= grid[0].length) continue;
      const ch = block[r][c];
      if (ch !== ' ') grid[dest][dc] = ch;
    }
  }
}

// ---------------------------------------------------------------------------
// SKY — stars (twinkling) and the sky-bow (Earth ring)
// ---------------------------------------------------------------------------

// Sky-bow cell occupancy — computed early so STAR_POSITIONS can filter
// out any star that would land on the band, keeping the diagonal clean.
const SKY_BOW_START_ROW = 1;
const SKY_BOW_END_ROW   = 8;
const SKY_BOW_SLOPE     = (SKY_BOW_END_ROW - SKY_BOW_START_ROW) / (COLS - 1);

const SKY_BOW_CELLS: Set<string> = (() => {
  const cells = new Set<string>();
  for (let c = 0; c < COLS; c++) {
    const base = SKY_BOW_START_ROW + SKY_BOW_SLOPE * c;
    const r0 = Math.floor(base) - 1;
    const r1 = Math.floor(base);
    const r2 = Math.floor(base) + 1;
    if (r0 >= 0 && r0 < ROWS && c % 3 === 0) cells.add(`${r0},${c}`);
    if (r1 >= 0 && r1 < ROWS)                cells.add(`${r1},${c}`);
    if (r2 >= 0 && r2 < ROWS && c % 2 === 0) cells.add(`${r2},${c}`);
  }
  return cells;
})();

// Stars span the full sky from row 0 down to row 8 (mountains start at
// row 9). Stars overlapping any sky-bow cell are filtered out so the
// diagonal band reads cleanly with no pinpoints sitting on top of it.
const STAR_POSITIONS_RAW: ReadonlyArray<readonly [number, number]> = [
  [0, 4],  [0, 18], [0, 33], [0, 49], [0, 60],
  [1, 12], [1, 27], [1, 42], [1, 55],
  [2, 8],  [2, 23], [2, 38], [2, 51],
  [3, 16], [3, 31], [3, 47], [3, 58],
  [4, 5],  [4, 20], [4, 35], [4, 53],
  [5, 11], [5, 28], [5, 45], [5, 62],
  [6, 7],  [6, 22], [6, 38], [6, 52],
  [7, 14], [7, 31], [7, 48], [7, 60],
  [8, 4],  [8, 19], [8, 36], [8, 51], [8, 58]
];

// Filter with a one-cell buffer so stars don't sit immediately adjacent
// to the band either — keeps the diagonal visually clean on both sides.
function isNearSkyBow(row: number, col: number, buffer: number = 1): boolean {
  for (let dr = -buffer; dr <= buffer; dr++) {
    for (let dc = -buffer; dc <= buffer; dc++) {
      if (SKY_BOW_CELLS.has(`${row + dr},${col + dc}`)) return true;
    }
  }
  return false;
}

const STAR_POSITIONS: ReadonlyArray<readonly [number, number]> =
  STAR_POSITIONS_RAW.filter(([r, c]) => !isNearSkyBow(r, c, 1));

export const STAR_FIELD: string[] = (() => {
  const grid = blank(ROWS, COLS);
  for (const [r, c] of STAR_POSITIONS) grid[r][c] = '.';
  return gridToArt(grid);
})();

// Per-star sine pulse: each star has its own phase offset so the sky
// shimmers in waves instead of all stars pulsing in unison. Two intensity
// tiers (medium + bright) give a sense of depth — many quiet stars
// breathing through their middle band, a few bright at any moment.
//
// All stars share the same TWINKLE_FRAMES cycle length so the pre-generated
// frame array loops seamlessly.

export const TWINKLE_FRAMES = 60;

function starSinePhase(r: number, c: number): number {
  return (r * 7.13 + c * 1.37) % (2 * Math.PI);
}

function starBrightness(idx: number, t: number): number {
  const [r, c] = STAR_POSITIONS[idx];
  const phase = starSinePhase(r, c);
  return (Math.sin((t / TWINKLE_FRAMES) * 2 * Math.PI + phase) + 1) / 2;
}

const STARS_BRIGHT_THRESHOLD = 0.82;
const STARS_MED_THRESHOLD    = 0.50;

export const STARS_MED_FRAMES: string[][] = Array.from({ length: TWINKLE_FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  for (let i = 0; i < STAR_POSITIONS.length; i++) {
    const b = starBrightness(i, t);
    if (b > STARS_MED_THRESHOLD && b <= STARS_BRIGHT_THRESHOLD) {
      const [r, c] = STAR_POSITIONS[i];
      grid[r][c] = '*';
    }
  }
  return gridToArt(grid);
});

export const STARS_BRIGHT_FRAMES: string[][] = Array.from({ length: TWINKLE_FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  for (let i = 0; i < STAR_POSITIONS.length; i++) {
    if (starBrightness(i, t) > STARS_BRIGHT_THRESHOLD) {
      const [r, c] = STAR_POSITIONS[i];
      grid[r][c] = '*';
    }
  }
  return gridToArt(grid);
});

// Sky-bow art — Earth ring crossing the sky as a clear diagonal slope from
// upper-left to lower-right. Three rows thick for visibility, with sparse
// brighter glints. The protagonist's culture calls it the "long road";
// the player infers what it actually is.
export const SKY_BOW: string[] = (() => {
  const grid = blank(ROWS, COLS);
  // Place band cells (already enumerated for star filtering)
  for (const cell of SKY_BOW_CELLS) {
    const [r, c] = cell.split(',').map(Number);
    grid[r][c] = '.';
  }
  return gridToArt(grid);
})();

// ---------------------------------------------------------------------------
// LAND — far mountains, near foothills (with yellowed-tree glyphs), ground
// ---------------------------------------------------------------------------

const MOUNTAINS_FAR_ART = [
  '       ___              _____                  ___          ',
  '   ___/   \\____      __/     \\___          ___/   \\__       ',
  '__/             \\____/             \\______/            \\____'
];

const MOUNTAINS_NEAR_ART = [
  '                                                              ',
  '    *           *                  *                 *        ',
  '  ,_*_,      ,_*_,_,           ,_*_,            ,___*_,___    ',
  ' /        __/     \\___        /       \\__      /              '
];

export const MOUNTAINS_FAR: string[] = (() => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, MOUNTAINS_FAR_ART, 9, 1);
  return gridToArt(grid);
})();

export const MOUNTAINS_NEAR: string[] = (() => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, MOUNTAINS_NEAR_ART, 11, 1);
  return gridToArt(grid);
})();

// Ground line + faint scatter
export const GROUND: string[] = (() => {
  const grid = blank(ROWS, COLS);
  // ground horizon
  grid[ROWS - 2] = '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'.split('');
  // sparse foreground glyphs (pebbles, leaves)
  const r = mulberry32(29);
  for (let c = 0; c < COLS; c++) {
    if (r() < 0.15) grid[ROWS - 1][c] = '.';
    else if (r() < 0.25) grid[ROWS - 1][c] = ',';
  }
  return gridToArt(grid);
})();

// ---------------------------------------------------------------------------
// TRIBE — the camp at dawn. Sleeping figures + the standing Hearth-Tender.
// ---------------------------------------------------------------------------

const SLEEPING_LEFT  = ['o>~~~~~'];
const SLEEPING_RIGHT = ['~~~~~<o'];

const TENDER_FIGURE = [
  ',-.',
  '(o)',
  '/|\\',
  '/ \\'
];

const APPRENTICE_FIGURE = [
  ',-.',
  '(o)',
  '/|.',
  '/ \\'
];

export const TRIBE_SLEEPING: string[] = (() => {
  const grid = blank(ROWS, COLS);
  // Sleeping figures scattered around the camp. Right-side ones sit further
  // out so they don't crowd the apprentice + new Cinder vessel that appear
  // to the right of the Hearth in the kindle/named phases.
  placeBlock(grid, SLEEPING_RIGHT, 16, 5);
  placeBlock(grid, SLEEPING_RIGHT, 18, 11);
  placeBlock(grid, SLEEPING_LEFT,  16, 56);
  placeBlock(grid, SLEEPING_LEFT,  18, 57);
  return gridToArt(grid);
})();

export const TENDER: string[] = (() => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, TENDER_FIGURE, 13, 21);
  return gridToArt(grid);
})();

export const APPRENTICE: string[] = (() => {
  const grid = blank(ROWS, COLS);
  // Right of the Hearth cart (which ends at col 45). The reaching-arm
  // glyph at col 49 points toward the new Cinder vessel at col 50+.
  placeBlock(grid, APPRENTICE_FIGURE, 13, 47);
  return gridToArt(grid);
})();

// ---------------------------------------------------------------------------
// HEARTH — the tribe's central never-extinguished fire, riding in a bronze
// cart so it can travel south with the migration. Larger than the Cinder.
// ---------------------------------------------------------------------------

const HEARTH_CART_ART = [
  '   _____________   ',
  '  [|           |]  ',
  '  [|___________|]  ',
  '  [/  O     O  \\]  '
];

export const HEARTH_CART: string[] = (() => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, HEARTH_CART_ART, 16, 27);
  return gridToArt(grid);
})();

// Hearth fire — a bigger Doom-fire than the Cinder. Reuses the same
// algorithm but with larger dimensions (15 cols × 8 rows) so it dominates.
const HEARTH_FIRE_ROWS = 8;
const HEARTH_FIRE_COLS = 15;
const HEAT_GLYPHS = " ..',**ooo@@";
const MAX_HEAT = HEAT_GLYPHS.length - 1;

function makeHearthFireArt(t: number): string[] {
  const r = mulberry32(t * 17 + 31);
  const seedHeat = MAX_HEAT;

  const heat: number[][] = Array.from(
    { length: HEARTH_FIRE_ROWS + 2 },
    () => Array(HEARTH_FIRE_COLS).fill(0)
  );

  for (let row = HEARTH_FIRE_ROWS; row < HEARTH_FIRE_ROWS + 2; row++) {
    for (let c = 0; c < HEARTH_FIRE_COLS; c++) {
      heat[row][c] = Math.max(0, seedHeat - Math.floor(r() * 2));
    }
  }

  for (let row = HEARTH_FIRE_ROWS - 1; row >= 0; row--) {
    for (let c = 0; c < HEARTH_FIRE_COLS; c++) {
      const shift = Math.floor((r() - 0.5) * 4);
      const srcCol = Math.max(0, Math.min(HEARTH_FIRE_COLS - 1, c + shift));
      const cool = Math.floor(r() * 3);
      heat[row][c] = Math.max(0, heat[row + 1][srcCol] - cool);
    }
  }

  const cycle = (t * Math.PI * 2) / FRAMES;
  for (let row = 0; row < HEARTH_FIRE_ROWS; row++) {
    const fromBottom = (HEARTH_FIRE_ROWS - 1 - row) / (HEARTH_FIRE_ROWS - 1);
    const halfWidth = (HEARTH_FIRE_COLS / 2) * Math.pow(1 - fromBottom, 0.6);
    const sway = Math.sin(cycle + fromBottom * 4.0) * (0.3 + fromBottom * 1.4);
    const center = HEARTH_FIRE_COLS / 2 + sway;
    const denom = Math.max(halfWidth, 0.5);
    for (let c = 0; c < HEARTH_FIRE_COLS; c++) {
      const d = Math.abs(c + 0.5 - center) / denom;
      const falloff = Math.max(0, 1 - d * d);
      heat[row][c] = Math.floor(heat[row][c] * falloff);
    }
  }

  return heat.slice(0, HEARTH_FIRE_ROWS).map((row) =>
    row.map((h) => HEAT_GLYPHS[Math.min(h, MAX_HEAT)]).join('')
  );
}

// Hearth fire frames — fire positioned on top of the cart at row 8
export const HEARTH_FIRE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, makeHearthFireArt(t), 8, 29);
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// CINDER — the apprentice's small personal vessel + its kindling fire
// ---------------------------------------------------------------------------

const CINDER_VESSEL_ART = [
  '[___]',
  ' \\_/ '
];

export const CINDER_VESSEL: string[] = (() => {
  const grid = blank(ROWS, COLS);
  // Right of the apprentice; the kindling fire emerges just above its rim.
  placeBlock(grid, CINDER_VESSEL_ART, 17, 50);
  return gridToArt(grid);
})();

const CINDER_FIRE_ROWS = 3;
const CINDER_FIRE_COLS = 5;

function makeCinderFireArt(t: number, intensity: number): string[] {
  // intensity 0..1 controls flame size during kindling
  const r = mulberry32(t * 23 + 7);
  const seedHeat = Math.max(0, Math.round(MAX_HEAT * intensity));
  if (seedHeat === 0) return Array(CINDER_FIRE_ROWS).fill(' '.repeat(CINDER_FIRE_COLS));

  const heat: number[][] = Array.from(
    { length: CINDER_FIRE_ROWS + 1 },
    () => Array(CINDER_FIRE_COLS).fill(0)
  );

  for (let c = 0; c < CINDER_FIRE_COLS; c++) {
    heat[CINDER_FIRE_ROWS][c] = Math.max(0, seedHeat - Math.floor(r() * 2));
  }
  for (let row = CINDER_FIRE_ROWS - 1; row >= 0; row--) {
    for (let c = 0; c < CINDER_FIRE_COLS; c++) {
      const shift = Math.floor((r() - 0.5) * 3);
      const srcCol = Math.max(0, Math.min(CINDER_FIRE_COLS - 1, c + shift));
      const cool = Math.floor(r() * 3);
      heat[row][c] = Math.max(0, heat[row + 1][srcCol] - cool);
    }
  }

  return heat.slice(0, CINDER_FIRE_ROWS).map((row) =>
    row.map((h) => HEAT_GLYPHS[Math.min(h, MAX_HEAT)]).join('')
  );
}

// Cinder fire frames — for "kindled" steady state, sitting on top of the
// vessel at col 50 with fire bottom at row 16 just above the vessel rim.
export const CINDER_FIRE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, makeCinderFireArt(t, 0.6), 14, 50);
  return gridToArt(grid);
});

// Cinder kindling frames — the fire grows from spark to small flame
export const CINDER_KINDLE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  // intensity ramps from 0 to 0.6 over the frame range
  const intensity = Math.min(0.6, (t / (FRAMES - 1)) * 0.6);
  placeBlock(grid, makeCinderFireArt(t, intensity), 14, 50);
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// HEARTH SMOKE — drifting particles above the Hearth fire (rises 7 rows)
// ---------------------------------------------------------------------------

const HEARTH_SMOKE_STREAMS = [
  { col: 30, drift: -0.40, period: 10, chars: "'~ " },
  { col: 32, drift: -0.20, period: 7,  chars: "~. " },
  { col: 34, drift:  0.20, period: 9,  chars: "'~." },
  { col: 35, drift:  0.10, period: 8,  chars: "'." },
  { col: 36, drift:  0.35, period: 11, chars: "~'.~" },
  { col: 37, drift:  0.05, period: 6,  chars: "'~" },
  { col: 38, drift:  0.50, period: 8,  chars: "'~." },
  { col: 40, drift: -0.10, period: 9,  chars: "'~. " },
  { col: 42, drift: -0.30, period: 10, chars: "~." }
];

const HEARTH_SMOKE_BASE_ROW = 7;
const HEARTH_SMOKE_HEIGHT = 7;

export const HEARTH_SMOKE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  for (let i = 0; i < HEARTH_SMOKE_STREAMS.length; i++) {
    const s = HEARTH_SMOKE_STREAMS[i];
    const phase = (t + i * 3) % s.period;
    if (phase >= HEARTH_SMOKE_HEIGHT) continue;
    const row = HEARTH_SMOKE_BASE_ROW - phase;
    const col = Math.floor(s.col + phase * s.drift);
    if (col < 0 || col >= COLS || row < 0) continue;
    const ch = s.chars[phase % s.chars.length];
    if (ch !== ' ') grid[row][col] = ch;
  }
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// HEARTH EMBERS — bright sparks rising above the fire (brighter, rise less)
// ---------------------------------------------------------------------------

const HEARTH_EMBER_SPARKS = [
  { col: 33, drift:  0.30, period: 9,  chars: "*'." },
  { col: 34, drift: -0.20, period: 11, chars: "*'." },
  { col: 35, drift: -0.10, period: 12, chars: "*'." },
  { col: 36, drift:  0.40, period: 8,  chars: "*'." },
  { col: 37, drift:  0.20, period: 10, chars: "*'." },
  { col: 38, drift: -0.30, period: 13, chars: "*'." },
  { col: 39, drift: -0.10, period: 7,  chars: "*'." },
  { col: 40, drift:  0.50, period: 14, chars: "*'." }
];

const HEARTH_EMBER_BASE_ROW = 8;
const HEARTH_EMBER_HEIGHT = 7;

export const HEARTH_EMBER_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  for (let i = 0; i < HEARTH_EMBER_SPARKS.length; i++) {
    const s = HEARTH_EMBER_SPARKS[i];
    const phase = (t + i * 4) % s.period;
    if (phase >= HEARTH_EMBER_HEIGHT) continue;
    const row = HEARTH_EMBER_BASE_ROW - phase;
    const col = Math.floor(s.col + phase * s.drift);
    if (col < 0 || col >= COLS || row < 0) continue;
    const ch = s.chars[Math.min(phase, s.chars.length - 1)];
    if (ch !== ' ') grid[row][col] = ch;
  }
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// CINDER SMOKE — small smoke trail above the apprentice's vessel
// ---------------------------------------------------------------------------

const CINDER_SMOKE_STREAMS = [
  { col: 52, drift: 0.20, period: 8,  chars: "'." },
  { col: 51, drift: 0.35, period: 10, chars: "'.~" }
];

const CINDER_SMOKE_BASE_ROW = 12;
const CINDER_SMOKE_HEIGHT = 4;

export const CINDER_SMOKE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  for (let i = 0; i < CINDER_SMOKE_STREAMS.length; i++) {
    const s = CINDER_SMOKE_STREAMS[i];
    const phase = (t + i * 3) % s.period;
    if (phase >= CINDER_SMOKE_HEIGHT) continue;
    const row = CINDER_SMOKE_BASE_ROW - phase;
    const col = Math.floor(s.col + phase * s.drift);
    if (col < 0 || col >= COLS || row < 0) continue;
    const ch = s.chars[phase % s.chars.length];
    if (ch !== ' ') grid[row][col] = ch;
  }
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// GROUND BREEZE — sparse `~` glyphs drifting horizontally along the ground,
// suggesting wind moving through the camp. Subtle but visible.
// ---------------------------------------------------------------------------

const BREEZE_PARTICLES = [
  { row: ROWS - 1, period: 14, drift: 1, startCol: 0  },
  { row: ROWS - 1, period: 11, drift: 1, startCol: 22 },
  { row: ROWS - 2, period: 16, drift: 1, startCol: 44 }
];

export const BREEZE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  for (const p of BREEZE_PARTICLES) {
    const phase = (t + p.startCol) % p.period;
    const col = (p.startCol + phase * p.drift) % COLS;
    if (col >= 0 && col < COLS) grid[p.row][col] = '~';
  }
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// FLASHBACK 1 — Miyake-class CME spiral over Rio. Portrait canvas (RIO_DIMS)
// reproducing rj_miyake3.png as a static woodcut: alternating black/white
// wedge spikes radiating from a spiral curl, with Christ atop Corcovado on
// the left, far hills + Sugarloaf on the right, the bay, and the skyline.
// Five layers (spikes / curl / land / water / city) for independent styling.
// ---------------------------------------------------------------------------

const RIO_ASPECT = 1.75; // char-cell height / width — for screen-round shapes

function buildRioMiyakeLayers(): {
  spikes: string[];
  curl: string[];
  land: string[];
  water: string[];
  city: string[];
} {
  const { cols, rows } = RIO_DIMS;
  const SKY_LIMIT = 28; // sky region: rows 0..27
  const cx = 24;
  const cy = 13;

  const spikesGrid = blank(rows, cols);
  const curlGrid   = blank(rows, cols);
  const landGrid   = blank(rows, cols);
  const waterGrid  = blank(rows, cols);
  const cityGrid   = blank(rows, cols);

  // === RADIATING WEDGES ===
  // Polar sweep: each cell is asked which wedge it belongs to. Even-indexed
  // wedges fill (woodcut "ink"); odd-indexed are gaps (the white wedges).
  const r = mulberry32(91);
  const N_WEDGES = 24;
  const INNER_R = 7;
  const OUTER_R = 24;
  const wedgeReach = Array.from({ length: N_WEDGES }, () => OUTER_R + (r() - 0.5) * 6);
  for (let row = 0; row < SKY_LIMIT; row++) {
    for (let col = 0; col < cols; col++) {
      const dx = col - cx;
      const dy = (row - cy) * RIO_ASPECT;
      const rr = Math.sqrt(dx * dx + dy * dy);
      if (rr < INNER_R) continue;
      const ang = Math.atan2(dy, dx);
      const wedgeIdx = Math.floor(((ang + Math.PI) / (Math.PI * 2)) * N_WEDGES) % N_WEDGES;
      if (wedgeIdx % 2 !== 0) continue;
      if (rr > wedgeReach[wedgeIdx]) continue;
      const u = (rr - INNER_R) / (wedgeReach[wedgeIdx] - INNER_R);
      spikesGrid[row][col] = u < 0.45 ? '#' : u < 0.78 ? '*' : '.';
    }
  }

  // === SPIRAL CURL ===
  // Logarithmic spiral, 1.8 turns from r≈0.5 outward to ~6.5 — fills the
  // INNER_R hole in the wedge field with a clean hooked eye.
  for (let theta = 0; theta < Math.PI * 3.6; theta += 0.05) {
    const rr = 0.5 * Math.exp(theta * 0.43);
    if (rr > 6.5) break;
    const x = cx + rr * Math.cos(theta);
    const y = cy + (rr * Math.sin(theta)) / RIO_ASPECT;
    const gr = Math.round(y);
    const gc = Math.round(x);
    if (gr >= 0 && gr < SKY_LIMIT && gc >= 0 && gc < cols) curlGrid[gr][gc] = '@';
  }
  curlGrid[cy][cx] = '@';

  // === LAND — Christ on Corcovado (left), far hills (mid), Sugarloaf (right) ===
  const corcovado = [
    '      -T-            ',
    '       |             ',
    '      / \\            ',
    '     /   \\           ',
    '    /     \\          ',
    '   /       \\         ',
    '  /         \\___     ',
    ' /              \\__  ',
    '/                  \\_'
  ];
  placeBlock(landGrid, corcovado, 31, 0);

  const farRidge = [
    '                       ___      __     ',
    '                   ___/   \\____/  \\___ '
  ];
  placeBlock(landGrid, farRidge, 38, 0);

  const sugarloaf = [
    '                                     ____     ',
    '                                 ___/    \\__  ',
    '                               _/            \\'
  ];
  placeBlock(landGrid, sugarloaf, 37, 0);

  // === WATER — bay, two rows ===
  for (let c = 0; c < cols; c++) {
    waterGrid[41][c] = '~';
    waterGrid[42][c] = '~';
  }

  // === CITY — varied skyline + standout towers + single grounding row ===
  const peaks = '  #  ##   ###  ###    ##   ## ##   ##  ## #  ##  ##  ';
  for (let c = 0; c < peaks.length && c < cols; c++) {
    if (peaks[c] === '#') cityGrid[43][c] = '#';
  }
  const tallTowerCols = [13, 27, 38];
  for (const tc of tallTowerCols) {
    cityGrid[42][tc] = '#';
    cityGrid[43][tc] = '#';
  }
  const skyline2 = ' ##### ### #### ## ##### ##### #### ## ## #### ##  ';
  for (let c = 0; c < skyline2.length && c < cols; c++) {
    if (skyline2[c] === '#') cityGrid[44][c] = '#';
  }
  for (let c = 0; c < cols; c++) cityGrid[45][c] = '#';

  return {
    spikes: gridToArt(spikesGrid),
    curl:   gridToArt(curlGrid),
    land:   gridToArt(landGrid),
    water:  gridToArt(waterGrid),
    city:   gridToArt(cityGrid)
  };
}

const _rio = buildRioMiyakeLayers();
export const RIO_SPIKES: string[] = _rio.spikes;
export const RIO_CURL:   string[] = _rio.curl;
export const RIO_LAND:   string[] = _rio.land;
export const RIO_WATER:  string[] = _rio.water;
export const RIO_CITY:   string[] = _rio.city;

// ---------------------------------------------------------------------------
// FLASHBACK 2 — mirror-life leak. A derelict coastal lab spills wrong-handed
// biomatter through a broken outflow pipe into a freshwater pond. The plume
// is built from three density bands (outer/mid/core); the densest core uses
// only unpaired left-leaning glyphs as the visual encoding of broken
// chirality (no `)`, no `>`, no `\` — symmetry is broken at the source).
// Husks of dead birds drift on the surface and lie on the bank.
// ---------------------------------------------------------------------------

const MIRROR_RIDGE_ART = [
  '___    ____         _____         ____         _____      ____ ',
  '   \\__/    \\_______/     \\_______/    \\_______/     \\____/    '
];

const MIRROR_LAB_ART = [
  '   _____ ',
  '  |:|:|:|',
  '  |.|:|.|',
  '  |:|_|:|',
  '  |_____|=\\__',
  '              \\__',
  '                 \\__'
];

const MIRROR_STAR_POSITIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 5],  [0, 22], [0, 39], [0, 57],
  [1, 14], [1, 33], [1, 50],
  [2, 8],  [2, 28], [2, 47], [2, 60],
  [3, 18], [3, 41]
];

const MIRROR_SHORE_ROW = 13;

export const MIRROR_LEAK_BACK: string[] = (() => {
  const grid = blank(ROWS, COLS);
  // Faint static stars overhead — same dim sky as the rest of the world.
  for (const [r, c] of MIRROR_STAR_POSITIONS) grid[r][c] = '.';
  // Distant ridges across the far shore.
  placeBlock(grid, MIRROR_RIDGE_ART, 4, 0);
  // Lab building on the near (bottom-left) bank, with broken outflow pipe
  // descending toward the water.
  placeBlock(grid, MIRROR_LAB_ART, 7, 6);
  // Sparse shoreline grit at the bank — `,` chars where the lab footprint
  // doesn't cover, so the player reads "this is a shore."
  for (let c = 0; c < COLS; c++) {
    if (c >= 6 && c <= 25) continue;
    if ((c * 7 + 3) % 5 === 0) grid[MIRROR_SHORE_ROW][c] = ',';
  }
  return gridToArt(grid);
})();

// Water surface starts at row 14.
const MIRROR_WATER_TOP_ROW = 14;

export const MIRROR_LEAK_WATER: string[] = (() => {
  const grid = blank(ROWS, COLS);
  for (let row = MIRROR_WATER_TOP_ROW; row < ROWS; row++) {
    let line = '';
    for (let c = 0; c < COLS; c++) {
      const phase = (c + (row - MIRROR_WATER_TOP_ROW) * 3) % 7;
      line += phase < 1 ? '_' : '~';
    }
    grid[row] = line.split('');
  }
  return gridToArt(grid);
})();

// Plume source at the point where the broken pipe meets the water.
const MIRROR_SOURCE_ROW = 14;
const MIRROR_SOURCE_COL = 24;

function plumeDensity(row: number, col: number, t: number): number {
  const dr = row - MIRROR_SOURCE_ROW;
  const dc = col - MIRROR_SOURCE_COL;
  // Asymmetric metric: weight upstream/upward distances heavily so the plume
  // reads as a downstream comma-shape, not a symmetric circle.
  const horiz = dc < 0 ? dc * 1.8 : dc;
  const vert  = dr < 0 ? dr * 3.0 : dr;
  // Squash horizontal so a round-on-grid shape reads as round-on-screen
  // (character cells are taller than wide).
  const d = Math.sqrt(vert * vert + (horiz * 0.55) * (horiz * 0.55));
  // Slow breath: reach oscillates ±15% over the loop, so the plume "lives".
  const breath = 1 + Math.sin((t / FRAMES) * Math.PI * 2) * 0.15;
  return Math.max(0, 1 - d / (11 * breath));
}

// Outer faint halo — `.` at the edges of the bloom
export const MIRROR_LEAK_OUTER: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  const r = mulberry32(t * 41 + 11);
  for (let row = MIRROR_WATER_TOP_ROW; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const d = plumeDensity(row, col, t);
      if (d > 0.05 && d < 0.32 && r() < d * 1.4) {
        grid[row][col] = '.';
      }
    }
  }
  return gridToArt(grid);
});

// Mid plume — sickly mid-density chars
export const MIRROR_LEAK_MID: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  const r = mulberry32(t * 47 + 19);
  for (let row = MIRROR_WATER_TOP_ROW; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const d = plumeDensity(row, col, t);
      if (d > 0.32 && d < 0.62 && r() < d * 1.1) {
        grid[row][col] = r() < 0.5 ? ':' : ';';
      }
    }
  }
  return gridToArt(grid);
});

// Wrong-handed core — only left-leaning glyphs (`(`, `<`, `/`); the absence
// of their pairs (`)`, `>`, `\`) is the signature of broken chirality.
const MIRROR_CORE_GLYPHS = ['(', '<', '/'];

export const MIRROR_LEAK_CORE: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  const r = mulberry32(t * 53 + 23);
  for (let row = MIRROR_WATER_TOP_ROW; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const d = plumeDensity(row, col, t);
      if (d > 0.62 && r() < d) {
        const pick = Math.floor(r() * MIRROR_CORE_GLYPHS.length);
        grid[row][col] = MIRROR_CORE_GLYPHS[pick];
      }
    }
  }
  return gridToArt(grid);
});

// Husks — a few dead birds on the bank, a few floating in affected water.
const MIRROR_HUSK_POSITIONS: ReadonlyArray<readonly [number, number]> = [
  [13, 3],   // on bank far left
  [13, 50],  // on bank far right
  [13, 59],  // on bank far right
  [15, 35],  // floating mid-plume
  [16, 42],  // floating downstream edge
  [17, 49]   // floating far downstream
];

export const MIRROR_LEAK_HUSKS: string[] = (() => {
  const grid = blank(ROWS, COLS);
  for (const [r, c] of MIRROR_HUSK_POSITIONS) grid[r][c] = 'v';
  return gridToArt(grid);
})();

// ---------------------------------------------------------------------------
// EMBER FALL — a single * glyph traces a path from the Hearth's apex down
// into the apprentice's bronze vessel, kindling the new Cinder.
// ---------------------------------------------------------------------------

// The path is a parametric arc from the Hearth fire's right side down into
// the apprentice's vessel at col 52.
export const EMBER_FALL_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  const u = t / (FRAMES - 1); // 0..1
  const startRow = 10, startCol = 41;
  const endRow = 17, endCol = 52;
  // Slight upward arc mid-flight, then descent into the vessel
  const row = Math.round(startRow + (endRow - startRow) * u + Math.sin(u * Math.PI) * -2);
  const col = Math.round(startCol + (endCol - startCol) * u);
  if (row >= 0 && row < ROWS && col >= 0 && col < COLS) grid[row][col] = '*';
  return gridToArt(grid);
});
