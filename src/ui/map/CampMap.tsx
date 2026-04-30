import { createSignal, onMount, onCleanup, createEffect, createMemo, Show } from 'solid-js';
import {
  TERRAIN, MAP_DIMS, FRAMES,
  HEARTH_FIRE_FRAMES, CINDER_FIRE_FRAMES,
  isWalkable, interactableAt, approachFor,
  type InteractableId
} from './map-art';
import {
  apprentice, setTarget, clearTarget, setPosition, clearIntent
} from '../../core/apprentice/apprentice-store';
import { persistApprentice } from '../../persistence/local-storage';
import { ElderFireDialog } from './ElderFireDialog';
import { CinderDialog } from './CinderDialog';

const STEP_MS = 140;
const FIRE_TICK_MS = 120;
const SPRITE_FRAMES = ['ô', 'Ô']; // alternating walk-cycle glyph

function sign(n: number): number {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}

export function CampMap() {
  const [walkTick, setWalkTick] = createSignal(0);
  const [fireTick, setFireTick] = createSignal(0);
  const [dialog, setDialog] = createSignal<InteractableId | null>(null);

  // Persist position whenever it changes (cheap; 1-2 writes per second
  // during a walk, then idle).
  createEffect(() => {
    persistApprentice({ row: apprentice.row, col: apprentice.col });
  });

  // Fire animation tick — independent of walk loop so flames flicker even
  // when standing still.
  onMount(() => {
    const id = window.setInterval(() => setFireTick((t) => (t + 1) % FRAMES), FIRE_TICK_MS);
    onCleanup(() => clearInterval(id));
  });

  // Walk loop — ticks while target is set; stepping toward target one cell
  // per STEP_MS. Slides along walls if the diagonal step is blocked.
  onMount(() => {
    const id = window.setInterval(() => {
      const tgt = apprentice.target;
      if (!tgt) return;

      const dr = sign(tgt.row - apprentice.row);
      const dc = sign(tgt.col - apprentice.col);

      // Already there → clear target; trigger dialog if intent was set.
      if (dr === 0 && dc === 0) {
        const intent = apprentice.intent;
        clearTarget();
        if (intent) {
          setDialog(intent);
          clearIntent();
        }
        return;
      }

      // Greedy step: try diagonal, then horizontal-only, then vertical-only.
      const nr = apprentice.row, nc = apprentice.col;
      const candidates: Array<[number, number]> = [];
      if (dr !== 0 && dc !== 0) candidates.push([nr + dr, nc + dc]);
      if (dc !== 0)              candidates.push([nr,      nc + dc]);
      if (dr !== 0)              candidates.push([nr + dr, nc]);

      for (const [r, c] of candidates) {
        if (isWalkable(r, c)) {
          setPosition(r, c);
          setWalkTick((t) => t + 1);
          return;
        }
      }

      // Fully blocked: give up on this target.
      clearTarget();
    }, STEP_MS);
    onCleanup(() => clearInterval(id));
  });

  // Sprite layer — single char at the Apprentice's current position.
  const sprite = createMemo(() => {
    const glyph = SPRITE_FRAMES[walkTick() % SPRITE_FRAMES.length];
    const lines: string[] = [];
    for (let r = 0; r < MAP_DIMS.rows; r++) {
      if (r === apprentice.row) {
        const before = ' '.repeat(apprentice.col);
        const after  = ' '.repeat(MAP_DIMS.cols - apprentice.col - 1);
        lines.push(before + glyph + after);
      } else {
        lines.push(' '.repeat(MAP_DIMS.cols));
      }
    }
    return lines.join('\n');
  });

  // Tap-and-hold movement. Pointer down → set target; while held → target
  // follows the pointer; on release → stop unless heading to an
  // interactable (in which case finish the walk + open the dialog).

  let isHolding = false;

  function cellAt(e: PointerEvent, stage: HTMLDivElement): { row: number; col: number } | null {
    const rect = stage.getBoundingClientRect();
    const col = Math.floor(((e.clientX - rect.left) / rect.width)  * MAP_DIMS.cols);
    const row = Math.floor(((e.clientY - rect.top)  / rect.height) * MAP_DIMS.rows);
    if (row < 0 || row >= MAP_DIMS.rows || col < 0 || col >= MAP_DIMS.cols) return null;
    return { row, col };
  }

  function setTargetForCell(row: number, col: number) {
    const id = interactableAt(row, col);
    if (id) {
      const ap = approachFor(id);
      setTarget(ap.row, ap.col, id);
      return;
    }
    if (isWalkable(row, col)) {
      setTarget(row, col, null);
      return;
    }
    // Try a few nearby cells if the exact tap landed on a tree/etc.
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]) {
      if (isWalkable(row + dr, col + dc)) {
        setTarget(row + dr, col + dc, null);
        return;
      }
    }
  }

  function onPointerDown(e: PointerEvent) {
    isHolding = true;
    const stage = e.currentTarget as HTMLDivElement;
    stage.setPointerCapture(e.pointerId);
    const cell = cellAt(e, stage);
    if (cell) setTargetForCell(cell.row, cell.col);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isHolding) return;
    const stage = e.currentTarget as HTMLDivElement;
    const cell = cellAt(e, stage);
    if (cell) setTargetForCell(cell.row, cell.col);
  }

  function endHold() {
    isHolding = false;
    // If walking toward an interactable, keep going (don't cancel mid-walk).
    if (apprentice.intent !== null) return;
    // Otherwise stop where we are.
    clearTarget();
  }

  function closeDialog() {
    setDialog(null);
  }

  return (
    <div class="camp-map">
      <div
        class="map-stage"
        style={{ '--cols': MAP_DIMS.cols, '--rows': MAP_DIMS.rows }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endHold}
        onPointerCancel={endHold}
      >
        <pre class="map-filler">{Array(MAP_DIMS.rows).fill(' '.repeat(MAP_DIMS.cols)).join('\n')}</pre>
        <pre class="map-layer map-terrain">{TERRAIN.join('\n')}</pre>
        <pre class="map-layer map-hearth-fire">{HEARTH_FIRE_FRAMES[fireTick()]}</pre>
        <pre class="map-layer map-cinder-fire">{CINDER_FIRE_FRAMES[fireTick()]}</pre>
        <pre class="map-layer map-apprentice">{sprite()}</pre>
      </div>

      <Show when={dialog() === 'hearth'}>
        <ElderFireDialog onClose={closeDialog} />
      </Show>
      <Show when={dialog() === 'cinder'}>
        <CinderDialog onClose={closeDialog} />
      </Show>
    </div>
  );
}
