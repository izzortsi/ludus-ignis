// Intro scene ASCII art.
//
// Present-day only. The world is what the apprentice has always known —
// every visible anomaly (sky-bow overhead, yellowed trees, red dawn sun,
// the Hearth riding in its bronze cart) is just normal. Nothing about
// "before" is shown or explained.

import { mulberry32 } from '../ascii/prng';

// Each scene declares its own canvas dims (cols × rows × rowPx). The
// IntroScene reads them per phase to size the stage; mobile-first design
// means animated scenes are portrait, dense flashbacks are taller still.
export const FRAMES = 15;

export interface SceneDims {
  cols: number;
  rows: number;
  rowPx: number;
}

// Camp scene (dawn / kindle / named) — animated, layered, present-day.
// Portrait 50×80 fits modern phones cleanly; vertical room lets the hearth
// fire & smoke rise dramatically through the composition.
export const CAMP_DIMS: SceneDims = { cols: 50, rows: 80, rowPx: 14 };

// Mirror leak (flashback 2) — dense static reproduction matching the Rio
// flashback's woodcut style (115 cols, slightly shorter at 103 rows).
export const MIRROR_DIMS: SceneDims = { cols: 115, rows: 103, rowPx: 14 };

// Rio Miyake (flashback 1) — dense density-mapped reproduction.
export const RIO_DIMS: SceneDims = { cols: 115, rows: 109, rowPx: 14 };

// Internal aliases so each section's loops stay readable. Mirror & Rio are
// static density-mapped arrays now — they don't need short aliases.
const C_COLS = CAMP_DIMS.cols;
const C_ROWS = CAMP_DIMS.rows;

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
// SKY — stars (twinkling) and the sky-bow (Earth ring). Portrait camp.
// Sky region is rows 0..27; mountains begin at row 28.
// ---------------------------------------------------------------------------

// Sky-bow cell occupancy — diagonal across the upper sky. Computed early so
// STAR_POSITIONS can filter out any star that would land on the band.
const SKY_BOW_START_ROW = 2;
const SKY_BOW_END_ROW   = 16;
const SKY_BOW_SLOPE     = (SKY_BOW_END_ROW - SKY_BOW_START_ROW) / (C_COLS - 1);

const SKY_BOW_CELLS: Set<string> = (() => {
  const cells = new Set<string>();
  for (let c = 0; c < C_COLS; c++) {
    const base = SKY_BOW_START_ROW + SKY_BOW_SLOPE * c;
    const r0 = Math.floor(base) - 1;
    const r1 = Math.floor(base);
    const r2 = Math.floor(base) + 1;
    if (r0 >= 0 && r0 < C_ROWS && c % 3 === 0) cells.add(`${r0},${c}`);
    if (r1 >= 0 && r1 < C_ROWS)                cells.add(`${r1},${c}`);
    if (r2 >= 0 && r2 < C_ROWS && c % 2 === 0) cells.add(`${r2},${c}`);
  }
  return cells;
})();

// Stars scattered through the sky region. Each row gets ~2 stars at varied
// columns; stars overlapping the sky-bow band are filtered out so the band
// reads as a clean diagonal.
const STAR_POSITIONS_RAW: ReadonlyArray<readonly [number, number]> = [
  [0, 5],  [0, 22], [0, 38],
  [1, 14], [1, 31], [1, 45],
  [2, 9],  [2, 26], [2, 42],
  [3, 17], [3, 35], [3, 48],
  [4, 4],  [4, 22], [4, 39],
  [5, 12], [5, 30], [5, 46],
  [6, 7],  [6, 25], [6, 42],
  [7, 16], [7, 34], [7, 49],
  [8, 3],  [8, 20], [8, 38],
  [9, 11], [9, 29], [9, 46],
  [10, 6], [10, 24], [10, 40],
  [11, 14], [11, 32], [11, 48],
  [12, 8], [12, 27], [12, 43],
  [13, 18], [13, 36],
  [14, 4], [14, 22], [14, 41],
  [15, 12], [15, 30], [15, 46],
  [16, 7], [16, 25], [16, 39],
  [17, 16], [17, 33], [17, 47],
  [18, 5], [18, 22], [18, 41],
  [19, 12], [19, 30], [19, 45],
  [20, 8], [20, 27], [20, 43],
  [21, 17], [21, 34], [21, 48],
  [22, 4], [22, 21], [22, 39],
  [23, 13], [23, 31], [23, 46],
  [24, 9], [24, 26], [24, 42],
  [25, 18], [25, 36],
  [26, 6], [26, 24], [26, 40]
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
  const grid = blank(C_ROWS, C_COLS);
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
  const grid = blank(C_ROWS, C_COLS);
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
  const grid = blank(C_ROWS, C_COLS);
  for (let i = 0; i < STAR_POSITIONS.length; i++) {
    if (starBrightness(i, t) > STARS_BRIGHT_THRESHOLD) {
      const [r, c] = STAR_POSITIONS[i];
      grid[r][c] = '*';
    }
  }
  return gridToArt(grid);
});

// Sky-bow art — Earth ring crossing the sky as a clear diagonal slope from
// upper-left to lower-right. The protagonist's culture calls it the "long
// road"; the player infers what it actually is.
export const SKY_BOW: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  for (const cell of SKY_BOW_CELLS) {
    const [r, c] = cell.split(',').map(Number);
    grid[r][c] = '.';
  }
  return gridToArt(grid);
})();

