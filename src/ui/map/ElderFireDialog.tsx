import { createMemo, Show, For, onMount } from 'solid-js';
import { SpeechPresentation, type SpeechPart } from './SpeechPresentation';
import { MapDialog } from './MapDialog';
import {
  currentLesson, lessonState, markParableHeard,
  markTested, advanceToNextLesson, hasNextLesson
} from '../../core/lessons/lesson-store';
import {
  exerciseState, loadNextExercise, selectAnswer, clearExercise
} from '../../core/exercises/exercise-store';
import { vitalityGainOnCorrect, VITALITY_PENALTY_ON_WRONG } from '../../core/exercises/exercise-model';
import { feedCinder } from '../../core/cinder/cinder-model';
import { cinder, setCinder } from '../../core/cinder/cinder-store';
import { recordCorrect, recordWrong } from '../../core/knowledge/knowledge-store';

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
      return [{
        text: 'Já te disse o que tinha a dizer. Vai pensar com o teu Cinder. Quando os números pesarem firme na tua mão, eu te provo.'
      }];
    }
    // tested
    if (hasNextLesson()) {
      return [
        { text: 'Bem. Aprendeste o que esta parábola tinha a ensinar.' },
        {
          text: 'Há outra história à minha espera, e outra brasa que ela acende. Quando estiveres pronto, conta-me — começo a próxima.',
          variant: 'directive'
        }
      ];
    }
    return [{
      text: 'Bem. Aprendeste o que esta parábola tinha a ensinar. Por ora, descansa — outras virão, mas não esta noite.',
      variant: 'directive'
    }];
  });

  const finalHint = createMemo(() => {
    if (lessonState.stage === 'parable') return 'ir até o cinder →';
    if (lessonState.stage === 'tested' && hasNextLesson()) return 'próxima parábola →';
    return 'fechar →';
  });

  function close() {
    if (lessonState.stage === 'parable') markParableHeard();
    else if (lessonState.stage === 'tested' && hasNextLesson()) advanceToNextLesson();
    props.onClose();
  }

  return (
    <SpeechPresentation
      speaker="Fogo Ancião"
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
      markTested();
    } else {
      setCinder(feedCinder(cinder, -VITALITY_PENALTY_ON_WRONG));
      recordWrong(ex.family);
    }
  }

  function close() {
    clearExercise();
    props.onClose();
  }

  function nextQuestion() {
    loadNextExercise(lesson().family);
  }

  return (
    <MapDialog title="Fogo Ancião — a prova" onClose={close}>
      <p class="elder-test-intro">
        <em>Senta. Esta é a prova. Uma só pergunta — vê se os números pesam firme na tua mão.</em>
      </p>

      <Show when={exerciseState.current}>
        {(ex) => (
          <div class="cinder-section">
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
                <em>Bem. Já tens o passo.</em>
              </p>
              <button class="cinder-cta" onClick={close}>
                ouvir o Fogo Ancião →
              </button>
            </Show>

            <Show when={exerciseState.result === 'wrong'}>
              <p class="study-feedback is-wrong">
                <em>Não foi assim. Volta ao teu Cinder ou tenta outra pergunta.</em> −{VITALITY_PENALTY_ON_WRONG} vitalidade.
              </p>
              <div class="elder-test-retry">
                <button class="cinder-cta" onClick={nextQuestion}>
                  outra pergunta →
                </button>
                <button class="cinder-back-link" onClick={close}>
                  voltar ao Cinder
                </button>
              </div>
            </Show>
          </div>
        )}
      </Show>
    </MapDialog>
  );
}
