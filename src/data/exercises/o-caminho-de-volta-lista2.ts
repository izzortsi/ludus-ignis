// Family 9 — O Caminho de Volta — extracted from Prof. Giulio's
// "Lista de Exercícios 2 — Probabilidade Condicional - Fórmula de Bayes".
//
// All problems verified against the source PDF and the answer worked through
// by hand. Multiple-choice options synthesized (the source has free-form
// answers); correct option matches the canonical answer.

import { Exercise } from '../../core/exercises/exercise-model';

export const oCaminhoDeVoltaLista2: Exercise[] = [
  {
    id: 'ocdv-l2-1',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 2,
    statement:
      'Considere o lançamento de dois dados honestos. Qual a probabilidade de que pelo menos um deles caia no 6, dado que a soma dos dois é 7?',
    options: ['1/6', '1/3', '1/2', '2/3'],
    correctIndex: 1,
    source: { file: 'lista2.pdf', page: 1, problem: 1 }
  },
  {
    id: 'ocdv-l2-2',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 5,
    statement:
      'Considere três urnas. A urna A contém 2 bolas brancas e 4 vermelhas. A urna B contém 8 brancas e 4 vermelhas. A urna C contém 1 branca e 4 vermelhas. Tiro uma bola de cada urna, uniformemente. Sabendo que exatamente 2 das 3 bolas tiradas são brancas, qual a probabilidade de a bola tirada da urna A ser branca?',
    options: ['1/3', '8/13', '9/13', '2/3'],
    correctIndex: 2,
    source: { file: 'lista2.pdf', page: 1, problem: 3 }
  },
  {
    id: 'ocdv-l2-3',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 3,
    statement:
      'Suponha que 5% dos homens e 0,25% das mulheres usam óculos. Uma pessoa é escolhida aleatoriamente, com igual probabilidade entre homens e mulheres. Sabendo que ela usa óculos, qual a probabilidade aproximada de ser mulher?',
    options: ['5%', '10%', '25%', '50%'],
    correctIndex: 0,
    source: { file: 'lista2.pdf', page: 2, problem: 12 }
  },
  {
    id: 'ocdv-l2-4',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 1,
    statement:
      'Uma urna contém 5 bolas pretas e 5 brancas. Tiro uma bola — é branca. Devolvo, e tiro outra. Qual a probabilidade de a segunda também ser branca?',
    options: ['1/4', '4/9', '1/2', '5/9'],
    correctIndex: 2,
    source: { file: 'lista2.pdf', page: 3, problem: 14 }
  }
];
