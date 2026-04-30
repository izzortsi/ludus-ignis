import { createStore } from 'solid-js/store';
import { Lesson, LessonStage } from './lesson-model';
import { ALL_LESSONS } from '../../data/lessons';
import { restoreLesson } from '../../persistence/local-storage';

interface LessonState {
  currentLessonId: string;
  stage: LessonStage;
  practiceCorrect: number;
}

function initial(): LessonState {
  const saved = restoreLesson();
  if (saved) {
    const exists = ALL_LESSONS.some((l) => l.id === saved.currentLessonId);
    if (exists) {
      return {
        currentLessonId: saved.currentLessonId,
        stage: saved.stage,
        practiceCorrect: saved.practiceCorrect
      };
    }
  }
  return {
    currentLessonId: ALL_LESSONS[0].id,
    stage: 'parable',
    practiceCorrect: 0
  };
}

export const [lessonState, setLessonState] = createStore<LessonState>(initial());

export function currentLesson(): Lesson {
  return ALL_LESSONS.find((l) => l.id === lessonState.currentLessonId) ?? ALL_LESSONS[0];
}

// Called when the apprentice closes the Elder's directive — we know the
// parable has been heard and the apprentice has been pointed at the Cinder.
export function markParableHeard(): void {
  if (lessonState.stage === 'parable') {
    setLessonState('stage', 'studying');
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
