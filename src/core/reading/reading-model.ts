// The Cinder as polarimeter.
//
// Physics-grounded model: the Cinder emits polarized light; chiral samples
// rotate the plane of polarization. Native (+rotation), mirror (-rotation),
// inert (~0). The Cinder's measurement has Gaussian noise whose width shrinks
// as the Cinder grows brighter; hence yesterday's exercises are today's
// Reading reliability.

import { Chirality } from './sample-model';

export type ReadingBand =
  | 'de_nossa_mao'         // strong native — safe
  | 'parece_de_nossa_mao'  // weak native — likely safe
  | 'fogo_hesita'          // ambiguous — hold
  | 'parece_tocada'        // weak mirror — discard
  | 'tocada'               // strong mirror — burn now
  | 'sem_mao';             // inert — no chirality response

export const BAND_LABEL: Record<ReadingBand, string> = {
  de_nossa_mao: 'de nossa mão',
  parece_de_nossa_mao: 'parece de nossa mão',
  fogo_hesita: 'o fogo hesita',
  parece_tocada: 'parece tocada',
  tocada: 'tocada',
  sem_mao: 'sem mão'
};

// Cinder reliability scales with vitality. ρ ∈ [0.5, 0.95]
function reliability(vitality: number): number {
  return 0.5 + 0.45 * (vitality / 100);
}

// Measurement noise σ shrinks as vitality grows. σ ∈ [0.4, 1.0]
function noiseSigma(vitality: number): number {
  return 0.4 + (1 - vitality / 100) * 0.6;
}

// Idealized rotation per true chirality
const TRUE_ROTATION: Record<Chirality, number> = {
  native: +1.0,
  mirror: -1.0,
  inert: 0.0
};

// Box-Muller normal sampler
function sampleNormal(mean: number, sigma: number): number {
  const u1 = Math.max(Number.MIN_VALUE, Math.random());
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * sigma;
}

function bandFromMeasurement(r: number, isInert: boolean, rho: number): ReadingBand {
  // Inert special: small |r| often means absence of chirality, reported as sem_mao
  if (isInert && Math.abs(r) < 0.4) {
    return Math.random() < rho ? 'sem_mao' : 'fogo_hesita';
  }
  if (r > 0.7) return 'de_nossa_mao';
  if (r > 0.3) return 'parece_de_nossa_mao';
  if (r > -0.3) return 'fogo_hesita';
  if (r > -0.7) return 'parece_tocada';
  return 'tocada';
}

export function readSample(
  chirality: Chirality,
  vitality: number,
  solarSigmaMultiplier: number = 1.0
): ReadingBand {
  const sigma = noiseSigma(vitality) * solarSigmaMultiplier;
  const mu = TRUE_ROTATION[chirality];
  const r = sampleNormal(mu, sigma);
  const rho = reliability(vitality);
  return bandFromMeasurement(r, chirality === 'inert', rho);
}
