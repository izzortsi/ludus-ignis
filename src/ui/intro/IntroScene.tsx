import { Show, createMemo, createSignal, onMount, onCleanup, createEffect } from 'solid-js';
import {
  FRAMES, TWINKLE_FRAMES,
  CAMP_DIMS, RIO_DIMS, type SceneDims,
  STAR_FIELD, STARS_MED_FRAMES, STARS_BRIGHT_FRAMES, SKY_BOW,
  MOUNTAINS_FAR, MOUNTAINS_NEAR, GROUND,
  TRIBE_SLEEPING, TENDER, APPRENTICE,
  HEARTH_CART, HEARTH_FIRE_FRAMES,
  HEARTH_SMOKE_FRAMES, HEARTH_EMBER_FRAMES,
  BREEZE_FRAMES,
  CINDER_VESSEL, CINDER_FIRE_FRAMES, CINDER_KINDLE_FRAMES,
  CINDER_SMOKE_FRAMES, EMBER_FALL_FRAMES,
  RIO_SPIKES, RIO_CURL, RIO_LAND, RIO_WATER, RIO_CITY,
  MIRROR_LEAK_BACK, MIRROR_LEAK_WATER, MIRROR_LEAK_OUTER,
  MIRROR_LEAK_MID, MIRROR_LEAK_CORE, MIRROR_LEAK_HUSKS
} from './scene-art';
import { cinder } from '../../core/cinder/cinder-store';

const TICK_MS = 140;
const TYPE_MS = 32;

type Phase =
  | 'text1' | 'flashback1'
  | 'text2' | 'flashback2'
  | 'text3'
  | 'dawn' | 'kindle' | 'named';

const PHASE_ORDER: readonly Phase[] = [
  'text1', 'flashback1', 'text2', 'flashback2', 'text3',
  'dawn', 'kindle', 'named'
];

// Only flashbacks auto-advance — text screens and camp scenes wait for click.
const PHASE_DURATIONS: Partial<Record<Phase, number>> = {
  flashback1: 5500,
  flashback2: 5500
};

// The Hearth-Tender's opening monologue — translated and lightly adapted
// to the lore (the antigos / águas grandes invoking the lost civilization).
const TEXTS: Partial<Record<Phase, string>> = {
  text1:
    'Escutem. O fogo está bom esta noite. Puxem a pele para perto.',
  text2:
    'Vocês já viram o futuro chegar. Já se perguntaram se a chuva cairá, se a caça passará pelo vale do oeste, se a criança viverá. Falam dessas coisas com palavras como talvez e provavelmente.',
  text3:
    'Quero dizer a vocês que o talvez não é nada. É uma forma de saber — uma forma que o amanhã lança de volta sobre o hoje. Aqueles do outro lado das águas grandes aprenderam a pesar essa forma. Aqui está um pouco do que aprenderam.'
};

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
  return (
    <pre class={`intro-layer ${props.className}`}>
      {typeof props.art === 'string' ? props.art : props.art.join('\n')}
    </pre>
  );
}

// Typewriter — reveals text char by char. Restarts when text changes.
function Typewriter(props: { text: string }) {
  const [shown, setShown] = createSignal(0);
  let intervalId: number | null = null;

  function clearTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  createEffect(() => {
    const text = props.text;
    setShown(0);
    clearTimer();
    intervalId = window.setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          clearTimer();
          return n;
        }
        return n + 1;
      });
    }, TYPE_MS);
  });

  onCleanup(clearTimer);

  const isDone = createMemo(() => shown() >= props.text.length);

  return (
    <div class="intro-typewriter">
      <p class="intro-typewriter-text">
        {props.text.slice(0, shown())}
        {!isDone() && <span class="intro-cursor">_</span>}
      </p>
    </div>
  );
}

