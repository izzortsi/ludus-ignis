import { MapDialog } from './MapDialog';

// Phase 1 stub: a single hardcoded parable. Phase 2 will wire a state
// machine that picks the parable matching the current lesson topic and
// queues a test on return.
const PARABLE_TITLE = 'Duas flechas';
const PARABLE_BODY = `Solto uma flecha para o leste. Tu soltas uma para o oeste. Que a minha encontre o veado não diz nada sobre se a tua encontrará. Os ventos que as carregam são ventos diferentes. Os destinos estão desentrelaçados.

Pois bem: se uma em três das minhas flechas atinge, e uma em quatro das tuas, qual é a chance de ambos voltarmos com carne? Uma em três, multiplicada por uma em quatro. Uma em doze. O número fica menor. Uma conjunção de fortunas alheias entre si encolhe ao multiplicar.

Por isso um bando que depende de três golpes de sorte separados é um bando que muitas vezes passa fome. E por isso um caçador bom em uma coisa difícil é muito mais raro do que um caçador bom em uma coisa fácil — porque a sua habilidade é a conjunção de muitas habilidades pequenas, e conjunções multiplicam.

Mas cuidado. Alguns destinos não estão desentrelaçados. Se vem tempestade, ambas as flechas voam na chuva, e a falha de uma vira notícia sobre a outra. Antes de multiplicar, procura o vento que toca os dois. A ilusão da independência é o erro mais caro que uma pessoa pensante pode cometer.`;

interface Props {
  onClose: () => void;
}

export function ElderFireDialog(props: Props) {
  return (
    <MapDialog title={`Fogo Ancião — ${PARABLE_TITLE}`} onClose={props.onClose}>
      <div class="elder-parable">
        {PARABLE_BODY.split('\n\n').map((p) => <p>{p}</p>)}
      </div>
      <div class="elder-cta">
        <em>O Fogo Ancião aponta para o teu Cinder.</em>
        <button class="map-dialog-action" onClick={props.onClose}>ir até o Cinder</button>
      </div>
    </MapDialog>
  );
}
