import { Show, createMemo, createSignal, onMount, onCleanup, createEffect, untrack } from 'solid-js';
import { Typewriter } from '../components/Typewriter';
import { SpeechPresentation, type SpeechPart } from '../map/SpeechPresentation';
import {
  FRAMES, TWINKLE_FRAMES,
  CAMP_DIMS, RIO_DIMS, MIRROR_DIMS, type SceneDims,
  STAR_FIELD, STARS_MED_FRAMES, STARS_BRIGHT_FRAMES,
  AURORA_FRAMES, AURORA_FRAMES_COUNT,
  MOUNTAINS_FAR, MOUNTAINS_NEAR, GROUND,
  TENDER, APPRENTICE, WALKING_FRAMES, WALKING_FRAMES_COUNT,
  WALK_PAIR_BEHIND_FRAMES, WALK_PAIR_FRONT_FRAMES, WALK_PAIR_FRAMES_COUNT,
  DANCING_TRIBE_FRAMES,
  HUT_FRAME, APPRENTICE_IN_BED, SUN,
  HEARTH_PIT, HEARTH_FIRE_FRAMES,
  HEARTH_SMOKE_FRAMES, HEARTH_EMBER_FRAMES,
  BREEZE_FRAMES,
  CINDER_VESSEL, CINDER_FIRE_FRAMES, CINDER_KINDLE_FRAMES,
  CINDER_SMOKE_FRAMES, EMBER_FALL_FRAMES,
  RIO_MIYAKE, MIRROR_LEAK
} from './scene-art';
import { cinder, setCinder } from '../../core/cinder/cinder-store';

const TICK_MS = 140;
const TYPE_MS = 32;

type Phase =
  // Prelude — Tender's framing monologue interleaved with two dense
  // flashbacks (the CME spiral over Rio, the mirror leak).
  | 'text1' | 'flashback1'
  | 'text2' | 'flashback2'
  | 'text3'
  // Ritual proper — the Apprentice's initiation.
  | 'wake_dream'        //  6. Apprentice wakes in bed, monologue
  | 'walking_to_fire'   //  7. Tender + Apprentice walk in to the Hearth
  | 'arriving'          //  8. Tribe arrives (4 walkers + progressive far-tier pop)
  | 'dancing'           //  9. Ritual dance (no cinder yet)
  | 'lore_speech'       // 10. Elder Fire speaks the lore to the Apprentice
  | 'receiving_cinder'  // 11. Cinder vessel + ember falls + cinder kindles
  | 'black_wake'        // 12. Cut to black: "Acorda."
  | 'morning'           // 13. Apprentice alone with named Cinder, dim dawn
  | 'test_morning';     // 14. Sandbox: brighter daylight pass for iteration

const PHASE_ORDER: readonly Phase[] = [
  'text1', 'flashback1', 'text2', 'flashback2', 'text3',
  'wake_dream', 'walking_to_fire', 'arriving',
  'dancing', 'lore_speech', 'receiving_cinder',
  'black_wake', 'morning', 'test_morning'
];

// Flashbacks auto-advance after their viewing window; everything else
// waits for click (or its own internal control like SpeechPresentation).
const PHASE_DURATIONS: Partial<Record<Phase, number>> = {
  flashback1: 5500,
  flashback2: 5500
};

// The Hearth-Tender's opening monologue, framed around the lore.
const TEXTS: Partial<Record<Phase, string>> = {
  text1:
    'Escutem. O fogo está bom esta noite. Puxem a pele para perto.',
  text2:
    'Vocês já viram o futuro chegar. Já se perguntaram se a chuva cairá, se a caça passará pelo vale do oeste, se a criança viverá. Falam dessas coisas com palavras como talvez e provavelmente.',
  text3:
    'Quero dizer a vocês que o talvez não é nada. É uma forma de saber — uma forma que o amanhã lança de volta sobre o hoje. Aqueles do outro lado das águas grandes aprenderam a pesar essa forma. Aqui está um pouco do que aprenderam.'
};

// The Apprentice's monologue waking from the dream (phase 1).
const APPRENTICE_DREAM_TEXT =
  'Tive o sonho mais estranho... e hoje, hoje é o Dia do Ritual.';

// Lore monologue spoken by the Elder Fire during phase 5. Placeholder — the
// user will iterate. Tone: solemn, terse, hard-SF lore (CME / Age of Men).
const LORE_PARTS: SpeechPart[] = [
  { text: 'Aproxima-te. Senta. O fogo escuta.' },
  { text: 'Houve uma Era dos Homens. Eram muitos. Construíam com aço, e o céu era amigo.' },
  { text: 'Mas o Sol se voltou contra eles. Soltou a serpente verde — e ela ainda gira lá em cima, onde podes ver.' },
  { text: 'As cidades silenciaram. As águas grandes engoliram o que sobrou. Os antigos morreram.' },
  { text: 'Nós somos os que ficaram. Poucos, sob a serpente.' },
  { text: 'O fogo é o que nos resta dos antigos. Hoje, recebes o teu.', variant: 'directive' }
];

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

