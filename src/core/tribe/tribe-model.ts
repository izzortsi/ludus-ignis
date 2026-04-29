// Tribe state — currently just Théa's sickness. Persists across Readings via
// localStorage. Sickness is timestamp-based so wall-clock progression heals
// her even while the tab is closed.

export interface TribeState {
  theaSickUntil: number; // unix ms; sick if > now
}

const SICKNESS_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function newTribe(): TribeState {
  return { theaSickUntil: 0 };
}

export function inflictThéaSickness(state: TribeState, now: number = Date.now()): TribeState {
  const minUntil = now + SICKNESS_DURATION_MS;
  return {
    ...state,
    theaSickUntil: Math.max(state.theaSickUntil, minUntil)
  };
}

export function isThéaSick(state: TribeState, now: number = Date.now()): boolean {
  return state.theaSickUntil > now;
}

export function théaDaysRemaining(state: TribeState, now: number = Date.now()): number {
  if (state.theaSickUntil <= now) return 0;
  return Math.ceil((state.theaSickUntil - now) / MS_PER_DAY);
}
