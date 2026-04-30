// Top-view camp map. The Apprentice walks freely on this grid; the Hearth
// (Elder Fire, big animated bonfire on a stone pit) and Cinder vessel (small
// animated flame in a bronze cup) are the two interactables for Phase 1.

import { mulberry32 } from '../ascii/prng';
import type { SceneDims } from '../intro/scene-art';

export const MAP_DIMS: SceneDims = { cols: 60, rows: 54, rowPx: 14 };
export const FRAMES = 15;
const M_COLS = MAP_DIMS.cols;
const M_ROWS = MAP_DIMS.rows;

// === HEARTH (Elder Fire) ===
// Side-on visual on top-down map (a common convention — top-down "real"
// fire reads as a hot dot, but a side-view fire reads as a fire). 8 rows
// of doom-fire flames rise above a 2-row stone pit.

const HEARTH_FIRE_ROWS = 8;
const HEARTH_FIRE_COLS = 13;
const HEARTH_FIRE_TOP  = 8;                                 // top row of flames
const HEARTH_FIRE_LEFT = 24;                                // left col of flames
const HEARTH_PIT_ROW   = HEARTH_FIRE_TOP + HEARTH_FIRE_ROWS; // row 16

const HEARTH_PIT_ART = [
  ' .ooOoOoOoOo. ',
  '  `         `  '
];
const HEARTH_PIT_LEFT = HEARTH_FIRE_LEFT - 1; // pit slightly wider than fire

// === CINDER (Apprentice's small personal vessel) ===

const CINDER_FIRE_ROWS = 3;
const CINDER_FIRE_COLS = 5;
const CINDER_FIRE_TOP  = 28;
const CINDER_FIRE_LEFT = 28;
const CINDER_VESSEL_ROW = CINDER_FIRE_TOP + CINDER_FIRE_ROWS; // row 31

const CINDER_VESSEL_ART = [
  '[___]',
  ' \\_/ '
];
const CINDER_VESSEL_LEFT = CINDER_FIRE_LEFT;

// === HIT BOXES + APPROACH CELLS ===
// Tap hit-boxes cover the full visible footprint (fire + base) plus a 1-cell
// halo so taps near the fire still register. Approach cells are immediately
// south of each interactable.

export const HEARTH_BOX = {
  rowMin: HEARTH_FIRE_TOP - 1,
  rowMax: HEARTH_PIT_ROW + 1,
  colMin: HEARTH_PIT_LEFT - 1,
  colMax: HEARTH_PIT_LEFT + HEARTH_PIT_ART[0].length
};
export const CINDER_BOX = {
  rowMin: CINDER_FIRE_TOP - 1,
  rowMax: CINDER_VESSEL_ROW + 1,
  colMin: CINDER_VESSEL_LEFT - 1,
  colMax: CINDER_VESSEL_LEFT + CINDER_VESSEL_ART[0].length
};
export const HEARTH_APPROACH = {
  row: HEARTH_BOX.rowMax + 1,
  col: HEARTH_FIRE_LEFT + Math.floor(HEARTH_FIRE_COLS / 2)
};
export const CINDER_APPROACH = {
  row: CINDER_BOX.rowMax + 1,
  col: CINDER_FIRE_LEFT + Math.floor(CINDER_FIRE_COLS / 2)
};

// First-run spawn: just left of the Cinder approach.
export const APPRENTICE_SPAWN = {
  row: CINDER_APPROACH.row,
  col: CINDER_APPROACH.col - 3
};

// === TERRAIN ===
// Static layer: tree perimeter + grass texture + Hearth pit + Cinder vessel.
// The animated fire glyphs render on a separate layer above this.

function blank(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(' '));
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

function buildTerrain(): string[] {
  const grid = blank(M_ROWS, M_COLS);
  const rng = mulberry32(101);

  // Top tree band — two staggered rows of `T` chars
  for (let c = 0; c < M_COLS; c += 4) grid[0][c] = 'T';
  for (let c = 2; c < M_COLS; c += 4) grid[1][c] = 'T';

  // Bottom tree band
  for (let c = 0; c < M_COLS; c += 4) grid[M_ROWS - 1][c] = 'T';
  for (let c = 2; c < M_COLS; c += 4) grid[M_ROWS - 2][c] = 'T';

  // Left/right edges always have a tree; sparse `t` one cell inward.
  for (let r = 2; r < M_ROWS - 2; r++) {
    grid[r][0] = 'T';
    grid[r][M_COLS - 1] = 'T';
    if (r % 5 === 0 && r > 2) {
      grid[r][1] = 't';
      grid[r][M_COLS - 2] = 't';
    }
  }

  // Sparse grass texture in the open interior
  for (let row = 2; row < M_ROWS - 2; row++) {
    for (let col = 2; col < M_COLS - 2; col++) {
      if (grid[row][col] !== ' ') continue;
      const x = rng();
      if (x < 0.025) grid[row][col] = ',';
      else if (x < 0.045) grid[row][col] = '\'';
    }
  }

  // Hearth stone pit (visible ring of stones the bonfire sits in)
  placeBlock(grid, HEARTH_PIT_ART, HEARTH_PIT_ROW, HEARTH_PIT_LEFT);
  // Cinder bronze vessel
  placeBlock(grid, CINDER_VESSEL_ART, CINDER_VESSEL_ROW, CINDER_VESSEL_LEFT);

  return grid.map((row) => row.join(''));
}

