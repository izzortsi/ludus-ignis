// Personality + reading-manner voice helpers.
// All text in Brazilian Portuguese (você-form, BR vocabulary).

import { CinderPersonality, CinderReadingManner } from './cinder-model';
import type { LessonStage } from '../lessons/lesson-model';

// --- hub greeting -----------------------------------------------------------
// What the Cinder says when its modal opens (after the spontaneous theory
// walk-through has already happened). Personality + lesson stage modulate
// the phrasing.

export function hubGreeting(personality: CinderPersonality, stage: LessonStage): string {
  if (stage === 'studying') {
    switch (personality) {
      case 'warm':    return 'Voltaste. Que queres? Posso rever a teoria contigo, ou pesar uns números.';
      case 'laconic': return 'Hm? Teoria, prática, ou parábola.';
      case 'playful': return 'De volta! Teoria de novo, ou já vamos pesar?';
      case 'severe':  return 'Ainda não terminamos. Escolhe: teoria, prática, ou parábola.';
    }
  }
  if (stage === 'practiced') {
    switch (personality) {
      case 'warm':    return 'Estás pronto, parece. Queres rever antes de ele te provar?';
      case 'laconic': return 'Pronto. Revê, ou vai.';
      case 'playful': return 'Conseguiste! Queres dar uma última olhada antes da prova?';
      case 'severe':  return 'Preparado. Se queres rever, revê.';
    }
  }
  // tested or other
  switch (personality) {
    case 'warm':    return 'Aguardamos. Mas se queres rever o que falamos, fica à vontade.';
    case 'laconic': return 'Espera.';
    case 'playful': return 'Esperando o próximo!';
    case 'severe':  return 'Aguarda.';
  }
}

// --- exercise framing -------------------------------------------------------

export function exerciseIntro(personality: CinderPersonality): string {
  switch (personality) {
    case 'warm':    return 'Venha. Vamos pensar juntos.';
    case 'laconic': return 'Pense.';
    case 'playful': return 'Outro enigma?';
    case 'severe':  return 'Atenção. Esta é a questão.';
  }
}

export function correctFeedback(personality: CinderPersonality): string {
  switch (personality) {
    case 'warm':    return 'Bem feito. Isso nos fortalece.';
    case 'laconic': return 'Sim.';
    case 'playful': return 'Boa! Você pegou o jeito.';
    case 'severe':  return 'Correto.';
  }
}

export function wrongFeedback(personality: CinderPersonality): string {
  switch (personality) {
    case 'warm':    return 'Não foi assim. Vamos olhar de novo, com calma.';
    case 'laconic': return 'Não.';
    case 'playful': return 'Hmmm... não. Tente de novo.';
    case 'severe':  return 'Errado. Decore a senda.';
  }
}

// --- reading verdict --------------------------------------------------------

export interface VerdictPhrase {
  prefix: string; // before the band label
  suffix: string; // after the band label
}

export function verdictPhrase(manner: CinderReadingManner, name: string): VerdictPhrase {
  switch (manner) {
    case 'confident':  return { prefix: `${name} diz: `, suffix: '.' };
    case 'cautious':   return { prefix: `${name} olha por mais tempo. Hesita. Diz: `, suffix: '.' };
    case 'histrionic': return { prefix: `${name} estala e quase grita: `, suffix: '!' };
  }
}

// --- concept reveal ---------------------------------------------------------

interface ConceptInfo {
  name: string;
  definition: string;   // a short phrase capturing what the family is about
  formalName: string;   // name carried over from before the collapse
}

const CONCEPTS: Record<string, ConceptInfo> = {
  'O Caminho de Volta': {
    name: 'O Caminho de Volta',
    definition: 'Quando o sinal chega e queremos voltar à fonte.',
    formalName: 'Bayes'
  },
  'A Mão Cega no Jarro': {
    name: 'A Mão Cega no Jarro',
    definition: 'Quando o que sai depende do que está dentro — e do jeito de tirar.',
    formalName: 'amostragem'
  }
};

export function conceptRevealText(personality: CinderPersonality, conceptName: string): string {
  const info = CONCEPTS[conceptName];
  if (!info) return '';
  switch (personality) {
    case 'warm':
      return `Veja. Isto que você aprendeu — chama-se ${info.name}. ${info.definition} Os antigos chamavam isso de ${info.formalName}; o nome quase se perdeu.`;
    case 'laconic':
      return `${info.name}. ${info.definition} Os antigos: ${info.formalName}.`;
    case 'playful':
      return `Você descobriu sozinho. Tem nome: ${info.name}. ${info.definition} Os antigos chamavam ${info.formalName}, mas o termo se esqueceu.`;
    case 'severe':
      return `Saiba o nome. ${info.name}. ${info.definition} Os antigos chamavam ${info.formalName}.`;
  }
}
