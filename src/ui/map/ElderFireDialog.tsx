import { createSignal, createMemo, Show } from 'solid-js';
import { Typewriter } from '../components/Typewriter';
import { currentLesson, lessonState, markParableHeard } from '../../core/lessons/lesson-store';

interface Props {
  onClose: () => void;
}

// Bottom-overlay speech panel where the Elder Fire (the Hearth) tells the
// current lesson's parable, then closes with a directive pointing the
// Apprentice to the Cinder. Tap LEFT half = back; tap RIGHT half = skip
// current paragraph if typing, else advance / close.
//
// Phase 2 wiring: reads the parable from the lesson store; the directive
// is the lesson's directive line (final "paragraph"); on close we mark the
// lesson stage as 'studying' so the Cinder knows the apprentice was sent.
export function ElderFireDialog(props: Props) {
  const lesson = createMemo(() => currentLesson());
  const allParts = createMemo(() => [
    ...lesson().parable.paragraphs,
    lesson().parable.directive
  ]);
  const directiveIdx = createMemo(() => allParts().length - 1);

  const [paragraphIdx, setParagraphIdx] = createSignal(0);
  const [skip, setSkip] = createSignal(false);
  const [paragraphDone, setParagraphDone] = createSignal(false);
  const [instant, setInstant] = createSignal(false);

  const currentText = createMemo(() => allParts()[paragraphIdx()]);
  const isDirective = createMemo(() => paragraphIdx() === directiveIdx());
  const canGoBack = createMemo(() => paragraphIdx() > 0);

  function close() {
    // Closing the directive means the Apprentice has heard the parable and
    // been pointed at the Cinder. Advance lesson stage so the Cinder will
    // teach (and not just be a study panel).
    if (isDirective()) markParableHeard();
    props.onClose();
  }

  function goForward() {
    if (!paragraphDone()) {
      setSkip(true);
      return;
    }
    if (isDirective()) {
      close();
      return;
    }
    setSkip(false);
    setInstant(false);
    setParagraphDone(false);
    setParagraphIdx((i) => i + 1);
  }

  function goBack() {
    if (!canGoBack()) return;
    setSkip(false);
    setInstant(true);
    setParagraphDone(true);
    setParagraphIdx((i) => i - 1);
  }

  function onTap(e: MouseEvent) {
    const stage = e.currentTarget as HTMLDivElement;
    const rect = stage.getBoundingClientRect();
    const isLeftHalf = (e.clientX - rect.left) < rect.width / 2;
    if (isLeftHalf) goBack(); else goForward();
  }

  const stageHint = createMemo(() => {
    if (lessonState.stage === 'practiced') return ' (pronto para a prova)';
    if (lessonState.stage === 'studying') return ' (estudando)';
    return '';
  });

  return (
    <div
      class="speech-panel"
      onClick={onTap}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div class="speech-header">
        <span class="speech-speaker">Fogo Ancião</span>
        <span class="speech-title">— {lesson().parable.title}{stageHint()}</span>
        <span class="speech-progress">{paragraphIdx() + 1}/{allParts().length}</span>
      </div>
      <p class={`speech-text ${isDirective() ? 'is-directive' : ''}`}>
        <Show
          when={instant()}
          fallback={
            <Typewriter
              text={currentText()}
              speedMs={28}
              skip={skip()}
              onDone={() => setParagraphDone(true)}
            />
          }
        >
          {currentText()}
        </Show>
      </p>
      <div class="speech-nav">
        <span class="speech-nav-back">
          <Show when={canGoBack()}>← voltar</Show>
        </span>
        <span class="speech-nav-forward">
          <Show when={paragraphDone()}>
            {isDirective() ? 'ir até o cinder →' : 'avançar →'}
          </Show>
        </span>
      </div>
    </div>
  );
}
