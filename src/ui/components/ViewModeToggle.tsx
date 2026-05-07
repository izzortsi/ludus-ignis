// View-mode toggle button — sits in the top-right corner next to the
// settings gear. One-click cycles auto → desktop → portrait → auto.
//
// Glyph reflects the *effective* mode (the layout the user is actually
// seeing right now). A trailing superscript ᴬ marks 'auto' so the player
// can tell at a glance whether the mode is pinned or auto-resolved.

import { createMemo } from 'solid-js';
import { t } from '../../i18n';
import {
  cycleViewMode, viewModeUserChoice, viewModeEffective,
  type ViewModeUserChoice
} from '../../core/view/view-mode-store';

function glyphFor(effective: 'desktop' | 'portrait'): string {
  return effective === 'desktop' ? '▭' : '▯';
}

function userLabel(choice: ViewModeUserChoice): string {
  if (choice === 'auto')     return t().viewMode.auto;
  if (choice === 'desktop')  return t().viewMode.desktop;
  return t().viewMode.portrait;
}

function effectiveLabel(effective: 'desktop' | 'portrait'): string {
  return effective === 'desktop' ? t().viewMode.desktop : t().viewMode.portrait;
}

export function ViewModeToggle() {
  const user = createMemo(() => viewModeUserChoice());
  const eff  = createMemo(() => viewModeEffective());
  const tip  = createMemo(() => t().viewMode.tooltip(userLabel(user()), effectiveLabel(eff())));
  const isAuto = createMemo(() => user() === 'auto');
  return (
    <button
      class="view-mode-toggle"
      onClick={cycleViewMode}
      title={tip()}
      aria-label={tip()}
    >
      <span class="view-mode-toggle-glyph">{glyphFor(eff())}</span>
      <span class={`view-mode-toggle-mark ${isAuto() ? 'is-auto' : ''}`}>
        {isAuto() ? 'ᴬ' : ''}
      </span>
    </button>
  );
}
