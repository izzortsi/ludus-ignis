// Family 1 — The Shape of the Possible World — sample space, events, set algebra.
// Translation of pt/a-forma-do-mundo-possivel.ts. Math notation untouched.

import { Exercise } from '../../../core/exercises/exercise-model';

export const aFormaDoMundoPossivel: Exercise[] = [
  {
    id: 'afmp-1',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 1,
    statement:
      'The shamans throw two six-faced bones, one after the other, and record the pair $(i, j)$ of faces. How many ordered pairs does the basket contain?',
    options: ['12', '21', '36', '64'],
    correctIndex: 2,
    solution:
      'Each bone has 6 possible outcomes, and the bones are distinguishable (first vs second). By the multiplication principle: $|\\Omega| = 6 \\times 6 = 36$. The sample space $\\Omega = \\{(i, j) : i, j \\in \\{1, \\ldots, 6\\}\\}$ contains all ordered pairs.',
    source: { file: 'L1.pdf', page: 3, problem: 13 }
  },
  {
    id: 'afmp-2',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 2,
    statement:
      'In the same throw of two bones, how many ordered pairs $(i, j)$ sum to 7?',
    options: ['4', '5', '6', '7'],
    correctIndex: 2,
    solution:
      'Enumerate the pairs: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$. That is $6$ pairs. Note that $7$ is the only sum with the maximum number of partitions in the range $\\{2, \\ldots, 12\\}$ — hence it is the most likely sum of two honest bones.',
    source: { file: 'L1.pdf', page: 3, problem: 13 }
  },
  {
    id: 'afmp-3',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 2,
    statement:
      'Throw two bones. Let $E$ be the event "the sum is odd" and $F$ the event "at least one bone shows 1". How many pairs belong to $E \\cap F$?',
    options: ['4', '6', '11', '18'],
    correctIndex: 1,
    solution:
      'E ∩ F = pairs with odd sum where some bone shows $1$. Odd sum requires one even and one odd; with a $1$ (odd), the other must be even. Listing: first bone $=1$ → $(1,2), (1,4), (1,6)$; second bone $=1$ (and first $\\neq 1$) → $(2,1), (4,1), (6,1)$. Total: $6$ pairs.',
    source: { file: 'L1.pdf', page: 1, problem: 2 }
  },
  {
    id: 'afmp-4',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 2,
    statement:
      'Same scenario (two bones). Let $F$ = "at least one bone shows 1" and $G$ = "the sum equals 5". How many pairs belong to $F \\cap G$?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1,
    solution:
      'G = sum 5 = $\\{(1,4), (2,3), (3,2), (4,1)\\}$. Of these, the ones containing some $1$ are $(1,4)$ and $(4,1)$. So $|F \\cap G| = 2$.',
    source: { file: 'L1.pdf', page: 1, problem: 2 }
  },
  {
    id: 'afmp-5',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 3,
    statement:
      'The Mistress observes a cluster of 5 Cinders, each lit (1) or out (0). She records the vector $(x_1, x_2, x_3, x_4, x_5)$. How many possible outcomes does the basket contain?',
    options: ['10', '25', '32', '120'],
    correctIndex: 2,
    solution:
      'Each component has 2 independent states (lit or out), and there are 5 components. By multiplication: $|\\Omega| = 2^5 = 32$. More generally, the basket of $n$ binary components has cardinality $2^n$.',
    source: { file: 'L1.pdf', page: 1, problem: 4 }
  },
  {
    id: 'afmp-6',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 3,
    statement:
      'Same cluster of 5 Cinders. Let $A$ be the event "Cinders 4 and 5 are out". How many outcomes belong to $A$?',
    options: ['2', '4', '8', '16'],
    correctIndex: 2,
    solution:
      'Fixing $x_4 = x_5 = 0$, the other three Cinders ($x_1, x_2, x_3$) are free with 2 choices each. So $|A| = 2^3 = 8$. Restricting $k$ components in a $\\{0,1\\}^n$ space cuts the cardinality by $2^k$.',
    source: { file: 'L1.pdf', page: 1, problem: 4 }
  },
  {
    id: 'afmp-7',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 3,
    statement:
      'The shamans throw a six-faced bone continuously until they get the "end-sign" (the face 6), at which point the ritual ends. Let $E_n$ be the event "the ritual ends exactly on the $n$-th throw". How many outcomes belong to $E_n$?',
    options: ['$n$', '$5 \\cdot n$', '$5^{n-1}$', '$6^n$'],
    correctIndex: 2,
    solution:
      'For the ritual to end exactly on the $n$-th throw, the first $n-1$ must be non-$6$ (five choices each: $\\{1,2,3,4,5\\}$) and the $n$-th must be $6$ (one choice). By multiplication: $|E_n| = 5^{n-1} \\cdot 1 = 5^{n-1}$.',
    source: { file: 'L1.pdf', page: 1, problem: 1 }
  },
  {
    id: 'afmp-8',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 4,
    statement:
      'Same ritual (bone thrown until a 6). What does the event $\\left(\\bigcup_{n=1}^{\\infty} E_n\\right)^c$ represent?',
    options: [
      'The ritual ends on the first throw.',
      'The ritual ends at some finite moment.',
      'The 6 never appears — the ritual never ends.',
      'The ritual ends exactly after 6 throws.'
    ],
    correctIndex: 2,
    solution:
      '$\\bigcup_n E_n$ = "the ritual ends at some finite $n$" — the $6$ appears at some point. The complement $(\\bigcup_n E_n)^c$ is the negation: "for every $n$, the ritual did not end on the $n$-th throw" = "the $6$ never appears". This event corresponds to the infinite sequence $(x_1, x_2, \\ldots)$ with $x_i \\in \\{1,\\ldots,5\\}$ for every $i$.',
    source: { file: 'L1.pdf', page: 1, problem: 1 }
  },
  {
    id: 'afmp-9',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 4,
    statement:
      'The Mistress wants to weigh the chance a sample is touched without caring about its source. Her basket has three worlds: touched, clean, ambiguous. You also want to distinguish the source-stream (3 streams) for each verdict. How many possible-worlds does your basket contain?',
    options: ['3', '6', '9', '27'],
    correctIndex: 2,
    solution:
      "Each sample is described by a pair (verdict, stream). Verdicts: $3$ values. Streams: $3$ values. By multiplication: $3 \\times 3 = 9$ possible-worlds. The Mistress's basket (no stream) is a projection of yours — it groups the $9$ into $3$ classes, one per verdict."
  },
  {
    id: 'afmp-10',
    family: 1,
    conceptName: 'The Shape of the Possible World',
    difficulty: 2,
    statement:
      'Let $\\Omega = \\{1, 2, 3, 4, 5, 6\\}$. Let $A = \\{1, 2, 3\\}$ and $B = \\{2, 4, 6\\}$. Which set describes $A \\cap B^c$?',
    options: ['$\\{2\\}$', '$\\{1, 3\\}$', '$\\{4, 6\\}$', '$\\{1, 2, 3, 5\\}$'],
    correctIndex: 1,
    solution:
      '$B^c = \\Omega \\setminus B = \\{1, 3, 5\\}$. Then $A \\cap B^c = \\{1,2,3\\} \\cap \\{1,3,5\\} = \\{1, 3\\}$. Equivalently, $A \\cap B^c = A \\setminus B$ — the elements of $A$ that are not in $B$.'
  }
];
