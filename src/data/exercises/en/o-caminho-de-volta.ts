// Family 9 — The Way Back — Bayesian inversion.
// Translation of pt/o-caminho-de-volta.ts. Decimals in en-US dot notation.

import { Exercise } from '../../../core/exercises/exercise-model';

export const oCaminhoDeVolta: Exercise[] = [
  {
    id: 'ocdv-1',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 1,
    statement:
      'Consider two coins. One is honest — heads with probability 1/2. The other is loaded — heads with probability 3/4. I choose a coin at random and toss. Heads comes up. What is the probability I chose the honest coin?',
    options: ['1/3', '2/5', '1/2', '5/8'],
    correctIndex: 1,
    solution:
      'Direct Bayes. Prior: $P(H) = P(L) = 1/2$. Likelihood: $P(\\text{heads} \\mid H) = 1/2$, $P(\\text{heads} \\mid L) = 3/4$. Marginal: $P(\\text{heads}) = (1/2)(1/2) + (1/2)(3/4) = 1/4 + 3/8 = 5/8$. Posterior: $P(H \\mid \\text{heads}) = \\frac{(1/2)(1/2)}{5/8} = \\frac{1/4}{5/8} = 2/5$. The heads is (weak) evidence for the loaded coin — the posterior on honest drops from $1/2$ to $2/5$.'
  },
  {
    id: 'ocdv-2',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 2,
    statement:
      'Consider two urns. The first has 3 red balls and 2 blue. The second has 4 red and 6 blue. I choose an urn uniformly and from it draw a ball, also uniformly. The ball is blue. What is the probability I chose the first urn?',
    options: ['1/5', '2/5', '1/2', '3/5'],
    correctIndex: 1,
    solution:
      'Prior: $P(U_1) = P(U_2) = 1/2$. Likelihood: $P(\\text{blue} \\mid U_1) = 2/5$, $P(\\text{blue} \\mid U_2) = 6/10 = 3/5$. Marginal: $P(\\text{blue}) = (1/2)(2/5) + (1/2)(3/5) = 1/5 + 3/10 = 1/2$. Posterior: $P(U_1 \\mid \\text{blue}) = \\frac{(1/2)(2/5)}{1/2} = 2/5$. The blue is evidence for urn $U_2$ (which has the larger fraction of blues).'
  },
  {
    id: 'ocdv-3',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 3,
    statement:
      'Consider a test for a disease. The disease affects 1% of the population. The test detects the disease in 95% of sick people, and gives a false positive in 10% of healthy people. A person tested positive. What is the approximate probability they are sick?',
    options: ['0.05', '0.09', '0.50', '0.95'],
    correctIndex: 1,
    solution:
      'Diagnostic Bayes. Prior $P(D) = 0.01$, $P(\\bar D) = 0.99$. Sensitivity $P(+ \\mid D) = 0.95$, false-positive $P(+ \\mid \\bar D) = 0.10$. Marginal $P(+) = (0.01)(0.95) + (0.99)(0.10) = 0.0095 + 0.099 = 0.1085$. Posterior $P(D \\mid +) = 0.0095 / 0.1085 \\approx 0.0876 \\approx 0.09$. Intuition fails here: the false-positive over $99\\%$ healthy dominates the numerator. Rare disease + imperfect test $\\Rightarrow$ low posterior despite the positive.'
  },
  {
    id: 'ocdv-4',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 4,
    statement:
      'Consider three urns. The first has 2 red balls and 8 blue. The second has 5 red and 5 blue. The third has 8 red and 2 blue. I choose an urn uniformly and from it draw a ball. The ball is red. What is the probability I chose the second urn?',
    options: ['1/5', '1/3', '1/2', '3/5'],
    correctIndex: 1,
    solution:
      'Uniform prior: $P(U_i) = 1/3$. Likelihoods: $P(R \\mid U_1) = 2/10$, $P(R \\mid U_2) = 5/10$, $P(R \\mid U_3) = 8/10$. Marginal: $P(R) = (1/3)(2 + 5 + 8)/10 = 15/30 = 1/2$. Posterior: $P(U_2 \\mid R) = \\frac{(1/3)(5/10)}{1/2} = \\frac{5/30}{15/30} = 5/15 = 1/3$. (The three urns balance — $U_2$ is the median and the posterior stays close to the prior $1/3$.)'
  },
  {
    id: 'ocdv-5',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 5,
    statement:
      'Consider an urn with one ball that may be green or blue, with the same probability. I put a green ball in the urn — now there are two balls. I draw a ball uniformly, and it is green. What is the probability the first ball is green?',
    options: ['1/3', '1/2', '2/3', '3/4'],
    correctIndex: 2,
    solution:
      'States before the draw: (G,G) with prob $1/2$, (B,G) with prob $1/2$ (the trailing "G" is the one I added). Likelihood of drawing green: $P(\\text{green} \\mid GG) = 1$ (both green), $P(\\text{green} \\mid BG) = 1/2$ (one of two). Marginal: $P(\\text{green}) = (1/2)(1) + (1/2)(1/2) = 3/4$. Posterior: $P(GG \\mid \\text{green}) = \\frac{(1/2)(1)}{3/4} = 2/3$. Drawing green is evidence for (G,G), because (G,G) guarantees green while (B,G) only half the time.'
  },
  {
    id: 'ocdv-6',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 2,
    statement:
      'Consider a family with two children. Knowing that at least one of them is a girl, what is the probability that both are girls?',
    options: ['1/4', '1/3', '1/2', '2/3'],
    correctIndex: 1,
    solution:
      'Original sample space (4 equally likely): $\\{BB, BG, GB, GG\\}$ where $B$ = boy, $G$ = girl. Conditioning on "at least one girl" removes the $BB$ case. Three equally likely cases remain: $\\{BG, GB, GG\\}$. Only $GG$ is "both girls". So $P(GG \\mid \\geq 1 G) = 1/3$. (Do not confuse with "the first is a girl, what is the chance of the second?" — that is $1/2$.)'
  },
  {
    id: 'ocdv-7',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 3,
    statement:
      'An urn has 4 red balls and 6 blue. I draw two balls without replacement. The first was red. What is the probability the second is also red?',
    options: ['1/3', '4/9', '2/5', '1/2'],
    correctIndex: 0,
    solution:
      'After drawing one red, $3$ reds remain in $9$ balls. $P(R_2 \\mid R_1) = 3/9 = 1/3$. (Without replacement, the chance of the second conditions on what came out first.)'
  },
  {
    id: 'ocdv-8',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 4,
    statement:
      'A factory has three machines: A produces 50% of parts, B produces 30%, C produces 20%. Defect rates: A=2%, B=4%, C=5%. A defective part is found. What is the approximate probability it was made by machine B?',
    options: ['0.30', '0.38', '0.42', '0.50'],
    correctIndex: 1,
    solution:
      'Prior: $P(A) = 0.50$, $P(B) = 0.30$, $P(C) = 0.20$. Likelihood: $P(D \\mid A) = 0.02$, $P(D \\mid B) = 0.04$, $P(D \\mid C) = 0.05$. Marginal: $P(D) = (0.50)(0.02) + (0.30)(0.04) + (0.20)(0.05) = 0.01 + 0.012 + 0.01 = 0.032$. Posterior: $P(B \\mid D) = 0.012 / 0.032 = 0.375 \\approx 0.38$.'
  },
  {
    id: 'ocdv-9',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 3,
    statement:
      'In a city, 60% of people read newspaper X, 50% read newspaper Y, and 30% read both. I choose a person at random among the X readers. What is the probability they also read Y?',
    options: ['0.30', '0.40', '0.50', '0.60'],
    correctIndex: 2,
    solution:
      'Definition of conditional probability: $P(Y \\mid X) = P(X \\cap Y) / P(X) = 0.30 / 0.60 = 0.50$. (Note that $P(Y) = 0.50$ as well — so $X$ and $Y$ are independent in this example, though the question did not ask you to verify.)'
  },
  {
    id: 'ocdv-10',
    family: 9,
    conceptName: 'The Way Back',
    difficulty: 4,
    statement:
      'I have three coins in a sack. One is honest (P(heads)=1/2). Another is loaded (P(heads)=3/4). The third always lands heads (P(heads)=1). I pick one at random and toss. Heads comes up. What is the probability I picked the honest coin?',
    options: ['1/9', '2/9', '1/4', '1/3'],
    correctIndex: 1,
    solution:
      'Prior: $P(H) = P(L) = P(C) = 1/3$. Likelihood: $P(\\text{heads} \\mid H) = 1/2$, $P(\\text{heads} \\mid L) = 3/4$, $P(\\text{heads} \\mid C) = 1$. Marginal: $P(\\text{heads}) = (1/3)(1/2 + 3/4 + 1) = (1/3)(9/4) = 3/4$. Posterior: $P(H \\mid \\text{heads}) = \\frac{(1/3)(1/2)}{3/4} = \\frac{1/6}{3/4} = 4/18 = 2/9$.'
  }
];