// ---------------------------------------------------------------------------
// LAND — far mountains, near foothills (with yellowed-tree glyphs), ground.
// Portrait: horizon at row 28; foothills at rows 31-34; ground at row 78.
// ---------------------------------------------------------------------------

const MOUNTAINS_FAR_ART = [
  '      ___          _____            ___       ',
  '  ___/   \\___    _/     \\___    ___/   \\__    ',
  '_/            \\__/           \\__/            \\_'
];

const MOUNTAINS_NEAR_ART = [
  '                                              ',
  '   *          *               *           *   ',
  ' ,_*_,    ,_*_*_,         ,_*_,        ,_*_,  ',
  '/      __/      \\___    _/     \\__   _/     \\_'
];

export const MOUNTAINS_FAR: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  placeBlock(grid, MOUNTAINS_FAR_ART, 28, 1);
  return gridToArt(grid);
})();

export const MOUNTAINS_NEAR: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  placeBlock(grid, MOUNTAINS_NEAR_ART, 31, 1);
  return gridToArt(grid);
})();

// Ground line + faint scatter at the very bottom of the canvas.
export const GROUND: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  grid[C_ROWS - 2] = '~'.repeat(C_COLS).split('');
  const r = mulberry32(29);
  for (let c = 0; c < C_COLS; c++) {
    if (r() < 0.15) grid[C_ROWS - 1][c] = '.';
    else if (r() < 0.25) grid[C_ROWS - 1][c] = ',';
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
  const grid = blank(C_ROWS, C_COLS);
  // Sleeping figures scattered around the camp. Positioned around the
  // hearth so they don't overlap the tender/apprentice positions which
  // appear in kindle/named phases.
  placeBlock(grid, SLEEPING_RIGHT, 70, 1);
  placeBlock(grid, SLEEPING_RIGHT, 73, 4);
  placeBlock(grid, SLEEPING_LEFT,  70, 41);
  placeBlock(grid, SLEEPING_LEFT,  73, 38);
  return gridToArt(grid);
})();

export const TENDER: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  // Left of the Hearth cart (cart spans cols 16-32). Stands on ground.
  placeBlock(grid, TENDER_FIGURE, 67, 9);
  return gridToArt(grid);
})();

export const APPRENTICE: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  // Right of the Hearth cart. Reaching-arm glyph (/|.) points toward the
  // new Cinder vessel that appears one row down at col 38+.
  placeBlock(grid, APPRENTICE_FIGURE, 67, 35);
  return gridToArt(grid);
})();

// ---------------------------------------------------------------------------
// HEARTH — the tribe's central never-extinguished fire, riding in a bronze
// cart. Portrait: cart at row 64, tall flames (12 rows) rise into the
// middle of the canvas, smoke drifts higher still.
// ---------------------------------------------------------------------------

const HEARTH_CART_ART = [
  '   _____________   ',
  '  [|           |]  ',
  '  [|___________|]  ',
  '  [/  O     O  \\]  '
];

const HEARTH_CART_COL = 16; // cart left edge → spans cols 16..34
const HEARTH_CART_ROW = 64; // cart top row

export const HEARTH_CART: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  placeBlock(grid, HEARTH_CART_ART, HEARTH_CART_ROW, HEARTH_CART_COL);
  return gridToArt(grid);
})();

// Hearth fire — taller and slimmer than landscape: 12 rows × 11 cols. Fire
// bottom sits one row above the cart (row 63); flames rise to row 52.
const HEARTH_FIRE_ROWS = 12;
const HEARTH_FIRE_COLS = 11;
const HEARTH_FIRE_BOTTOM = HEARTH_CART_ROW - 1;          // row 63
const HEARTH_FIRE_TOP    = HEARTH_FIRE_BOTTOM - HEARTH_FIRE_ROWS + 1; // row 52
const HEARTH_FIRE_COL    = HEARTH_CART_COL + 4;          // centered above cart

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

export const HEARTH_FIRE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  placeBlock(grid, makeHearthFireArt(t), HEARTH_FIRE_TOP, HEARTH_FIRE_COL);
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// CINDER — the apprentice's small personal vessel + its kindling fire.
// Portrait: vessel right of the apprentice (cols 38-42), fire grows above.
// ---------------------------------------------------------------------------

const CINDER_VESSEL_ART = [
  '[___]',
  ' \\_/ '
];

const CINDER_VESSEL_ROW = 70;
const CINDER_VESSEL_COL = 38;

export const CINDER_VESSEL: string[] = (() => {
  const grid = blank(C_ROWS, C_COLS);
  placeBlock(grid, CINDER_VESSEL_ART, CINDER_VESSEL_ROW, CINDER_VESSEL_COL);
  return gridToArt(grid);
})();

const CINDER_FIRE_ROWS = 3;
const CINDER_FIRE_COLS = 5;
const CINDER_FIRE_BOTTOM = CINDER_VESSEL_ROW - 1; // row 69
const CINDER_FIRE_TOP    = CINDER_FIRE_BOTTOM - CINDER_FIRE_ROWS + 1; // row 67

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

export const CINDER_FIRE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  placeBlock(grid, makeCinderFireArt(t, 0.6), CINDER_FIRE_TOP, CINDER_VESSEL_COL);
  return gridToArt(grid);
});

