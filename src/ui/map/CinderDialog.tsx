import { createSignal, createMemo, Show, For } from 'solid-js';
import { MapDialog } from './MapDialog';
import { CinderView } from '../components/CinderView';
import { Math as MathRender } from '../components/Math';
import { SpeechPresentation, type SpeechPart, renderInlineMarkup } from './SpeechPresentation';
import { GALLERY, type GalleryCard } from './gallery-cards';
import {
  currentLesson, lessonState,
  recordPracticeCorrect, markTheoryIntroduced,
  presentedLessons, hasAnyPresentedLesson
} from '../../core/lessons/lesson-store';
import {
  exerciseState, loadNextExercise, selectAnswer, revealAnswer, clearExercise
} from '../../core/exercises/exercise-store';
import { vitalityGainOnCorrect, VITALITY_PENALTY_ON_WRONG } from '../../core/exercises/exercise-model';
import { feedCinder } from '../../core/cinder/cinder-model';
import { cinder, setCinder } from '../../core/cinder/cinder-store';
import { exerciseIntro, correctFeedback, wrongFeedback, hubGreeting } from '../../core/cinder/cinder-voice';
import { knowledge, recordCorrect, recordWrong, dismissReveal } from '../../core/knowledge/knowledge-store';
import { RevealPanel } from '../components/RevealPanel';
import type { Lesson } from '../../core/lessons/lesson-model';
import {
  apprenticeStats, awardXp, pendingLevelUp, dismissLevelUp
} from '../../core/apprentice/apprentice-stats-store';
import {
  RANK_NAMES, MAX_LEVEL, LEVEL_THRESHOLDS, LESSON_BONUS_XP,
  xpForCorrect, levelOf, isMaxLevel, xpProgressInLevel
} from '../../core/apprentice/apprentice-stats-logic';
import { inventory, add as addToInventory, spend as spendFromInventory, countOf as inventoryCountOf } from '../../core/inventory/inventory-store';
import {
  grainsForCorrect,
  FEED_PRICE_GRAINS, FEED_VITALITY_GAIN,
  REROLL_PRICE_GRAINS, REVEAL_PRICE_GRAINS,
  type ItemId
} from '../../core/inventory/inventory-logic';
import { t } from '../../i18n';

interface Props {
  onClose: () => void;
}

const REVEAL_VITALITY_BONUS = 10;

// Rank dictionary keys ordered to match LEVEL_THRESHOLDS / RANK_NAMES.
// Used to look up the localized rank label for a given level.
const RANK_KEYS = ['apprentice', 'novice', 'reader', 'weaver', 'shaman', 'master'] as const;

function localizedRankName(level: number): string {
  const key = RANK_KEYS[Math.max(0, Math.min(RANK_KEYS.length - 1, level - 1))];
  return t().apprentice.rank[key];
}

function localizedRankFromXp(xp: number): string {
  return localizedRankName(levelOf(xp));
}

function localizedPluralize(id: ItemId, n: number): string {
  const info = t().inventory.items[id];
  return n === 1 ? info.singular : info.plural;
}

// Hub navigation state. The review tree (rever-list → rever-family) lets the
// apprentice replay any presented lesson's parable or theory; pratica is the
// current lesson's family practice; galeria-list shows collectible-card
// dense-ASCII scenes from the intro.
type HubView =
  | 'hub'
  | 'pratica'
  | 'rever-list'
  | 'rever-family'
  | 'rever-parable'
  | 'rever-theory'
  | 'galeria-list'
  | 'aprendiz'
  | 'inventario';

// The Cinder dialog renders the modal hub *always* (so the apprentice can
// review prior lessons even before talking to the Elder about a new one) and,
// on top of it, the spontaneous theory walk-through speech panel when the
// current lesson's parable has been heard but the theory hasn't yet been
// taught. The gallery card viewer is also a fullscreen overlay (above the
// modal) that opens when a card is tapped — clicking dismisses it.
export function CinderDialog(props: Props) {
  const offerSpontaneous = createMemo(
    () => lessonState.stage !== 'parable' && !lessonState.theoryIntroduced
  );
  const [openCard, setOpenCard] = createSignal<GalleryCard | null>(null);
  return (
    <>
      <CinderHub {...props} onOpenCard={setOpenCard} />
      <Show when={offerSpontaneous()}>
        <CinderSpontaneous />
      </Show>
      <Show when={openCard()}>
        <GalleryCardViewer card={openCard()!} onClose={() => setOpenCard(null)} />
      </Show>
    </>
  );
}

