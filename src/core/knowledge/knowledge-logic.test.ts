import { describe, it, expect } from 'vitest';
import { emptyKnowledge, recordCorrect, recordWrong, REVEAL_THRESHOLD } from './knowledge-logic';

const FAMILY = 6;
const CONCEPT = 'O Caminho de Volta';

describe('Knowledge tracking', () => {
  it('reveals the concept after threshold consecutive correct answers', () => {
    let state = emptyKnowledge();
    for (let i = 1; i < REVEAL_THRESHOLD; i++) {
      const r = recordCorrect(state, FAMILY, CONCEPT);
      expect(r.reveal).toBe(null);
      state = r.state;
    }
    const final = recordCorrect(state, FAMILY, CONCEPT);
    expect(final.reveal).toBe(CONCEPT);
  });

  it('does not reveal twice', () => {
    let state = emptyKnowledge();
    for (let i = 0; i < REVEAL_THRESHOLD; i++) {
      state = recordCorrect(state, FAMILY, CONCEPT).state;
    }
    const again = recordCorrect(state, FAMILY, CONCEPT);
    expect(again.reveal).toBe(null);
  });

  it('a wrong answer resets the family streak', () => {
    let state = emptyKnowledge();
    state = recordCorrect(state, FAMILY, CONCEPT).state;
    state = recordCorrect(state, FAMILY, CONCEPT).state;
    state = recordWrong(state, FAMILY);
    expect(state.perFamilyStreak[String(FAMILY)]).toBe(0);
    const next = recordCorrect(state, FAMILY, CONCEPT);
    expect(next.reveal).toBe(null);
  });

  it('streaks for different families do not interfere', () => {
    let state = emptyKnowledge();
    state = recordCorrect(state, 1, 'A').state;
    state = recordCorrect(state, 1, 'A').state;
    state = recordWrong(state, 6);
    expect(state.perFamilyStreak['1']).toBe(2);
    expect(state.perFamilyStreak['6']).toBe(0);
  });
});