// Centered typewriter overlay for prelude monologues. `position="bottom"`
// shifts it to the lower edge so it doesn't collide with rendered scene
// art (e.g. the bed in wake_dream).
function IntroTypewriter(props: { text: string; position?: 'center' | 'bottom' }) {
  const pos = props.position ?? 'center';
  return (
    <div class={`intro-typewriter ${pos === 'bottom' ? 'is-bottom' : ''}`}>
      <p class="intro-typewriter-text">
        <Typewriter text={props.text} speedMs={TYPE_MS} />
      </p>
    </div>
  );
}

export function IntroScene(props: Props) {
  const [tick, setTick] = createSignal(0);
  const [phase, setPhase] = createSignal<Phase>('text1');
  const [nameInput, setNameInput] = createSignal('');
  const [nameChosen, setNameChosen] = createSignal(false);

  function submitName(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();
    const name = nameInput().trim();
    if (!name) return;
    setCinder('name', name);
    setNameChosen(true);
  }

  onMount(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    onCleanup(() => clearInterval(id));
  });

  // Auto-advance for phases with a duration (the two flashbacks).
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

  // Click-to-advance, except in phases that own their own input (lore_speech
  // is driven by SpeechPresentation; test_morning is the final sandbox and
  // has the "começar" button). Morning advances to the test_morning sandbox
  // on click — clicks on the "começar" button itself are stopPropagated so
  // they reach onBegin without triggering this handler.
  function onClick() {
    if (phase() === 'lore_speech' || phase() === 'test_morning') return;
    const n = nextPhase(phase());
    if (n) setPhase(n);
  }

  function onBegin() {
    props.onComplete();
  }

  const f           = createMemo(() => tick() % FRAMES);
  const starFrame   = createMemo(() => tick() % TWINKLE_FRAMES);
  const auroraFrame = createMemo(() => tick() % AURORA_FRAMES_COUNT);

  // Tick relative to the current phase's entry — so per-phase animations
  // (walks, pop-ins) start fresh on each transition and hold their final
  // frame instead of looping.
  const [phaseEnteredTick, setPhaseEnteredTick] = createSignal(0);
  createEffect(() => {
    phase(); // track only phase changes
    setPhaseEnteredTick(untrack(tick));
  });
  const phaseTick = createMemo(() => tick() - phaseEnteredTick());

  const walkIdx     = createMemo(() => Math.min(phaseTick(), WALKING_FRAMES_COUNT - 1));
  const walkPairIdx = createMemo(() => Math.min(phaseTick(), WALK_PAIR_FRAMES_COUNT - 1));

  // Phase groupings.
  const isNightCamp = createMemo(
    () => phase() === 'walking_to_fire' || phase() === 'arriving'
       || phase() === 'dancing'         || phase() === 'lore_speech'
       || phase() === 'receiving_cinder'
  );
  const isMorningCamp = createMemo(() => phase() === 'morning');
  const isTestMorning = createMemo(() => phase() === 'test_morning');
  const isBedScene    = createMemo(() => phase() === 'wake_dream');
  const isBlackScene  = createMemo(() => phase() === 'black_wake');
  const isTextPhase   = createMemo(
    () => phase() === 'text1' || phase() === 'text2' || phase() === 'text3'
  );

  // Each phase declares its own canvas dims. Flashbacks use their dense
  // portrait canvases (taller than camp); everything else uses CAMP_DIMS so
  // the stage doesn't reflow between text/camp/bed/black phases.
  function dimsFor(p: Phase): SceneDims {
    if (p === 'flashback1') return RIO_DIMS;
    if (p === 'flashback2') return MIRROR_DIMS;
    return CAMP_DIMS;
  }
  const dims = createMemo(() => dimsFor(phase()));

  return (
    <div class={`intro-root ${isBlackScene() ? 'is-black' : ''} ${isBedScene() ? 'is-bed' : ''} ${isTestMorning() ? 'is-test-morning' : ''}`} onClick={onClick}>
      <div
        class={`intro-stage ${isBlackScene() ? 'is-black' : ''} ${isBedScene() ? 'is-bed' : ''} ${isTestMorning() ? 'is-test-morning' : ''}`}
        style={{
          '--cols': dims().cols,
          '--rows': dims().rows
        }}
      >
        {/* sizing filler so the absolutely-positioned layers have a parent */}
        <pre class="intro-filler">{Array(dims().rows).fill(' '.repeat(dims().cols)).join('\n')}</pre>

        {/* === bed scene (wake_dream) ============================ */}
        <Show when={isBedScene()}>
          <Layer art={HUT_FRAME} className="intro-hut" />
          <Layer art={APPRENTICE_IN_BED} className="intro-bed-figure" />
        </Show>

        {/* === night-camp shared landscape ======================= */}
        <Show when={isNightCamp()}>
          <Layer art={STAR_FIELD} className="intro-stars-base" />
          <Layer art={STARS_MED_FRAMES[starFrame()]} className="intro-stars-med" />
          <Layer art={STARS_BRIGHT_FRAMES[starFrame()]} className="intro-stars-bright" />
          <Layer art={AURORA_FRAMES[auroraFrame()]} className="intro-aurora" />
          <Layer art={MOUNTAINS_FAR} className="intro-mountains-far" />
          <Layer art={MOUNTAINS_NEAR} className="intro-mountains-near" />
          <Layer art={GROUND} className="intro-ground" />
          <Layer art={HEARTH_PIT} className="intro-hearth-pit" />

          {/* walking_to_fire's Apprentice renders BEFORE the fire so she
              passes behind the flames as she walks past. */}
          <Show when={phase() === 'walking_to_fire'}>
            <Layer art={WALK_PAIR_BEHIND_FRAMES[walkPairIdx()]} className="intro-apprentice" />
          </Show>

          <Layer art={HEARTH_FIRE_FRAMES[f()]} className="intro-hearth-fire" />
          <Layer art={HEARTH_EMBER_FRAMES[f()]} className="intro-hearth-embers" />
          <Layer art={HEARTH_SMOKE_FRAMES[f()]} className="intro-hearth-smoke" />
          <Layer art={BREEZE_FRAMES[f()]} className="intro-breeze" />

          {/* walking_to_fire's Tender stays on the left of the fire and so
              renders in front of the flames here (no overlap risk). */}
          <Show when={phase() === 'walking_to_fire'}>
            <Layer art={WALK_PAIR_FRONT_FRAMES[walkPairIdx()]} className="intro-tender" />
          </Show>

          {/* arriving — outer 4 walk in (front-row baked frames), back row
              pops in over time, Tender + Apprentice always-there. */}
          <Show when={phase() === 'arriving'}>
            <Layer art={WALKING_FRAMES[walkIdx()]} className="intro-tribe" />
            <Layer art={TENDER} className="intro-tender" />
            <Layer art={APPRENTICE} className="intro-apprentice" />
          </Show>

          {/* dancing + lore_speech — same composition: front-row tribe +
              back row + Tender dancing, no cinder yet. */}
          <Show when={phase() === 'dancing' || phase() === 'lore_speech'}>
            <Layer art={DANCING_TRIBE_FRAMES[f()]} className="intro-tribe-dancing" />
            <Layer art={APPRENTICE} className="intro-apprentice" />
          </Show>

          {/* receiving_cinder — dance continues; cinder vessel + ember
              fall + kindle animation play out. */}
          <Show when={phase() === 'receiving_cinder'}>
            <Layer art={DANCING_TRIBE_FRAMES[f()]} className="intro-tribe-dancing" />
            <Layer art={APPRENTICE} className="intro-apprentice" />
            <Layer art={CINDER_VESSEL} className="intro-cinder-vessel" />
            <Layer art={EMBER_FALL_FRAMES[f()]} className="intro-ember-fall" />
            <Layer art={CINDER_KINDLE_FRAMES[f()]} className="intro-cinder-fire" />
          </Show>
        </Show>

        {/* === flashbacks (text2/text3 prelude) ================== */}
        <Show when={phase() === 'flashback1'}>
          <Layer art={RIO_MIYAKE} className="intro-rio" />
        </Show>
        <Show when={phase() === 'flashback2'}>
          <Layer art={MIRROR_LEAK} className="intro-mirror" />
        </Show>

        {/* === morning camp (daylight, alone) ==================== */}
        <Show when={isMorningCamp()}>
          <Layer art={MOUNTAINS_FAR} className="intro-mountains-far is-morning" />
          <Layer art={MOUNTAINS_NEAR} className="intro-mountains-near is-morning" />
          <Layer art={GROUND} className="intro-ground" />
          <Layer art={HEARTH_PIT} className="intro-hearth-pit" />
          <Layer art={HEARTH_FIRE_FRAMES[f()]} className="intro-hearth-fire is-morning" />
          <Layer art={HEARTH_SMOKE_FRAMES[f()]} className="intro-hearth-smoke" />
          <Layer art={BREEZE_FRAMES[f()]} className="intro-breeze" />
          <Layer art={APPRENTICE} className="intro-apprentice" />
          <Layer art={CINDER_VESSEL} className="intro-cinder-vessel" />
          <Layer art={CINDER_FIRE_FRAMES[f()]} className="intro-cinder-fire" />
          <Layer art={CINDER_SMOKE_FRAMES[f()]} className="intro-cinder-smoke" />
        </Show>

        {/* === test_morning (sandbox: bright daylight) =========== */}
        <Show when={isTestMorning()}>
          <Layer art={SUN} className="intro-sun" />
          <Layer art={MOUNTAINS_FAR} className="intro-mountains-far is-test-morning" />
          <Layer art={MOUNTAINS_NEAR} className="intro-mountains-near is-test-morning" />
          <Layer art={GROUND} className="intro-ground is-test-morning" />
          <Layer art={HEARTH_PIT} className="intro-hearth-pit" />
          <Layer art={HEARTH_FIRE_FRAMES[f()]} className="intro-hearth-fire is-test-morning" />
          {/* Doubled smoke: same animation reused at two staggered frame
              offsets so streams overlap without identical glyph cells —
              reads as a denser smoke column than the night fire. */}
          <Layer art={HEARTH_SMOKE_FRAMES[f()]} className="intro-hearth-smoke is-test-morning" />
          <Layer art={HEARTH_SMOKE_FRAMES[(f() + 5) % FRAMES]} className="intro-hearth-smoke is-test-morning is-extra" />
          <Layer art={HEARTH_SMOKE_FRAMES[(f() + 10) % FRAMES]} className="intro-hearth-smoke is-test-morning is-extra" />
          <Layer art={BREEZE_FRAMES[f()]} className="intro-breeze" />
          <Layer art={APPRENTICE} className="intro-apprentice is-test-morning" />
          <Layer art={CINDER_VESSEL} className="intro-cinder-vessel is-test-morning" />
          <Layer art={CINDER_FIRE_FRAMES[f()]} className="intro-cinder-fire is-test-morning" />
          <Layer art={CINDER_SMOKE_FRAMES[f()]} className="intro-cinder-smoke is-test-morning" />
        </Show>
      </div>

      {/* === text overlays =========================================== */}
      <Show when={isTextPhase()}>
        <IntroTypewriter text={TEXTS[phase()]!} />
      </Show>

      <Show when={phase() === 'wake_dream'}>
        <IntroTypewriter text={APPRENTICE_DREAM_TEXT} position="bottom" />
      </Show>

      <Show when={phase() === 'walking_to_fire'}>
        <p class="intro-subtitle">o Velho me leva ao Fogo Ancião.</p>
      </Show>

      <Show when={phase() === 'arriving'}>
        <p class="intro-subtitle">a tribo se reúne.</p>
      </Show>

      <Show when={phase() === 'dancing'}>
        <p class="intro-subtitle">a dança começa.</p>
      </Show>

      <Show when={phase() === 'receiving_cinder'}>
        <p class="intro-subtitle">a brasa passa.</p>
      </Show>

      <Show when={phase() === 'black_wake'}>
        <p class="intro-wake-text">Acorda.</p>
      </Show>

      <Show when={phase() === 'morning' || phase() === 'test_morning'}>
        <div class="intro-naming" onClick={(e) => e.stopPropagation()}>
          <Show
            when={nameChosen()}
            fallback={
              <form class="intro-name-form" onSubmit={submitName}>
                <p class="intro-name-prompt">dá um nome à tua brasa.</p>
                <input
                  class="intro-name-input"
                  type="text"
                  value={nameInput()}
                  onInput={(e) => setNameInput(e.currentTarget.value)}
                  maxlength="20"
                  autocomplete="off"
                  spellcheck={false}
                  autofocus
                />
                <button type="submit" class="intro-begin" disabled={nameInput().trim().length === 0}>
                  nomear →
                </button>
              </form>
            }
          >
            <p class="intro-cinder-says">
              <em>"eu sou {cinder.name}."</em>
            </p>
            <button class="intro-begin" onClick={onBegin}>
              começar
            </button>
          </Show>
        </div>
      </Show>

      {/* === lore speech overlay ===================================== */}
      <Show when={phase() === 'lore_speech'}>
        <SpeechPresentation
          speaker="Fogo Ancião"
          parts={LORE_PARTS}
          finalHint="receber a brasa →"
          onClose={() => setPhase('receiving_cinder')}
        />
      </Show>

      <Show when={phase() !== 'morning' && phase() !== 'test_morning' && phase() !== 'lore_speech'}>
        <p class="intro-skip-hint">toque para continuar</p>
      </Show>

      <Show when={phase() === 'morning'}>
        <p class="intro-skip-hint">→ toque para variante de manhã</p>
      </Show>
    </div>
  );
}
