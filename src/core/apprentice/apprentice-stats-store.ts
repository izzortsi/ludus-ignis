// Apprentice XP + level store. The pure logic lives in
// apprentice-stats-logic.ts; this module wraps it in a Solid store + a
// transient signal for the level-up banner the UI shows.
//
// awardXp() returns whether the gain crossed a level threshold so the
// caller can apply cross-store side effects (refilling Cinder vitality)
// without forcing this store to know about cinder-store.

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { levelOf } from './apprentice-stats-logic';
import { restoreApprenticeStats } from '../../persistence/local-storage';

export interface ApprenticeStatsState {
  xp: number;
}

function initial(): ApprenticeStatsState {
  const saved = restoreApprenticeStats();
  if (saved && typeof saved.xp === 'number' && saved.xp >= 0) {
    return { xp: saved.xp };
  }
  return { xp: 0 };
}

const [apprenticeStats, setApprenticeStats] = createStore<ApprenticeStatsState>(initial());
const [pendingLevelUp, setPendingLevelUp] = createSignal<number | null>(null);

export interface AwardResult {
  /** True iff this award crossed a level threshold. */
  leveledUp: boolean;
  /** Level after the award (always set; same as before if no level-up). */
  newLevel: number;
  /** Total XP after the award. */
  totalXp:  number;
}

// Add XP. Returns level-up info so callers can apply side effects (vitality
// refill, banner) without coupling this store to others.
export function awardXp(amount: number): AwardResult {
  if (amount <= 0) {
    const lvl = levelOf(apprenticeStats.xp);
    return { leveledUp: false, newLevel: lvl, totalXp: apprenticeStats.xp };
  }
  const oldLevel = levelOf(apprenticeStats.xp);
  const newXp = apprenticeStats.xp + amount;
  setApprenticeStats('xp', newXp);
  const newLevel = levelOf(newXp);
  const leveledUp = newLevel > oldLevel;
  if (leveledUp) setPendingLevelUp(newLevel);
  return { leveledUp, newLevel, totalXp: newXp };
}

export function dismissLevelUp(): void {
  setPendingLevelUp(null);
}

// Used by App.tsx restore path.
export function restoreApprenticeStatsFrom(state: ApprenticeStatsState): void {
  setApprenticeStats({ xp: Math.max(0, state.xp) });
}

export { apprenticeStats, pendingLevelUp };
