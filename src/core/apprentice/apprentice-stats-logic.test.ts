import { describe, it, expect } from 'vitest';
import {
  LEVEL_THRESHOLDS, MAX_LEVEL, LESSON_BONUS_XP,
  xpForCorrect, levelOf, rankNameOf, isMaxLevel, xpProgressInLevel
} from './apprentice-stats-logic';

describe('apprentice stats — XP per correct answer', () => {
  it('scales with difficulty (same factor as Cinder vitality)', () => {
    expect(xpForCorrect(1)).toBe(5);
    expect(xpForCorrect(2)).toBe(10);
    expect(xpForCorrect(3)).toBe(15);
    expect(xpForCorrect(5)).toBe(25);
  });

  it('lesson-completion bonus is a flat 50', () => {
    expect(LESSON_BONUS_XP).toBe(50);
  });
});

describe('apprentice stats — level computation', () => {
  it('starts at level 1 with 0 XP (aprendiz)', () => {
    expect(levelOf(0)).toBe(1);
    expect(rankNameOf(0)).toBe('aprendiz');
  });

  it('level boundaries promote on reaching the threshold', () => {
    expect(levelOf(99)).toBe(1);
    expect(levelOf(100)).toBe(2);
    expect(levelOf(101)).toBe(2);
    expect(levelOf(249)).toBe(2);
    expect(levelOf(250)).toBe(3);
    expect(levelOf(499)).toBe(3);
    expect(levelOf(500)).toBe(4);
    expect(levelOf(999)).toBe(4);
    expect(levelOf(1000)).toBe(5);
    expect(levelOf(1999)).toBe(5);
    expect(levelOf(2000)).toBe(6);
  });

  it('caps at MAX_LEVEL beyond the highest threshold', () => {
    expect(MAX_LEVEL).toBe(LEVEL_THRESHOLDS.length);
    expect(levelOf(10_000)).toBe(MAX_LEVEL);
    expect(rankNameOf(10_000)).toBe('mestra');
  });

  it('isMaxLevel matches the level cap', () => {
    expect(isMaxLevel(0)).toBe(false);
    expect(isMaxLevel(1999)).toBe(false);
    expect(isMaxLevel(2000)).toBe(true);
    expect(isMaxLevel(5_000)).toBe(true);
  });
});

describe('apprentice stats — progress within level', () => {
  it('reports 0/100 at the start of L1', () => {
    const p = xpProgressInLevel(0);
    expect(p).toEqual({ base: 0, current: 0, span: 100 });
  });

  it('reports partial progress within a level', () => {
    const p = xpProgressInLevel(60);
    expect(p).toEqual({ base: 0, current: 60, span: 100 });
  });

  it('rolls over to next level base on threshold crossing', () => {
    const p = xpProgressInLevel(150);
    expect(p).toEqual({ base: 100, current: 50, span: 150 }); // L2 spans 100-250
  });

  it('returns null span at max level', () => {
    const p = xpProgressInLevel(2500);
    expect(p.base).toBe(2000);
    expect(p.current).toBe(500);
    expect(p.span).toBeNull();
  });
});
