// Family 5 — A Mão Cega no Jarro — urn draws / classical sampling.
// Alpha-zero hand-authored set; A-style; Brazilian Portuguese.

import { Exercise } from '../../core/exercises/exercise-model';

export const aMaoCegaNoJarro: Exercise[] = [
  {
    id: 'amcj-1',
    family: 5,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 1,
    statement:
      'Em uma urna há 4 bolas vermelhas e 6 azuis. Tiro uma bola ao acaso. Qual a probabilidade de ela ser vermelha?',
    options: ['1/4', '2/5', '1/2', '4/6'],
    correctIndex: 1
  },
  {
    id: 'amcj-2',
    family: 5,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 2,
    statement:
      'Em uma urna há 3 bolas vermelhas e 7 azuis. Tiro uma bola, anoto a cor, devolvo, e tiro outra. Qual a probabilidade de tirar duas vermelhas?',
    options: ['3/100', '9/100', '6/45', '3/10'],
    correctIndex: 1
  },
  {
    id: 'amcj-3',
    family: 5,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 2,
    statement:
      'Em uma urna há 3 bolas vermelhas e 7 azuis. Tiro duas bolas sem reposição. Qual a probabilidade de tirar duas vermelhas?',
    options: ['1/15', '6/100', '1/10', '1/6'],
    correctIndex: 0
  },
  {
    id: 'amcj-4',
    family: 5,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 3,
    statement:
      'Em uma urna há 3 bolas vermelhas e 7 azuis. Tiro três bolas sem reposição. Qual a probabilidade de tirar a sequência (vermelha, azul, vermelha) nessa ordem?',
    options: ['7/120', '6/100', '1/12', '21/100'],
    correctIndex: 0
  },
  {
    id: 'amcj-5',
    family: 5,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 3,
    statement:
      'Em uma urna há 4 bolas vermelhas e 6 azuis. Tiro duas bolas sem reposição. Qual a probabilidade de tirar pelo menos uma vermelha?',
    options: ['2/5', '1/2', '2/3', '4/5'],
    correctIndex: 2
  }
];
