import { describe, it, expect } from 'vitest';
import { newCinder, currentVitality, feedCinder, bandOf } from './cinder-model';

describe('Cinder vitality decay', () => {
  it('a fresh Cinder is in the warm or bright band', () => {
    const c = newCinder(0);
    expect(currentVitality(c, 0)).toBeGreaterThanOrEqual(75);
  });

  it('decays from 100 to 0 over 3 days', () => {
    const c = { ...newCinder(0), vitalityAtLastFed: 100, lastFedAt: 0 };
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    expect(currentVitality(c, threeDaysMs)).toBeLessThan(1);
  });

  it('classifies into bands', () => {
    expect(bandOf(90)).toBe('bright');
    expect(bandOf(50)).toBe('warm');
    expect(bandOf(20)).toBe('low');
    expect(bandOf(5)).toBe('ember');
  });

  it('feeding restores vitality, capped at 100', () => {
    const c = { ...newCinder(0), vitalityAtLastFed: 30, lastFedAt: 0 };
    const fed = feedCinder(c, 50, 0);
    expect(fed.vitalityAtLastFed).toBe(80);
    const overfed = feedCinder(c, 200, 0);
    expect(overfed.vitalityAtLastFed).toBe(100);
  });
});
