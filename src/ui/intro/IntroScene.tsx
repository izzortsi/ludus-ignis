import { Show, createMemo, createSignal, onMount, onCleanup } from 'solid-js';
import {
  COLS, ROWS, ROW_PX, FRAMES, TWINKLE_FRAMES,
  STAR_FIELD, STARS_MED_FRAMES, STARS_BRIGHT_FRAMES, SKY_BOW,
  MOUNTAINS_FAR, MOUNTAINS_NEAR, GROUND,
  TRIBE_SLEEPING, TENDER, APPRENTICE,
  HEARTH_CART, HEARTH_FIRE_FRAMES,
  HEARTH_SMOKE_FRAMES, HEARTH_EMBER_FRAMES,
  BREEZE_FRAMES,
  CINDER_VESSEL, CINDER_FIRE_FRAMES, CINDER_KINDLE_FRAMES,
  CINDER_SMOKE_FRAMES, EMBER_FALL_FRAMES
} from './scene-art';
import { cinder } from '../../core/cinder/cinder-store';

const TICK_MS = 140;

type Phase = 'dawn' | 'kindle' | 'named';

const PHASE_ORDER: readonly Phase[] = ['dawn', 'kindle', 'named'];

function nextPhase(p: Phase): Phase | null {
  const i = PHASE_ORDER.indexOf(p);
  return i >= 0 && i + 1 < PHASE_ORDER.length ? PHASE_ORDER[i + 1] : null;
}

interface Props {
  onComplete: () => void;
}

interface LayerProps {
  art: string[] | string;
  className: string;
}

function Layer(props: LayerProps) {
  // Inline the text expression so it re-evaluates reactively as props.art
  // changes per animation tick. (Extracting `const text = ...` would freeze
  // it at mount time — Solid only tracks reactive reads inside JSX/memos.)
  return (
    <pre class={`intro-layer ${props.className}`}>
      {typeof props.art === 'string' ? props.art : props.art.join('\n')}
    </pre>
  );
}

export function IntroScene(props: Props) {
  const [tick, setTick] = createSignal(0);
  const [phase, setPhase] = createSignal<Phase>('dawn');

  // Tick grows unbounded; downstream memos modulo by their own frame counts
  // (FRAMES for fire/smoke/ember/breeze, TWINKLE_FRAMES for stars).
  onMount(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    onCleanup(() => clearInterval(id));
  });

  // Each scene is an art piece — no auto-advance. Player clicks to move on.
  function onClick() {
    if (phase() === 'named') return; // dedicated button
    const n = nextPhase(phase());
    if (n) setPhase(n);
  }

  function onBegin() {
    props.onComplete();
  }

  const f         = createMemo(() => tick() % FRAMES);
  const starFrame = createMemo(() => tick() % TWINKLE_FRAMES);

  return (
    <div class="intro-root" onClick={onClick}>
      <div
        class="intro-stage"
        style={{
          width: `${COLS}ch`,
          height: `${ROWS * ROW_PX}px`
        }}
      >
        {/* sizing filler so the absolutely-positioned layers have a parent */}
        <pre class="intro-filler">{Array(ROWS).fill(' '.repeat(COLS)).join('\n')}</pre>

        {/* === sky === */}
        <Layer art={STAR_FIELD} className="intro-stars-base" />
        <Layer art={STARS_MED_FRAMES[starFrame()]} className="intro-stars-med" />
        <Layer art={STARS_BRIGHT_FRAMES[starFrame()]} className="intro-stars-bright" />
        <Layer art={SKY_BOW} className="intro-sky-bow" />

        {/* === land === */}
        <Layer art={MOUNTAINS_FAR} className="intro-mountains-far" />
        <Layer art={MOUNTAINS_NEAR} className="intro-mountains-near" />
        <Layer art={GROUND} className="intro-ground" />

        {/* === camp — present in all phases === */}
        <Layer art={TRIBE_SLEEPING} className="intro-tribe" />
        <Layer art={HEARTH_CART} className="intro-cart" />
        <Layer art={HEARTH_FIRE_FRAMES[f()]} className="intro-hearth-fire" />
        <Layer art={HEARTH_EMBER_FRAMES[f()]} className="intro-hearth-embers" />
        <Layer art={HEARTH_SMOKE_FRAMES[f()]} className="intro-hearth-smoke" />
        <Layer art={BREEZE_FRAMES[f()]} className="intro-breeze" />

        {/* === phase-specific === */}
        <Show when={phase() === 'kindle' || phase() === 'named'}>
          <Layer art={TENDER} className="intro-tender" />
          <Layer art={APPRENTICE} className="intro-apprentice" />
          <Layer art={CINDER_VESSEL} className="intro-cinder-vessel" />
        </Show>

        <Show when={phase() === 'kindle'}>
          <Layer art={EMBER_FALL_FRAMES[f()]} className="intro-ember-fall" />
          <Layer art={CINDER_KINDLE_FRAMES[f()]} className="intro-cinder-fire" />
        </Show>

        <Show when={phase() === 'named'}>
          <Layer art={CINDER_FIRE_FRAMES[f()]} className="intro-cinder-fire" />
          <Layer art={CINDER_SMOKE_FRAMES[f()]} className="intro-cinder-smoke" />
        </Show>
      </div>

      {/* === text overlays === */}
      <Show when={phase() === 'dawn'}>
        <p class="intro-subtitle">uma manhã quieta.</p>
      </Show>

      <Show when={phase() === 'kindle'}>
        <p class="intro-subtitle">a brasa passa.</p>
      </Show>

      <Show when={phase() === 'named'}>
        <div class="intro-naming">
          <p class="intro-cinder-says">
            <em>"eu sou {cinder.name}."</em>
          </p>
          <button class="intro-begin" onClick={onBegin}>
            começar
          </button>
        </div>
      </Show>

      <Show when={phase() !== 'named'}>
        <p class="intro-skip-hint">toque para continuar</p>
      </Show>
    </div>
  );
}
