// Pure logic for tracking per-family correct streaks and triggering
// concept-name reveals once mastery is shown.

export interface KnowledgeSnapshot {
  perFamilyStreak: Record<string, number>;
  revealedConcepts: Record<string, boolean>;
}

export const REVEAL_THRESHOLD = 3;

export interface RecordCorrectResult {
  state: KnowledgeSnapshot;
  reveal: string | null; // concept name to reveal, or null
}

export function recordCorrect(
  state: KnowledgeSnapshot,
  family: number,
  conceptName: string
): RecordCorrectResult {
  const familyKey = String(family);
  const newStreak = (state.perFamilyStreak[familyKey] ?? 0) + 1;
  const wasAlreadyRevealed = state.revealedConcepts[conceptName] === true;
  const triggers = newStreak >= REVEAL_THRESHOLD && !wasAlreadyRevealed;

  const newPerFamilyStreak = { ...state.perFamilyStreak, [familyKey]: newStreak };
  const newRevealed = triggers
    ? { ...state.revealedConcepts, [conceptName]: true }
    : state.revealedConcepts;

  return {
    state: { perFamilyStreak: newPerFamilyStreak, revealedConcepts: newRevealed },
    reveal: triggers ? conceptName : null
  };
}

export function recordWrong(state: KnowledgeSnapshot, family: number): KnowledgeSnapshot {
  return {
    ...state,
    perFamilyStreak: { ...state.perFamilyStreak, [String(family)]: 0 }
  };
}

export function emptyKnowledge(): KnowledgeSnapshot {
  return { perFamilyStreak: {}, revealedConcepts: {} };
}
