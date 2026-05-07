// Family 7 — The Two Signs — independence of joint events.
// Translation of pt/os-dois-sinais.ts.

import { Exercise } from '../../../core/exercises/exercise-model';

export const osDoisSinais: Exercise[] = [
  {
    id: 'ods-1',
    family: 7,
    conceptName: 'The Two Signs',
    difficulty: 1,
    statement:
      'I throw two honest coins, one after the other. The outcomes are independent. What is the probability both come up heads?',
    options: ['1/2', '1/3', '1/4', '1/8'],
    correctIndex: 2,
    solution:
      'Independence lets you multiply: $P(C_1 \\cap C_2) = P(C_1) \\cdot P(C_2) = (1/2)(1/2) = 1/4$. Equivalently, $\\Omega$ has $4$ equally likely outcomes (HH, HT, TH, TT) and only HH is favourable.'
  },
  {
    id: 'ods-2',
    family: 7,
    conceptName: 'The Two Signs',
    difficulty: 2,
    statement:
      'I loose an arrow that hits the target with probability 1/3. You loose another, in the opposite direction, that hits its target with probability 1/4. The two arrows are independent. What is the probability both hit?',
    options: ['1/12', '7/12', '1/2', '2/7'],
    correctIndex: 0,
    solution:
      'Let $A$ = my arrow hits, $B$ = your arrow hits, both independent: $P(A \\cap B) = P(A) \\cdot P(B) = (1/3)(1/4) = 1/12$. The conjunction of mutually-foreign fortunes shrinks when multiplied — each factor $\\leq 1$ reduces the product.'
  },
  {
    id: 'ods-3',
    family: 7,
    conceptName: 'The Two Signs',
    difficulty: 3,
    statement:
      'Two hunters set out in opposite directions. Without a storm, each returns with game with probability 1/2, and the returns are independent. But if a storm comes — which happens with probability 1/4 — neither returns. What is the probability both return with game?',
    options: ['1/4', '3/16', '1/8', '5/16'],
    correctIndex: 1,
    solution:
      'Condition on the storm. $P(\\text{both} \\mid \\text{storm}) = 0$ and $P(\\text{both} \\mid \\text{no-storm}) = (1/2)(1/2) = 1/4$ (conditional independence). By total probability: $P(\\text{both}) = (1/4) \\cdot 0 + (3/4) \\cdot (1/4) = 3/16$. Without conditioning, multiplying directly $1/2 \\cdot 1/2$ would give $1/4$ — wrong, because there is a wind that touches both (the storm).'
  },
  {
    id: 'ods-4',
    family: 7,
    conceptName: 'The Two Signs',
    difficulty: 2,
    statement:
      'On an aurora night, the probability the wind shifts is 1/5. On any other night, it is also 1/5. Suppose the winds of different nights are independent. What is the probability the wind shifts on three consecutive nights?',
    options: ['3/5', '1/15', '1/125', '3/125'],
    correctIndex: 2,
    solution:
      'Independence over $n$ identical trials: $P = p^n = (1/5)^3 = 1/125$. Note that summing the probabilities ($3 \\times 1/5 = 3/5$) would be the chance of "shifting on at least one of the three" — a different count.'
  },
  {
    id: 'ods-5',
    family: 7,
    conceptName: 'The Two Signs',
    difficulty: 3,
    statement:
      'The Mistress observes that $P(\\text{hawk cries}) = 0.3$, $P(\\text{north-wind}) = 0.5$, and $P(\\text{both}) = 0.15$. Are the two signs independent?',
    options: [
      'Yes — for $0.3 \\times 0.5 = 0.15$.',
      'No — for $0.15 \\neq 0.3 + 0.5$.',
      'No — for $P(\\text{both})$ should be $0.3 + 0.5 - 0.15 = 0.65$ if independent.',
      'Indeterminate without more data.'
    ],
    correctIndex: 0,
    solution:
      'Independence test: $A \\perp B \\iff P(A \\cap B) = P(A) \\cdot P(B)$. Here $0.3 \\times 0.5 = 0.15 = P(A \\cap B)$ — exact match. So independent. (If the observed joint frequency equals the product of the marginals, there is no tie between the signs.)'
  },
  {
    id: 'ods-6',
    family: 7,
    conceptName: 'The Two Signs',
    difficulty: 4,
    statement:
      'Four independent Cinders read the same sample. Each one, individually, identifies a touched sample with probability 0.7. What is the probability that at least one of the four identifies it correctly?',
    options: ['0.7', '0.9', '0.9919', '0.2401'],
    correctIndex: 2,
    solution:
      'Complement trick: $P(\\text{at least one}) = 1 - P(\\text{none})$. Each Cinder fails with probability $0.3$; by independence, all 4 fail with $0.3^4 = 0.0081$. So $P(\\text{at least one}) = 1 - 0.0081 = 0.9919$. (This is the foundation of the "parallel system" — redundancy amplifies reliability quickly.)'
  },
  {
    id: 'ods-7',
    family: 7,
    conceptName: 'The Two Signs',
    difficulty: 4,
    statement:
      'I throw two honest bones. Let $A$ = "first bone is even" and $B$ = "sum of bones is 7". Are events $A$ and $B$ independent?',
    options: [
      'Yes — for $P(A) \\cdot P(B) = (1/2)(1/6) = 1/12 = P(A \\cap B)$.',
      'No — for $P(A \\cap B) = 1/12$ but $P(A) \\cdot P(B) = 1/24$.',
      'No — for "sum is 7" depends on who rolled first.',
      'Indeterminate without knowing whether the bones are honest.'
    ],
    correctIndex: 0,
    solution:
      '$P(A) = 3/6 = 1/2$ (the first bone is $2, 4$, or $6$). $P(B) = 6/36 = 1/6$ (there are 6 pairs summing to 7). $A \\cap B$ = pairs with even first and sum 7: $(2,5), (4,3), (6,1)$ — 3 pairs, so $P(A \\cap B) = 3/36 = 1/12$. Check: $P(A) \\cdot P(B) = 1/2 \\cdot 1/6 = 1/12 = P(A \\cap B)$. Independent — "sum is 7" has a special structure: the parity of the first does not change the chance of the sum closing on 7.'
  }
];
