import { describe, it, expect } from 'vitest';
import {
  emptyInventory, countOf, addItem, spendItem, pluralize,
  grainsForCorrect, GRAINS_PROVA_BONUS,
  FEED_PRICE_GRAINS, FEED_VITALITY_GAIN,
  REROLL_PRICE_GRAINS, REVEAL_PRICE_GRAINS
} from './inventory-logic';

describe('inventory — read', () => {
  it('countOf returns 0 for missing items', () => {
    expect(countOf(emptyInventory(), 'graos')).toBe(0);
  });

  it('countOf returns the stored count', () => {
    const s = addItem(emptyInventory(), 'graos', 7);
    expect(countOf(s, 'graos')).toBe(7);
  });
});

describe('inventory — add', () => {
  it('addItem accumulates', () => {
    let s = emptyInventory();
    s = addItem(s, 'graos', 3);
    s = addItem(s, 'graos', 4);
    expect(countOf(s, 'graos')).toBe(7);
  });

  it('addItem with non-positive amount is a no-op', () => {
    const s = addItem(emptyInventory(), 'graos', 0);
    expect(countOf(s, 'graos')).toBe(0);
    const s2 = addItem(s, 'graos', -3);
    expect(countOf(s2, 'graos')).toBe(0);
  });
});

describe('inventory — spend', () => {
  it('spendItem deducts when there are enough', () => {
    const s = addItem(emptyInventory(), 'graos', 10);
    const after = spendItem(s, 'graos', 3);
    expect(after).not.toBeNull();
    expect(countOf(after!, 'graos')).toBe(7);
  });

  it('spendItem returns null when there are not enough', () => {
    const s = addItem(emptyInventory(), 'graos', 2);
    expect(spendItem(s, 'graos', 3)).toBeNull();
    expect(countOf(s, 'graos')).toBe(2); // unchanged
  });

  it('spendItem clears the slot when balance hits zero', () => {
    const s = addItem(emptyInventory(), 'graos', 4);
    const after = spendItem(s, 'graos', 4);
    expect(after).not.toBeNull();
    expect(countOf(after!, 'graos')).toBe(0);
    expect(after!.items.graos).toBeUndefined();
  });
});

describe('inventory — display helpers', () => {
  it('pluralize uses singular for 1, plural otherwise', () => {
    expect(pluralize('graos', 1)).toBe('grão');
    expect(pluralize('graos', 0)).toBe('grãos');
    expect(pluralize('graos', 2)).toBe('grãos');
    expect(pluralize('graos', 47)).toBe('grãos');
  });
});

describe('inventory — earn rates', () => {
  it('grainsForCorrect scales as 1 + floor(d/2)', () => {
    expect(grainsForCorrect(1)).toBe(1);
    expect(grainsForCorrect(2)).toBe(2);
    expect(grainsForCorrect(3)).toBe(2);
    expect(grainsForCorrect(4)).toBe(3);
    expect(grainsForCorrect(5)).toBe(3);
  });

  it('prova bonus is a flat 10', () => {
    expect(GRAINS_PROVA_BONUS).toBe(10);
  });
});

describe('inventory — spend prices', () => {
  it('feed-Cinder is 1 grão for +5 vitality', () => {
    expect(FEED_PRICE_GRAINS).toBe(1);
    expect(FEED_VITALITY_GAIN).toBe(5);
  });

  it('re-roll is 2, paid reveal is 3', () => {
    expect(REROLL_PRICE_GRAINS).toBe(2);
    expect(REVEAL_PRICE_GRAINS).toBe(3);
  });
});
