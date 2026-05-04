import { Show, createMemo, createSignal, onMount, onCleanup, createEffect, untrack } from 'solid-js';
import { Typewriter } from '../components/Typewriter';
import { SpeechPresentation, type SpeechPart } from '../map/SpeechPresentation';
import {
  FRAMES, TWINKLE_FRAMES,
  CAMP_DIMS, RIO_DIMS, MIRROR_DIMS, type SceneDims,
  STAR_FIELD, STARS_MED_FRAMES, STARS_BRIGHT_FRAMES,
  AURORA_FRAMES, AURORA_FRAMES_COUNT,
  MOUNTAINS_FAR, MOUNTAINS_NEAR, GROUND,
  HUT_FRAME, APPRENTICE_IN_BED, SUN,
  HEARTH_PIT, HEARTH_FIRE_FRAMES,
  HEARTH_SMOKE_FRAMES, HEARTH_EMBER_FRAMES,
  BREEZE_FRAMES,
  CINDER_VESSEL, CINDER_FIRE_FRAMES, CINDER_KINDLE_FRAMES,
  CINDER_SMOKE_FRAMES, EMBER_FALL_FRAMES,
  RIO_MIYAKE, MIRROR_LEAK
} from './scene-art';
import { HieroglyphFigures } from './HieroglyphFigures';
import { cinder, setCinder } from '../../core/cinder/cinder-store';
import { t } from '../../i18n';

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

// All intro narration is now sourced from the i18n dict; the helpers below
// re-pull the current locale on each call so language switching takes
// effect immediately.

function textFor(phase: Phase): string | undefined {
  if (phase === 'text1') return t().intro.text.one;
  if (phase === 'text2') return t().intro.text.two;
  if (phase === 'text3') return t().intro.text.three;
  return undefined;
}

function loreParts(): SpeechPart[] {
  const lore = t().intro.lore;
  return lore.map((line, i): SpeechPart => i === lore.length - 1
    ? { text: line, variant: 'directive' }
    : { text: line });
}

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

          <Layer art={HEARTH_FIRE_FRAMES[f()]} className="intro-hearth-fire" />
          <Layer art={HEARTH_EMBER_FRAMES[f()]} className="intro-hearth-embers" />
          <Layer art={HEARTH_SMOKE_FRAMES[f()]} className="intro-hearth-smoke" />
          <Layer art={BREEZE_FRAMES[f()]} className="intro-breeze" />

          {/* Tribe figures rendered as Egyptian hieroglyphs in a DOM
              overlay — the apprentice is internally hidden while
              traversing the fire's column range during walking_to_fire,
              same effect as the original WALK_PAIR_BEHIND mask. */}
          <HieroglyphFigures phase={phase()} tick={tick()} phaseTick={phaseTick()} />

          {/* receiving_cinder — Cinder vessel, ember fall, and the
              apprentice's own fire kindling. Rendered after the figure
              overlay so they sit in front of the apprentice hieroglyph. */}
          <Show when={phase() === 'receiving_cinder'}>
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
          <HieroglyphFigures phase={phase()} tick={tick()} phaseTick={phaseTick()} />
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
          <HieroglyphFigures phase={phase()} tick={tick()} phaseTick={phaseTick()} />
          <Layer art={CINDER_VESSEL} className="intro-cinder-vessel is-test-morning" />
          <Layer art={CINDER_FIRE_FRAMES[f()]} className="intro-cinder-fire is-test-morning" />
          <Layer art={CINDER_SMOKE_FRAMES[f()]} className="intro-cinder-smoke is-test-morning" />
        </Show>
      </div>

      {/* === text overlays =========================================== */}
      <Show when={isTextPhase()}>
        <IntroTypewriter text={textFor(phase())!} />
      </Show>

      <Show when={phase() === 'wake_dream'}>
        <IntroTypewriter text={t().intro.apprenticeDream} position="bottom" />
      </Show>

      <Show when={phase() === 'walking_to_fire'}>
        <p class="intro-subtitle">{t().intro.subtitle.walkingToFire}</p>
      </Show>

      <Show when={phase() === 'arriving'}>
        <p class="intro-subtitle">{t().intro.subtitle.arriving}</p>
      </Show>

      <Show when={phase() === 'dancing'}>
        <p class="intro-subtitle">{t().intro.subtitle.dancing}</p>
      </Show>

      <Show when={phase() === 'receiving_cinder'}>
        <p class="intro-subtitle">{t().intro.subtitle.receivingCinder}</p>
      </Show>

      <Show when={phase() === 'black_wake'}>
        <p class="intro-wake-text">{t().intro.wakeText}</p>
      </Show>

      <Show when={phase() === 'morning' || phase() === 'test_morning'}>
        <div class="intro-naming" onClick={(e) => e.stopPropagation()}>
          <Show
            when={nameChosen()}
            fallback={
              <form class="intro-name-form" onSubmit={submitName}>
                <p class="intro-name-prompt">{t().intro.nameForm.prompt}</p>
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
                  {t().intro.nameForm.submit}
                </button>
              </form>
            }
          >
            <p class="intro-cinder-says">
              <em>{t().intro.nameForm.cinderSays(cinder.name)}</em>
            </p>
            <button class="intro-begin" onClick={onBegin}>
              {t().intro.nameForm.begin}
            </button>
          </Show>
        </div>
      </Show>

      {/* === lore speech overlay ===================================== */}
      <Show when={phase() === 'lore_speech'}>
        <SpeechPresentation
          speaker={t().elder.speaker}
          parts={loreParts()}
          finalHint={t().intro.loreFinalHint}
          onClose={() => setPhase('receiving_cinder')}
        />
      </Show>

      <Show when={phase() !== 'morning' && phase() !== 'test_morning' && phase() !== 'lore_speech'}>
        <p class="intro-skip-hint">{t().intro.skipHint}</p>
      </Show>

      <Show when={phase() === 'morning'}>
        <p class="intro-skip-hint">{t().intro.morningSkipHint}</p>
      </Show>
    </div>
  );
}
