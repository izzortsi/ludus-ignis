// Top-level settings panel. Wakes from a small gear icon top-right of
// the camp screen. Future home for audio sliders; for now it carries
// the language toggle.

import { Show, createSignal, For } from 'solid-js';
import { currentLocale, setLocale, t, type Locale } from '../../i18n';

interface Props {
  onClose: () => void;
  /** Optional secondary action — used by the existing "← intro" entry
   *  point so the player can rewatch the opening from the same panel. */
  onReplayIntro?: () => void;
}

const LOCALE_OPTIONS: Array<{ id: Locale; labelKey: 'languagePt' | 'languageEn' }> = [
  { id: 'pt-BR', labelKey: 'languagePt' },
  { id: 'en',    labelKey: 'languageEn' },
];

export function SettingsPanel(props: Props) {
  return (
    <div class="settings-backdrop" onClick={(e) => {
      if (e.target === e.currentTarget) props.onClose();
    }}>
      <div class="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div class="settings-header">
          <h2 class="settings-title">{t().settings.title}</h2>
          <button class="settings-close" onClick={props.onClose} aria-label={t().settings.close}>×</button>
        </div>
        <div class="settings-body">
          <div class="settings-row">
            <span class="settings-row-label">{t().settings.language}</span>
            <div class="settings-row-options">
              <For each={LOCALE_OPTIONS}>
                {(opt) => (
                  <button
                    class={`settings-pill ${currentLocale() === opt.id ? 'is-active' : ''}`}
                    onClick={() => setLocale(opt.id)}
                  >
                    {t().settings[opt.labelKey]}
                  </button>
                )}
              </For>
            </div>
          </div>
          <Show when={props.onReplayIntro}>
            <div class="settings-row">
              <button class="settings-replay" onClick={props.onReplayIntro}>
                {t().app.backToIntro}
              </button>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

// Trigger button (gear icon) — pinned top-right of the camp screen.
export function SettingsButton(props: { onOpen: () => void }) {
  return (
    <button class="settings-trigger" onClick={props.onOpen} title={t().settings.open} aria-label={t().settings.open}>
      ⚙
    </button>
  );
}

// Composed widget that owns its open/closed state — drop in once at the
// top of App.tsx and forget.
export function Settings(props: { onReplayIntro?: () => void }) {
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <SettingsButton onOpen={() => setOpen(true)} />
      <Show when={open()}>
        <SettingsPanel onClose={() => setOpen(false)} onReplayIntro={props.onReplayIntro} />
      </Show>
    </>
  );
}
