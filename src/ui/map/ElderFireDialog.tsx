import { createSignal, createMemo, Show } from 'solid-js';
import { Typewriter } from '../components/Typewriter';

// Phase 1 stub: a single hardcoded parable, broken into paragraphs so each
// types out one at a time. The final entry is a *directive* — the Elder
// pointing the Apprentice toward their Cinder for the formal practice.
// Phase 2 will switch on lesson topic and chain the test back to the Elder.
const PARABLE_TITLE = 'Duas flechas';
const PARABLE_PARAGRAPHS = [
  'Solto uma flecha para o leste. Tu soltas uma para o oeste. Que a minha encontre o veado não diz nada sobre se a tua encontrará. Os ventos que as carregam são ventos diferentes. Os destinos estão desentrelaçados.',
  'Pois bem: se uma em três das minhas flechas atinge, e uma em quatro das tuas, qual é a chance de ambos voltarmos com carne? Uma em três, multiplicada por uma em quatro. Uma em doze. O número fica menor. Uma conjunção de fortunas alheias entre si encolhe ao multiplicar.',
  'Por isso um bando que depende de três golpes de sorte separados é um bando que muitas vezes passa fome. E por isso um caçador bom em uma coisa difícil é muito mais raro do que um caçador bom em uma coisa fácil — porque a sua habilidade é a conjunção de muitas habilidades pequenas, e conjunções multiplicam.',
  'Mas cuidado. Alguns destinos não estão desentrelaçados. Se vem tempestade, ambas as flechas voam na chuva, e a falha de uma vira notícia sobre a outra. Antes de multiplicar, procura o vento que toca os dois. A ilusão da independência é o erro mais caro que uma pessoa pensante pode cometer.'
];

const ELDER_DIRECTIVE =
  'Vai agora ao teu Cinder. Os números pesam o que eu disse — deixa que ele te ensine. Quando voltares, te provo.';

const ALL_PARTS: ReadonlyArray<string> = [...PARABLE_PARAGRAPHS, ELDER_DIRECTIVE];
const DIRECTIVE_IDX = ALL_PARTS.length - 1;

interface Props {
  onClose: () => void;
}

// Bottom-overlay speech panel. Map remains visible behind. Tap the LEFT
// half of the panel to go back to the previous paragraph (shown instantly
// without typewriter); tap the RIGHT half to skip the current paragraph
// to its end OR advance to the next; final right-tap closes.
export function ElderFireDialog(props: Props) {
  const [paragraphIdx, setParagraphIdx] = createSignal(0);
  const [skip, setSkip] = createSignal(false);
  const [paragraphDone, setParagraphDone] = createSignal(false);
  const [instant, setInstant] = createSignal(false);

  const currentText = createMemo(() => ALL_PARTS[paragraphIdx()]);
  const isLastParagraph = createMemo(() => paragraphIdx() >= ALL_PARTS.length - 1);
  const isDirective = createMemo(() => paragraphIdx() === DIRECTIVE_IDX);
  const canGoBack = createMemo(() => paragraphIdx() > 0);

  function goForward() {
    if (!paragraphDone()) {
      setSkip(true);
      return;
    }
    if (isLastParagraph()) {
      props.onClose();
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

  return (
    <div
      class="speech-panel"
      onClick={onTap}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div class="speech-header">
        <span class="speech-speaker">Fogo Ancião</span>
        <span class="speech-title">— {PARABLE_TITLE}</span>
        <span class="speech-progress">{paragraphIdx() + 1}/{ALL_PARTS.length}</span>
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
