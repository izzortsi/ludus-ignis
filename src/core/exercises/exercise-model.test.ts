import { describe, it, expect } from 'vitest';
import { Exercise, Difficulty, vitalityGainOnCorrect, randomExercise } from './exercise-model';

function mk(id: string, difficulty: Difficulty = 1): Exercise {
  return {
    id,
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty,
    statement: '',
    options: ['a', 'b'],
    correctIndex: 0
  };
}

describe('Exercise scoring', () => {
  it('scales vitality gain linearly with difficulty', () => {
    expect(vitalityGainOnCorrect(1)).toBe(5);
    expect(vitalityGainOnCorrect(2)).toBe(10);
    expect(vitalityGainOnCorrect(3)).toBe(15);
    expect(vitalityGainOnCorrect(4)).toBe(20);
    expect(vitalityGainOnCorrect(5)).toBe(25);
  });

  it('randomExercise excludes the previous one when more than one is available', () => {
    const pool = [mk('a'), mk('b')];
    for (let i = 0; i < 30; i++) {
      expect(randomExercise(pool, 'a').id).toBe('b');
      expect(randomExercise(pool, 'b').id).toBe('a');
    }
  });

  it('randomExercise returns the only option when pool has size 1', () => {
    const pool = [mk('only')];
    expect(randomExercise(pool, 'anything').id).toBe('only');
  });

  it('randomExercise picks from full pool when no exclusion', () => {
    const pool = [mk('a'), mk('b'), mk('c')];
    const ids = new Set<string>();
    for (let i = 0; i < 60; i++) ids.add(randomExercise(pool).id);
    expect(ids.size).toBeGreaterThanOrEqual(2); // probabilistically ~3 with overwhelming odds
  });
});
