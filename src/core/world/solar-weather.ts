// Solar weather — a slow sinusoid cycling between two macro-states:
//   "a Brilhante" (active sun, sharper Readings, equatorial aurora)
//   "a Longa Escuridão" (solar quiet, noisier Readings)
// Drives Reading reliability. Future: also flame articulacy + lore unlocks.

const PERIOD_MS = 3 * 24 * 60 * 60 * 1000; // 3 days — alpha-zero tunable

// 0 = peak Long Dark, 1 = peak Bright
export function solarIntensity(now: number = Date.now()): number {
  const phase = (now / PERIOD_MS) * 2 * Math.PI;
  return (Math.sin(phase) + 1) / 2;
}

export type SolarState = 'brilhante' | 'transicao' | 'longa-escuridao';

export function solarState(now: number = Date.now()): SolarState {
  const i = solarIntensity(now);
  if (i > 0.66) return 'brilhante';
  if (i > 0.33) return 'transicao';
  return 'longa-escuridao';
}

export const SOLAR_STATE_LABEL: Record<SolarState, string> = {
  'brilhante':       'a Brilhante',
  'transicao':       'a transição',
  'longa-escuridao': 'a Longa Escuridão'
};

export function atmosphericBlurb(state: SolarState): string {
  switch (state) {
    case 'brilhante':       return 'as auroras esticam-se ao equador.';
    case 'transicao':       return 'o sol respira.';
    case 'longa-escuridao': return 'o céu está quieto.';
  }
}

// Reading-noise multiplier: <1 sharpens, >1 blurs. Smoothly scales with intensity.
//   Brilhante (i=1) → 0.7× σ
//   Longa Escuridão (i=0) → 1.3× σ
//   Transição → ~1.0
export function solarSigmaMultiplier(now: number = Date.now()): number {
  const i = solarIntensity(now);
  return 1.3 - 0.6 * i;
}