export const CINDER_KINDLE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  const intensity = Math.min(0.6, (t / (FRAMES - 1)) * 0.6);
  placeBlock(grid, makeCinderFireArt(t, intensity), CINDER_FIRE_TOP, CINDER_VESSEL_COL);
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// HEARTH SMOKE — drifting particles above the Hearth fire. Portrait gives
// far more vertical room: smoke rises 18 rows from above the fire (row 51)
// up into the sky region (~row 33).
// ---------------------------------------------------------------------------

const HEARTH_SMOKE_STREAMS = [
  { col: 19, drift: -0.30, period: 22, chars: "'~ " },
  { col: 21, drift: -0.15, period: 18, chars: "~. " },
  { col: 23, drift:  0.15, period: 20, chars: "'~." },
  { col: 24, drift:  0.05, period: 17, chars: "'." },
  { col: 25, drift:  0.30, period: 23, chars: "~'.~" },
  { col: 26, drift:  0.00, period: 16, chars: "'~" },
  { col: 27, drift:  0.40, period: 19, chars: "'~." },
  { col: 29, drift: -0.10, period: 21, chars: "'~. " },
  { col: 31, drift: -0.25, period: 22, chars: "~." }
];

const HEARTH_SMOKE_BASE_ROW = HEARTH_FIRE_TOP - 1; // row 51 (just above fire)
const HEARTH_SMOKE_HEIGHT = 18;

export const HEARTH_SMOKE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  for (let i = 0; i < HEARTH_SMOKE_STREAMS.length; i++) {
    const s = HEARTH_SMOKE_STREAMS[i];
    const phase = (t + i * 3) % s.period;
    if (phase >= HEARTH_SMOKE_HEIGHT) continue;
    const row = HEARTH_SMOKE_BASE_ROW - phase;
    const col = Math.floor(s.col + phase * s.drift);
    if (col < 0 || col >= C_COLS || row < 0) continue;
    const ch = s.chars[phase % s.chars.length];
    if (ch !== ' ') grid[row][col] = ch;
  }
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// HEARTH EMBERS — bright sparks rising above the fire. Brighter, rise less
// than smoke (10 rows vs 18). Origins clustered around the fire's apex.
// ---------------------------------------------------------------------------

const HEARTH_EMBER_SPARKS = [
  { col: 22, drift:  0.25, period: 13, chars: "*'." },
  { col: 23, drift: -0.15, period: 15, chars: "*'." },
  { col: 24, drift: -0.05, period: 16, chars: "*'." },
  { col: 25, drift:  0.30, period: 12, chars: "*'." },
  { col: 26, drift:  0.15, period: 14, chars: "*'." },
  { col: 27, drift: -0.20, period: 17, chars: "*'." },
  { col: 28, drift: -0.05, period: 11, chars: "*'." },
  { col: 29, drift:  0.35, period: 18, chars: "*'." }
];

const HEARTH_EMBER_BASE_ROW = HEARTH_FIRE_TOP; // row 52
const HEARTH_EMBER_HEIGHT = 10;

export const HEARTH_EMBER_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  for (let i = 0; i < HEARTH_EMBER_SPARKS.length; i++) {
    const s = HEARTH_EMBER_SPARKS[i];
    const phase = (t + i * 4) % s.period;
    if (phase >= HEARTH_EMBER_HEIGHT) continue;
    const row = HEARTH_EMBER_BASE_ROW - phase;
    const col = Math.floor(s.col + phase * s.drift);
    if (col < 0 || col >= C_COLS || row < 0) continue;
    const ch = s.chars[Math.min(phase, s.chars.length - 1)];
    if (ch !== ' ') grid[row][col] = ch;
  }
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// CINDER SMOKE — small smoke trail above the apprentice's vessel
// ---------------------------------------------------------------------------

const CINDER_SMOKE_STREAMS = [
  { col: 40, drift: 0.20, period: 8,  chars: "'." },
  { col: 39, drift: 0.35, period: 10, chars: "'.~" }
];

const CINDER_SMOKE_BASE_ROW = CINDER_FIRE_TOP - 1; // row 66
const CINDER_SMOKE_HEIGHT = 5;

export const CINDER_SMOKE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  for (let i = 0; i < CINDER_SMOKE_STREAMS.length; i++) {
    const s = CINDER_SMOKE_STREAMS[i];
    const phase = (t + i * 3) % s.period;
    if (phase >= CINDER_SMOKE_HEIGHT) continue;
    const row = CINDER_SMOKE_BASE_ROW - phase;
    const col = Math.floor(s.col + phase * s.drift);
    if (col < 0 || col >= C_COLS || row < 0) continue;
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
  { row: C_ROWS - 1, period: 14, drift: 1, startCol: 0  },
  { row: C_ROWS - 1, period: 11, drift: 1, startCol: 18 },
  { row: C_ROWS - 2, period: 16, drift: 1, startCol: 35 }
];

export const BREEZE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  for (const p of BREEZE_PARTICLES) {
    const phase = (t + p.startCol) % p.period;
    const col = (p.startCol + phase * p.drift) % C_COLS;
    if (col >= 0 && col < C_COLS) grid[p.row][col] = '~';
  }
  return gridToArt(grid);
});

// ---------------------------------------------------------------------------
// FLASHBACK 1 — Miyake-class CME spiral over Rio. Density-mapped ASCII
// reproduction of rj_miyake3.png at portrait 115×109. Single-layer static
// art (no parametric generation): the glyph ramp `@`/`%`/`#`/`+`/`=`/`*`/
// `:`/`.`/`-`/space encodes pixel intensity directly. Short rows are padded
// at module load so every line is exactly RIO_DIMS.cols wide.
// ---------------------------------------------------------------------------

