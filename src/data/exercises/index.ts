// Locale-aware exercise pool access. Same pattern as lessons/index.ts.
// Exercise IDs are stable across locales — seenIdsByFamily in
// exercise-store keeps tracking correctly across switches.

import { Exercise } from '../../core/exercises/exercise-model';
import { exercisesPt } from './pt';
import { exercisesEn } from './en';
import { currentLocale, type Locale } from '../../i18n';

function poolFor(locale: Locale): Exercise[] {
  return locale === 'en' ? exercisesEn : exercisesPt;
}

/** Explicit-locale read (store init). */
export function getAllExercises(locale: Locale): Exercise[] {
  return poolFor(locale);
}

/** Reactive: current-locale exercise pool. */
export function ALL_EXERCISES_LIVE(): Exercise[] {
  return poolFor(currentLocale());
}
