import { createMemo, Show, For, onMount } from 'solid-js';
import { SpeechPresentation, type SpeechPart, renderInlineMarkup } from './SpeechPresentation';
import { MapDialog } from './MapDialog';
import {
  currentLesson, lessonState, markParableHeard,
  markTested, advanceToNextLesson, hasNextLesson
} from '../../core/lessons/lesson-store';
import {
  exerciseState, loadNextExercise, selectAnswer, revealAnswer, clearExercise
} from '../../core/exercises/exercise-store';
import { vitalityGainOnCorrect, VITALITY_PENALTY_ON_WRONG } from '../../core/exercises/exercise-model';
import { feedCinder } from '../../core/cinder/cinder-model';
import { cinder, setCinder } from '../../core/cinder/cinder-store';
import { recordCorrect, recordWrong } from '../../core/knowledge/knowledge-store';
import { awardXp } from '../../core/apprentice/apprentice-stats-store';
import { xpForCorrect, LESSON_BONUS_XP } from '../../core/apprentice/apprentice-stats-logic';
import { add as addToInventory, spend as spendFromInventory, countOf as inventoryCountOf } from '../../core/inventory/inventory-store';
import { grainsForCorrect, GRAINS_PROVA_BONUS, REROLL_PRICE_GRAINS, REVEAL_PRICE_GRAINS } from '../../core/inventory/inventory-logic';
import { t } from '../../i18n';

interface Props {
  onClose: () => void;
}

// What the Elder Fire shows depends on the lesson stage:
//   parable    → full parable + directive (first time the apprentice visits)
//   studying   → short remark; refuses to repeat himself
//   practiced  → "tomar a prova" — one final exercise from the lesson's family
//   tested     → closing words + "próxima parábola" if a next lesson exists
export function ElderFireDialog(props: Props) {
  return (
    <Show
      when={lessonState.stage === 'practiced'}
      fallback={<ElderSpeech onClose={props.onClose} />}
    >
      <ElderTest onClose={props.onClose} />
    </Show>
  );
}

// === default speech path (parable / studying / tested) =====================

function ElderSpeech(props: Props) {
  const lesson = createMemo(() => currentLesson());

  const parts = createMemo<SpeechPart[]>(() => {
    const stage = lessonState.stage;
    const l = lesson();

    if (stage === 'parable') {
      return [
        ...l.parable.paragraphs.map((p): SpeechPart => ({ text: p })),
        { text: l.parable.directive, variant: 'directive' }
      ];
    }
    if (stage === 'studying') {
      return [{ text: t().elder.studyingRemark }];
    }
    // tested
    if (hasNextLesson()) {
      const [first, second] = t().elder.testedHasNext;
      return [
        { text: first },
        { text: second, variant: 'directive' }
      ];
    }
    return [{ text: t().elder.testedAtEnd, variant: 'directive' }];
  });

  const finalHint = createMemo(() => {
    if (lessonState.stage === 'parable') return t().elder.finalHints.parable;
    if (lessonState.stage === 'tested' && hasNextLesson()) return t().elder.finalHints.tested;
    return t().elder.finalHints.close;
  });

  function close() {
    if (lessonState.stage === 'parable') markParableHeard();
    else if (lessonState.stage === 'tested' && hasNextLesson()) advanceToNextLesson();
    props.onClose();
  }

  return (
    <SpeechPresentation
      speaker={t().elder.speaker}
      title={lessonState.stage === 'parable' ? lesson().parable.title : undefined}
      parts={parts()}
      finalHint={finalHint()}
      onClose={close}
    />
  );
}

// === test path (practiced) =================================================
//
// One exercise from the lesson's family, posed by the Elder Fire as the
// "prova". Correct → markTested(); the dialog re-renders into the tested
// speech. Wrong → vitality penalty + "tente outra"; we reload another
// question from the same family and let the apprentice keep going.