export function IntroScene(props: Props) {
  const [tick, setTick] = createSignal(0);
  const [phase, setPhase] = createSignal<Phase>('text1');

  onMount(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    onCleanup(() => clearInterval(id));
  });

  // Auto-advance only for phases with a duration (flashbacks).
  let advanceTimer: number | null = null;
  function scheduleAutoAdvance() {
    if (advanceTimer !== null) clearTimeout(advanceTimer);
    const ms = PHASE_DURATIONS[phase()];
    if (ms == null) return;
    advanceTimer = window.setTimeout(() => {
      const n = nextPhase(phase());
      if (n) setPhase(n);
    }, ms);
  }
  createEffect(() => {
    phase(); // track
    scheduleAutoAdvance();
  });
  onCleanup(() => {
    if (advanceTimer !== null) clearTimeout(advanceTimer);
  });

  // Click anywhere advances any phase (named has its own button).
  function onClick() {
    if (phase() === 'named') return;
    const n = nextPhase(phase());
    if (n) setPhase(n);
  }

  function onBegin() {
    props.onComplete();
  }

  const f         = createMemo(() => tick() % FRAMES);
  const starFrame = createMemo(() => tick() % TWINKLE_FRAMES);

  const isCampPhase = createMemo(
    () => phase() === 'dawn' || phase() === 'kindle' || phase() === 'named'
  );
  const isTextPhase = createMemo(
    () => phase() === 'text1' || phase() === 'text2' || phase() === 'text3'
  );

  // Each scene declares its own canvas. Text phases reuse the camp dims so
  // the stage doesn't reflow to nothing while the typewriter is running.
  function dimsFor(p: Phase): SceneDims {
    if (p === 'flashback1') return RIO_DIMS;
    return CAMP_DIMS;
  }
  const dims = createMemo(() => dimsFor(phase()));

  return (
    <div class="intro-root" onClick={onClick}>
      <div
        class="intro-stage"
        style={{
          '--cols': dims().cols,
          '--rows': dims().rows
        }}
      >
        {/* sizing filler so the absolutely-positioned layers have a parent */}
        <pre class="intro-filler">{Array(dims().rows).fill(' '.repeat(dims().cols)).join('\n')}</pre>

        {/* === camp scene — dawn / kindle / named === */}
        <Show when={isCampPhase()}>
          <Layer art={STAR_FIELD} className="intro-stars-base" />
          <Layer art={STARS_MED_FRAMES[starFrame()]} className="intro-stars-med" />
          <Layer art={STARS_BRIGHT_FRAMES[starFrame()]} className="intro-stars-bright" />
          <Layer art={SKY_BOW} className="intro-sky-bow" />
          <Layer art={MOUNTAINS_FAR} className="intro-mountains-far" />
          <Layer art={MOUNTAINS_NEAR} className="intro-mountains-near" />
          <Layer art={GROUND} className="intro-ground" />
          <Layer art={TRIBE_SLEEPING} className="intro-tribe" />
          <Layer art={HEARTH_CART} className="intro-cart" />
          <Layer art={HEARTH_FIRE_FRAMES[f()]} className="intro-hearth-fire" />
          <Layer art={HEARTH_EMBER_FRAMES[f()]} className="intro-hearth-embers" />
          <Layer art={HEARTH_SMOKE_FRAMES[f()]} className="intro-hearth-smoke" />
          <Layer art={BREEZE_FRAMES[f()]} className="intro-breeze" />
        </Show>

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

        {/* === flashbacks === */}
        <Show when={phase() === 'flashback1'}>
          <Layer art={RIO_SPIKES} className="intro-rio-spikes" />
          <Layer art={RIO_CURL}   className="intro-rio-curl" />
          <Layer art={RIO_LAND}   className="intro-rio-land" />
          <Layer art={RIO_WATER}  className="intro-rio-water" />
          <Layer art={RIO_CITY}   className="intro-rio-city" />
        </Show>
        <Show when={phase() === 'flashback2'}>
          <Layer art={MIRROR_LEAK_BACK} className="intro-mirror-back" />
          <Layer art={MIRROR_LEAK_WATER} className="intro-mirror-water" />
          <Layer art={MIRROR_LEAK_OUTER[f()]} className="intro-mirror-outer" />
          <Layer art={MIRROR_LEAK_MID[f()]} className="intro-mirror-mid" />
          <Layer art={MIRROR_LEAK_CORE[f()]} className="intro-mirror-core" />
          <Layer art={MIRROR_LEAK_HUSKS} className="intro-mirror-husks" />
        </Show>
      </div>

      {/* === text overlays === */}
      <Show when={isTextPhase()}>
        <Typewriter text={TEXTS[phase()]!} />
      </Show>

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
