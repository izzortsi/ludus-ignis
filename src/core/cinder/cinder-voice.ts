// Personality + reading-manner voice helpers.
// All text in Brazilian Portuguese (você-form, BR vocabulary).

import { CinderPersonality, CinderReadingManner } from './cinder-model';

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
