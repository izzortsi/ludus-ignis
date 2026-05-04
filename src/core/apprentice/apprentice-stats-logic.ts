// Pure logic for apprentice XP + level. Decoupled from any Solid store so
// it can be exercised by vitest in the node environment.
//
// Levels are 1-indexed. LEVEL_THRESHOLDS[i] is the cumulative XP required
// to *reach* level (i + 1). Level 1 is the starting state at xp = 0.
// Beyond the last threshold, the apprentice is at MAX_LEVEL and further
// XP is recorded but does not advance.

export const LEVEL_THRESHOLDS: readonly number[] = [
  0,     // L1 — aprendiz
  100,   // L2 — noviça
  250,   // L3 — leitora
  500,   // L4 — tecedeira
  1000,  // L5 — pajé
  2000   // L6 — mestra
];

export const RANK_NAMES: readonly string[] = [
  'aprendiz',
  'noviça',
  'leitora',
  'tecedeira',
  'pajé',
  'mestra'
];

export const MAX_LEVEL = LEVEL_THRESHOLDS.length;
export const LESSON_BONUS_XP = 50;

// What the player earns from a single correct exercise. Same scaling factor
// as Cinder vitality so the numbers feel commensurate.
export function xpForCorrect(difficulty: number): number {
  return difficulty * 5;
}

export function levelOf(xp: number): number {
  // Highest threshold not exceeding xp; index + 1 = 1-indexed level.
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

export function rankNameOf(xp: number): string {
  return RANK_NAMES[levelOf(xp) - 1];
}

export function isMaxLevel(xp: number): boolean {
  return levelOf(xp) >= MAX_LEVEL;
}

export interface XpProgress {
  /** Cumulative XP at the start of the current level. */
  base:    number;
  /** XP earned within the current level (0 if just leveled up; >= 0). */
  current: number;
  /** Total XP required to span the current level (next - base). At max
   *  level this is `null` — no further progress to display. */
  span:    number | null;
}

export function xpProgressInLevel(xp: number): XpProgress {
  const level = levelOf(xp);
  const base = LEVEL_THRESHOLDS[level - 1];
  if (level >= MAX_LEVEL) {
    return { base, current: xp - base, span: null };
  }
  const next = LEVEL_THRESHOLDS[level];
  return { base, current: xp - base, span: next - base };
}