// === Spontaneous walk-through (auto-shown overlay, first time per lesson) ===

function CinderSpontaneous() {
  const lesson = createMemo(() => currentLesson());
  const parts = createMemo<SpeechPart[]>(() => [
    ...lesson().cinderIntro.map((t): SpeechPart => ({ text: t })),
    ...lesson().theory.map((p): SpeechPart => ({ text: p.text, math: p.math }))
  ]);

  return (
    <SpeechPresentation
      speaker={cinder.name}
      title={t().spontaneous.title}
      parts={parts()}
      finalHint={t().spontaneous.finalHint}
      skipLabel={t().spontaneous.skipLabel}
      onClose={markTheoryIntroduced}
    />
  );
}

// === Hub modal (always opens; sub-views handle each path) ===================

interface HubProps extends Props {
  onOpenCard: (card: GalleryCard) => void;
}

function CinderHub(props: HubProps) {
  const lesson = createMemo(() => currentLesson());
  const [view, setView] = createSignal<HubView>('hub');
  const [reviewLessonId, setReviewLessonId] = createSignal<string | null>(null);

  // Hub access: once any lesson has been presented (i.e., the apprentice has
  // talked to the Elder Fire at least once), the Cinder is open for review,
  // even when the current lesson hasn't been started yet.
  const hubOpen = createMemo(() => hasAnyPresentedLesson());

  // Whether the current lesson has progressed past 'parable' — gates the
  // current-lesson-specific actions (Prática on the current family). Review
  // tree always works regardless.
  const currentStarted = createMemo(() => lessonState.stage !== 'parable');

  const reviewLesson = createMemo<Lesson | null>(() => {
    const id = reviewLessonId();
    if (!id) return null;
    return presentedLessons().find((l) => l.id === id) ?? null;
  });

  function onClose() {
    clearExercise();
    props.onClose();
  }

  function backToHub() {
    clearExercise();
    setView('hub');
  }

  function backToReviewList() {
    setReviewLessonId(null);
    setView('rever-list');
  }

  function backToReviewFamily() {
    setView('rever-family');
  }

  function selectReviewLesson(id: string) {
    setReviewLessonId(id);
    setView('rever-family');
  }

  return (
    <MapDialog title={`${t().cinder.titlePrefix} — ${cinder.name}`} onClose={onClose}>
      <CinderView />
      <ApprenticeStrip />
      <Show when={pendingLevelUp() !== null}>
        <LevelUpPanel level={pendingLevelUp()!} onDismiss={dismissLevelUp} />
      </Show>

      <Show when={!hubOpen()}>
        <p class="cinder-no-lesson">
          {t().cinder.quietHint} <em>{t().cinder.quietDirective}</em>
        </p>
      </Show>

      <Show when={hubOpen() && view() === 'hub'}>
        <div class="cinder-hub">
          <p class="cinder-greeting">
            <Show
              when={currentStarted()}
              fallback={t().hub.greetingPreParable}
            >
              {hubGreeting(cinder.personality, lessonState.stage)}
            </Show>
          </p>
          <div class="cinder-hub-options">
            <button class="cinder-hub-option" onClick={() => setView('rever-list')}>
              <span class="cinder-hub-option-label">{t().hub.teoria.label}</span>
              <span class="cinder-hub-option-desc">{t().hub.teoria.desc}</span>
            </button>
            <button
              class="cinder-hub-option"
              disabled={!currentStarted()}
              onClick={() => {
                if (!currentStarted()) return;
                clearExercise();
                loadNextExercise(lesson().family);
                setView('pratica');
              }}
            >
              <span class="cinder-hub-option-label">{t().hub.pratica.label}</span>
              <span class="cinder-hub-option-desc">
                <Show
                  when={currentStarted()}
                  fallback={t().hub.pratica.descWaiting}
                >
                  {t().hub.pratica.descActive}
                </Show>
              </span>
            </button>
            <button class="cinder-hub-option" onClick={() => setView('galeria-list')}>
              <span class="cinder-hub-option-label">{t().hub.galeria.label}</span>
              <span class="cinder-hub-option-desc">{t().hub.galeria.desc}</span>
            </button>
            <button class="cinder-hub-option" onClick={() => setView('aprendiz')}>
              <span class="cinder-hub-option-label">{t().hub.aprendiz.label}</span>
              <span class="cinder-hub-option-desc">{t().hub.aprendiz.desc}</span>
            </button>
            <button class="cinder-hub-option" onClick={() => setView('inventario')}>
              <span class="cinder-hub-option-label">{t().hub.inventario.label}</span>
              <span class="cinder-hub-option-desc">{t().hub.inventario.desc}</span>
            </button>
          </div>
          <Show when={lessonState.stage === 'practiced'}>
            <p class="cinder-practiced-hint">
              <em>{t().cinder.practicedHint}</em>
            </p>
          </Show>
        </div>
      </Show>

      <Show when={view() === 'rever-list'}>
        <ReviewListView
          onPick={selectReviewLesson}
          onBack={backToHub}
        />
      </Show>
      <Show when={view() === 'rever-family' && reviewLesson()}>
        <ReviewFamilyView
          lesson={reviewLesson()!}
          onPickParable={() => setView('rever-parable')}
          onPickTheory={() => setView('rever-theory')}
          onBack={backToReviewList}
        />
      </Show>
      <Show when={view() === 'rever-parable' && reviewLesson()}>
        <ParableView lesson={reviewLesson()!} onBack={backToReviewFamily} />
      </Show>
      <Show when={view() === 'rever-theory' && reviewLesson()}>
        <TheoryView lesson={reviewLesson()!} onBack={backToReviewFamily} />
      </Show>
      <Show when={view() === 'pratica'}>
        <PracticeView lesson={lesson()} onBack={backToHub} />
      </Show>
      <Show when={view() === 'galeria-list'}>
        <GalleryListView onPick={props.onOpenCard} onBack={backToHub} />
      </Show>
      <Show when={view() === 'aprendiz'}>
        <ApprenticeView onBack={backToHub} />
      </Show>
      <Show when={view() === 'inventario'}>
        <InventoryView onBack={backToHub} />
      </Show>
    </MapDialog>
  );
}

