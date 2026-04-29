// Doom-fire Cinder.
//
// Heat propagation: a coal-bed at the bottom seeded with vitality-scaled
// heat, then heat propagates up with random lateral shift + cooling. A
// silhouette taper (power-curve width × sine sway) sculpts the flame into
// a curling teardrop with a dancing apex.
//
// Vitality controls seed heat directly, so the flame grows visibly taller
// and brighter as it's fed, and collapses to coals when neglected.
//
// The flame art is sliced into four vertical color zones (sparks, amber,
// orange, red), composed as separate <pre> layers in CinderView so each
// zone can carry its own color and glow.
//
// Adapted from the mochi IntroScene Doom-fire engine.

import { mulberry32 } from './prng';

export interface FlameOptions {
  vitality: number; // 0..100
  tick: number;
}

const FIRE_ROWS = 8;
const FIRE_COLS = 11;
const HEAT_GLYPHS = " ..',**ooo@@";  // index 0 → blank, max → densest
const MAX_HEAT = HEAT_GLYPHS.length - 1;

export const TOTAL_ROWS = FIRE_ROWS + 2; // fire + 2 vessel rows

const VESSEL_TOP    = '[---------]';
const VESSEL_BOTTOM = " `-------' ";

const SWAY_PERIOD = 15; // ticks per full sine cycle

function blankRow(): string {
  return ' '.repeat(FIRE_COLS);
}

// Compute the fire heat grid for one frame (FIRE_ROWS × FIRE_COLS).
// Vitality 0..100 controls seed heat at the coal-bed.
function makeHeatGrid(tick: number, vitality: number): number[][] {
  const r = mulberry32(tick * 17 + 31);
  const intensity = Math.max(0, Math.min(1, vitality / 100));
  // Floor the seed at 2 when the Cinder is alive so the vessel always shows
  // glowing coals; only a fully dead Cinder (vitality=0) renders blank.
  const seedHeat = vitality === 0
    ? 0
    : Math.max(2, Math.round(MAX_HEAT * intensity));

  const heat: number[][] = Array.from(
    { length: FIRE_ROWS + 2 },
    () => Array(FIRE_COLS).fill(0)
  );

  // Seed coal-bed (2 extra rows below visible fire) with steady high heat
  for (let row = FIRE_ROWS; row < FIRE_ROWS + 2; row++) {
    for (let c = 0; c < FIRE_COLS; c++) {
      heat[row][c] = Math.max(0, seedHeat - Math.floor(r() * 2));
    }
  }

  // Doom-fire propagation upward — each cell cools by 0..2 from a column-
  // shifted neighbor below; lateral shift gives a turbulent feel.
  for (let row = FIRE_ROWS - 1; row >= 0; row--) {
    for (let c = 0; c < FIRE_COLS; c++) {
      const shift = Math.floor((r() - 0.5) * 4);
      const srcCol = Math.max(0, Math.min(FIRE_COLS - 1, c + shift));
      const cool = Math.floor(r() * 3);
      heat[row][c] = Math.max(0, heat[row + 1][srcCol] - cool);
    }
  }

  // Coal-bed floor: ensure the bottom visible row always glows when the
  // Cinder is alive, so neglect dims the flame to coals (not nothing).
  if (vitality > 0) {
    for (let c = 0; c < FIRE_COLS; c++) {
      heat[FIRE_ROWS - 1][c] = Math.max(heat[FIRE_ROWS - 1][c], 2);
    }
  }

  // Silhouette taper: width follows a power curve narrow at the tip,
  // center sways with a sine wave whose phase walks per row → "lick"
  // motion rather than a static teardrop.
  const cycle = (tick * Math.PI * 2) / SWAY_PERIOD;
  for (let row = 0; row < FIRE_ROWS; row++) {
    const fromBottom = (FIRE_ROWS - 1 - row) / (FIRE_ROWS - 1); // 0 base → 1 tip
    const halfWidth = (FIRE_COLS / 2) * Math.pow(1 - fromBottom, 0.6);
    const sway = Math.sin(cycle + fromBottom * 4.0) * (0.4 + fromBottom * 1.6);
    const center = FIRE_COLS / 2 + sway;
    const denom = Math.max(halfWidth, 0.5);
    for (let c = 0; c < FIRE_COLS; c++) {
      const d = Math.abs(c + 0.5 - center) / denom;
      const falloff = Math.max(0, 1 - d * d);
      heat[row][c] = Math.floor(heat[row][c] * falloff);
    }
  }

  return heat.slice(0, FIRE_ROWS);
}

function renderHeat(heat: number[][]): string[] {
  return heat.map(row =>
    row.map(h => HEAT_GLYPHS[Math.min(h, MAX_HEAT)]).join('')
  );
}

// Slice an art array into a row range; outside the range becomes blank
// rows of the same width, so multiple zones can stack without overdrawing.
function zoneRows(art: string[], from: number, toExclusive: number): string[] {
  return art.map((row, i) =>
    i >= from && i < toExclusive ? row : blankRow()
  );
}

function padToTotal(rows: string[]): string[] {
  const out = rows.slice();
  while (out.length < TOTAL_ROWS) out.push(blankRow());
  return out;
}

export interface FlameLayers {
  sparks: string;  // top of fire — yellow/white
  amber:  string;  // upper body
  orange: string;  // mid body
  red:    string;  // base
  vessel: string;  // bronze pot
}

export function computeFlameLayers({ vitality, tick }: FlameOptions): FlameLayers {
  const fireArt = renderHeat(makeHeatGrid(tick, vitality));

  // Four vertical color zones across the fire body
  const sparks = padToTotal(zoneRows(fireArt, 0, 2));
  const amber  = padToTotal(zoneRows(fireArt, 2, 4));
  const orange = padToTotal(zoneRows(fireArt, 4, 6));
  const red    = padToTotal(zoneRows(fireArt, 6, 8));

  // Vessel layer — blank fire rows then the pot at the bottom
  const vesselRows: string[] = Array(FIRE_ROWS).fill(blankRow());
  vesselRows.push(VESSEL_TOP);
  vesselRows.push(VESSEL_BOTTOM);

  return {
    sparks: sparks.join('\n'),
    amber:  amber.join('\n'),
    orange: orange.join('\n'),
    red:    red.join('\n'),
    vessel: vesselRows.join('\n')
  };
}

// Composite all layers into one string — used by tests and by anything that
// wants a single-color rendering. Picks the first non-space character per
// cell from sparks → amber → orange → red → vessel.
export function procFlame(opts: FlameOptions): string {
  const layers = computeFlameLayers(opts);
  const arrays = [layers.sparks, layers.amber, layers.orange, layers.red, layers.vessel]
    .map(s => s.split('\n'));
  const result: string[] = [];
  for (let row = 0; row < TOTAL_ROWS; row++) {
    let line = '';
    for (let col = 0; col < FIRE_COLS; col++) {
      let ch = ' ';
      for (const layerArt of arrays) {
        const c = layerArt[row]?.[col];
        if (c && c !== ' ') { ch = c; break; }
      }
      line += ch;
    }
    result.push(line);
  }
  return result.join('\n');
}
