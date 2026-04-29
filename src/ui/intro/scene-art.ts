// Intro scene ASCII art.
//
// Present-day only. The world is what the apprentice has always known —
// every visible anomaly (sky-bow overhead, yellowed trees, red dawn sun,
// the Hearth riding in its bronze cart) is just normal. Nothing about
// "before" is shown or explained.

import { mulberry32 } from '../ascii/prng';

export const COLS = 64;
export const ROWS = 22;
export const ROW_PX = 14;
export const FRAMES = 15;

function blank(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(' '));
}

function gridToArt(grid: string[][]): string[] {
  return grid.map((r) => {
    const s = r.join('');
    return s.length >= COLS ? s.slice(0, COLS) : s + ' '.repeat(COLS - s.length);
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
  // Sleeping figures scattered around the camp
  placeBlock(grid, SLEEPING_RIGHT, 16, 5);
  placeBlock(grid, SLEEPING_RIGHT, 18, 11);
  placeBlock(grid, SLEEPING_LEFT,  16, 50);
  placeBlock(grid, SLEEPING_LEFT,  18, 55);
  return gridToArt(grid);
})();

export const TENDER: string[] = (() => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, TENDER_FIGURE, 13, 21);
  return gridToArt(grid);
})();

export const APPRENTICE: string[] = (() => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, APPRENTICE_FIGURE, 13, 38);
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
  placeBlock(grid, CINDER_VESSEL_ART, 17, 39);
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

// Cinder fire frames — for "kindled" steady state
export const CINDER_FIRE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  placeBlock(grid, makeCinderFireArt(t, 0.6), 14, 39);
  return gridToArt(grid);
});

// Cinder kindling frames — the fire grows from spark to small flame
export const CINDER_KINDLE_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  // intensity ramps from 0 to 0.6 over the frame range
  const intensity = Math.min(0.6, (t / (FRAMES - 1)) * 0.6);
  placeBlock(grid, makeCinderFireArt(t, intensity), 14, 39);
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
  { col: 41, drift: 0.20, period: 8,  chars: "'." },
  { col: 40, drift: 0.35, period: 10, chars: "'.~" }
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
// EMBER FALL — a single * glyph traces a path from the Hearth's apex down
// into the apprentice's bronze vessel, kindling the new Cinder.
// ---------------------------------------------------------------------------

// The path is a parametric curve from (row=10, col=36) to (row=16, col=41).
export const EMBER_FALL_FRAMES: string[][] = Array.from({ length: FRAMES }, (_, t) => {
  const grid = blank(ROWS, COLS);
  const u = t / (FRAMES - 1); // 0..1
  // Curve: parabolic arc, falling
  const startRow = 10, startCol = 36;
  const endRow = 16, endCol = 41;
  const row = Math.round(startRow + (endRow - startRow) * u + Math.sin(u * Math.PI) * -1.5);
  const col = Math.round(startCol + (endCol - startCol) * u);
  if (row >= 0 && row < ROWS && col >= 0 && col < COLS) grid[row][col] = '*';
  return gridToArt(grid);
});