// === Sub-views ==============================================================

function BackLink(props: { onBack: () => void; label?: string }) {
  return (
    <button class="cinder-back-link" onClick={props.onBack}>
      ← {props.label ?? t().cinder.backLink}
    </button>
  );
}

function ReviewListView(props: { onPick: (id: string) => void; onBack: () => void }) {
  const list = createMemo(() => presentedLessons());
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().review.sectionLabel}</span>
        <span class="cinder-section-meta">{t().review.sectionMeta}</span>
      </div>
      <Show
        when={list().length > 0}
        fallback={<p class="cinder-no-lesson">{t().review.nothingYet}</p>}
      >
        <div class="cinder-hub-options">
          <For each={list()}>
            {(l) => (
              <button class="cinder-hub-option" onClick={() => props.onPick(l.id)}>
                <span class="cinder-hub-option-label">
                  {t().review.cardLabel(l.family, l.parable.title)}
                </span>
                <span class="cinder-hub-option-desc">{t().review.cardDesc}</span>
              </button>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

// Gallery list — shows the dense-ASCII collectible cards drawn from the
// intro's flashbacks. Clicking a card opens its full-size view as a
// fullscreen overlay (handled at the CinderDialog level).
function GalleryListView(props: { onPick: (card: GalleryCard) => void; onBack: () => void }) {
  const dictCardFor = (id: string) => {
    const cards = t().gallery.cards as Record<string, { title: string; caption: string }>;
    return cards[id];
  };
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().gallery.sectionLabel}</span>
        <span class="cinder-section-meta">{t().gallery.sectionMeta}</span>
      </div>
      <div class="cinder-hub-options">
        <For each={GALLERY}>
          {(card) => {
            const dict = () => dictCardFor(card.id) ?? { title: card.title, caption: card.caption };
            return (
              <button class="cinder-hub-option" onClick={() => props.onPick(card)}>
                <span class="cinder-hub-option-label">{dict().title}</span>
                <span
                  class="cinder-hub-option-desc"
                  innerHTML={renderInlineMarkup(dict().caption)}
                />
              </button>
            );
          }}
        </For>
      </div>
    </div>
  );
}

