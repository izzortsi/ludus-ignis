// Cinder data model + decay logic.
//
// Decay is real-time (wall-clock). Vitality decays linearly with time since the
// last successful feed. Calibrated so a freshly-fed Cinder reaches 0 vitality
// after 3 days of neglect — but 0 is *dim*, not *dead*. Death (post-alpha)
// requires sustained 0 for several more days.

export type CinderPersonality = 'warm' | 'laconic' | 'playful' | 'severe';
export type CinderReadingManner = 'confident' | 'cautious' | 'histrionic';

export interface CinderState {
  name: string;
  personality: CinderPersonality;
  readingManner: CinderReadingManner;
  bornAt: number;             // unix ms
  lastFedAt: number;          // unix ms
  vitalityAtLastFed: number;  // 0..100, snapshot at lastFedAt
}

export const NAME_POOL = ['Kel', 'Ash', 'Mira', 'Theo', 'Wren', 'Suri', 'Tova'] as const;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DECAY_PER_MS = 100 / (3 * MS_PER_DAY); // 100 → 0 over 3 days

export function currentVitality(state: CinderState, now: number = Date.now()): number {
  const elapsed = Math.max(0, now - state.lastFedAt);
  const decayed = state.vitalityAtLastFed - elapsed * DECAY_PER_MS;
  return Math.max(0, Math.min(100, decayed));
}

export function feedCinder(state: CinderState, gain: number, now: number = Date.now()): CinderState {
  const current = currentVitality(state, now);
  return {
    ...state,
    lastFedAt: now,
    vitalityAtLastFed: Math.max(0, Math.min(100, current + gain))
  };
}

export type VitalityBand = 'bright' | 'warm' | 'low' | 'ember';

export function bandOf(vitality: number): VitalityBand {
  if (vitality >= 75) return 'bright';
  if (vitality >= 40) return 'warm';
  if (vitality >= 15) return 'low';
  return 'ember';
}

function pick<T>(pool: readonly T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function newCinder(now: number = Date.now()): CinderState {
  const personalities: CinderPersonality[] = ['warm', 'laconic', 'playful', 'severe'];
  const manners: CinderReadingManner[] = ['confident', 'cautious', 'histrionic'];
  return {
    name: pick(NAME_POOL),
    personality: pick(personalities),
    readingManner: pick(manners),
    bornAt: now,
    lastFedAt: now,
    vitalityAtLastFed: 80 // born slightly below max — needs early tending
  };
}