export const TERRAIN: string[] = buildTerrain();

// === DOOM-FIRE ALGORITHM ===
// Same heat-propagation algorithm as the intro hearth: seed bottom row with
// max heat, propagate upward with random column shift + cooling, then taper
// width so the flame narrows toward the tip and sways across the loop.

const HEAT_GLYPHS = " ..',**ooo@@";
const MAX_HEAT = HEAT_GLYPHS.length - 1;

function makeFireFrame(t: number, fireRows: number, fireCols: number, seedSalt: number): string[] {
  const rng = mulberry32(t * 17 + seedSalt);
  const seedHeat = MAX_HEAT;

  // Two extra seed rows beneath so the flame base never goes black.
  const heat: number[][] = Array.from(
    { length: fireRows + 2 },
    () => Array(fireCols).fill(0)
  );

  for (let row = fireRows; row < fireRows + 2; row++) {
    for (let c = 0; c < fireCols; c++) {
      heat[row][c] = Math.max(0, seedHeat - Math.floor(rng() * 2));
    }
  }

  for (let row = fireRows - 1; row >= 0; row--) {
    for (let c = 0; c < fireCols; c++) {
      const shift = Math.floor((rng() - 0.5) * 4);
      const srcCol = Math.max(0, Math.min(fireCols - 1, c + shift));
      const cool = Math.floor(rng() * 3);
      heat[row][c] = Math.max(0, heat[row + 1][srcCol] - cool);
    }
  }

  // Flame envelope: narrows toward the tip and sways across the loop.
  const cycle = (t * Math.PI * 2) / FRAMES;
  for (let row = 0; row < fireRows; row++) {
    const fromBottom = (fireRows - 1 - row) / Math.max(1, fireRows - 1);
    const halfWidth = (fireCols / 2) * Math.pow(1 - fromBottom, 0.6);
    const sway = Math.sin(cycle + fromBottom * 4.0) * (0.3 + fromBottom * 1.4);
    const center = fireCols / 2 + sway;
    const denom = Math.max(halfWidth, 0.5);
    for (let c = 0; c < fireCols; c++) {
      const d = Math.abs(c + 0.5 - center) / denom;
      const falloff = Math.max(0, 1 - d * d);
      heat[row][c] = Math.floor(heat[row][c] * falloff);
    }
  }

  return heat.slice(0, fireRows).map((row) =>
    row.map((h) => HEAT_GLYPHS[Math.min(h, MAX_HEAT)]).join('')
  );
}

function placeFireOnGrid(art: string[], row: number, col: number): string {
  const grid = blank(M_ROWS, M_COLS);
  placeBlock(grid, art, row, col);
  return grid.map((r) => r.join('')).join('\n');
}

// Animated frames — each frame is a full-canvas string with the fire art
// placed at the right offset, ready to drop into a single <pre> layer.

export const HEARTH_FIRE_FRAMES: string[] = Array.from({ length: FRAMES }, (_, t) => {
  const art = makeFireFrame(t, HEARTH_FIRE_ROWS, HEARTH_FIRE_COLS, 31);
  return placeFireOnGrid(art, HEARTH_FIRE_TOP, HEARTH_FIRE_LEFT);
});

export const CINDER_FIRE_FRAMES: string[] = Array.from({ length: FRAMES }, (_, t) => {
  const art = makeFireFrame(t, CINDER_FIRE_ROWS, CINDER_FIRE_COLS, 7);
  return placeFireOnGrid(art, CINDER_FIRE_TOP, CINDER_FIRE_LEFT);
});

// === WALKABILITY ===
// Walkable: empty grass cells. Trees, the Hearth pit/box, the Cinder
// vessel/box, and the Hearth/Cinder fire regions are all blocked.

const WALKABLE = new Set([' ', ',', '\'']);

function inBox(r: number, c: number, b: typeof HEARTH_BOX): boolean {
  return r >= b.rowMin && r <= b.rowMax && c >= b.colMin && c <= b.colMax;
}

export function isWalkable(row: number, col: number): boolean {
  if (row < 0 || row >= M_ROWS) return false;
  if (col < 0 || col >= M_COLS) return false;
  if (inBox(row, col, HEARTH_BOX)) return false;
  if (inBox(row, col, CINDER_BOX)) return false;
  return WALKABLE.has(TERRAIN[row][col]);
}

// === INTERACTABLE DETECTION ===
export type InteractableId = 'hearth' | 'cinder';

export function interactableAt(row: number, col: number): InteractableId | null {
  if (inBox(row, col, HEARTH_BOX)) return 'hearth';
  if (inBox(row, col, CINDER_BOX)) return 'cinder';
  return null;
}

export function approachFor(id: InteractableId): { row: number; col: number } {
  return id === 'hearth' ? HEARTH_APPROACH : CINDER_APPROACH;
}