// Fullscreen card viewer — renders the dense-ASCII at the same scale the
// intro stage uses, so the art reads at full fidelity. Click anywhere to
// dismiss (matches the "collectible card flipped over" gesture).
function GalleryCardViewer(props: { card: GalleryCard; onClose: () => void }) {
  // Pull localized title + caption from the dict; fall back to the card's
  // baked-in PT text if the dict doesn't know this card id (forward-compat).
  const dictCard = () => {
    const cards = t().gallery.cards as Record<string, { title: string; caption: string }>;
    return cards[props.card.id] ?? { title: props.card.title, caption: props.card.caption };
  };
  return (
    <div class="cinder-gallery-overlay" onClick={props.onClose}>
      <pre
        class="cinder-gallery-card"
        style={{
          '--cols': props.card.cols,
          '--rows': props.card.rows
        }}
      >
        {props.card.art.join('\n')}
      </pre>
      <div class="cinder-gallery-card-caption">
        <span class="cinder-gallery-card-title">{dictCard().title}</span>
        <span
          class="cinder-gallery-card-text"
          innerHTML={renderInlineMarkup(dictCard().caption)}
        />
        <span class="cinder-gallery-card-hint">{t().gallery.closeHint}</span>
      </div>
    </div>
  );
}

// === Apprentice stats ======================================================
//
// Compact strip rendered at the top of every Cinder modal view: the rank
// title and an XP progress bar. Cheap to render so it can sit unconditionally
// inside the modal body — gives the player constant feedback that practice
// matters beyond the per-lesson loop.

function ApprenticeStrip() {
  const xp = createMemo(() => apprenticeStats.xp);
  const rank = createMemo(() => localizedRankFromXp(xp()));
  const progress = createMemo(() => xpProgressInLevel(xp()));
  const pct = createMemo(() => {
    const p = progress();
    if (p.span == null) return 100;
    return Math.min(100, Math.round((p.current / p.span) * 100));
  });
  const counter = createMemo(() => {
    const p = progress();
    if (p.span == null) return `${p.current} XP`;
    return `${p.current} / ${p.span} XP`;
  });
  const grainCount = createMemo(() => inventory.items.graos ?? 0);
  return (
    <div class="apprentice-strip">
      <div class="apprentice-strip-line">
        <span class="apprentice-strip-rank">{t().apprentice.stripPrefix} · {rank()}</span>
        <span class="apprentice-strip-grains">
          {grainCount()} {localizedPluralize('graos', grainCount())}
        </span>
      </div>
      <div class="apprentice-strip-bar">
        <div class="apprentice-strip-bar-fill" style={{ width: `${pct()}%` }} />
      </div>
      <div class="apprentice-strip-line apprentice-strip-line-bottom">
        <span class="apprentice-strip-xp">{counter()}</span>
      </div>
    </div>
  );
}

// Full breakdown — the rank list with the player's current rank highlighted
// and per-rank thresholds. Reachable from the hub's "Aprendiz" option.
function ApprenticeView(props: { onBack: () => void }) {
  const xp = createMemo(() => apprenticeStats.xp);
  const level = createMemo(() => levelOf(xp()));
  const progress = createMemo(() => xpProgressInLevel(xp()));
  const atMax = createMemo(() => isMaxLevel(xp()));

  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().apprentice.sectionLabel}</span>
        <span class="cinder-section-meta">{t().apprentice.sectionMeta(xp())}</span>
      </div>
      <p class="apprentice-current">
        {t().apprentice.youAre(localizedRankFromXp(xp()))}
        {' '}<strong>{localizedRankFromXp(xp())}</strong>
        <Show when={!atMax()}>
          {' '}{t().apprentice.rankTo((progress().span ?? 0) - progress().current)}
        </Show>
        <Show when={atMax()}>
          {' '}{t().apprentice.atMax}
        </Show>
      </p>
      <div class="apprentice-rank-list">
        <For each={RANK_NAMES}>
          {(_name, i) => {
            const isCurrent = level() === i() + 1;
            const isReached = xp() >= LEVEL_THRESHOLDS[i()];
            const cls = [
              'apprentice-rank-row',
              isCurrent ? 'is-current' : '',
              isReached ? 'is-reached' : 'is-locked'
            ].filter(Boolean).join(' ');
            return (
              <div class={cls}>
                <span class="apprentice-rank-num">{i() + 1}</span>
                <span class="apprentice-rank-name">{localizedRankName(i() + 1)}</span>
                <span class="apprentice-rank-threshold">
                  {t().apprentice.rankN(LEVEL_THRESHOLDS[i()])}
                </span>
              </div>
            );
          }}
        </For>
      </div>
      <Show when={!atMax()}>
        <p class="apprentice-hint">{t().apprentice.earnHint(LESSON_BONUS_XP)}</p>
      </Show>
      <Show when={level() >= MAX_LEVEL}>
        {/* placeholder — exists only so the linter sees MAX_LEVEL used here too */}
        {''}
      </Show>
    </div>
  );
}

