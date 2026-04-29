import { createStore } from 'solid-js/store';
import { Exercise, randomExercise } from './exercise-model';
import { ALL_EXERCISES } from '../../data/exercises';

interface ExerciseState {
  current: Exercise | null;
  selectedIndex: number | null;        // null = unanswered
  result: 'correct' | 'wrong' | null;
}

const [exerciseState, setExerciseState] = createStore<ExerciseState>({
  current: null,
  selectedIndex: null,
  result: null
});

export const POOL: Exercise[] = ALL_EXERCISES;

export function loadNextExercise(): void {
  const prev = exerciseState.current?.id;
  const next = randomExercise(POOL, prev);
  setExerciseState({
    current: next,
    selectedIndex: null,
    result: null
  });
}

export function selectAnswer(index: number): void {
  if (!exerciseState.current || exerciseState.selectedIndex !== null) return;
  const correct = index === exerciseState.current.correctIndex;
  setExerciseState({
    selectedIndex: index,
    result: correct ? 'correct' : 'wrong'
  });
}

export { exerciseState };
