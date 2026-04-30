// Apprentice position + walk intent. The Apprentice is a single tile on
// the camp map; movement is one cell per tick toward `target` (set by tap).
// `intent` is non-null when the tap was on an interactable — once we
// arrive at the approach cell, the CampMap reads `intent` to open the
// matching dialog and clears it.

import { createStore } from 'solid-js/store';
import {
  APPRENTICE_SPAWN,
  isWalkable,
  type InteractableId
} from '../../ui/map/map-art';
import { restoreApprentice } from '../../persistence/local-storage';

export interface ApprenticeState {
  row: number;
  col: number;
  target: { row: number; col: number } | null;
  intent: InteractableId | null;
}

function initial(): ApprenticeState {
  const saved = restoreApprentice();
  if (saved && isWalkable(saved.row, saved.col)) {
    return { row: saved.row, col: saved.col, target: null, intent: null };
  }
  return { row: APPRENTICE_SPAWN.row, col: APPRENTICE_SPAWN.col, target: null, intent: null };
}

export const [apprentice, setApprentice] = createStore<ApprenticeState>(initial());

export function setTarget(row: number, col: number, intent: InteractableId | null): void {
  setApprentice({ target: { row, col }, intent });
}

export function clearTarget(): void {
  setApprentice({ target: null, intent: null });
}

export function setPosition(row: number, col: number): void {
  setApprentice({ row, col });
}

export function clearIntent(): void {
  setApprentice({ intent: null });
}
