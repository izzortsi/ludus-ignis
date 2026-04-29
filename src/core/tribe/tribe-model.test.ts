import { describe, it, expect } from 'vitest';
import { newTribe, inflictThéaSickness, isThéaSick, théaDaysRemaining } from './tribe-model';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

describe('Tribe — Théa sickness', () => {
  it('a fresh tribe has Théa healthy', () => {
    const t = newTribe();
    expect(isThéaSick(t, 0)).toBe(false);
    expect(théaDaysRemaining(t, 0)).toBe(0);
  });

  it('inflicting sickness sets ~7 days remaining', () => {
    const t0 = newTribe();
    const t1 = inflictThéaSickness(t0, 0);
    expect(isThéaSick(t1, 0)).toBe(true);
    expect(théaDaysRemaining(t1, 0)).toBe(7);
  });

  it('Théa heals after the duration passes', () => {
    const t0 = newTribe();
    const t1 = inflictThéaSickness(t0, 0);
    expect(isThéaSick(t1, 8 * DAY)).toBe(false);
    expect(théaDaysRemaining(t1, 8 * DAY)).toBe(0);
  });

  it('a second exposure does not reduce remaining time below the worse one', () => {
    const t0 = newTribe();
    const t1 = inflictThéaSickness(t0, 0);
    const t2 = inflictThéaSickness(t1, 1 * DAY); // 6 days left, would set to 7 from now
    // After 1 day: t1 had 6 days left; t2 has 7 days left from day 1, so should be 7
    expect(théaDaysRemaining(t2, 1 * DAY)).toBe(7);
  });
});
