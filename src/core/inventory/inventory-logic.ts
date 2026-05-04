// Pure logic for the apprentice's inventory. Items are keyed by stable
// ASCII ids (no diacritics — so storage round-trips are safe); display
// strings live in `ITEM_INFO`. Counts are non-negative integers.
//
// The model is generic so future items (bone tokens, charms, samples)
// drop in as a single ITEM_INFO entry; the rest of the system reads
// from the map.

export type ItemId = 'graos';

export interface ItemInfo {
  /** UI label, may contain diacritics. */
  label:    string;
  /** One-line description, shown in the Inventário sub-view. */
  flavour:  string;
  /** Suggested singular ↔ plural (for "1 grão" vs "12 grãos"). */
  singular: string;
  plural:   string;
}

export const ITEM_INFO: Record<ItemId, ItemInfo> = {
  graos: {
    label:    'grãos',
    flavour:  'A moeda dos vivos. Comida e pagamento, indistinguíveis.',
    singular: 'grão',
    plural:   'grãos'
  }
};

export interface InventoryState {
  items: Partial<Record<ItemId, number>>;
}

export function emptyInventory(): InventoryState {
  return { items: {} };
}

export function countOf(state: InventoryState, id: ItemId): number {
  const n = state.items[id];
  return typeof n === 'number' && n > 0 ? n : 0;
}

export function addItem(state: InventoryState, id: ItemId, n: number): InventoryState {
  if (n <= 0) return state;
  return {
    items: { ...state.items, [id]: countOf(state, id) + n }
  };
}

// Returns the new state if the spend succeeds, or null if the player
// doesn't have enough. Callers check for null and surface a "no funds"
// state instead of mutating.
export function spendItem(state: InventoryState, id: ItemId, n: number): InventoryState | null {
  if (n <= 0) return state;
  const have = countOf(state, id);
  if (have < n) return null;
  const remaining = have - n;
  const nextItems = { ...state.items };
  if (remaining === 0) delete nextItems[id];
  else nextItems[id] = remaining;
  return { items: nextItems };
}

export function pluralize(id: ItemId, n: number): string {
  const info = ITEM_INFO[id];
  return n === 1 ? info.singular : info.plural;
}

// === Earn rates ============================================================

// Per-correct grain award: 1 + floor(difficulty/2). Tuned to feel scarce
// next to vitality (which already moves in 5×difficulty chunks).
export function grainsForCorrect(difficulty: number): number {
  return 1 + Math.floor(difficulty / 2);
}

// Bonus grains awarded when the apprentice passes the Elder's prova.
export const GRAINS_PROVA_BONUS = 10;

// === Spend prices ==========================================================

/** Convert 1 grão into +5 Cinder vitality (clamped at 100 by feedCinder). */
export const FEED_PRICE_GRAINS    = 1;
export const FEED_VITALITY_GAIN   = 5;

/** Re-roll the current exercise — swap to another from the same family. */
export const REROLL_PRICE_GRAINS  = 2;

/** Reveal the answer without breaking the family streak (skips recordWrong).
 *  Cheaper than the user's first instinct (5g) so it's a reachable option. */
export const REVEAL_PRICE_GRAINS  = 3;
