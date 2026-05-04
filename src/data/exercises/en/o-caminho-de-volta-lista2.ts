// Family 9 — The Way Back — extracted from Prof. Giulio's "Lista de
// Exercícios 2 — Probabilidade Condicional - Fórmula de Bayes".
// Translation of pt/o-caminho-de-volta-lista2.ts.

import { Exercise } from '../../../core/exercises/exercise-model';

export const oCaminhoDeVoltaLista2: Exercise[] = [
  {
    id: 'ocdv-l2-1',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 2,
    statement:
      'Consider the throw of two honest dice. What is the probability that at least one of them lands on 6, given that the sum of the two is 7?',
    options: ['1/6', '1/3', '1/2', '2/3'],
    correctIndex: 1,
    solution:
      'Pairs summing to 7 (equally likely given the conditioning): $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ — 6 pairs. Of these, with some 6: $(1,6)$ and $(6,1)$ — 2 pairs. So $P(\\text{some 6} \\mid \\text{sum 7}) = 2/6 = 1/3$.',
    source: { file: 'lista2.pdf', page: 1, problem: 1 }
  },
  {
    id: 'ocdv-l2-2',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 5,
    statement:
      'Consider three urns. Urn A contains 2 white balls and 4 red. Urn B contains 8 white and 4 red. Urn C contains 1 white and 4 red. I draw a ball from each urn, uniformly. Knowing that exactly 2 of the 3 drawn balls are white, what is the probability that the ball drawn from urn A is white?',
    options: ['1/3', '8/13', '9/13', '2/3'],
    correctIndex: 2,
    solution:
      'Individual likelihoods: $P(W_A) = 2/6 = 1/3$, $P(W_B) = 8/12 = 2/3$, $P(W_C) = 1/5$. The three events are independent (separate urns). For "exactly 2 whites", sum over the 3 disjoint configurations (which colour comes from each urn): $P(WWR) = (1/3)(2/3)(4/5) = 8/45$; $P(WRW) = (1/3)(1/3)(1/5) = 1/45$; $P(RWW) = (2/3)(2/3)(1/5) = 4/45$. Total: $13/45$. Favourable cases (ball from A is white): $WWR$ and $WRW$, sum $9/45$. Posterior: $P(W_A \\mid \\text{exactly 2}) = (9/45)/(13/45) = 9/13$.',
    source: { file: 'lista2.pdf', page: 1, problem: 3 }
  },
  {
    id: 'ocdv-l2-3',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 3,
    statement:
      'Suppose 5% of men and 0.25% of women wear glasses. A person is chosen at random, with equal probability between men and women. Knowing they wear glasses, what is the approximate probability they are a woman?',
    options: ['5%', '10%', '25%', '50%'],
    correctIndex: 0,
    solution:
      'Prior: $P(M) = P(W) = 1/2$. Likelihood: $P(\\text{glasses} \\mid M) = 0.05$, $P(\\text{glasses} \\mid W) = 0.0025$. Marginal: $P(\\text{glasses}) = (1/2)(0.05 + 0.0025) = 0.02625$. Posterior: $P(W \\mid \\text{glasses}) = (1/2)(0.0025)/0.02625 = 0.00125/0.02625 \\approx 0.0476 \\approx 5\\%$. (Wearing glasses is strong evidence for being a man here — the likelihood is $20\\times$ larger.)',
    source: { file: 'lista2.pdf', page: 2, problem: 12 }
  },
  {
    id: 'ocdv-l2-4',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 1,
    statement:
      'An urn contains 5 black balls and 5 white. I draw a ball — it is white. I replace it, and draw another. What is the probability the second is also white?',
    options: ['1/4', '4/9', '1/2', '5/9'],
    correctIndex: 2,
    solution:
      'With replacement, the jar forgets — the second draw is independent of the first. $P(W_2 \\mid W_1) = P(W_2) = 5/10 = 1/2$. (Without replacement, it would be $4/9$ — subtly different.)',
    source: { file: 'lista2.pdf', page: 3, problem: 14 }
  }
];
