// Shape of the per-locale UI string dictionary. Authored once in `pt.ts`
// (the canonical source); `en.ts` is type-checked against it so missing
// keys surface at compile time.
//
// Convention: leaf values are plain strings or pure functions producing
// strings (for parameterised messages). Nested namespaces group strings
// by the screen/component that owns them.
//
// Content (lessons, exercises, parables) is NOT in this dictionary —
// those live as parallel data files under `src/data/{lessons,exercises}/<locale>/`
// because prose authoring wants whole-file diffs, not key-soup.

export type Locale = 'pt-BR' | 'en';

import type { pt } from './pt';

// Derive the canonical shape from `pt.ts` so the dict structure is
// authored in one place. `en.ts` declares `: Dict` so any divergence
// from pt's shape is a compile error.
export type Dict = typeof pt;