function ElderTest(props: Props) {
  const lesson = createMemo(() => currentLesson());

  onMount(() => {
    clearExercise();
    loadNextExercise(lesson().family);
  });

  function onSelect(index: number) {
    const ex = exerciseState.current;
    if (!ex || exerciseState.result !== null) return;
    const isCorrect = index === ex.correctIndex;
    selectAnswer(index);

    if (isCorrect) {
      setCinder(feedCinder(cinder, vitalityGainOnCorrect(ex.difficulty)));
      recordCorrect(ex.family, ex.conceptName);
      // Award the per-question XP plus the lesson-completion bonus in a
      // single call so a single level-up event covers the full reward.
      const award = awardXp(xpForCorrect(ex.difficulty) + LESSON_BONUS_XP);
      if (award.leveledUp) setCinder(feedCinder(cinder, 100));
      // Grain reward: per-correct + prova bonus.
      addToInventory('graos', grainsForCorrect(ex.difficulty) + GRAINS_PROVA_BONUS);
      markTested();
    } else {
      setCinder(feedCinder(cinder, -VITALITY_PENALTY_ON_WRONG));
      recordWrong(ex.family);
    }
  }

  function onReveal() {
    const ex = exerciseState.current;
    if (!ex || exerciseState.result !== null) return;
    revealAnswer();
    // Free reveal in the test breaks the streak — the answer was shown,
    // not earned. No vitality penalty (no wrong pick), but the lesson
    // stage does not advance to 'tested'.
    recordWrong(ex.family);
  }

  // Paid reveal in the prova: spend grãos to see the answer without the
  // streak-break penalty. Still doesn't pass the test (no markTested) —
  // the player has to answer one correctly under their own power.
  function onPaidReveal() {
    const ex = exerciseState.current;
    if (!ex || exerciseState.result !== null) return;
    if (!spendFromInventory('graos', REVEAL_PRICE_GRAINS)) return;
    revealAnswer();
  }

  // Re-roll the prova question itself — same family, fresh draw.
  function onReroll() {
    const ex = exerciseState.current;
    if (!ex || exerciseState.result !== null) return;
    if (!spendFromInventory('graos', REROLL_PRICE_GRAINS)) return;
    loadNextExercise(lesson().family);
  }

  function close() {
    clearExercise();
    props.onClose();
  }

  function nextQuestion() {
    loadNextExercise(lesson().family);
  }

  return (
    <MapDialog title={t().elder.test.title} onClose={close}>
      <p class="elder-test-intro">
        <em>{t().elder.test.intro}</em>
      </p>

      <Show when={exerciseState.current}>
        {(ex) => (
          <div class="cinder-section">
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
                <em>{t().elder.test.correctTitle}</em>
              </p>
              <button class="cinder-cta" onClick={close}>
                {t().elder.test.hearElder}
              </button>
            </Show>

            <Show when={exerciseState.result === 'wrong'}>
              <p class="study-feedback is-wrong">
                <em>{t().elder.test.wrongHint}</em> {t().cinderVoice.wrongVitalitySuffix(VITALITY_PENALTY_ON_WRONG)}
              </p>
              <div class="elder-test-retry">
                <button class="cinder-cta" onClick={nextQuestion}>
                  {t().elder.test.anotherQuestion}
                </button>
                <button class="cinder-back-link" onClick={close}>
                  {t().elder.test.backToCinder}
                </button>
              </div>
            </Show>

            <Show when={exerciseState.result === 'revealed'}>
              <p class="study-feedback is-revealed">
                <em>{t().elder.test.revealedHint}</em>
              </p>
              <div class="elder-test-retry">
                <button class="cinder-cta" onClick={nextQuestion}>
                  {t().elder.test.anotherQuestion}
                </button>
                <button class="cinder-back-link" onClick={close}>
                  {t().elder.test.backToCinder}
                </button>
              </div>
            </Show>

            <Show when={(exerciseState.result === 'wrong' || exerciseState.result === 'revealed') && ex().solution}>
              <div class="study-solution">
                <div class="study-solution-label">{t().solution.label}</div>
                <p class="study-solution-text" innerHTML={renderInlineMarkup(ex().solution!)} />
              </div>
            </Show>
          </div>
        )}
      </Show>
    </MapDialog>
  );
}
