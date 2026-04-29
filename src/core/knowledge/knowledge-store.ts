import { createStore } from 'solid-js/store';
import {
  KnowledgeSnapshot,
  emptyKnowledge,
  recordCorrect as recordCorrectPure,
  recordWrong as recordWrongPure
} from './knowledge-logic';

interface KnowledgeState extends KnowledgeSnapshot {
  pendingReveal: string | null;
}

const [knowledge, setKnowledge] = createStore<KnowledgeState>({
  ...emptyKnowledge(),
  pendingReveal: null
});

// Returns the concept name newly revealed (if any), so callers can apply a
// vitality bonus or other side effects.
export function recordCorrect(family: number, conceptName: string): string | null {
  const result = recordCorrectPure(
    {
      perFamilyStreak: knowledge.perFamilyStreak,
      revealedConcepts: knowledge.revealedConcepts
    },
    family,
    conceptName
  );
  setKnowledge({
    perFamilyStreak: result.state.perFamilyStreak,
    revealedConcepts: result.state.revealedConcepts,
    pendingReveal: result.reveal ?? knowledge.pendingReveal
  });
  return result.reveal;
}

export function recordWrong(family: number): void {
  const next = recordWrongPure(
    {
      perFamilyStreak: knowledge.perFamilyStreak,
      revealedConcepts: knowledge.revealedConcepts
    },
    family
  );
  setKnowledge({
    perFamilyStreak: next.perFamilyStreak,
    revealedConcepts: next.revealedConcepts
  });
}

export function dismissReveal(): void {
  setKnowledge('pendingReveal', null);
}

export function restoreKnowledge(restored: KnowledgeState): void {
  setKnowledge(restored);
}

export { knowledge };
