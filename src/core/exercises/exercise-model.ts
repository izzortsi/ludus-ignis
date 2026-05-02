// Exercise model: a multiple-choice problem from a probability family.
// Alpha-zero: A-style verbatim Portuguese statements; no in-world reframing yet.

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface ExerciseSource {
  file: string;              // e.g. 'lista2.pdf'
  page: number;
  problem: number | string;  // problem number in the source document
}

export interface Exercise {
  id: string;
  family: number;            // index into the 21-family taxonomy (bible §14, iteration 6)
  conceptName: string;       // diegetic family name, revealed within immersion
  difficulty: Difficulty;
  statement: string;         // Portuguese; fire-voice transposition of the source
  options: string[];         // rendered as buttons
  correctIndex: number;      // index into options
  /** Worked-out solution shown when the player reveals the answer or picks
   *  wrong. Portuguese; inline LaTeX via $...$ supported (rendered by the
   *  same renderInlineMarkup pipeline as theory pages). */
  solution?: string;
  source?: ExerciseSource;   // present for curriculum-extracted problems
}

// Scoring: scaled by difficulty
export function vitalityGainOnCorrect(difficulty: Difficulty): number {
  return difficulty * 5; // 5..25
}

export const VITALITY_PENALTY_ON_WRONG = 2;

// Pick a random exercise from a pool, excluding a given id when possible
export function randomExercise(pool: Exercise[], excludeId?: string): Exercise {
  if (pool.length === 0) throw new Error('Empty exercise pool');
  const candidates = excludeId && pool.length > 1
    ? pool.filter(e => e.id !== excludeId)
    : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
