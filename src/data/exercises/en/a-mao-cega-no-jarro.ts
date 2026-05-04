// Family 8 — The Blind Hand in the Jar — urn draws / classical sampling.
// Translation of pt/a-mao-cega-no-jarro.ts.

import { Exercise } from '../../../core/exercises/exercise-model';

export const aMaoCegaNoJarro: Exercise[] = [
  {
    id: 'amcj-1',
    family: 8,
    conceptName: 'The Blind Hand in the Jar',
    difficulty: 1,
    statement:
      'In an urn there are 4 red balls and 6 blue. I draw a ball at random. What is the probability it is red?',
    options: ['1/4', '2/5', '1/2', '4/6'],
    correctIndex: 1,
    solution:
      'Total balls: $4 + 6 = 10$. Favourable: $4$. Under equiprobability, $P = 4/10 = 2/5$.'
  },
  {
    id: 'amcj-2',
    family: 8,
    conceptName: 'The Blind Hand in the Jar',
    difficulty: 2,
    statement:
      'In an urn there are 3 red balls and 7 blue. I draw a ball, note its colour, replace it, and draw another. What is the probability of drawing two reds?',
    options: ['3/100', '9/100', '6/45', '3/10'],
    correctIndex: 1,
    solution:
      'With replacement, the jar forgets — the two draws are independent, both with $P(\\text{red}) = 3/10$. By independence: $(3/10)(3/10) = 9/100$.'
  },
  {
    id: 'amcj-3',
    family: 8,
    conceptName: 'The Blind Hand in the Jar',
    difficulty: 2,
    statement:
      'In an urn there are 3 red balls and 7 blue. I draw two balls without replacement. What is the probability of drawing two reds?',
    options: ['1/15', '6/100', '1/10', '1/6'],
    correctIndex: 0,
    solution:
      'Without replacement, the jar remembers. $P(R_1) = 3/10$. Given $R_1$, $2$ reds remain in $9$ balls: $P(R_2 \\mid R_1) = 2/9$. By the product rule: $P(R_1 \\cap R_2) = (3/10)(2/9) = 6/90 = 1/15$. Compare to $9/100$ in the with-replacement case — without replacement is smaller, because drawing a red first reduces the chance of the second.'
  },
  {
    id: 'amcj-4',
    family: 8,
    conceptName: 'The Blind Hand in the Jar',
    difficulty: 3,
    statement:
      'In an urn there are 3 red balls and 7 blue. I draw three balls without replacement. What is the probability of drawing the sequence (red, blue, red) in that order?',
    options: ['7/120', '6/100', '1/12', '21/100'],
    correctIndex: 0,
    solution:
      'Conditional chain. $P(R_1) = 3/10$. $P(B_2 \\mid R_1) = 7/9$ (2R + 7B remain). $P(R_3 \\mid R_1, B_2) = 2/8$ (2R + 6B remain). Product: $(3/10)(7/9)(2/8) = 42/720 = 7/120$.'
  },
  {
    id: 'amcj-5',
    family: 8,
    conceptName: 'The Blind Hand in the Jar',
    difficulty: 3,
    statement:
      'In an urn there are 4 red balls and 6 blue. I draw two balls without replacement. What is the probability of drawing at least one red?',
    options: ['2/5', '1/2', '2/3', '4/5'],
    correctIndex: 2,
    solution:
      'Complement trick: $P(\\text{at least one red}) = 1 - P(\\text{no reds}) = 1 - P(\\text{both blue})$. Without replacement: $P(B_1 \\cap B_2) = (6/10)(5/9) = 30/90 = 1/3$. So $P(\\geq 1 \\text{ red}) = 1 - 1/3 = 2/3$.'
  },
  {
    id: 'amcj-6',
    family: 8,
    conceptName: 'The Blind Hand in the Jar',
    difficulty: 3,
    statement:
      'The divination pouch has 5 tokens with the sun-mark, 3 with the moon-mark, and 2 with the tide-mark. I draw a token at random. What is the probability it bears the moon-mark or the tide-mark?',
    options: ['1/5', '3/10', '1/2', '7/10'],
    correctIndex: 2,
    solution:
      'The events "moon" and "tide" are disjoint (each token has only one mark). By A3: $P(\\text{moon} \\cup \\text{tide}) = 3/10 + 2/10 = 5/10 = 1/2$. Equivalently: $5$ favourable tokens of $10$ total.'
  },
  {
    id: 'amcj-7',
    family: 8,
    conceptName: 'The Blind Hand in the Jar',
    difficulty: 4,
    statement:
      'The grain bin has 8 of-our-hand grains and 2 touched ones, indistinguishable in the dark. The Mistress draws 3 grains without replacement. What is the probability that exactly 1 of the 3 is touched?',
    options: ['1/15', '7/15', '8/15', '14/45'],
    correctIndex: 1,
    solution:
      'Hypergeometric. Total ways to draw 3 of 10: $\\binom{10}{3} = 120$. Favourable: choose 1 touched of 2 ($\\binom{2}{1} = 2$) and 2 non-touched of 8 ($\\binom{8}{2} = 28$). Product: $2 \\cdot 28 = 56$. So $P = 56/120 = 7/15$.'
  }
];
