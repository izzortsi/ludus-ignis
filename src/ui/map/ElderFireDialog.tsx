import { createMemo } from 'solid-js';
import { SpeechPresentation, type SpeechPart } from './SpeechPresentation';
import { currentLesson, lessonState, markParableHeard } from '../../core/lessons/lesson-store';

interface Props {
  onClose: () => void;
}

// What the Elder Fire says depends on the lesson stage:
//   parable    → full parable + directive (first time the apprentice visits)
//   studying   → short remark; refuses to repeat himself
//   practiced  → "ready, will test you" (test loop is Phase 2C — placeholder)
//   tested     → bridge into next lesson (also Phase 2C)
export function ElderFireDialog(props: Props) {
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
    if (stage === 'practiced') {
      return [{
        text: 'Estás pronto. Em breve, te provo. (a prova ainda virá.)',
        variant: 'directive'
      }];
    }
    // tested
    return [{
      text: 'Bem. O ensino prosseguirá. (a próxima parábola ainda virá.)',
      variant: 'directive'
    }];
  });

  const finalHint = createMemo(() => {
    if (lessonState.stage === 'parable') return 'ir até o cinder →';
    return 'fechar →';
  });

  function close() {
    if (lessonState.stage === 'parable') markParableHeard();
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
