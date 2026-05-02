import { createStore } from 'solid-js/store';
import { Lesson, LessonStage } from './lesson-model';
import { ALL_LESSONS } from '../../data/lessons';
import { restoreLesson } from '../../persistence/local-storage';
import { clearSeenExercises } from '../exercises/exercise-store';

interface LessonState {
  currentLessonId: string;
  stage: LessonStage;
  practiceCorrect: number;
  /** Whether the Cinder has done its spontaneous theory walk-through yet
   *  for the current lesson. Persisted, so re-opening Cinder after the
   *  walk-through doesn't replay it. */
  theoryIntroduced: boolean;
  /** Lesson ids whose parable has been heard at the Elder Fire. Drives the
   *  Cinder's review tree (Teoria → família list → parable / theory) and
   *  gates Cinder accessibility (the Cinder is mute until the first Elder
   *  visit). Persisted. */
  presentedLessonIds: string[];
}

function initial(): LessonState {
  const saved = restoreLesson();
  if (saved) {
    const exists = ALL_LESSONS.some((l) => l.id === saved.currentLessonId);
    if (exists) {
      const presented = backfillPresented(
        saved.presentedLessonIds ?? [],
        saved.currentLessonId,
        saved.stage
      );
      return {
        currentLessonId: saved.currentLessonId,
        stage: saved.stage,
        practiceCorrect: saved.practiceCorrect,
        theoryIntroduced: saved.theoryIntroduced ?? false,
        presentedLessonIds: presented
      };
    }
  }
  return {
    currentLessonId: ALL_LESSONS[0].id,
    stage: 'parable',
    practiceCorrect: 0,
    theoryIntroduced: false,
    presentedLessonIds: []
  };
}

// Legacy saves predate presentedLessonIds. Reconstruct it: every lesson
// before the current one in ALL_LESSONS order was advanced past, hence
// presented; the current lesson is presented iff the saved stage has moved
// past 'parable'.
function backfillPresented(
  saved: string[],
  currentId: string,
  stage: LessonStage
): string[] {
  const result = [...saved];
  const currentIdx = ALL_LESSONS.findIndex((l) => l.id === currentId);
  if (currentIdx < 0) return result;
  for (let i = 0; i < currentIdx; i++) {
    const id = ALL_LESSONS[i].id;
    if (!result.includes(id)) result.push(id);
  }
  if (stage !== 'parable' && !result.includes(currentId)) {
    result.push(currentId);
  }
  return result;
}

export const [lessonState, setLessonState] = createStore<LessonState>(initial());

export function currentLesson(): Lesson {
  return ALL_LESSONS.find((l) => l.id === lessonState.currentLessonId) ?? ALL_LESSONS[0];
}

// Lessons whose parable has been heard, in the order they appear in
// ALL_LESSONS. Drives the review tree.
export function presentedLessons(): Lesson[] {
  const set = new Set(lessonState.presentedLessonIds);
  return ALL_LESSONS.filter((l) => set.has(l.id));
}

// Whether the apprentice has ever talked to the Elder Fire. The Cinder is
// mute before this; the hub becomes accessible after.
export function hasAnyPresentedLesson(): boolean {
  return lessonState.presentedLessonIds.length > 0;
}

// Called when the apprentice closes the Elder's directive — we know the
// parable has been heard and the apprentice has been pointed at the Cinder.
export function markParableHeard(): void {
  if (lessonState.stage === 'parable') {
    setLessonState('stage', 'studying');
  }
  if (!lessonState.presentedLessonIds.includes(lessonState.currentLessonId)) {
    setLessonState('presentedLessonIds', [
      ...lessonState.presentedLessonIds,
      lessonState.currentLessonId
    ]);
  }
}

// Called when an exercise in this lesson's family is answered correctly.
// Once practiceTarget is reached, stage advances to 'practiced'.
export function recordPracticeCorrect(): void {
  const next = lessonState.practiceCorrect + 1;
  setLessonState('practiceCorrect', next);
  if (next >= currentLesson().practiceTarget && lessonState.stage === 'studying') {
    setLessonState('stage', 'practiced');
  }
}

export function isReadyForTest(): boolean {
  return lessonState.stage === 'practiced';
}

// Called when the Cinder finishes (or the player skips) the spontaneous
// theory walk-through. Subsequent opens skip directly to the hub.
export function markTheoryIntroduced(): void {
  if (!lessonState.theoryIntroduced) {
    setLessonState('theoryIntroduced', true);
  }
}

// Called when the apprentice answers the Elder Fire's test question
// correctly. Stage moves to 'tested'; the lesson is now passed and the
// next-lesson advance becomes available.
export function markTested(): void {
  if (lessonState.stage === 'practiced') {
    setLessonState('stage', 'tested');
  }
}

// Whether a lesson exists after the current one in ALL_LESSONS.
export function hasNextLesson(): boolean {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonState.currentLessonId);
  return idx >= 0 && idx < ALL_LESSONS.length - 1;
}

// Advance to the next lesson in ALL_LESSONS order. Resets stage to 'parable',
// clears practice progress, and forgets the theory walk-through so the next
// Cinder visit replays it for the new lesson. Also flushes the no-repeat
// memory so the new family's pool feels fresh. No-op at the end of the array.
export function advanceToNextLesson(): void {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonState.currentLessonId);
  if (idx < 0 || idx >= ALL_LESSONS.length - 1) return;
  setLessonState({
    currentLessonId: ALL_LESSONS[idx + 1].id,
    stage: 'parable',
    practiceCorrect: 0,
    theoryIntroduced: false
  });
  clearSeenExercises();
}
