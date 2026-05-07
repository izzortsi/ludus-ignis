// Family 3 — The Oaths of the Flame — Kolmogorov axioms + derived properties.
// Translation of pt/as-juras-da-chama.ts. Decimals localised to en-US dot
// notation (0.3 instead of 0,3) in both the statement and the worked
// solution; this matches the player's locale convention.

import { Exercise } from '../../../core/exercises/exercise-model';

export const asJurasDaChama: Exercise[] = [
  {
    id: 'ajdc-1',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 1,
    statement:
      'Let $A$ and $B$ be two disjoint events with $P(A) = 0.3$ and $P(B) = 0.5$. What is the value of $P(A \\cup B)$?',
    options: ['0.15', '0.5', '0.8', '1.0'],
    correctIndex: 2,
    solution:
      'Since $A \\cap B = \\emptyset$, the additivity of the third oath (A3) holds: $P(A \\cup B) = P(A) + P(B) = 0.3 + 0.5 = 0.8$. Without disjointness, you would have to subtract the overlap.',
    source: { file: 'L1.pdf', page: 2, problem: 5 }
  },
  {
    id: 'ajdc-2',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 1,
    statement:
      'Same disjoint events $A$ and $B$, with $P(A) = 0.3$ and $P(B) = 0.5$. What is the value of $P(A \\cap B)$?',
    options: ['0', '0.15', '0.2', '0.3'],
    correctIndex: 0,
    solution:
      'Disjoint means $A \\cap B = \\emptyset$, and the chance of the empty is zero (a property derived from the oaths): $P(\\emptyset) = 0$. So $P(A \\cap B) = 0$. The value $0.15 = 0.3 \\times 0.5$ would be correct under *independence*, not disjointness — two different things.',
    source: { file: 'L1.pdf', page: 2, problem: 5 }
  },
  {
    id: 'ajdc-3',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 2,
    statement:
      'Same disjoint $A$ and $B$, $P(A) = 0.3$ and $P(B) = 0.5$. What is the value of $P(A \\setminus B)$, that is, "A happens and B does not"?',
    options: ['0', '0.2', '0.3', '0.5'],
    correctIndex: 2,
    solution:
      'Since $A$ and $B$ are disjoint, $A \\subseteq B^c$ — every element of $A$ is outside $B$. So $A \\setminus B = A$, and $P(A \\setminus B) = P(A) = 0.3$. In general, $P(A \\setminus B) = P(A) - P(A \\cap B)$, which here gives $0.3 - 0 = 0.3$.',
    source: { file: 'L1.pdf', page: 2, problem: 5 }
  },
  {
    id: 'ajdc-4',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 2,
    statement:
      'Visible aurora and cutting north-wind are disjoint events on a given night, with $P(\\text{aurora}) = 0.3$ and $P(\\text{wind}) = 0.5$. What is the probability that the night brings neither aurora nor wind?',
    options: ['0.1', '0.2', '0.4', '0.8'],
    correctIndex: 1,
    solution:
      'Let $A$ = aurora, $V$ = wind. By A3 (disjoint): $P(A \\cup V) = 0.3 + 0.5 = 0.8$. By De Morgan: "neither $A$ nor $V$" = $A^c \\cap V^c = (A \\cup V)^c$. By P3 (complement): $P((A \\cup V)^c) = 1 - 0.8 = 0.2$.'
  },
  {
    id: 'ajdc-5',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 2,
    statement:
      'For a sample of pool-water, we know that $P(\\text{touched}) = 0.4$, $P(\\text{night}) = 0.6$, and $P(\\text{touched} \\cup \\text{night}) = 0.8$. What is the value of $P(\\text{touched} \\cap \\text{night})$?',
    options: ['0.1', '0.2', '0.3', '0.4'],
    correctIndex: 1,
    solution:
      'By inclusion-exclusion (P5): $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$. Solve for the missing term: $P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0.4 + 0.6 - 0.8 = 0.2$. The events are *not* disjoint here — there is a $0.2$ overlap.'
  },
  {
    id: 'ajdc-6',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 3,
    statement:
      'Same sample: $P(\\text{touched}) = 0.4$, $P(\\text{night}) = 0.6$, $P(\\text{touched} \\cap \\text{night}) = 0.2$. What is the probability that the sample is touched but was not collected at night?',
    options: ['0.1', '0.2', '0.3', '0.4'],
    correctIndex: 1,
    solution:
      'Disjoint decomposition: $T = (T \\cap N) \\cup (T \\cap N^c)$, and these two pieces do not overlap. By A3: $P(T) = P(T \\cap N) + P(T \\cap N^c)$. Solve: $P(T \\cap N^c) = P(T) - P(T \\cap N) = 0.4 - 0.2 = 0.2$.'
  },
  {
    id: 'ajdc-7',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 2,
    statement:
      'If $P(E) = 0.4$, what is the value of $P(E^c)$?',
    options: ['0.4', '0.5', '0.6', '1.0'],
    correctIndex: 2,
    solution:
      'P3 (complement rule): $P(E^c) = 1 - P(E) = 1 - 0.4 = 0.6$. Follows directly from A2 ($P(\\Omega) = 1$) and A3 (additivity over the disjoint $E$ and $E^c$, which together cover $\\Omega$).'
  },
  {
    id: 'ajdc-8',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 4,
    statement:
      'The Mistress observes three signs through the night: $I$, $II$, and $III$. We know: $P(I) = 0.5$, $P(II) = 0.4$, $P(III) = 0.3$, $P(I \\cap II) = 0.2$, $P(I \\cap III) = 0.1$, $P(II \\cap III) = 0.1$, $P(I \\cap II \\cap III) = 0.05$. What is the value of $P(I \\cup II \\cup III)$?',
    options: ['0.75', '0.80', '0.85', '0.90'],
    correctIndex: 2,
    solution:
      'Inclusion-exclusion for three sets: $P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)$. Substituting: $0.5 + 0.4 + 0.3 - 0.2 - 0.1 - 0.1 + 0.05 = 1.2 - 0.4 + 0.05 = 0.85$.',
    source: { file: 'L1.pdf', page: 2, problem: 7 }
  },
  {
    id: 'ajdc-9',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 3,
    statement:
      'A hunter promises his band: "the chance of game coming from the north is $0.6$, and the chance of game coming from the east is $0.5$; summing, we have $1.1$ chance of eating". Which oath of the ember did the hunter violate?',
    options: [
      'Oath A1: "every chance lies between nothing and everything".',
      'Oath A2: "the chance of something happening is one".',
      'Oath A3: "when events do not overlap, their chances add" — for north and east can occur together.',
      'None — the sum is correct.'
    ],
    correctIndex: 2,
    solution:
      'A3 only allows adding chances when the events are *disjoint*. Since game can come from the north AND the east on the same night, the two events overlap — the simple sum counts the overlap twice. The symptom is the result $1.1 > 1$ (which violates A1 and P(Ω)=1), but the *cause* is the misapplication of A3 without checking disjointness. Correct form: $P(N \\cup L) = P(N) + P(L) - P(N \\cap L) \\leq 1$.'
  },
  {
    id: 'ajdc-10',
    family: 3,
    conceptName: 'The Oaths of the Flame',
    difficulty: 4,
    statement:
      'An apprentice writes, for two events $A$ and $B$: $P(A) = 0.7$ and $P(A \\cap B) = 0.8$. Which oath of the ember does this violate?',
    options: [
      'A1: probabilities outside $[0, 1]$ — for $0.8 > 0.7 = P(A)$.',
      'A1: monotonicity requires $P(A \\cap B) \\leq P(A)$; $0.8 \\leq 0.7$ is false.',
      'A2: the whole basket weighs more than 1.',
      'A3: only disjoint events may have their chances summed.'
    ],
    correctIndex: 1,
    solution:
      'Since $A \\cap B \\subseteq A$, *monotonicity* (P4, derived from the oaths) requires $P(A \\cap B) \\leq P(A)$. Here $0.8 > 0.7$ — a violation. The two values individually lie in $[0,1]$ (A1 satisfied), but the relation between them is impossible.'
  }
];
