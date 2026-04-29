import { describe, it, expect } from 'vitest';
import { solarIntensity, solarState, solarSigmaMultiplier } from './solar-weather';

const PERIOD_MS = 3 * 24 * 60 * 60 * 1000;

describe('Solar weather', () => {
  it('intensity stays in [0, 1]', () => {
    for (let i = 0; i < 100; i++) {
      const t = (PERIOD_MS / 100) * i;
      const intensity = solarIntensity(t);
      expect(intensity).toBeGreaterThanOrEqual(0);
      expect(intensity).toBeLessThanOrEqual(1);
    }
  });

  it('intensity at quarter period is at maximum', () => {
    expect(solarIntensity(PERIOD_MS / 4)).toBeCloseTo(1.0, 6);
  });

  it('intensity at three-quarter period is at minimum', () => {
    expect(solarIntensity(3 * PERIOD_MS / 4)).toBeCloseTo(0.0, 6);
  });

  it('classifies state correctly at extrema', () => {
    expect(solarState(PERIOD_MS / 4)).toBe('brilhante');
    expect(solarState(3 * PERIOD_MS / 4)).toBe('longa-escuridao');
  });

  it('sigma multiplier sharpens in Brilhante and blurs in Longa Escuridão', () => {
    const bright  = solarSigmaMultiplier(PERIOD_MS / 4);
    const dark    = solarSigmaMultiplier(3 * PERIOD_MS / 4);
    expect(bright).toBeLessThan(1);
    expect(dark).toBeGreaterThan(1);
  });
});
