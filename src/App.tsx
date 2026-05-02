import { onMount, onCleanup, createEffect, createSignal, Show } from 'solid-js';
import { CampMap } from './ui/map/CampMap';
import { IntroScene } from './ui/intro/IntroScene';
import { startClock, stopClock } from './core/world/clock';
import {
  restoreCinder,
  persistCinder,
  restoreTribeFromStorage,
  persistTribe,
  restoreKnowledgeFromStorage,
  persistKnowledge,
  persistLesson,
  isIntroSeen,
  setIntroSeen
} from './persistence/local-storage';
import { cinder, setCinder } from './core/cinder/cinder-store';
import { tribe, restoreTribe } from './core/tribe/tribe-store';
import { knowledge, restoreKnowledge } from './core/knowledge/knowledge-store';
import { lessonState } from './core/lessons/lesson-store';

export function App() {
  // Restore from local storage on first load. A returning player (Cinder
  // already persisted) implicitly skips the intro.
  const restoredCinder = restoreCinder();
  if (restoredCinder) {
    setCinder(restoredCinder);
    setIntroSeen();
  }

  const restoredTribe = restoreTribeFromStorage();
  if (restoredTribe) restoreTribe(restoredTribe);

  const restoredKnowledge = restoreKnowledgeFromStorage();
  if (restoredKnowledge) restoreKnowledge(restoredKnowledge);

  const [showIntro, setShowIntro] = createSignal(!isIntroSeen());

  onMount(() => {
    startClock();
  });

  onCleanup(() => {
    stopClock();
  });

  // Per-store persist effects
  createEffect(() => {
    persistCinder({
      name: cinder.name,
      personality: cinder.personality,
      readingManner: cinder.readingManner,
      bornAt: cinder.bornAt,
      lastFedAt: cinder.lastFedAt,
      vitalityAtLastFed: cinder.vitalityAtLastFed
    });
  });

  createEffect(() => {
    persistTribe({ theaSickUntil: tribe.theaSickUntil });
  });

  createEffect(() => {
    persistKnowledge({
      perFamilyStreak: { ...knowledge.perFamilyStreak },
      revealedConcepts: { ...knowledge.revealedConcepts },
      pendingReveal: knowledge.pendingReveal
    });
  });

  createEffect(() => {
    persistLesson({
      currentLessonId: lessonState.currentLessonId,
      stage: lessonState.stage,
      practiceCorrect: lessonState.practiceCorrect,
      theoryIntroduced: lessonState.theoryIntroduced,
      presentedLessonIds: [...lessonState.presentedLessonIds]
    });
  });

  function onIntroComplete() {
    setIntroSeen();
    setShowIntro(false);
  }

  return (
    <Show when={!showIntro()} fallback={<IntroScene onComplete={onIntroComplete} />}>
      <button
        class="back-to-intro"
        onClick={() => setShowIntro(true)}
        title="rever introdução"
      >
        ← introdução
      </button>
      <main class="app">
        <CampMap />
      </main>
    </Show>
  );
}
