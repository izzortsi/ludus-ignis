import { CinderState } from '../core/cinder/cinder-model';
import { TribeState } from '../core/tribe/tribe-model';
import type { LessonStage } from '../core/lessons/lesson-model';

const CINDER_KEY     = 'probgame.cinder.v1';
const TRIBE_KEY      = 'probgame.tribe.v1';
const KNOWLEDGE_KEY  = 'probgame.knowledge.v1';
const INTRO_KEY      = 'probgame.intro.seen.v1';
const APPRENTICE_KEY = 'probgame.apprentice.v1';
const LESSON_KEY     = 'probgame.lesson.v1';

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

export interface PersistedLesson {
  currentLessonId: string;
  stage: LessonStage;
  practiceCorrect: number;
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
  localStorage.removeItem(LESSON_KEY);
}