export const RIO_MIYAKE: string[] = [
  '@@@@@@@@@...........@@@@@@@@@@@@@@@@@@@@@@@@.............@@@.....@@@@@@@@@@@@@@@@@@@@@@..... ..........*@@@@@@@@@@@',
  '@@@@@@@@@@...........@@@@@@@@@@@@@@@@@@@@@@@@............@@:....@@@@@@@@@@@@@@@@@@@@@................@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@..........@@@@@@@@@@@@@@@@@@@@@@@............@@....@@@@@@@@@@@@@@@@@@@.@..............@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@..........@@@@@@@@@@@@@@@@@@@@@@@...........*-. ..@@@@@@@@@@@@@@@@@@.*........... .@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@.........@@.@@@@@@@@@@@@@@@@@@@...........:....@@@@@@@@@@@@@@@@@..............+@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@%@@.... ... @:.@@@@@@@@@@@@@@@@@@:..............@@@@@@@@@@@@@@@@@.............%@@@@@@@@@@@@@@@@@@@@@@@',
  ':@@@@@@@@@@@@@@.=+........=..@@@@@@@@@@@@@@@@@@... ... ......@@@@@@@@@@@@@@@@.........  .@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '...@@@@@@@@@@@@@..............@@@@@@@@@@@@@@@@@.............@@@@@@@@@@@@@@@@...........@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '....:@@@@@@@@@@@@@.............@@@@@@@@@@@@@-@@....... . @..@@@@@@@@@@@@@@@..........*@@@@@@@@@@@@@@@@@@@@@@@@=....',
  '......:@@@@@@@@@@@@@.... .......@@@@@@@@@@@@@.@*.........@.#@@@@@@@@@@@@@@.. .......@@@@@@@@@@@@@@@@#..@@@*........',
  '....... .@@@@@@@@@@@@...........:@@@@@@@@@@@@..@........:@.@@@@@@@@@@@@@@.........@@@@@@@@@@@@@@@-. .@@............',
  '...........@@@@@@@@@@@@........ .#@@@@@@@@@@@@..........#@*@@@@@@@@@@@@@......=.#@@@@@@@@@@@@@#....................',
  '............:@@@@@@@@@@@@.........@@@@@@@@@@@@..........@@@@@@@@@@@@@@@......@@@@@@@@@@@@@@@.......... ........ ...',
  '.. ...........@@@@@@@@@@=*......@..@@@@@@@@@@@@.........@@@@@@@@@@@@@@.... .@@@@@@@@@@@@@@....... .. .......%@@@@@@',
  '@..... .....-@@@@@@@@@@@@@.......@@.@@@@@@@@@@@.........@@@@@@@@@@@@@......@@@@@@@@@@@@@...........@@:.@@@@@@@@@@@@',
  '@@@=..........*@@@@@@@@@@@@+.. ...@@@@@@@@@@@@@:........@@@@@@@@@@.@@.....@@@@@@@@@@@#.........@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@..... ....*@@@@@@@@@@@@......@@@@@@@@@@@@@........@@@@@@@@@%.@ ....@@@@@@@@@.*.......#@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@.........*@@@@@@@@@@@- ....@@@@@@@@@#@#........@@@@@@@@@......:@@@@@@@@. ......-@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@-........*@@@@@@@@@@@.....@@@@@@@@@.*......*.@@@@@@@@@......@@@@@@@.... .@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@........+@@@@@@@@@@.. ..@@@@@@@@@.......@.@@@@@@@@......@@@@@@@.....@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@%...........@@@@@@#%@.....@@@@@@@@.......@@@@@@@@@@.....@@@@@@.....@@@@@@@@@..@@@@@+..........==@@@@@@',
  '@@@@@@@@@@@@@@@@..........+@@@@@@.......@@@@@@@@......@@@@@@@@@.....@@@@@@....@@@@@@@.......... .............%@@@@@',
  '@@@@@@@@@@@@@@@@@@+......@@@@@@@@@.....@#@@@@@@@......@@@@@@@@@....@@@@@#...-@@%@%...............................+@',
  '..#@@@@@@@@@@@@@#:@@@. ....@@@@@@@@.....@@@@@@@@=.....@@@@@@@@....+@@@=....%@................+%%*..................',
  '.....@@@@@@@@@@@@@@.. .......@@@@@@@....:@@@@@@@@.....@@@@@@@% ...@@@:. ..@.......-..-@@@@@@@@@@@@@@@@*............',
  '.....@@#@@@@@@@@@@@@@-.........@@@@@@....@@@@@@@@.....@@@@@@.....@@@...........@@#@@@@@@@@@@@@@@@@@@@@@@@@@........',
  '........@@@@@@@@@@@@@@@@.........@@@@@....+@@@@@-#....@@@@@@....@@@.........*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.....',
  '...........@@@@@@@@@@@@@@@.... .. @@.@@....@@@@@@.....@@@@@@....@@-. .....@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.% ..',
  '@@@=..........@@@@@@@@@@@@@@@.......@.-@...=@@@@@....#@@@@@... @@.......@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@% ..',
  '@@@@@@@..........@@@@@@@@@@@@@@.........=...@@@@@@...@@@@@@....@.....@@@@@@@@@@@@@@@.............@@@@@@@@@@@@@@@@..',
  '@@@@@.#%@@..........@@@@@@@@@@@@@............@@@@@...@@@@@@...@.. ..@@@@@@@@@@@@...................*.@@@@@@@@@@@@..',
  '@@@@@@@@-.  .........:@@@@@@@@@.:@@..........%@@@@...@@@@@........@@@@@@@@.@=. ....::%@@@%#...........@@@@@@@@@@@@.',
  '@@@@@@@@@@@@............#@@@@@@@@.........:@..@@@+@..@@@#@.......@@@@@@@.......%@@@@@@@@@@@@@@.-........@@@@@@@@@@.',
  '@@@@@@@@@@@@@@@.. .........@@@@@@@@........:@@.@@@...@@@.+... .#@@@@@@.. .@+@@@@@@@@@@@@@@@@@@@@@..... ..@@@@@@@@@.',
  '@@@@@@@@@@@@@@@@@@...........:@@@@@@@.......-@@@@@...@@@......@@@@@@:..*@@@@@@@@@@@@@@@@@@@@@@@@@@+......@@@@@@@@@.',
  '@@@@@@@@@@@@@@@-...:#...........@@@@@@@:......@@@@@...@@.... %@@@@@..%@@@@@@@@@@@@%@@@@@@@@@@@@@@@@+.....@@@@@@@@@.',
  '..+@@@@@@@@@@@@@@@@...........@@@@@@@@@@......@@@@...@@.. ..@@@-..:@@@@@@@@...++#%@@@@@@@@@@@@@@@@:.....@@@@@@@@..',
  '.......@@@@@@@@@@@@@@@@..........@@@@@@@@+@.....@@@*..@*....@@@+.@@@@@@@*...............@@@@@@@@@@@@....#@@@@@@@@.',
  '........::=@@@@@@@@@@@@@-..... ....%@@@@@@@:.....@@@..-....@@@@.@@@@@.. ..++@@@@%......:@%%@@@@@@@@@....@@@@@@@:...',
  '..........@@@@@@@@@@@@@@@@@@:.........@@@@@@@.....%@.......@@@.@@@@....+@@@@@@@@@@@@=....@@@@@@@@@@:...#@@@@@@@ ...',
  '..............+@@@@@@@@@@@@@@@@@........@@@@@@@....=@.....@@@.@@@@...@@@@@@@@@@@@@@@@@... @@@@@@@@@.  .@@@@@@@.....',
  '.. ................@@@@@@@@@@@@@@@@:......-@@@@@. ........@@@@@@...@@@@@%..*@@@@@@@@@@.....@@@@@%@...+@@@@@@@......',
  '@@@@@#...... ....... ..@@@@@@@@@@....=....+..@@@@+........@@=@@# .@. . .....:@@@@@@@@@. ..@@@@@@@%..%@@@@@@@......@',
  '@@@@@@@@@@@@@%........:@@@@@@@@@@@@@........@@@@@@@......#@@@@@.....-@+#.....@@@@@@@@%....@@@@@:@..@@@@@@@@......@@',
  '@@@@@@@:................@@@@@@@@@@@@@@@@.......@@@@@:.....@@@@....@@@@@@@@....%@@@@@@.....@@@@.@@+@@@@@@@......%@@@',
  '@@@@@@@@@@@@@@%...... .... ..:@@@@@@@@@@@@@*......@@@*....@@@@..:@....-@@@@...*@@@@@@....@@#@-@@@@@@@@@@.....+@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@=...........:@@@@@@@@@@@......+@...@@@@...%@.@@..@@@....@@@@:....=@.@@@@@@@@@@.*.....@-@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*........=@@@@@@@%..........:@@*.....@...@@@...-@@@@.......@@@@@@@@@@........@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:...............:@@@%=........%@@@@@*...@@@...@@@@@.......@@@@@@@@@........@@@@@@@@@',
  '......  .. ......%@@@@@@@@@@@@@@@@@@@@@@@@%:..... .................. .%@@...@@@@%.......@@@@@@@@@:......@@@@@@@@@@@',
  '............=%%%@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@%@@%#-............ ...@%@=. .#@@@@......@@@@@@@@@@......@@@@@@@@@@@@@',
  '.................. .. ............#@@@@@@@@@@@@@@@@@@@@@@@+-....:%@@@.. ..@@@@:. ...:@@@@@@@@@.... .@@@@@@@@@@@@..',
  '................................+@@@@@@@@@@@@@=@@@@:........@@@@@@@% ..#=@@@@..  ..%@@@@@@@@.....:@@@@@@@@@@@@@@+..',
  '%%%%%%%%%%%%%... ...:@%%%%%%%%%%@%%@%%@..............:.@@@@@@@@%@*...%%@@@@:......@@@@@@@@... .@@@@@@@@@@@@@@*.....',
  '%%%%%%%%%%....:@%%%%%%%%%%%%%%##%=.. .. ........+%@@@@@@@@@@%@.. ..%@@@@@:......@@@@@@@%.........@@@@@@@@@.........',
  '%%%%%%%%%%%%%%%%%%%%%%%##%............ .:%%%%%@%@@@@@@@@@@%......@%@@@%@......@@@@@@%... .... @@@@@@@@@............',
  '%%%%%%%%%%%%%%%%%%%%%%%.............#%%%%%%%%%%%%%%%@%%*%......*%@%%%%......*%@@@@%. ......%@@@@@@@@@@%%........ .#',
  '%%%%%%%%%%%%%%%#:%%........... ..%%#%%%%%%%%%%.%%%%%@......:.%%%%%%%.......@%@@@%%......@%%%%%%%@%%%%.........:@@@@',
  '%%%%%%%#####+.... ...........:..+#%%%%%%%-%..%%%%%. ... .%.%%%%%%%......=%%%%%%@.. ...:%%%%%%%%%%%.........%%%%%%%@',
  '########*...........@........####%%###-....###%%......#%%%%%%%%%......#%%%%%%......=%%%%%%%%%%#.........:%%%%%%%%%%',
  '######.........:+@@@@@@@@%.*#######*.....####:.... .%%%%%%%%%%......#%%%%%%.+%..%%%%%%%%%%%.... ....#%%%%%%%%%%%%%%',
  '**#+...............@@@..=+*#####*. ....:*##......=#%%%%%%%=%.. ...%%%%%%=%%*#%%%%*%%%%%%...... .:%%%%%%%%%%%%%%%%%%',
  '*................==@@%-+**#**#*.......**-.......########.......:##%%#%%%#%%%%%%%%%###.............:%%%%%%%%%%%.....',
  '..............***+=@@@++*****........+.......*########.......=#-.#############*#*........ ....*##############... ..',
  '............++++++.@@#+++*+........-......**######*+..........:*#######******+. ..........##############...........',
  '.. .. .*+:**+==-++*@@@.:+......... .....*********+..........**********=:**............***###############...........',
  '.....******+-..=++@@@@*...............+*****:.*:.........=+********..............-********##*#*#***.............-##',
  '..+**++++++....:@@@@@@@@@...........+++++*............+********:.................***********+......... ............',
  '++++++++=....@@@@@@@@@@@@@........+++++.............*********... ...........:****************+........  ......#####',
  '+++==.=....@@@@@@@@@@@@@@@@... .====....... .....=+++++..+..............++********++++.......................*#####',
  '==-.......@@@@@@@@@@@@@@@@@...---........... ..====................-+++++++++++==:........ ..........*+*********###',
  '-.....%@@@@@@@@@@@@@@@@@@@@..:-.............:---.................:==========++:...............-=++++++++++++++****=',
  '....:@@@@@@@@@@@@@@@@@@@@@@@......... ....--.................=-----....=..........  ...+======-----======:..:=+++++',
  '...#@@@@@@@@@@@@@@@@@@@@@@@@%...........:.................::...................:========----:..#:.........:--======',
  '..#@@@@@@@@@@@@@@@@@@@@@@@@@@............................................:...................@@@@@@................',
  '=@@@@@@@@@@@@@@@@@@@@@@@@@@@@............................................... ...............@@@@@@@@-......... ....',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.=+++++++++++++++++-.......=+-+++-..:...=-.+++...:+...........@@@@@@@@@@-.............',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.=+++++++++++++%%%%%+#%%%%%%#+++++++*#####++++****+*++++=--.@@@@@@@@@@@@.-==+++++++++',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:==++++++++++%%%%%%%%%%%%%%%%%%###############=======+++=:.@@@@@@@@@@@@@@.:-=++=**#*#',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.*##+++++%%%%%%%%%%%%%%%%%%%%%%%%===+++++*+****++..... ...@@@@@@@@@@@@@@%......@%%%%',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%....-%%%%%%%%%%%%%%%%****+++******===...................@@@@@@@@@@@@@@@@%=.........',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%%%%%%%@..... .......... ...........:@@@@@@@@@@@@@@@@@@@@@@... ..',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+........ . ...............@@@@@@@@...............@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@. ............ ...... .@@@@@@@@@@@%%.. .....%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@......................-#@@@%%%@%%@%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.%@%.............................%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.@@@...%%@................ ...... ........%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.%.@@%........................................*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.%%%@@%%%...........................................:*@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.........................................=%@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@@@%%%..... ..........................................-*@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@%@@%%%%%%%+@@@........@@...............................=@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%@@@@@@@@:....@@........:@@%=................... ....-@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=*........@@@@@@@.....@@........@@@@@.............%%%%.:%%..%%...@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:..@@@@@@@.. +@@@+.......@@@@@.......:%%%%%%%%%%%%%%%%%%%%%',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.@@@@@@@. .#@@@+@@@@#..@@@@@...=%%%%%%%%%%%%%%%%%%%%%@@@%',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@%@@@=@@@@#..@@@@@....@%%%%%%%%%%%%%%%%%%@@@@@%',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=@@@@*.-@@@@@-@@@@....@@@@%%%%%%%%%%@@@@@%',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@=@@@@....@@@@%%%%%@@@@@@@@@@%',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@@@@@@=@@@@@@@@@@@%@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@%@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
].map((s) => s.padEnd(RIO_DIMS.cols, ' '));

