import { conceptRevealText } from '../../core/cinder/cinder-voice';
import { cinder } from '../../core/cinder/cinder-store';

interface Props {
  concept: string;
  onDismiss: () => void;
}

export function RevealPanel(props: Props) {
  return (
    <div class="reveal-panel">
      <p class="reveal-prologue">— o fogo arde mais alto —</p>
      <p class="reveal-text">{conceptRevealText(cinder.personality, props.concept)}</p>
      <button class="reveal-dismiss" onClick={props.onDismiss}>
        entendi
      </button>
    </div>
  );
}
