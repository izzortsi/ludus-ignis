// View-mode store: chooses between desktop and portrait layouts. The user
// can pin an explicit mode (sticky across reloads) or leave it on 'auto'
// (resolved live from a viewport media query).
//
// Why split user-mode from effective-mode?
//   - 'auto' should re-resolve when the viewport changes (window resize,
//     dev-tools docking, mobile rotation), so we keep a matchMedia listener.
//   - The user might pin 'portrait' on a desktop to QA the mobile look, or
//     pin 'desktop' on a tall window to force wide ASCII.
//
// The data-view-mode attribute on <html> drives CSS targeting; the
// `viewMode()` reactive getter drives any UI that needs to label / cycle.

import { createSignal, createEffect, onCleanup } from 'solid-js';
import { restoreViewMode } from '../../persistence/local-storage';

export type ViewModeUserChoice = 'auto' | 'desktop' | 'portrait';
export type ViewModeEffective  = 'desktop' | 'portrait';

const DESKTOP_MIN_WIDTH_PX = 900;

function detectFromViewport(): ViewModeEffective {
  if (typeof window === 'undefined' || !window.matchMedia) return 'portrait';
  return window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`).matches
    ? 'desktop'
    : 'portrait';
}

function initialUser(): ViewModeUserChoice {
  const saved = restoreViewMode();
  if (saved === 'auto' || saved === 'desktop' || saved === 'portrait') return saved;
  return 'auto';
}

const [userChoice, setUserChoiceSig] = createSignal<ViewModeUserChoice>(initialUser());
const [autoMode,   setAutoMode]      = createSignal<ViewModeEffective>(detectFromViewport());

// Live-track the viewport while userChoice === 'auto'. We always run the
// listener (cheap) and just ignore the result when the user has pinned.
if (typeof window !== 'undefined' && window.matchMedia) {
  const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`);
  const handler = () => setAutoMode(mq.matches ? 'desktop' : 'portrait');
  mq.addEventListener('change', handler);
  // No onCleanup — this listener lives for the page lifetime.
}

export function viewModeUserChoice(): ViewModeUserChoice {
  return userChoice();
}

export function viewModeEffective(): ViewModeEffective {
  const u = userChoice();
  if (u === 'auto') return autoMode();
  return u;
}

export function setViewMode(choice: ViewModeUserChoice): void {
  if (choice === 'auto' || choice === 'desktop' || choice === 'portrait') {
    setUserChoiceSig(choice);
  }
}

// Cycle order: auto → desktop → portrait → auto.
export function cycleViewMode(): void {
  const u = userChoice();
  if (u === 'auto')          setUserChoiceSig('desktop');
  else if (u === 'desktop')  setUserChoiceSig('portrait');
  else                       setUserChoiceSig('auto');
}

// Reflect the effective mode on <html> as a data attribute so CSS can
// target without inheriting through component boundaries. Mounted once at
// app init via wireDataAttribute(); subsequent changes update reactively.
export function wireDataAttribute(): void {
  if (typeof document === 'undefined') return;
  createEffect(() => {
    const eff = viewModeEffective();
    document.documentElement.setAttribute('data-view-mode', eff);
  });
  onCleanup(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.removeAttribute('data-view-mode');
    }
  });
}
