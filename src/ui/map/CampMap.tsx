import { createSignal, onMount, onCleanup, createEffect, createMemo, Show } from 'solid-js';
import {
  TERRAIN, MAP_DIMS,
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
const SPRITE_FRAMES = ['ô', 'Ô']; // alternating walk-cycle glyph

function sign(n: number): number {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}

export function CampMap() {
  const [walkTick, setWalkTick] = createSignal(0);
  const [dialog, setDialog] = createSignal<InteractableId | null>(null);

  // Persist position whenever it changes (cheap; 1-2 writes per second
  // during a walk, then idle).
  createEffect(() => {
    persistApprentice({ row: apprentice.row, col: apprentice.col });
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

  // Tap → grid cell. We snap to the nearest cell using the stage's
  // bounding rect; the stage uses ch/lh units so the cell aspect matches
  // var(--cols) × var(--rows) exactly.
  function onTap(e: MouseEvent) {
    const stage = e.currentTarget as HTMLDivElement;
    const rect = stage.getBoundingClientRect();
    const col = Math.floor(((e.clientX - rect.left) / rect.width)  * MAP_DIMS.cols);
    const row = Math.floor(((e.clientY - rect.top)  / rect.height) * MAP_DIMS.rows);

    if (row < 0 || row >= MAP_DIMS.rows || col < 0 || col >= MAP_DIMS.cols) return;

    const target = interactableAt(row, col);
    if (target) {
      const ap = approachFor(target);
      setTarget(ap.row, ap.col, target);
      return;
    }

    // Free move — only set target if the tapped cell (or a nearby fallback)
    // is walkable.
    if (isWalkable(row, col)) {
      setTarget(row, col, null);
      return;
    }
    // Try a few nearby cells before giving up
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]) {
      if (isWalkable(row + dr, col + dc)) {
        setTarget(row + dr, col + dc, null);
        return;
      }
    }
  }

  function closeDialog() {
    setDialog(null);
  }

  return (
    <div class="camp-map">
      <div
        class="map-stage"
        style={{ '--cols': MAP_DIMS.cols, '--rows': MAP_DIMS.rows }}
        onClick={onTap}
      >
        <pre class="map-filler">{Array(MAP_DIMS.rows).fill(' '.repeat(MAP_DIMS.cols)).join('\n')}</pre>
        <pre class="map-layer map-terrain">{TERRAIN.join('\n')}</pre>
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
