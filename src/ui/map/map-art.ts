// Top-view camp map. The Apprentice walks freely on this grid; the Hearth
// (Elder Fire) and Cinder vessel are the two interactables for Phase 1. The
// map is bounded by a treeline so the Apprentice can't wander off-canvas.

import { mulberry32 } from '../ascii/prng';
import type { SceneDims } from '../intro/scene-art';

export const MAP_DIMS: SceneDims = { cols: 60, rows: 54, rowPx: 14 };
const M_COLS = MAP_DIMS.cols;
const M_ROWS = MAP_DIMS.rows;

// Hearth (Elder Fire) — 5×7 fire silhouette at the top-center of the camp.
const HEARTH_GLYPH = [
  '   *   ',
  '  *@*  ',
  ' *@@@* ',
  '  *@*  ',
  '   *   '
];
const HEARTH_ROW = 9;
const HEARTH_COL = 27;
const HEARTH_HEIGHT = HEARTH_GLYPH.length;
const HEARTH_WIDTH  = HEARTH_GLYPH[0].length;

// Cinder (the Apprentice's small personal vessel) — 2×5 footprint.
const CINDER_GLYPH = [
  '  ^  ',
  ' [_] '
];
const CINDER_ROW = 30;
const CINDER_COL = 28;
const CINDER_HEIGHT = CINDER_GLYPH.length;
const CINDER_WIDTH  = CINDER_GLYPH[0].length;

// Tap hit-boxes (inclusive). Slightly larger than glyph footprint so taps
// near the fire still register as the intended interactable.
export const HEARTH_BOX = {
  rowMin: HEARTH_ROW - 1,
  rowMax: HEARTH_ROW + HEARTH_HEIGHT,
  colMin: HEARTH_COL - 1,
  colMax: HEARTH_COL + HEARTH_WIDTH
};
export const CINDER_BOX = {
  rowMin: CINDER_ROW - 1,
  rowMax: CINDER_ROW + CINDER_HEIGHT,
  colMin: CINDER_COL - 1,
  colMax: CINDER_COL + CINDER_WIDTH
};

// Walk-to cells (the Apprentice stops here before the dialog opens).
// South side of each interactable, horizontally centered.
export const HEARTH_APPROACH = {
  row: HEARTH_ROW + HEARTH_HEIGHT,
  col: HEARTH_COL + Math.floor(HEARTH_WIDTH / 2)
};
export const CINDER_APPROACH = {
  row: CINDER_ROW + CINDER_HEIGHT,
  col: CINDER_COL + Math.floor(CINDER_WIDTH / 2)
};

// First-run spawn — just left of the Cinder approach so the Apprentice
// starts visibly next to their own flame.
export const APPRENTICE_SPAWN = {
  row: CINDER_APPROACH.row,
  col: CINDER_APPROACH.col - 3
};

// === TERRAIN ===
// Built once at module load: tree perimeter (top/bottom dense, sides sparse)
// + scattered grass texture + Hearth + Cinder glyphs in fixed positions.

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

  // Left/right sparse trees (scattered, not a wall) so the boundary feels
  // organic. Always trees at the very edge cells so nothing escapes.
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

  // Place the Hearth and Cinder vessel (these characters are non-walkable)
  placeBlock(grid, HEARTH_GLYPH, HEARTH_ROW, HEARTH_COL);
  placeBlock(grid, CINDER_GLYPH, CINDER_ROW, CINDER_COL);

  return grid.map((row) => row.join(''));
}

export const TERRAIN: string[] = buildTerrain();

// === WALKABILITY ===
// Walkable cells: empty, grass texture (`,`, `'`). Everything else
// (trees, fire, vessel) blocks movement.
const WALKABLE = new Set([' ', ',', '\'']);

export function isWalkable(row: number, col: number): boolean {
  if (row < 0 || row >= M_ROWS) return false;
  if (col < 0 || col >= M_COLS) return false;
  return WALKABLE.has(TERRAIN[row][col]);
}

// === INTERACTABLE DETECTION ===
// Map a tapped cell to an interactable id, if any. Tap on or near the
// Hearth/Cinder counts; everywhere else returns null.
export type InteractableId = 'hearth' | 'cinder';

function inBox(r: number, c: number, b: typeof HEARTH_BOX): boolean {
  return r >= b.rowMin && r <= b.rowMax && c >= b.colMin && c <= b.colMax;
}

export function interactableAt(row: number, col: number): InteractableId | null {
  if (inBox(row, col, HEARTH_BOX)) return 'hearth';
  if (inBox(row, col, CINDER_BOX)) return 'cinder';
  return null;
}

export function approachFor(id: InteractableId): { row: number; col: number } {
  return id === 'hearth' ? HEARTH_APPROACH : CINDER_APPROACH;
}
