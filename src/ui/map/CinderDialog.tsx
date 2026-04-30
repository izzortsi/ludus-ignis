import { createSignal, createMemo, Show, For } from 'solid-js';
import { MapDialog } from './MapDialog';
import { CinderView } from '../components/CinderView';
import { Math as MathRender } from '../components/Math';
import { SpeechPresentation, type SpeechPart, renderInlineMarkup } from './SpeechPresentation';
import {
  currentLesson, lessonState,
  recordPracticeCorrect, markTheoryIntroduced
} from '../../core/lessons/lesson-store';
import {
  exerciseState, loadNextExercise, selectAnswer, clearExercise
} from '../../core/exercises/exercise-store';
import { vitalityGainOnCorrect, VITALITY_PENALTY_ON_WRONG } from '../../core/exercises/exercise-model';
import { feedCinder } from '../../core/cinder/cinder-model';
import { cinder, setCinder } from '../../core/cinder/cinder-store';
import { exerciseIntro, correctFeedback, wrongFeedback, hubGreeting } from '../../core/cinder/cinder-voice';
import { knowledge, recordCorrect, recordWrong, dismissReveal } from '../../core/knowledge/knowledge-store';
import { RevealPanel } from '../components/RevealPanel';

interface Props {
  onClose: () => void;
}

const REVEAL_VITALITY_BONUS = 10;

type HubView = 'hub' | 'teoria' | 'pratica' | 'parabola';

export function CinderDialog(props: Props) {
  // Spontaneous walk-through: parable was heard, theory hasn't been
  // introduced yet. Renders without the modal frame, like the Elder's
  // speech panel — keeps visual identity ("the Cinder is speaking to me").
  const showSpontaneous = createMemo(
    () => lessonState.stage !== 'parable' && !lessonState.theoryIntroduced
  );

  return (
    <Show when={!showSpontaneous()} fallback={<CinderSpontaneous {...props} />}>
      <CinderHub {...props} />
    </Show>
  );
}

// === Spontaneous walk-through (first visit after parable) ===================

function CinderSpontaneous(props: Props) {
  const lesson = createMemo(() => currentLesson());
  const parts = createMemo<SpeechPart[]>(() => [
    ...lesson().cinderIntro.map((t): SpeechPart => ({ text: t })),
    ...lesson().theory.map((p): SpeechPart => ({ text: p.text, math: p.math }))
  ]);

  function onFinish() {
    // Marking the theory as introduced flips showSpontaneous() in the
    // parent — the speech panel disappears and the hub modal renders.
    markTheoryIntroduced();
  }

  // Suppress the unused-prop warning while keeping the signature uniform.
  void props;

  return (
    <SpeechPresentation
      speaker={cinder.name}
      title="estudo"
      parts={parts()}
      finalHint="vamos praticar →"
      skipLabel="pular"
      onClose={onFinish}
    />
  );
}

// === Hub modal (default after walk-through) =================================

function CinderHub(props: Props) {
  const lesson = createMemo(() => currentLesson());
  const [view, setView] = createSignal<HubView>('hub');

  function onClose() {
    clearExercise();
    props.onClose();
  }

  function backToHub() {
    clearExercise();
    setView('hub');
  }

  return (
    <MapDialog title={`Cinder — ${cinder.name}`} onClose={onClose}>
      <CinderView />

      <Show when={lessonState.stage === 'parable'}>
        <p class="cinder-no-lesson">
          O Cinder está quieto. <em>Vai primeiro até o Fogo Ancião.</em>
        </p>
      </Show>

      <Show when={lessonState.stage !== 'parable' && view() === 'hub'}>
        <div class="cinder-hub">
          <p class="cinder-greeting">{hubGreeting(cinder.personality, lessonState.stage)}</p>
          <div class="cinder-hub-options">
            <button class="cinder-hub-option" onClick={() => setView('teoria')}>
              <span class="cinder-hub-option-label">Teoria</span>
              <span class="cinder-hub-option-desc">rever o que ensinei</span>
            </button>
            <button class="cinder-hub-option" onClick={() => {
              clearExercise();
              loadNextExercise(lesson().family);
              setView('pratica');
            }}>
              <span class="cinder-hub-option-label">Prática</span>
              <span class="cinder-hub-option-desc">questões da família</span>
            </button>
            <button class="cinder-hub-option" onClick={() => setView('parabola')}>
              <span class="cinder-hub-option-label">Parábola</span>
              <span class="cinder-hub-option-desc">o que ele te disse</span>
            </button>
          </div>
          <Show when={lessonState.stage === 'practiced'}>
            <p class="cinder-practiced-hint">
              <em>O Fogo Ancião espera te provar.</em>
            </p>
          </Show>
        </div>
      </Show>

      <Show when={view() === 'teoria'}>
        <TheoryView lesson={lesson()} onBack={backToHub} />
      </Show>
      <Show when={view() === 'pratica'}>
        <PracticeView lesson={lesson()} onBack={backToHub} />
      </Show>
      <Show when={view() === 'parabola'}>
        <ParableView lesson={lesson()} onBack={backToHub} />
      </Show>
    </MapDialog>
  );
}

// === Sub-views ==============================================================

function BackLink(props: { onBack: () => void }) {
  return (
    <button class="cinder-back-link" onClick={props.onBack}>← voltar</button>
  );
}

function TheoryView(props: { lesson: ReturnType<typeof currentLesson>; onBack: () => void }) {
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">teoria</span>
        <span class="cinder-section-meta">{props.lesson.parable.title} — família {props.lesson.family}</span>
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

function ParableView(props: { lesson: ReturnType<typeof currentLesson>; onBack: () => void }) {
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">parábola</span>
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

function PracticeView(props: { lesson: ReturnType<typeof currentLesson>; onBack: () => void }) {
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
      if (ex.family === props.lesson.family) {
        recordPracticeCorrect();
      }
    } else {
      setCinder(feedCinder(cinder, -VITALITY_PENALTY_ON_WRONG));
      recordWrong(ex.family);
    }
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
        <span class="cinder-section-label">prática</span>
        <span class="cinder-section-meta">{correct()}/{target()} corretas</span>
      </div>
      <Show
        when={exerciseState.current}
        fallback={
          <button class="cinder-cta" onClick={() => loadNextExercise(props.lesson.family)}>
            pedir uma questão →
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
              <button class="cinder-cta" onClick={() => loadNextExercise(props.lesson.family)}>
                próxima →
              </button>
            </Show>
          </>
        )}
      </Show>
      <Show when={lessonState.stage === 'practiced'}>
        <p class="cinder-practiced-hint">
          <em>O Fogo Ancião espera te provar.</em>
        </p>
      </Show>
    </div>
  );
}
