import { describe, it, expect } from 'vitest';
import { readSample, ReadingBand } from './reading-model';

const NATIVE_BANDS: ReadingBand[] = ['de_nossa_mao', 'parece_de_nossa_mao'];
const MIRROR_BANDS: ReadingBand[] = ['parece_tocada', 'tocada'];

function rateOf(predicate: (b: ReadingBand) => boolean, fn: () => ReadingBand, trials = 1000): number {
  let count = 0;
  for (let i = 0; i < trials; i++) if (predicate(fn())) count++;
  return count / trials;
}

describe('Cinder polarimetric reading', () => {
  it('a bright Cinder calls native correctly most of the time', () => {
    const rate = rateOf(b => NATIVE_BANDS.includes(b), () => readSample('native', 100));
    expect(rate).toBeGreaterThan(0.7);
  });

  it('a bright Cinder calls mirror correctly most of the time', () => {
    const rate = rateOf(b => MIRROR_BANDS.includes(b), () => readSample('mirror', 100));
    expect(rate).toBeGreaterThan(0.7);
  });

  it('a dim Cinder is less reliable on native', () => {
    const dimRate = rateOf(b => NATIVE_BANDS.includes(b), () => readSample('native', 5));
    const brightRate = rateOf(b => NATIVE_BANDS.includes(b), () => readSample('native', 100));
    expect(dimRate).toBeLessThan(brightRate);
  });

  it('a dim Cinder produces more "fogo_hesita" readings', () => {
    const dimHesita = rateOf(b => b === 'fogo_hesita', () => readSample('native', 5));
    const brightHesita = rateOf(b => b === 'fogo_hesita', () => readSample('native', 100));
    expect(dimHesita).toBeGreaterThan(brightHesita);
  });

  it('a bright Cinder reads inert as sem_mao most of the time', () => {
    const rate = rateOf(b => b === 'sem_mao', () => readSample('inert', 100));
    expect(rate).toBeGreaterThan(0.5);
  });

  it('mirror is rarely called native by a bright Cinder', () => {
    const rate = rateOf(b => NATIVE_BANDS.includes(b), () => readSample('mirror', 100));
    expect(rate).toBeLessThan(0.05);
  });
});
