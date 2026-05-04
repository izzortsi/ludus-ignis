// Locale-aware lesson access. Reads the current locale lazily so callers
// inside reactive scopes (Solid effects, memos) get re-evaluated when the
// locale changes. Lesson IDs are stable across locales — `currentLessonId`
// in lesson-store keeps resolving across switches.

import { Lesson } from '../../core/lessons/lesson-model';
import { lessonsPt } from './pt';
import { lessonsEn } from './en';
import { currentLocale, type Locale } from '../../i18n';

function poolFor(locale: Locale): Lesson[] {
  return locale === 'en' ? lessonsEn : lessonsPt;
}

/** Read the lesson list for an explicit locale (use during store init). */
export function getAllLessons(locale: Locale): Lesson[] {
  return poolFor(locale);
}

/** Reactive: returns the lesson list for the current locale. */
export function ALL_LESSONS_LIVE(): Lesson[] {
  return poolFor(currentLocale());
}

/** Stable lesson lookup by id across the current locale. */
export function findLesson(id: string): Lesson | undefined {
  return poolFor(currentLocale()).find((l) => l.id === id);
}