// Brief inline panel shown after a level-up. Mirrors RevealPanel: the
// caller dismisses it when the player has read the news.
function LevelUpPanel(props: { level: number; onDismiss: () => void }) {
  return (
    <div class="apprentice-levelup-panel">
      <p class="apprentice-levelup-prologue">{t().levelup.prologue}</p>
      <p class="apprentice-levelup-title">
        {t().levelup.title(props.level, localizedRankName(props.level))}
      </p>
      <p class="apprentice-levelup-text">{t().levelup.text}</p>
      <button class="apprentice-levelup-dismiss" onClick={props.onDismiss}>
        {t().levelup.dismiss}
      </button>
    </div>
  );
}

// === Inventory ============================================================
//
// Lists every item the apprentice currently holds (counts > 0). For each
// item, shows the label + flavour and any spend actions that apply (right
// now: feed-Cinder for grãos). Future items drop in here without UI work
// once they have ITEM_INFO + a spend handler.

function InventoryView(props: { onBack: () => void }) {
  const heldIds = createMemo<ItemId[]>(() => {
    const out: ItemId[] = [];
    const known = Object.keys(t().inventory.items) as ItemId[];
    for (const id of known) {
      if ((inventory.items[id] ?? 0) > 0) out.push(id);
    }
    return out;
  });

  function feedOnce() {
    if (!spendFromInventory('graos', FEED_PRICE_GRAINS)) return;
    setCinder(feedCinder(cinder, FEED_VITALITY_GAIN));
  }

  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().inventory.sectionLabel}</span>
        <span class="cinder-section-meta">{t().inventory.sectionMeta}</span>
      </div>
      <Show
        when={heldIds().length > 0}
        fallback={<p class="cinder-no-lesson">{t().inventory.emptyHint}</p>}
      >
        <For each={heldIds()}>
          {(id) => {
            const info = () => t().inventory.items[id];
            const count = createMemo(() => inventory.items[id] ?? 0);
            return (
              <div class="inventory-item">
                <div class="inventory-item-header">
                  <span class="inventory-item-label">{info().label}</span>
                  <span class="inventory-item-count">
                    {count()} {localizedPluralize(id, count())}
                  </span>
                </div>
                <p class="inventory-item-flavour">{info().flavour}</p>
                <Show when={id === 'graos'}>
                  <div class="inventory-item-actions">
                    <button
                      class="cinder-cta inventory-action-btn"
                      disabled={count() < FEED_PRICE_GRAINS}
                      onClick={feedOnce}
                    >
                      {t().inventory.feedAction(FEED_PRICE_GRAINS, FEED_VITALITY_GAIN)}
                    </button>
                  </div>
                </Show>
              </div>
            );
          }}
        </For>
        <p class="apprentice-hint">{t().inventory.spendsElsewhere}</p>
      </Show>
    </div>
  );
}

