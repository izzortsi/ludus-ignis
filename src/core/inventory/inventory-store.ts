// Inventory store. Holds an items map keyed by ItemId; pure-logic
// transitions live in inventory-logic.ts. Spend returns whether the
// transaction succeeded so UI callers can refuse + show a "no funds"
// hint without mutating state.

import { createStore } from 'solid-js/store';
import {
  emptyInventory,
  type InventoryState,
  type ItemId,
  countOf as countOfPure,
  addItem as addItemPure,
  spendItem as spendItemPure
} from './inventory-logic';
import { restoreInventory } from '../../persistence/local-storage';

function initial(): InventoryState {
  const saved = restoreInventory();
  if (saved && typeof saved === 'object' && saved.items && typeof saved.items === 'object') {
    return { items: { ...saved.items } };
  }
  return emptyInventory();
}

const [inventory, setInventory] = createStore<InventoryState>(initial());

export function add(id: ItemId, n: number): void {
  if (n <= 0) return;
  const next = addItemPure(inventory, id, n);
  setInventory({ items: next.items });
}

// Returns true if the spend went through, false if the apprentice didn't
// have enough. UI callers gate buttons on countOf(...) before invoking,
// but the boolean check is also a defensive guard.
export function spend(id: ItemId, n: number): boolean {
  const next = spendItemPure(inventory, id, n);
  if (!next) return false;
  setInventory({ items: next.items });
  return true;
}

export function countOf(id: ItemId): number {
  return countOfPure(inventory, id);
}

export function restoreInventoryFrom(state: InventoryState): void {
  setInventory({ items: { ...state.items } });
}

export { inventory };
