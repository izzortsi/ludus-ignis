// Locale signal + persistence. The current locale gates which UI dict is
// used by `t()` (see ./index.ts) and which content tree the lesson/exercise
// stores read from. Reactive — switching locale at runtime re-renders any
// component that read `t()` or called `getLocale()` inside a tracked scope.
//
// Default detection: navigator.language starting with 'en' → 'en', else
// 'pt-BR'. Always overridable via setLocale.

import { createSignal } from 'solid-js';
import type { Locale } from './types';
import { restoreLocale } from '../persistence/local-storage';

function detectDefault(): Locale {
  const saved = restoreLocale();
  if (saved === 'pt-BR' || saved === 'en') return saved;
  if (typeof navigator !== 'undefined' && typeof navigator.language === 'string') {
    if (navigator.language.toLowerCase().startsWith('en')) return 'en';
  }
  return 'pt-BR';
}

const [currentLocale, setCurrentLocale] = createSignal<Locale>(detectDefault());

export { currentLocale };

export function setLocale(locale: Locale): void {
  if (locale === 'pt-BR' || locale === 'en') {
    setCurrentLocale(locale);
  }
}

/** Non-reactive read — for store init / outside reactive scopes. Inside
 *  components, prefer `currentLocale()` so the binding tracks. */
export function getLocale(): Locale {
  return currentLocale();
}