// ---------------------------------------------------------------------------
// FLASHBACK 2 — mirror-life leak. Density-mapped ASCII reproduction at
// 115×103, matching the Rio Miyake style: static, monochrome, single-layer
// woodcut. The image-to-ASCII glyph ramp encodes pixel intensity directly.
// ---------------------------------------------------------------------------

export const MIRROR_LEAK: string[] = [
  '..............:**=%#..........................................................................*#%#%#+..............',
  '.............:*=:%#............................................................................:*%*%%+.............',
  '............++*-%%=:=........................................................................:.-*%###*-............',
  '...........++*-%%%*+=**-...................................................................++-.*#%##**-............',
  '...........**:#*..*%%+=%%+..............................................................-*%@=#%**..#%+:-...........',
  '...........*+##.....#@#%#=@%+........................................................:+%@:#%*%-....-%#=*...........',
  '...........+*%#.......:#@@@@@@%+...................................................+#%%%%%@#........##==...........',
  '...........=#%%%%%%#*##+=*#%%%##%*+.............................................+*%%%%%%#+++*==*%%%#*%=-...........',
  '...........=#%........+#%#@+*#--+=%#*-.......................................-*#%-:.:++%%%%#=.......*%#............',
  '...........=#%.................##+@@%#*+...................................+##%@@+%#................-%#............',
  '............#%=+.................:*#-*%**=...............................+###**%*..................=%%+............',
  '............#%*%%%%%%%%%###.######*++==+++*............................-*##=++**######%.###%%%%%%%%###.............',
  '.............#%*%%#####****.#####**#*##@%#=+-.........................=*#%@@###########.#########%%#%*.............',
  '.............*%%#%#.....................#+*+*........................=**###....................:###%*..............',
  '..............*%%***=....................-#+*=.......................++*#:....................#*##%*...............',
  '...............-#%%*#%-==+##%%+=:.:-+**##%=*#+.......................++**%%##%%%#***=+%@%*+-+**#*%+................',
  '.................*%%@####%%*-:...........**#*=.......................+***............-=#%%#####%%:.................',
  '..................+#%#@%%*..............=##-+:.......................*+=**+.............=##%#%%*...................',
  '....................*#%%%@%#:........:=##%=++.........................*+=-#*+:........*%%%%#%#.....................',
  '......................*#%%#%%##*@***#*##+=++..........................=**=.=#*###*%*%@@%%%%#.......................',
  '........................**%@@@@%*.-*##+---#.............................#=:..+**.:*%@@@%%#.........................',
  '..........................:*#%=*++***+=:*................................+*...:+**++%%##...........................',
  '.............................*=+*##*+-+....................................*+..:-+*+*=.............................',
  '............................=+####*=*#*-...................................=#*+:-+*##+*............................',
  '.........................=-*#####+*#@@%#*:...............................=##@@@**=*####*+..........................',
  '.......................+.*#%%##*#...*:*#+#*.............................*##%#+*...**##%%%#+........................',
  '.....................=.+#%%#%*=.......**###*..........................:###*+*......:%*##%%%#=......................',
  '...................-.:###%##%%%%%@%%%%#%#*+#*.........................*#@##%%%%##@%%###*#%%%%=-....................',
  '..................-.+**##%...............%#*#+.......................+*%#%..............+*%%%%%.*..................',
  '................=:==:+#%..................=#**......................:**=*.................-#%%%%*+.................',
  '...............*++--#%...........:-=+*#######*......................=****#%%##*=-:..........*#%#%%*:...............',
  '..............#=-:##+*****##%%%#@@%%##%%#@%*#*......................-***%%#%%%%%@@%:###*++++++%##*#=-..............',
  '.............**=.#%.......................*#+*.......................***#.......................#%-:...............',
  '............=+*.#=......................%#%:*+.......................++:#*.......................%*.:-.............',
  '............+=-#:..............:-+####**##=**........................-**-=#***###+-:..............%#.=*............',
  '...........-==#%%@@%%#*****@##%%%%%%%*##==**..........................+**=.*#*#%%%%%###%****##%%%%%%#=*............',
  '...........++##....................***+===*.............................*=:::#*#...................=%#*............',
  '...........=*%..................:**##*+-*................................+*:--+#*#..................+#=............',
  '...........+#%=...............#*#%%##=*....................................**-=####*...............=-%+............',
  '...........+##@%%%*++####*##+*%%%%#**........................................***##%%%*+#*#@#%%%%##%#%%*............',
  '............#%**-.........=#%%%%%*#............................................=*#%%%%%#*.........*%#%+............',
  '............*%%**-.....+.#%%%%%**.................................................*#%%%%%*=......#**%#.............',
  '.............#%##-*..+.*%%%%#*......................................................##%%%%#*:..:=*#%%:.............',
  '..............#%@@%=.=###%##..........................................................:*%####=-%%%%%:..............',
  '...............*%%-=#*=##%...............................................................*####*-=%#................',
  '................*=#*:##+*................................................................:=##****=:................',
  '...............*#*:=#*##%%*-...........................................................+*%%####+=#**...............',
  '..............*#+:#%###*++%%#*......................................................:+%%#++##%###:*#*..............',
  '.............+**##.....*%*%@@%%*-.................................................+*%@@@%%%:....%#.=#*.............',
  '............#+*#%.........%%%%*#%*+.............................................+#%%%@%%#.........#+**.............',
  '............*+###**+--::....*#%%##*#*........................................:*#%*#%%#...::-===**#%#***............',
  '...........-##%%#%%%%@@%%%@++*****#@##*....................................:##%@+**##+++@%%%@@@%%%%##=+............',
  '...........=*#:..................%%###*#+.................................+#%@%@@#..................%#+............',
  '...........=##-....................####***..............................+*#%+=*=...................-+#*............',
  '...........:####.....................#%#+**-...........................+##%#++....................=*%#+............',
  '............#%********###%%.%%%%%%%%%%%@%*+*:.........................+**%@%%%%%%#%%%%%*%%%##*#****%%#.............',
  '............:#%*%%......................#*++*........................++*%#+.....................+###%*.............',
  '.............+#%#*#+.....................*=+*=.......................*+**-.....................####%*..............',
  '...............#%+*#*-....................*+*+.......................**+=....................#*##%%+...............',
  '................*%%@#########%*+++++++**##*+#+.......................#**#%#****+*+++*##########%%#.................',
  '..................#%%%@%+.................+*#+.......................+#**................**%@%%#=..................',
  '...................=#%%@@%*-.............+*%*+.......................+*#*#.............*%@@%%#*....................',
  '.....................-#%%%%%%*..........*#%+*........................+++#**..........+%%%@%%*......................',
  '........................#%%****#%*#***=*#+**+.........................**=-#******=%++**@%#+........................',
  '..........................*#%%%%%%-..+*#:+**...........................**=.***..+%%@@@%#:..........................',
  '............................**%%%*%+*#=-=*+.............................*+--:**##*#%%#.............................',
  '...............................***+**+==*................................++===+**=**...............................',
  '...............................#+###*+++..................................+*==+###*:...............................',
  '.............................*+#####++@+#+...............................*%+@***##%%*-.............................',
  '...........................=+#%%##**.*+*=#*............................:*#*#++.**##%%%*+...........................',
  '.........................=+%%%%#*#....-*#+#*..........................:*#*#*.....**#%%%%**.........................',
  '.......................::#%%%%*%...:-===+%*#+.........................*#*##++=-:...**%%%%%+*.......................',
  '.....................:.######*##@*##%#%%%@%*#........................+**%@%%%%%%%%#####%%%##-*.....................',
  '...................+.**####:.............*+**+.......................****..............%#####*:+...................',
  '.................+=+***##.................-*#*.......................***+................#####*++..................',
  '................*+***##...................#*%+.......................**#%..................*#****=+................',
  '...............++***#%%%%#%%%%#@%%%%%@@@@@*#*+.......................+***@@%%%%%%%%#******#%%%#**#*+...............',
  '..............+++*#+=:...................*##*+.......................+*##+...................:+##*#*=..............',
  '.............=++*#......................#%#**........................++-##.......................#***-.............',
  '............-=+#*......................******.........................**.##-......................#**=.............',
  '............=+#%%++===+++*#=###%%%%##%#*-+#*..........................:**:=****######*#.+======+++%%*=:............',
  '............+#%*****######*=%%%%##%#=**=+*#............................:*+-.*+%%%%%%%##.*+++*******+#*-............',
  '............*#*=..................:+**++++...............................*==-++#..................==%#-............',
  '............*#%*#................+###*+*..................................*++**#++...............*#*##.............',
  '............=##@%%%####%.-.....+#%%##+*.....................................**####**.....=*++*##%%%%#*.............',
  '.............*###***..+%****#=#%%#%**........................................+*##%%%*#***#-+-.+*###%*..............',
  '..............-%%####+.....:#%%%%**............................................**#%%%%**....+*###%%*...............',
  '................*%#####-:.#%#%%**................................................**#%%%%*++-*###%#.................',
  '..................*%%%#.*####**....................................................**#%%##+=%%%#...................',
  '....................+.+*###**........................................................+######==.....................',
  '...................-=****##@@%#-...................................................+#%@#####**:*...................',
  '.................*=+++*##*%%#+@%#=...............................................#%%#=%%%###***+=-.................',
  '...............:*+++*#*....:#%%%#%#+...........................................*%%%%%%#.....#*++=-*................',
  '..............**+++##.........*##%###=.......................................+######-.........#*===*...............',
  '.............+*++*#.............*##%+#*....................................=*#%###:............*#==**..............',
  '.............**+#*#####%##%@+**##%%%@%#*=.................................+#*@@%%%#**++%#####*===#***+.............',
  '............=+*#::...::::::::::-=++**#%***::::::::::::...........::::::::*#+%##*++=-::::::::::::.:##++..:::..::....',
  '............-+##*::::::::----------------::::::::::.:.............:::::::----------------:::::::::*%#=::::::::::...',
  '...........::-===-----------::::::::::::::::::::....................:::::::::::::::::::-:---------++=-:::::::::...:',
  '............:::::::::::::::::::::::::::::::............................::::::::::::::::::::::::::::::::::::::.:....',
  '.............:::::::::::::::::::::::::.....................................:::::::::::::::::::::::::::.............',
  '...............::.:............::............................................................:::::::::.............',
  '..............................................................................................:.:::::..............'
].map((s) => s.padEnd(MIRROR_DIMS.cols, ' '));

// ---------------------------------------------------------------------------
// EMBER FALL — a single * glyph traces a path from the Hearth's apex down
// into the apprentice's bronze vessel, kindling the new Cinder. Arc from
// the upper-right of the hearth fire (row 54, col 30) over and down into
// the cinder vessel (row 70, col 40).
// ---------------------------------------------------------------------------

export const EMBER_FALL_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(C_ROWS, C_COLS);
  const u = t / (FRAMES - 1);
  const startRow = 54, startCol = 30;
  const endRow = 70, endCol = 40;
  // Slight upward arc mid-flight (the spark leaps before falling).
  const row = Math.round(startRow + (endRow - startRow) * u + Math.sin(u * Math.PI) * -3);
  const col = Math.round(startCol + (endCol - startCol) * u);
  if (row >= 0 && row < C_ROWS && col >= 0 && col < C_COLS) grid[row][col] = '*';
  return gridToArt(grid);
});
