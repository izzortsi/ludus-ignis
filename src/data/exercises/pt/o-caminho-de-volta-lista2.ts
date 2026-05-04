// Family 9 — O Caminho de Volta — extracted from Prof. Giulio's
// "Lista de Exercícios 2 — Probabilidade Condicional - Fórmula de Bayes".
//
// All problems verified against the source PDF and the answer worked through
// by hand. Multiple-choice options synthesized (the source has free-form
// answers); correct option matches the canonical answer.

import { Exercise } from '../../../core/exercises/exercise-model';

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
    solution:
      'Pares com soma 7 (igualmente prováveis dado o condicionamento): $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ — 6 pares. Destes, com algum 6: $(1,6)$ e $(6,1)$ — 2 pares. Logo $P(\\text{algum 6} \\mid \\text{soma 7}) = 2/6 = 1/3$.',
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
    solution:
      'Verossimilhanças individuais: $P(B_A) = 2/6 = 1/3$, $P(B_B) = 8/12 = 2/3$, $P(B_C) = 1/5$. Os três eventos são independentes (urnas separadas). Para "exatamente 2 brancas", soma sobre as 3 configurações disjuntas (qual cor sai de cada urna): $P(BBV) = (1/3)(2/3)(4/5) = 8/45$; $P(BVB) = (1/3)(1/3)(1/5) = 1/45$; $P(VBB) = (2/3)(2/3)(1/5) = 4/45$. Total: $13/45$. Casos favoráveis (a bola de A é branca): $BBV$ e $BVB$, soma $9/45$. Posterior: $P(B_A \\mid \\text{exatamente 2}) = (9/45)/(13/45) = 9/13$.',
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
    solution:
      'Prior: $P(H) = P(M) = 1/2$. Verossimilhança: $P(\\text{ócl} \\mid H) = 0{,}05$, $P(\\text{ócl} \\mid M) = 0{,}0025$. Marginal: $P(\\text{ócl}) = (1/2)(0{,}05 + 0{,}0025) = 0{,}02625$. Posterior: $P(M \\mid \\text{ócl}) = (1/2)(0{,}0025)/0{,}02625 = 0{,}00125/0{,}02625 \\approx 0{,}0476 \\approx 5\\%$. (Usar óculos é evidência forte de ser homem aqui — a verossimilhança é $20\\times$ maior.)',
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
    solution:
      'Com reposição, o jarro esquece — a segunda tirada é independente da primeira. $P(B_2 \\mid B_1) = P(B_2) = 5/10 = 1/2$. (Sem reposição, seria $4/9$ — sutilmente diferente.)',
    source: { file: 'lista2.pdf', page: 3, problem: 14 }
  }
];
