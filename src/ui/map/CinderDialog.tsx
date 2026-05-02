import { createSignal, createMemo, Show, For } from 'solid-js';
import { MapDialog } from './MapDialog';
import { CinderView } from '../components/CinderView';
import { Math as MathRender } from '../components/Math';
import { SpeechPresentation, type SpeechPart, renderInlineMarkup } from './SpeechPresentation';
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

interface Props {
  onClose: () => void;
}

const REVEAL_VITALITY_BONUS = 10;

// Hub navigation state. The review tree (rever-list → rever-family) lets the
// apprentice replay any presented lesson's parable or theory; pratica is the
// current lesson's family practice.
type HubView =
  | 'hub'
  | 'pratica'
  | 'rever-list'
  | 'rever-family'
  | 'rever-parable'
  | 'rever-theory';

// The Cinder dialog renders the modal hub *always* (so the apprentice can
// review prior lessons even before talking to the Elder about a new one) and,
// on top of it, the spontaneous theory walk-through speech panel when the
// current lesson's parable has been heard but the theory hasn't yet been
// taught. The walk-through panel sits at higher z-index than the modal so the
// typewriter intro keeps its cinematic moment; closing/skipping it marks the
// theory as introduced and the modal is right there underneath.
export function CinderDialog(props: Props) {
  const offerSpontaneous = createMemo(
    () => lessonState.stage !== 'parable' && !lessonState.theoryIntroduced
  );
  return (
    <>
      <CinderHub {...props} />
      <Show when={offerSpontaneous()}>
        <CinderSpontaneous />
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
      title="estudo"
      parts={parts()}
      finalHint="vamos praticar →"
      skipLabel="pular"
      onClose={markTheoryIntroduced}
    />
  );
}

// === Hub modal (always opens; sub-views handle each path) ===================

function CinderHub(props: Props) {
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
    <MapDialog title={`Cinder — ${cinder.name}`} onClose={onClose}>
      <CinderView />

      <Show when={!hubOpen()}>
        <p class="cinder-no-lesson">
          O Cinder está quieto. <em>Vai primeiro até o Fogo Ancião.</em>
        </p>
      </Show>

      <Show when={hubOpen() && view() === 'hub'}>
        <div class="cinder-hub">
          <p class="cinder-greeting">
            <Show
              when={currentStarted()}
              fallback={'O Fogo Ancião ainda não acendeu a próxima parábola. Mas posso te mostrar o que já estudámos.'}
            >
              {hubGreeting(cinder.personality, lessonState.stage)}
            </Show>
          </p>
          <div class="cinder-hub-options">
            <button class="cinder-hub-option" onClick={() => setView('rever-list')}>
              <span class="cinder-hub-option-label">Teoria</span>
              <span class="cinder-hub-option-desc">rever famílias já apresentadas</span>
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
              <span class="cinder-hub-option-label">Prática</span>
              <span class="cinder-hub-option-desc">
                <Show
                  when={currentStarted()}
                  fallback={'aguarda a próxima parábola'}
                >
                  questões da família atual
                </Show>
              </span>
            </button>
          </div>
          <Show when={lessonState.stage === 'practiced'}>
            <p class="cinder-practiced-hint">
              <em>O Fogo Ancião espera te provar.</em>
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
    </MapDialog>
  );
}

// === Sub-views ==============================================================

function BackLink(props: { onBack: () => void; label?: string }) {
  return (
    <button class="cinder-back-link" onClick={props.onBack}>
      ← {props.label ?? 'voltar'}
    </button>
  );
}

function ReviewListView(props: { onPick: (id: string) => void; onBack: () => void }) {
  const list = createMemo(() => presentedLessons());
  return (
    <div class="cinder-section">
      <BackLink onBack={props.onBack} />
      <div class="cinder-section-header">
        <span class="cinder-section-label">teoria</span>
        <span class="cinder-section-meta">famílias já apresentadas</span>
      </div>
      <Show
        when={list().length > 0}
        fallback={<p class="cinder-no-lesson">Nada apresentado ainda.</p>}
      >
        <div class="cinder-hub-options">
          <For each={list()}>
            {(l) => (
              <button class="cinder-hub-option" onClick={() => props.onPick(l.id)}>
                <span class="cinder-hub-option-label">
                  Família {l.family} — {l.parable.title}
                </span>
                <span class="cinder-hub-option-desc">parábola e teoria</span>
              </button>
            )}
          </For>
        </div>
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
      <BackLink onBack={props.onBack} label="famílias" />
      <div class="cinder-section-header">
        <span class="cinder-section-label">família {props.lesson.family}</span>
        <span class="cinder-section-meta">{props.lesson.parable.title}</span>
      </div>
      <div class="cinder-hub-options">
        <button class="cinder-hub-option" onClick={props.onPickParable}>
          <span class="cinder-hub-option-label">Parábola</span>
          <span class="cinder-hub-option-desc">o que o Fogo Ancião disse</span>
        </button>
        <button class="cinder-hub-option" onClick={props.onPickTheory}>
          <span class="cinder-hub-option-label">Teoria</span>
          <span class="cinder-hub-option-desc">o que o Cinder ensinou</span>
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

// Worked-out solution shown after a wrong answer or an explicit "ver
// resposta". The solution string supports inline LaTeX via $...$ which
// the standard markup pipeline renders. Visual: dim border, slightly
// indented, distinct from the option buttons so it reads as commentary.
function SolutionPanel(props: { solution: string }) {
  return (
    <div class="study-solution">
      <div class="study-solution-label">caminho da resposta</div>
      <p class="study-solution-text" innerHTML={renderInlineMarkup(props.solution)} />
    </div>
  );
}

function ParableView(props: { lesson: Lesson; onBack: () => void }) {
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
    // Reveal also breaks the streak — the player saw the answer rather than
    // arriving at it. No vitality penalty (they didn't pick wrong).
    if (exerciseState.current.family) {
      recordWrong(exerciseState.current.family);
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
                      disabled={exerciseState.result !== null}
                      onClick={() => onSelect(i())}
                    >
                      {opt}
                    </button>
                  );
                }}
              </For>
            </div>
            <Show when={exerciseState.result === null}>
              <button class="cinder-reveal-link" onClick={onReveal}>
                ver resposta
              </button>
            </Show>
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
            <Show when={exerciseState.result === 'revealed'}>
              <p class="study-feedback is-revealed">
                <em>A resposta certa está marcada. A sequência foi quebrada.</em>
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
