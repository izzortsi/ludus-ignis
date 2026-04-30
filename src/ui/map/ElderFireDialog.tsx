import { createSignal, createMemo, Show } from 'solid-js';
import { Typewriter } from '../components/Typewriter';

// Phase 1 stub: a single hardcoded parable, broken into paragraphs so each
// types out one at a time. Phase 2 will switch on lesson topic.
const PARABLE_TITLE = 'Duas flechas';
const PARABLE_PARAGRAPHS = [
  'Solto uma flecha para o leste. Tu soltas uma para o oeste. Que a minha encontre o veado não diz nada sobre se a tua encontrará. Os ventos que as carregam são ventos diferentes. Os destinos estão desentrelaçados.',
  'Pois bem: se uma em três das minhas flechas atinge, e uma em quatro das tuas, qual é a chance de ambos voltarmos com carne? Uma em três, multiplicada por uma em quatro. Uma em doze. O número fica menor. Uma conjunção de fortunas alheias entre si encolhe ao multiplicar.',
  'Por isso um bando que depende de três golpes de sorte separados é um bando que muitas vezes passa fome. E por isso um caçador bom em uma coisa difícil é muito mais raro do que um caçador bom em uma coisa fácil — porque a sua habilidade é a conjunção de muitas habilidades pequenas, e conjunções multiplicam.',
  'Mas cuidado. Alguns destinos não estão desentrelaçados. Se vem tempestade, ambas as flechas voam na chuva, e a falha de uma vira notícia sobre a outra. Antes de multiplicar, procura o vento que toca os dois. A ilusão da independência é o erro mais caro que uma pessoa pensante pode cometer.'
];

interface Props {
  onClose: () => void;
}

// Bottom-overlay speech panel. Map remains visible behind it; the Apprentice
// is standing at the Hearth approach cell while the Elder Fire speaks.
// Tap the panel to skip the current paragraph or advance to the next.
export function ElderFireDialog(props: Props) {
  const [paragraphIdx, setParagraphIdx] = createSignal(0);
  const [skip, setSkip] = createSignal(false);
  const [paragraphDone, setParagraphDone] = createSignal(false);

  const currentText = createMemo(() => PARABLE_PARAGRAPHS[paragraphIdx()]);
  const isLastParagraph = createMemo(() => paragraphIdx() >= PARABLE_PARAGRAPHS.length - 1);

  function advance() {
    if (!paragraphDone()) {
      setSkip(true);  // skip current paragraph to its end
      return;
    }
    if (isLastParagraph()) {
      props.onClose();
      return;
    }
    setSkip(false);
    setParagraphDone(false);
    setParagraphIdx((i) => i + 1);
  }

  return (
    <div
      class="speech-panel"
      onClick={advance}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div class="speech-header">
        <span class="speech-speaker">Fogo Ancião</span>
        <span class="speech-title">— {PARABLE_TITLE}</span>
        <span class="speech-progress">{paragraphIdx() + 1}/{PARABLE_PARAGRAPHS.length}</span>
      </div>
      <p class="speech-text">
        <Typewriter
          text={currentText()}
          speedMs={28}
          skip={skip()}
          onDone={() => setParagraphDone(true)}
        />
      </p>
      <Show when={paragraphDone()}>
        <div class="speech-advance-hint">
          {isLastParagraph() ? 'toque para fechar' : 'toque para continuar'}
        </div>
      </Show>
    </div>
  );
}
