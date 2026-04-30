import { createSignal, createMemo, Show, For } from 'solid-js';
import { MapDialog } from './MapDialog';
import { CinderView } from '../components/CinderView';
import { Math as MathRender } from '../components/Math';
import katex from 'katex';
import { currentLesson, lessonState, recordPracticeCorrect } from '../../core/lessons/lesson-store';
import {
  exerciseState, loadNextExercise, selectAnswer, clearExercise
} from '../../core/exercises/exercise-store';
import { vitalityGainOnCorrect, VITALITY_PENALTY_ON_WRONG } from '../../core/exercises/exercise-model';
import { feedCinder } from '../../core/cinder/cinder-model';
import { cinder, setCinder } from '../../core/cinder/cinder-store';
import { exerciseIntro, correctFeedback, wrongFeedback } from '../../core/cinder/cinder-voice';
import { knowledge, recordCorrect, recordWrong, dismissReveal } from '../../core/knowledge/knowledge-store';
import { RevealPanel } from '../components/RevealPanel';

interface Props {
  onClose: () => void;
}

type CinderMode = 'theory' | 'practice';

const REVEAL_VITALITY_BONUS = 10;

export function CinderDialog(props: Props) {
  const lesson = createMemo(() => currentLesson());
  // If the apprentice hasn't yet heard the parable, the Cinder doesn't
  // teach — it just shows status. Otherwise theory first, then practice.
  const stageHasHeardElder = createMemo(
    () => lessonState.stage !== 'parable'
  );

  const [mode, setMode] = createSignal<CinderMode>('theory');

  function startPractice() {
    clearExercise();
    loadNextExercise(lesson().family);
    setMode('practice');
  }

  function backToTheory() {
    clearExercise();
    setMode('theory');
  }

  function onClose() {
    clearExercise();
    props.onClose();
  }

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
      // Lesson-side bookkeeping: counts toward this lesson's practice target.
      if (ex.family === lesson().family) {
        recordPracticeCorrect();
      }
    } else {
      setCinder(feedCinder(cinder, -VITALITY_PENALTY_ON_WRONG));
      recordWrong(ex.family);
    }
  }

  function onDismissReveal() {
    dismissReveal();
    loadNextExercise(lesson().family);
  }

  return (
    <MapDialog title={`Cinder — ${cinder.name}`} onClose={onClose}>
      <CinderView />

      {/* Apprentice hasn't heard the Elder yet — Cinder has nothing to teach. */}
      <Show when={!stageHasHeardElder()}>
        <p class="cinder-no-lesson">
          O Cinder está quieto. <em>Vai primeiro até o Fogo Ancião.</em>
        </p>
      </Show>

      <Show when={stageHasHeardElder() && mode() === 'theory'}>
        <div class="cinder-theory">
          <div class="cinder-theory-header">
            <span class="cinder-theory-label">teoria</span>
            <span class="cinder-theory-family">{lesson().parable.title} — família {lesson().family}</span>
          </div>
          <For each={lesson().theory}>
            {(section) => (
              <Show
                when={section.type === 'math'}
                fallback={<p class="cinder-theory-paragraph" innerHTML={renderInlineMarkup(section.content)} />}
              >
                <MathRender tex={section.content} />
              </Show>
            )}
          </For>
          <button class="cinder-cta" onClick={startPractice}>
            praticar →
          </button>
        </div>
      </Show>

      <Show when={stageHasHeardElder() && mode() === 'practice'}>
        <div class="cinder-practice">
          <div class="cinder-practice-header">
            <span class="cinder-practice-label">prática</span>
            <span class="cinder-practice-progress">
              {Math.min(lessonState.practiceCorrect, lesson().practiceTarget)}/{lesson().practiceTarget} corretas
            </span>
          </div>
          <Show
            when={exerciseState.current}
            fallback={
              <button class="cinder-cta" onClick={() => loadNextExercise(lesson().family)}>
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
                  <button class="cinder-cta" onClick={() => loadNextExercise(lesson().family)}>
                    próxima →
                  </button>
                </Show>
              </>
            )}
          </Show>

          <div class="cinder-practice-footer">
            <button class="cinder-cta-secondary" onClick={backToTheory}>
              ← rever teoria
            </button>
            <Show when={lessonState.stage === 'practiced'}>
              <p class="cinder-practiced-hint">
                <em>O Fogo Ancião espera te provar.</em>
              </p>
            </Show>
          </div>
        </div>
      </Show>
    </MapDialog>
  );
}

// Tiny inline markup for theory paragraphs:
//   *italic*  → <em>
//   $tex$     → inline math rendered by KaTeX (renderToString → HTML)
//
// We escape HTML on the surrounding text but feed the math chunk straight
// to KaTeX (it does its own escaping). Bad LaTeX falls back to a plain
// <code> so the paragraph still reads.
function renderInlineMarkup(s: string): string {
  // Split into alternating non-math and math chunks so HTML escaping never
  // touches the LaTeX source.
  const parts: string[] = [];
  let lastIdx = 0;
  const re = /\$([^$]+)\$/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(s)) !== null) {
    parts.push(escapeAndItalics(s.slice(lastIdx, match.index)));
    try {
      parts.push(katex.renderToString(match[1], { throwOnError: false, displayMode: false }));
    } catch {
      parts.push(`<code class="math-inline-text">${escapeHtml(match[1])}</code>`);
    }
    lastIdx = match.index + match[0].length;
  }
  parts.push(escapeAndItalics(s.slice(lastIdx)));
  return parts.join('');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAndItalics(s: string): string {
  return escapeHtml(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
