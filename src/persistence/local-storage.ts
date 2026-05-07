import { CinderState } from '../core/cinder/cinder-model';
import { TribeState } from '../core/tribe/tribe-model';
import type { LessonStage } from '../core/lessons/lesson-model';
import type { InventoryState } from '../core/inventory/inventory-logic';

const CINDER_KEY            = 'probgame.cinder.v1';
const TRIBE_KEY             = 'probgame.tribe.v1';
const KNOWLEDGE_KEY         = 'probgame.knowledge.v1';
const INTRO_KEY             = 'probgame.intro.seen.v1';
const APPRENTICE_KEY        = 'probgame.apprentice.v1';
const APPRENTICE_STATS_KEY  = 'probgame.apprentice.stats.v1';
const INVENTORY_KEY         = 'probgame.inventory.v1';
const LESSON_KEY            = 'probgame.lesson.v1';
const LOCALE_KEY            = 'probgame.locale.v1';
const VIEW_MODE_KEY         = 'probgame.viewMode.v1';

function persistJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Could not persist ${key}:`, err);
  }
}

function restoreJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Could not restore ${key}:`, err);
    return null;
  }
}

export function persistCinder(state: CinderState): void {
  persistJson(CINDER_KEY, state);
}
export function restoreCinder(): CinderState | null {
  return restoreJson<CinderState>(CINDER_KEY);
}

export function persistTribe(state: TribeState): void {
  persistJson(TRIBE_KEY, state);
}
export function restoreTribeFromStorage(): TribeState | null {
  return restoreJson<TribeState>(TRIBE_KEY);
}

export interface PersistedKnowledge {
  perFamilyStreak: Record<string, number>;
  revealedConcepts: Record<string, boolean>;
  pendingReveal: string | null;
}

export function persistKnowledge(state: PersistedKnowledge): void {
  persistJson(KNOWLEDGE_KEY, state);
}
export function restoreKnowledgeFromStorage(): PersistedKnowledge | null {
  return restoreJson<PersistedKnowledge>(KNOWLEDGE_KEY);
}

export function setIntroSeen(): void {
  try { localStorage.setItem(INTRO_KEY, '1'); } catch (err) {
    console.warn('Could not persist intro flag:', err);
  }
}
export function isIntroSeen(): boolean {
  try { return localStorage.getItem(INTRO_KEY) === '1'; } catch { return false; }
}

export interface PersistedApprentice {
  row: number;
  col: number;
}

export function persistApprentice(state: PersistedApprentice): void {
  persistJson(APPRENTICE_KEY, state);
}
export function restoreApprentice(): PersistedApprentice | null {
  return restoreJson<PersistedApprentice>(APPRENTICE_KEY);
}

export interface PersistedApprenticeStats {
  xp: number;
}

export function persistApprenticeStats(state: PersistedApprenticeStats): void {
  persistJson(APPRENTICE_STATS_KEY, state);
}
export function restoreApprenticeStats(): PersistedApprenticeStats | null {
  return restoreJson<PersistedApprenticeStats>(APPRENTICE_STATS_KEY);
}

export function persistInventory(state: InventoryState): void {
  persistJson(INVENTORY_KEY, state);
}
export function restoreInventory(): InventoryState | null {
  return restoreJson<InventoryState>(INVENTORY_KEY);
}

// Locale persistence — stored as a bare string so the i18n layer can
// read it without owning a JSON shape. Returns null if unset or invalid.
export function persistLocale(locale: string): void {
  try { localStorage.setItem(LOCALE_KEY, locale); } catch (err) {
    console.warn('Could not persist locale:', err);
  }
}
export function restoreLocale(): string | null {
  try { return localStorage.getItem(LOCALE_KEY); } catch { return null; }
}

// View-mode persistence — same bare-string convention.
export function persistViewMode(mode: string): void {
  try { localStorage.setItem(VIEW_MODE_KEY, mode); } catch (err) {
    console.warn('Could not persist view mode:', err);
  }
}
export function restoreViewMode(): string | null {
  try { return localStorage.getItem(VIEW_MODE_KEY); } catch { return null; }
}

export interface PersistedLesson {
  currentLessonId: string;
  stage: LessonStage;
  practiceCorrect: number;
  theoryIntroduced: boolean;
  /** Optional in legacy saves; backfilled by lesson-store when missing. */
  presentedLessonIds?: string[];
}

export function persistLesson(state: PersistedLesson): void {
  persistJson(LESSON_KEY, state);
}
export function restoreLesson(): PersistedLesson | null {
  return restoreJson<PersistedLesson>(LESSON_KEY);
}

export function clearAll(): void {
  localStorage.removeItem(CINDER_KEY);
  localStorage.removeItem(TRIBE_KEY);
  localStorage.removeItem(KNOWLEDGE_KEY);
  localStorage.removeItem(INTRO_KEY);
  localStorage.removeItem(APPRENTICE_KEY);
  localStorage.removeItem(APPRENTICE_STATS_KEY);
  localStorage.removeItem(INVENTORY_KEY);
  localStorage.removeItem(LESSON_KEY);
  localStorage.removeItem(LOCALE_KEY);
  localStorage.removeItem(VIEW_MODE_KEY);
}
