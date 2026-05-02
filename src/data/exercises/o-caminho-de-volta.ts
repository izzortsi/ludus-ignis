// Family 9 — O Caminho de Volta — Bayesian inversion.
// Alpha-zero hand-authored set; A-style transposition to fire-voice.
// Brazilian Portuguese (você-form).

import { Exercise } from '../../core/exercises/exercise-model';

export const oCaminhoDeVolta: Exercise[] = [
  {
    id: 'ocdv-1',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 1,
    statement:
      'Considere duas moedas. Uma é honesta — cara com probabilidade 1/2. A outra é viciada — cara com probabilidade 3/4. Escolho uma moeda ao acaso e jogo. Sai cara. Qual a probabilidade de eu ter escolhido a moeda honesta?',
    options: ['1/3', '2/5', '1/2', '5/8'],
    correctIndex: 1
  },
  {
    id: 'ocdv-2',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 2,
    statement:
      'Considere duas urnas. A primeira tem 3 bolas vermelhas e 2 azuis. A segunda tem 4 vermelhas e 6 azuis. Escolho uma urna uniformemente e dela tiro uma bola, também uniformemente. A bola é azul. Qual a probabilidade de eu ter escolhido a primeira urna?',
    options: ['1/5', '2/5', '1/2', '3/5'],
    correctIndex: 1
  },
  {
    id: 'ocdv-3',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 3,
    statement:
      'Considere um teste para uma doença. A doença afeta 1% da população. O teste detecta a doença em 95% das pessoas doentes, e dá positivo erradamente em 10% das pessoas saudáveis. Uma pessoa testou positivo. Qual a probabilidade aproximada de ela estar doente?',
    options: ['0,05', '0,09', '0,50', '0,95'],
    correctIndex: 1
  },
  {
    id: 'ocdv-4',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 4,
    statement:
      'Considere três urnas. A primeira tem 2 bolas vermelhas e 8 azuis. A segunda tem 5 vermelhas e 5 azuis. A terceira tem 8 vermelhas e 2 azuis. Escolho uma urna uniformemente e dela tiro uma bola. A bola é vermelha. Qual a probabilidade de eu ter escolhido a segunda urna?',
    options: ['1/5', '1/3', '1/2', '3/5'],
    correctIndex: 1
  },
  {
    id: 'ocdv-5',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 5,
    statement:
      'Considere uma urna com uma bola que pode ser verde ou azul, com a mesma probabilidade. Coloco uma bola verde na urna — agora há duas bolas. Tiro uma bola uniformemente, e ela é verde. Qual a probabilidade de a primeira bola ser verde?',
    options: ['1/3', '1/2', '2/3', '3/4'],
    correctIndex: 2
  },
  {
    id: 'ocdv-6',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 2,
    statement:
      'Considere uma família com duas crianças. Sabendo que pelo menos uma delas é menina, qual a probabilidade de que ambas sejam meninas?',
    options: ['1/4', '1/3', '1/2', '2/3'],
    correctIndex: 1
  },
  {
    id: 'ocdv-7',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 3,
    statement:
      'Uma urna tem 4 bolas vermelhas e 6 azuis. Tiro duas bolas sem reposição. A primeira foi vermelha. Qual a probabilidade de a segunda também ser vermelha?',
    options: ['1/3', '4/9', '2/5', '1/2'],
    correctIndex: 0
  },
  {
    id: 'ocdv-8',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 4,
    statement:
      'Uma fábrica tem três máquinas: A produz 50% das peças, B produz 30%, C produz 20%. As taxas de defeito são: A=2%, B=4%, C=5%. Uma peça defeituosa é encontrada. Qual a probabilidade aproximada de ela ter sido feita pela máquina B?',
    options: ['0,30', '0,38', '0,42', '0,50'],
    correctIndex: 1
  },
  {
    id: 'ocdv-9',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 3,
    statement:
      'Em uma cidade, 60% das pessoas leem o jornal X, 50% leem o jornal Y, e 30% leem ambos. Escolho uma pessoa ao acaso entre os leitores do jornal X. Qual a probabilidade de ela também ler o jornal Y?',
    options: ['0,30', '0,40', '0,50', '0,60'],
    correctIndex: 2
  },
  {
    id: 'ocdv-10',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 4,
    statement:
      'Tenho três moedas em uma sacola. Uma é honesta (P(cara)=1/2). Outra é viciada (P(cara)=3/4). A terceira sempre dá cara (P(cara)=1). Pego uma ao acaso e jogo. Sai cara. Qual a probabilidade de eu ter pegado a moeda honesta?',
    options: ['1/9', '2/9', '1/4', '1/3'],
    correctIndex: 1
  }
];
