import { createStore } from 'solid-js/store';
import { Exercise } from './exercise-model';
import { ALL_EXERCISES_LIVE } from '../../data/exercises';

interface ExerciseState {
  current: Exercise | null;
  selectedIndex: number | null;        // null = unanswered
  result: 'correct' | 'wrong' | 'revealed' | null;
  // Per-family memory of which exercise ids have been served. Lets the
  // selector exhaust the pool before repeating. In-memory only (not
  // persisted) — closing the modal preserves it within a session, but a
  // reload starts fresh. Cleared when the lesson advances.
  seenIdsByFamily: Record<string, string[]>;
}

const [exerciseState, setExerciseState] = createStore<ExerciseState>({
  current: null,
  selectedIndex: null,
  result: null,
  seenIdsByFamily: {}
});

// Load a random exercise. If `family` is given, restricts the pool to that
// family — used by lesson-driven practice so the Cinder asks questions
// matching what the Elder Fire just talked about. Pool is read live from
// the active locale so a mid-session language switch picks up translated
// content immediately (exercise IDs are stable across locales, so
// seenIdsByFamily memory still applies).
//
// No-repeat policy: tracks the ids already served for this family in
// `seenIdsByFamily` and excludes them. When all exercises in the family
// have been seen, the family's seen-list is reset and selection starts
// fresh (still excluding the immediately-previous one when possible, so
// the pool feels reshuffled rather than instantly looping).
export function loadNextExercise(family?: number): void {
  const all = ALL_EXERCISES_LIVE();
  const pool = family != null ? all.filter((e) => e.family === family) : all;
  if (pool.length === 0) return;

  const familyKey = String(family ?? 'all');
  const seen = exerciseState.seenIdsByFamily[familyKey] ?? [];
  const prevId = exerciseState.current?.id;

  let candidates = pool.filter((e) => !seen.includes(e.id));
  let nextSeen = seen;

  if (candidates.length === 0) {
    // Pool exhausted — reset, but avoid the immediately-previous id when
    // there's an alternative so the loop point doesn't feel like a stall.
    candidates = pool.filter((e) => e.id !== prevId);
    if (candidates.length === 0) candidates = pool;
    nextSeen = [];
  }

  const next = candidates[Math.floor(Math.random() * candidates.length)];

  setExerciseState({
    current: next,
    selectedIndex: null,
    result: null,
    seenIdsByFamily: {
      ...exerciseState.seenIdsByFamily,
      [familyKey]: [...nextSeen, next.id]
    }
  });
}

export function clearExercise(): void {
  setExerciseState({ current: null, selectedIndex: null, result: null });
}

// Reset the per-family seen-list memory. Called when the lesson advances
// so each lesson starts with a fresh pool feel.
export function clearSeenExercises(): void {
  setExerciseState('seenIdsByFamily', {});
}

export function selectAnswer(index: number): void {
  if (!exerciseState.current || exerciseState.selectedIndex !== null || exerciseState.result !== null) return;
  const correct = index === exerciseState.current.correctIndex;
  setExerciseState({
    selectedIndex: index,
    result: correct ? 'correct' : 'wrong'
  });
}

// Player asks to be shown the answer without picking. The question is
// consumed (no streak credit, no vitality penalty) and locks for further
// interaction; the UI shows the correct option highlighted.
export function revealAnswer(): void {
  if (!exerciseState.current || exerciseState.selectedIndex !== null || exerciseState.result !== null) return;
  setExerciseState({ result: 'revealed' });
}

export { exerciseState };
