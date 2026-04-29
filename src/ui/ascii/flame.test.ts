import { describe, it, expect } from 'vitest';
import { procFlame, computeFlameLayers, TOTAL_ROWS } from './flame';

function nonBlankCharCount(s: string): number {
  return s.replace(/[\s\[\]'`-]/g, '').length;
}

describe('Doom-fire Cinder', () => {
  it('renders a fixed canvas of TOTAL_ROWS rows for any vitality', () => {
    for (const vitality of [0, 5, 30, 50, 80, 100]) {
      const out = procFlame({ vitality, tick: 0 });
      expect(out.split('\n').length).toBe(TOTAL_ROWS);
    }
  });

  it('vessel appears in the last two rows', () => {
    const out = procFlame({ vitality: 50, tick: 0 });
    const lines = out.split('\n');
    expect(lines[TOTAL_ROWS - 2]).toContain('[');
    expect(lines[TOTAL_ROWS - 1]).toContain("'");
  });

  it('higher vitality produces meaningfully more flame characters', () => {
    let totalBright = 0, totalEmber = 0;
    for (let t = 0; t < 30; t++) {
      totalBright += nonBlankCharCount(procFlame({ vitality: 100, tick: t }));
      totalEmber  += nonBlankCharCount(procFlame({ vitality: 5,   tick: t }));
    }
    expect(totalBright).toBeGreaterThan(totalEmber * 2);
  });

  it('exposes four fire zones plus vessel', () => {
    const layers = computeFlameLayers({ vitality: 80, tick: 0 });
    expect(layers).toHaveProperty('sparks');
    expect(layers).toHaveProperty('amber');
    expect(layers).toHaveProperty('orange');
    expect(layers).toHaveProperty('red');
    expect(layers).toHaveProperty('vessel');
    for (const layer of [layers.sparks, layers.amber, layers.orange, layers.red, layers.vessel]) {
      expect(layer.split('\n').length).toBe(TOTAL_ROWS);
    }
  });

  it('sparks zone is empty at very low vitality (no heat reaches the top)', () => {
    const layers = computeFlameLayers({ vitality: 5, tick: 0 });
    expect(nonBlankCharCount(layers.sparks)).toBe(0);
  });

  it('vessel layer always carries the bronze pot in the bottom rows', () => {
    for (const vitality of [0, 50, 100]) {
      const layers = computeFlameLayers({ vitality, tick: 0 });
      const vesselLines = layers.vessel.split('\n');
      expect(vesselLines[TOTAL_ROWS - 2]).toContain('[');
      expect(vesselLines[TOTAL_ROWS - 1]).toContain("'");
    }
  });

  it('flames at the same tick + vitality are deterministic', () => {
    const a = procFlame({ vitality: 60, tick: 7 });
    const b = procFlame({ vitality: 60, tick: 7 });
    expect(a).toBe(b);
  });
});