function ReviewFamilyView(props: {
  lesson: Lesson;
  onPickParable: () => void;
  onPickTheory: () => void;
  onBack: () => void;
}) {
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} label={t().review.backFamilies} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().cinder.familyN(props.lesson.family)}</span>
        <span class="cinder-section-meta">{props.lesson.parable.title}</span>
      </div>
      <div class="cinder-hub-options">
        <button class="cinder-hub-option" onClick={props.onPickParable}>
          <span class="cinder-hub-option-label">{t().review.parableOption.label}</span>
          <span class="cinder-hub-option-desc">{t().review.parableOption.desc}</span>
        </button>
        <button class="cinder-hub-option" onClick={props.onPickTheory}>
          <span class="cinder-hub-option-label">{t().review.theoryOption.label}</span>
          <span class="cinder-hub-option-desc">{t().review.theoryOption.desc}</span>
        </button>
      </div>
    </div>
  );
}

function TheoryView(props: { lesson: Lesson; onBack: () => void }) {
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().cinder.theory}</span>
        <span class="cinder-section-meta">{props.lesson.parable.title} — {t().cinder.familyN(props.lesson.family)}</span>
      </div>
      <For each={props.lesson.theory}>
        {(page) => (
          <div class="cinder-theory-page">
            <p class="cinder-theory-paragraph" innerHTML={renderInlineMarkup(page.text)} />
            <Show when={page.math}>
              <MathRender tex={page.math!} />
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}

// Worked-out solution shown after a wrong answer or an explicit "ver
// resposta". The solution string supports inline LaTeX via $...$ which
// the standard markup pipeline renders. Visual: dim border, slightly
// indented, distinct from the option buttons so it reads as commentary.
function SolutionPanel(props: { solution: string }) {
  return (
    <div class="study-solution">
      <div class="study-solution-label">{t().solution.label}</div>
      <p class="study-solution-text" innerHTML={renderInlineMarkup(props.solution)} />
    </div>
  );
}

function ParableView(props: { lesson: Lesson; onBack: () => void }) {
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().cinder.parable}</span>
        <span class="cinder-section-meta">{props.lesson.parable.title}</span>
      </div>
      <For each={props.lesson.parable.paragraphs}>
        {(p) => <p class="cinder-parable-paragraph">{p}</p>}
      </For>
      <p class="cinder-parable-paragraph is-directive">
        <em>{props.lesson.parable.directive}</em>
      </p>
    </div>
  );
}

