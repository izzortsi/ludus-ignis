// Public entry. Components call `t()` to get the active dict and read
// strings via field access (e.g. `t().hub.teoria.label`). Because t()
// reads `currentLocale()`, components that render strings via t() are
// reactive: switching locale at runtime re-renders them.

import { pt } from './pt';
import { en } from './en';
import { currentLocale } from './locale-store';
import type { Dict } from './types';

export type { Locale, Dict } from './types';
export { currentLocale, setLocale, getLocale } from './locale-store';

export function t(): Dict {
  return currentLocale() === 'en' ? en : pt;
}
