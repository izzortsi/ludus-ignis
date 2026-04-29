import { Show, createMemo } from 'solid-js';
import { reading, drawSample, presentToFire, decide, reset, Action } from '../../core/reading/reading-store';
import { BAND_LABEL } from '../../core/reading/reading-model';
import { Chirality } from '../../core/reading/sample-model';
import { cinder } from '../../core/cinder/cinder-store';
import { verdictPhrase } from '../../core/cinder/cinder-voice';
import { inflictThéaSickness } from '../../core/tribe/tribe-store';

function outcomeText(chirality: Chirality, action: Action): string {
  if (chirality === 'native' && action === 'use') return 'Era de nossa mão. O bando come bem.';
  if (chirality === 'native' && action === 'burn') return 'Era de nossa mão. Que desperdício.';
  if (chirality === 'mirror' && action === 'use') return 'Era tocada. Théa adoeceu.';
  if (chirality === 'mirror' && action === 'burn') return 'Era tocada. Bem feito — o fogo a engole.';
  if (chirality === 'inert' && action === 'use') return 'Não tinha mão. Servirá ao seu propósito.';
  if (chirality === 'inert' && action === 'burn') return 'Não tinha mão. Era apenas matéria — pena.';
  return '';
}

function outcomeClass(chirality: Chirality, action: Action): string {
  if (chirality === 'native' && action === 'use') return 'is-good';
  if (chirality === 'mirror' && action === 'burn') return 'is-good';
  if (chirality === 'mirror' && action === 'use') return 'is-bad';
  return 'is-neutral';
}

function onDecide(action: Action) {
  const chirality = decide(action);
  if (chirality === 'mirror' && action === 'use') {
    inflictThéaSickness();
  }
}

export function ReadingView() {
  const phrase = createMemo(() => verdictPhrase(cinder.readingManner, cinder.name));

  return (
    <div class="reading-view">
      <Show when={reading.phase === 'idle'}>
        <button class="reading-action" onClick={drawSample}>
          trazer amostra
        </button>
      </Show>

      <Show when={reading.phase !== 'idle' && reading.sample}>
        <p class="reading-sample">
          Você trouxe: {reading.sample!.type.description}.
        </p>
      </Show>

      <Show when={reading.phase === 'sample-drawn'}>
        <button class="reading-action" onClick={presentToFire}>
          apresentar ao fogo
        </button>
      </Show>

      <Show when={reading.phase === 'examining'}>
        <p class="reading-verdict reading-examining">
          <span class="cinder-name-inline">{cinder.name}</span> olha em silêncio…
        </p>
      </Show>

      <Show when={(reading.phase === 'reading-shown' || reading.phase === 'decided') && reading.band}>
        <p class="reading-verdict">
          {phrase().prefix}
          <em class={`verdict-${reading.band}`}>{BAND_LABEL[reading.band!]}</em>
          {phrase().suffix}
        </p>
      </Show>

      <Show when={reading.phase === 'reading-shown'}>
        <div class="reading-actions-row">
          <button class="reading-action" onClick={() => onDecide('use')}>usar</button>
          <button class="reading-action" onClick={() => onDecide('burn')}>queimar</button>
        </div>
      </Show>

      <Show when={reading.phase === 'decided' && reading.sample && reading.action}>
        <p class={`reading-outcome ${outcomeClass(reading.sample!.trueChirality, reading.action!)}`}>
          {outcomeText(reading.sample!.trueChirality, reading.action!)}
        </p>
        <button class="reading-action" onClick={reset}>outra</button>
      </Show>
    </div>
  );
}