function PracticeView(props: { lesson: Lesson; onBack: () => void }) {
  function onSelect(index: number) {
    const ex = exerciseState.current;
    if (!ex || exerciseState.result !== null) return;
    const isCorrect = index === ex.correctIndex;
    selectAnswer(index);

    if (isCorrect) {
      setCinder(feedCinder(cinder, vitalityGainOnCorrect(ex.difficulty)));
      const newlyRevealed = recordCorrect(ex.family, ex.conceptName);
      if (newlyRevealed) {
        setCinder(feedCinder(cinder, REVEAL_VITALITY_BONUS));
      }
      const award = awardXp(xpForCorrect(ex.difficulty));
      if (award.leveledUp) setCinder(feedCinder(cinder, 100));
      addToInventory('graos', grainsForCorrect(ex.difficulty));
      if (ex.family === props.lesson.family) {
        recordPracticeCorrect();
      }
    } else {
      setCinder(feedCinder(cinder, -VITALITY_PENALTY_ON_WRONG));
      recordWrong(ex.family);
    }
  }

  function onReveal() {
    if (!exerciseState.current || exerciseState.result !== null) return;
    revealAnswer();
    // Free reveal breaks the streak — the player saw the answer rather
    // than arriving at it. No vitality penalty (they didn't pick wrong).
    if (exerciseState.current.family) {
      recordWrong(exerciseState.current.family);
    }
  }

  // Paid reveal: spend grãos to see the answer *without* breaking the
  // family streak. The visual outcome is the same as a free reveal (correct
  // option gets `is-truth`; solution panel shows), but recordWrong is
  // skipped — the player paid to keep their concept-reveal progress.
  function onPaidReveal() {
    if (!exerciseState.current || exerciseState.result !== null) return;
    if (!spendFromInventory('graos', REVEAL_PRICE_GRAINS)) return;
    revealAnswer();
  }

  // Re-roll: spend grãos to swap the current question for another from
  // the same family (uses the existing seenIdsByFamily logic so the
  // replacement is fresh). Only valid before the player has answered.
  function onReroll() {
    if (!exerciseState.current || exerciseState.result !== null) return;
    if (!spendFromInventory('graos', REROLL_PRICE_GRAINS)) return;
    loadNextExercise(props.lesson.family);
  }

  function onDismissReveal() {
    dismissReveal();
    loadNextExercise(props.lesson.family);
  }

  const target = createMemo(() => props.lesson.practiceTarget);
  const correct = createMemo(() => Math.min(lessonState.practiceCorrect, target()));

  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">{t().cinder.practice}</span>
        <span class="cinder-section-meta">{t().cinder.correctsOf(correct(), target())}</span>
      </div>
      <Show
        when={exerciseState.current}
        fallback={
          <button class="cinder-cta" onClick={() => loadNextExercise(props.lesson.family)}>
            {t().cinder.askQuestion}
          </button>
        }
      >
        {(ex) => (
          <>
            <p class="study-intro">{exerciseIntro(cinder.personality)}</p>
            <p class="study-statement" innerHTML={renderInlineMarkup(ex().statement)} />
            <div class="study-options">
              <For each={ex().options}>
                {(opt, i) => {
                  const classes = () => {
                    const sel = exerciseState.selectedIndex;
                    const cls: string[] = ['study-option'];
                    if (sel === i()) {
                      cls.push(exerciseState.result === 'correct' ? 'is-correct' : 'is-wrong');
                    }
                    if (exerciseState.result !== null && i() === ex().correctIndex && sel !== i()) {
                      cls.push('is-truth');
                    }
                    return cls.join(' ');
                  };
                  return (
                    <button
                      class={classes()}
                      disabled={exerciseState.result !== null}
                      onClick={() => onSelect(i())}
                      innerHTML={renderInlineMarkup(opt)}
                    />
                  );
                }}
              </For>
            </div>
            <Show when={exerciseState.result === null}>
              <div class="cinder-paid-actions">
                <button class="cinder-reveal-link" onClick={onReveal}>
                  {t().cinder.revealLink}
                </button>
                <button
                  class="cinder-reveal-link"
                  disabled={inventoryCountOf('graos') < REROLL_PRICE_GRAINS}
                  onClick={onReroll}
                >
                  {t().cinder.rerollOption(REROLL_PRICE_GRAINS)}
                </button>
                <button
                  class="cinder-reveal-link"
                  disabled={inventoryCountOf('graos') < REVEAL_PRICE_GRAINS}
                  onClick={onPaidReveal}
                >
                  {t().cinder.seeWithoutBreaking(REVEAL_PRICE_GRAINS)}
                </button>
              </div>
            </Show>
            <Show when={exerciseState.result === 'correct'}>
              <p class="study-feedback is-correct">
                {correctFeedback(cinder.personality)} {t().cinderVoice.correctVitalitySuffix(vitalityGainOnCorrect(ex().difficulty))}
              </p>
            </Show>
            <Show when={exerciseState.result === 'wrong'}>
              <p class="study-feedback is-wrong">
                {wrongFeedback(cinder.personality)} {t().cinderVoice.wrongVitalitySuffix(VITALITY_PENALTY_ON_WRONG)}
              </p>
            </Show>
            <Show when={exerciseState.result === 'revealed'}>
              <p class="study-feedback is-revealed">
                <em>{t().cinderVoice.revealedNotice}</em>
              </p>
            </Show>
            <Show when={(exerciseState.result === 'wrong' || exerciseState.result === 'revealed') && ex().solution}>
              <SolutionPanel solution={ex().solution!} />
            </Show>
            <Show when={knowledge.pendingReveal}>
              <RevealPanel concept={knowledge.pendingReveal!} onDismiss={onDismissReveal} />
            </Show>
            <Show when={exerciseState.result !== null && !knowledge.pendingReveal}>
              <button class="cinder-cta" onClick={() => loadNextExercise(props.lesson.family)}>
                {t().cinder.next}
              </button>
            </Show>
          </>
        )}
      </Show>
      <Show when={lessonState.stage === 'practiced'}>
        <p class="cinder-practiced-hint">
          <em>{t().cinder.practicedHint}</em>
        </p>
      </Show>
    </div>
  );
}
