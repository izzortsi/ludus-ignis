// Personality + reading-manner voice helpers. All user-visible strings now
// route through the i18n dictionary so locale switching re-renders cleanly.

import { CinderPersonality, CinderReadingManner } from './cinder-model';
import type { LessonStage } from '../lessons/lesson-model';
import { t } from '../../i18n';

// --- hub greeting -----------------------------------------------------------
// What the Cinder says when its modal opens (after the spontaneous theory
// walk-through has already happened). Personality + lesson stage modulate
// the phrasing.

type GreetingStage = 'studying' | 'practiced' | 'other';

function stageKey(stage: LessonStage): GreetingStage {
  if (stage === 'studying')  return 'studying';
  if (stage === 'practiced') return 'practiced';
  return 'other';
}

export function hubGreeting(personality: CinderPersonality, stage: LessonStage): string {
  return t().cinderVoice.greeting[personality][stageKey(stage)];
}

// --- exercise framing -------------------------------------------------------

export function exerciseIntro(personality: CinderPersonality): string {
  return t().cinderVoice.exerciseIntro[personality];
}

export function correctFeedback(personality: CinderPersonality): string {
  return t().cinderVoice.correctFeedback[personality];
}

export function wrongFeedback(personality: CinderPersonality): string {
  return t().cinderVoice.wrongFeedback[personality];
}

// --- reading verdict --------------------------------------------------------

export interface VerdictPhrase {
  prefix: string;
  suffix: string;
}

export function verdictPhrase(manner: CinderReadingManner, name: string): VerdictPhrase {
  return t().reading[manner](name);
}

// --- concept reveal ---------------------------------------------------------

// Concept ids match the dictionary's `conceptReveal.concept` keys. The
// per-personality wording is built from those entries.
type ConceptId =
  | 'forma-mundo-possivel'
  | 'roda-inclusoes'
  | 'juras-chama'
  | 'dois-sinais'
  | 'mao-cega'
  | 'caminho-de-volta';

// Map from the diegetic concept name (used as a key by the knowledge
// store to decide whether reveal has fired) to the dictionary id. The
// names on the left exist in BOTH locales — see below for resolution.
const NAME_TO_ID: Record<string, ConceptId> = {
  // PT names (canonical knowledge-store keys)
  'A Forma do Mundo Possível': 'forma-mundo-possivel',
  'A Roda das Inclusões':       'roda-inclusoes',
  'As Juras da Chama':          'juras-chama',
  'Os Dois Sinais':             'dois-sinais',
  'A Mão Cega no Jarro':        'mao-cega',
  'O Caminho de Volta':         'caminho-de-volta',
  // EN names — when content runs in EN locale, the exercise file uses
  // the translated conceptName, so look up by either spelling.
  'The Shape of the Possible World': 'forma-mundo-possivel',
  'The Wheel of Inclusions':         'roda-inclusoes',
  'The Oaths of the Flame':          'juras-chama',
  'The Two Signs':                   'dois-sinais',
  'The Blind Hand in the Jar':       'mao-cega',
  'The Way Back':                    'caminho-de-volta',
};

export function conceptRevealText(personality: CinderPersonality, conceptName: string): string {
  const id = NAME_TO_ID[conceptName];
  if (!id) return '';
  const info = t().conceptReveal.concept[id];
  return t().conceptReveal.prologue[personality](info.name, info.definition, info.formal);
}
