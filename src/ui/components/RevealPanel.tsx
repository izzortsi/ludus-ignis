import { conceptRevealText } from '../../core/cinder/cinder-voice';
import { cinder } from '../../core/cinder/cinder-store';
import { t } from '../../i18n';

interface Props {
  concept: string;
  onDismiss: () => void;
}

export function RevealPanel(props: Props) {
  return (
    <div class="reveal-panel">
      <p class="reveal-prologue">{t().revealPanel.prologue}</p>
      <p class="reveal-text">{conceptRevealText(cinder.personality, props.concept)}</p>
      <button class="reveal-dismiss" onClick={props.onDismiss}>
        {t().revealPanel.dismiss}
      </button>
    </div>
  );
}
