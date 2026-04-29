import { Show, For } from 'solid-js';
import { exerciseState, loadNextExercise, selectAnswer } from '../../core/exercises/exercise-store';
import { vitalityGainOnCorrect, VITALITY_PENALTY_ON_WRONG } from '../../core/exercises/exercise-model';
import { feedCinder } from '../../core/cinder/cinder-model';
import { cinder, setCinder } from '../../core/cinder/cinder-store';
import { exerciseIntro, correctFeedback, wrongFeedback } from '../../core/cinder/cinder-voice';
import { knowledge, recordCorrect, recordWrong, dismissReveal } from '../../core/knowledge/knowledge-store';
import { RevealPanel } from './RevealPanel';

const REVEAL_VITALITY_BONUS = 10;

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
  } else {
    setCinder(feedCinder(cinder, -VITALITY_PENALTY_ON_WRONG));
    recordWrong(ex.family);
  }
}

function onDismissReveal() {
  dismissReveal();
  loadNextExercise();
}

export function StudyView() {
  return (
    <div class="study-view">
      <Show
        when={exerciseState.current}
        fallback={
          <button class="study-start" onClick={loadNextExercise}>
            estudar
          </button>
        }
      >
        {(ex) => (
          <>
            <p class="study-intro">{exerciseIntro(cinder.personality)}</p>
            <p class="study-statement">{ex().statement}</p>
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
                      disabled={exerciseState.selectedIndex !== null}
                      onClick={() => onSelect(i())}
                    >
                      {opt}
                    </button>
                  );
                }}
              </For>
            </div>
            <Show when={exerciseState.result === 'correct'}>
              <p class="study-feedback is-correct">
                {correctFeedback(cinder.personality)} +{vitalityGainOnCorrect(ex().difficulty)} vitalidade.
              </p>
            </Show>
            <Show when={exerciseState.result === 'wrong'}>
              <p class="study-feedback is-wrong">
                {wrongFeedback(cinder.personality)} −{VITALITY_PENALTY_ON_WRONG} vitalidade.
              </p>
            </Show>
            <Show when={knowledge.pendingReveal}>
              <RevealPanel concept={knowledge.pendingReveal!} onDismiss={onDismissReveal} />
            </Show>
            <Show when={exerciseState.result !== null && !knowledge.pendingReveal}>
              <button class="study-next" onClick={loadNextExercise}>
                próxima
              </button>
            </Show>
          </>
        )}
      </Show>
    </div>
  );
}
