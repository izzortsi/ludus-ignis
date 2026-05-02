// Family 8 — A Mão Cega no Jarro — urn draws / classical sampling.
// Alpha-zero hand-authored set; A-style; Brazilian Portuguese.

import { Exercise } from '../../core/exercises/exercise-model';

export const aMaoCegaNoJarro: Exercise[] = [
  {
    id: 'amcj-1',
    family: 8,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 1,
    statement:
      'Em uma urna há 4 bolas vermelhas e 6 azuis. Tiro uma bola ao acaso. Qual a probabilidade de ela ser vermelha?',
    options: ['1/4', '2/5', '1/2', '4/6'],
    correctIndex: 1,
    solution:
      'Total de bolas: $4 + 6 = 10$. Favoráveis: $4$. Sob equiprobabilidade, $P = 4/10 = 2/5$.'
  },
  {
    id: 'amcj-2',
    family: 8,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 2,
    statement:
      'Em uma urna há 3 bolas vermelhas e 7 azuis. Tiro uma bola, anoto a cor, devolvo, e tiro outra. Qual a probabilidade de tirar duas vermelhas?',
    options: ['3/100', '9/100', '6/45', '3/10'],
    correctIndex: 1,
    solution:
      'Com reposição, o jarro esquece — as duas tiradas são independentes, ambas com $P(\\text{vermelha}) = 3/10$. Por independência: $(3/10)(3/10) = 9/100$.'
  },
  {
    id: 'amcj-3',
    family: 8,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 2,
    statement:
      'Em uma urna há 3 bolas vermelhas e 7 azuis. Tiro duas bolas sem reposição. Qual a probabilidade de tirar duas vermelhas?',
    options: ['1/15', '6/100', '1/10', '1/6'],
    correctIndex: 0,
    solution:
      'Sem reposição, o jarro lembra. $P(V_1) = 3/10$. Dado $V_1$, restam $2$ vermelhas em $9$ bolas: $P(V_2 \\mid V_1) = 2/9$. Pela regra do produto: $P(V_1 \\cap V_2) = (3/10)(2/9) = 6/90 = 1/15$. Compara com $9/100$ do caso com reposição — sem reposição é menor, porque tirar uma vermelha primeiro reduz a chance da segunda.'
  },
  {
    id: 'amcj-4',
    family: 8,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 3,
    statement:
      'Em uma urna há 3 bolas vermelhas e 7 azuis. Tiro três bolas sem reposição. Qual a probabilidade de tirar a sequência (vermelha, azul, vermelha) nessa ordem?',
    options: ['7/120', '6/100', '1/12', '21/100'],
    correctIndex: 0,
    solution:
      'Cadeia condicional. $P(V_1) = 3/10$. $P(A_2 \\mid V_1) = 7/9$ (resta 2V + 7A). $P(V_3 \\mid V_1, A_2) = 2/8$ (resta 2V + 6A). Produto: $(3/10)(7/9)(2/8) = 42/720 = 7/120$.'
  },
  {
    id: 'amcj-5',
    family: 8,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 3,
    statement:
      'Em uma urna há 4 bolas vermelhas e 6 azuis. Tiro duas bolas sem reposição. Qual a probabilidade de tirar pelo menos uma vermelha?',
    options: ['2/5', '1/2', '2/3', '4/5'],
    correctIndex: 2,
    solution:
      'Truque do complemento: $P(\\text{pelo menos uma vermelha}) = 1 - P(\\text{nenhuma vermelha}) = 1 - P(\\text{ambas azuis})$. Sem reposição: $P(A_1 \\cap A_2) = (6/10)(5/9) = 30/90 = 1/3$. Logo $P(\\geq 1 \\text{ vermelha}) = 1 - 1/3 = 2/3$.'
  },
  {
    id: 'amcj-6',
    family: 8,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 3,
    statement:
      'A bolsa de divinhação tem 5 tokens com a marca do sol, 3 com a marca da lua e 2 com a marca da maré. Tiro um token ao acaso. Qual a probabilidade de ele ter a marca da lua ou da maré?',
    options: ['1/5', '3/10', '1/2', '7/10'],
    correctIndex: 2,
    solution:
      'Os eventos "lua" e "maré" são disjuntos (cada token tem uma só marca). Por A3: $P(\\text{lua} \\cup \\text{maré}) = 3/10 + 2/10 = 5/10 = 1/2$. Equivalentemente: $5$ tokens favoráveis em $10$ totais.'
  },
  {
    id: 'amcj-7',
    family: 8,
    conceptName: 'A Mão Cega no Jarro',
    difficulty: 4,
    statement:
      'O bin de grão tem 8 grãos da nossa mão e 2 tocados, indistinguíveis no escuro. A Mestra tira 3 grãos sem reposição. Qual a probabilidade de exatamente 1 dos 3 ser tocado?',
    options: ['1/15', '7/15', '8/15', '14/45'],
    correctIndex: 1,
    solution:
      'Hipergeométrica. Total de formas de tirar 3 de 10: $\\binom{10}{3} = 120$. Favoráveis: escolher 1 tocado de 2 ($\\binom{2}{1} = 2$) e 2 não-tocados de 8 ($\\binom{8}{2} = 28$). Produto: $2 \\cdot 28 = 56$. Logo $P = 56/120 = 7/15$.'
  }
];
