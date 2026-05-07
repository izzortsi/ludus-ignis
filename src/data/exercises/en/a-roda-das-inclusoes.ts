// Family 2 — The Wheel of Inclusions — sequences of events, ⋃, ⋂,
// De Morgan, monotone limits.
// Translation of pt/a-roda-das-inclusoes.ts.

import { Exercise } from '../../../core/exercises/exercise-model';

export const aRodaDasInclusoes: Exercise[] = [
  {
    id: 'ardi-1',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 1,
    statement:
      'The scout notes whether there is a cutting north-wind on each night $i = 1, 2, 3, \\ldots$ Let $V_i$ be the event "north-wind on night $i$". Which expression captures "there was a north-wind on at least one night"?',
    options: [
      '$\\bigcap_i V_i$',
      '$\\bigcup_i V_i$',
      '$\\bigcap_i V_i^c$',
      '$\\left(\\bigcup_i V_i\\right)^c$'
    ],
    correctIndex: 1,
    solution:
      '"At least one night" = "there exists an $i$ such that $V_i$ occurs" = $\\bigcup_i V_i$. The union captures the existential quantification over the index: one true $V_i$ is enough for the union to be true.'
  },
  {
    id: 'ardi-2',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 1,
    statement:
      'Same sequence of events $V_i$. Which expression captures "north-wind occurred on every night"?',
    options: [
      '$\\bigcup_i V_i$',
      '$\\bigcup_i V_i^c$',
      '$\\bigcap_i V_i$',
      '$V_1 \\cup V_2$'
    ],
    correctIndex: 2,
    solution:
      '"On every night" = "for every $i$, $V_i$ occurs" = $\\bigcap_i V_i$. The intersection captures the universal quantification: one false $V_i$ is enough to topple the whole intersection.'
  },
  {
    id: 'ardi-3',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 2,
    statement:
      'Same sequence $V_i$. Which expression captures "north-wind did not occur on any night"?',
    options: [
      '$\\bigcap_i V_i$',
      '$\\bigcup_i V_i^c$',
      '$\\bigcap_i V_i^c$',
      '$\\bigcup_i V_i$'
    ],
    correctIndex: 2,
    solution:
      '"On no night did it occur" = "for every $i$, $V_i$ did not occur" = $\\bigcap_i V_i^c$. By the Mirror Law (De Morgan), this is equivalent to $\\left(\\bigcup_i V_i\\right)^c$ — the obverse of "occurred on some night".'
  },
  {
    id: 'ardi-4',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 3,
    statement:
      'Same sequence $V_i$. Which expression captures "north-wind occurred on at least one night, but not on every one"?',
    options: [
      '$\\bigcup_i V_i \\cap \\left(\\bigcap_i V_i\\right)^c$',
      '$\\bigcup_i V_i \\cap \\bigcap_i V_i$',
      '$\\bigcap_i V_i^c$',
      '$\\left(\\bigcup_i V_i\\right)^c$'
    ],
    correctIndex: 0,
    solution:
      '"On at least one" = $\\bigcup_i V_i$. "Not on every one" = $\\left(\\bigcap_i V_i\\right)^c$. The conjunction is $\\bigcup_i V_i \\cap \\left(\\bigcap_i V_i\\right)^c$, equivalently $\\bigcup_i V_i \\setminus \\bigcap_i V_i$ — the worlds where there was at least one yes and at least one no.'
  },
  {
    id: 'ardi-5',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 3,
    statement:
      'The Mistress records the intensity of the mirror-tide each dawn (real $\\geq 0$). For each $n \\geq 1$, define the band $A_n = [0, 1/n]$. Which set is $\\bigcap_{n=1}^{\\infty} A_n$?',
    options: [
      '$\\{0\\}$',
      '$[0, 1]$',
      '$(0, 1)$',
      '$\\emptyset$'
    ],
    correctIndex: 0,
    solution:
      'The sequence $A_n = [0, 1/n]$ is decreasing: $A_1 \\supseteq A_2 \\supseteq \\ldots$ For $x$ to belong to every $A_n$, we need $x \\leq 1/n$ for every $n$. Since $1/n \\to 0$, this forces $x = 0$ (and $0 \\geq 0$ is in every one). So $\\bigcap_n A_n = \\{0\\}$. The point $0$ survives because it is closed in $[0, 1/n]$.',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-6',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 4,
    statement:
      'Same Mistress; now $B_n = (0, 1/n)$ (interval open at 0). Which set is $\\bigcap_{n=1}^{\\infty} B_n$?',
    options: [
      '$\\{0\\}$',
      '$(0, 1)$',
      '$[0, 1]$',
      '$\\emptyset$'
    ],
    correctIndex: 3,
    solution:
      'Different from the $A_n$ case: now $0 \\notin B_n$ for any $n$ (open interval). And any $x > 0$ is excluded from $B_n$ as soon as $n > 1/x$ (since $1/n < x$). So no point survives: $\\bigcap_n B_n = \\emptyset$. **This is the lesson:** sequences of non-empty sets can have empty intersection in the infinite.',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-7',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 3,
    statement:
      'Intensity bands $C_n = [n, n+1]$ for $n = 1, 2, 3, \\ldots$ Which set is $\\bigcup_{n=1}^{\\infty} C_n$?',
    options: [
      '$[1, 2]$',
      '$[1, \\infty)$',
      '$(0, \\infty)$',
      '$\\emptyset$'
    ],
    correctIndex: 1,
    solution:
      '$C_n = [n, n+1]$ covers the integers $n$ to $n+1$. The union $\\bigcup_n C_n = [1, 2] \\cup [2, 3] \\cup [3, 4] \\cup \\ldots = [1, \\infty)$ — every real $\\geq 1$. (Note that the $C_n$ "chain" at $n+1$ — the point $n+1$ is in both $C_n$ and $C_{n+1}$.)',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-8',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 3,
    statement:
      'Bands $D_n = (0, n)$ for $n = 1, 2, 3, \\ldots$ Which set is $\\bigcup_{n=1}^{\\infty} D_n$?',
    options: [
      '$(0, 1)$',
      '$(0, \\infty)$',
      '$[0, \\infty)$',
      '$\\emptyset$'
    ],
    correctIndex: 1,
    solution:
      '$D_n = (0, n)$ is increasing: $D_1 \\subseteq D_2 \\subseteq \\ldots$ For $x > 0$, take $n > x$ to get $x \\in D_n$. So $\\bigcup_n D_n = (0, \\infty)$. The point $0$ is in no $D_n$ (open interval at $0$), so it stays out.',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-9',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 4,
    statement:
      'Mirror Law (De Morgan). Knowing that $\\left(\\bigcup_i A_i\\right)^c = \\bigcap_i A_i^c$, which expression is equivalent to $\\left(\\bigcap_i A_i\\right)^c$?',
    options: [
      '$\\bigcup_i A_i$',
      '$\\bigcap_i A_i^c$',
      '$\\bigcup_i A_i^c$',
      '$\\bigcap_i A_i$'
    ],
    correctIndex: 2,
    solution:
      'De Morgan has two mirrored forms: $(\\bigcup A_i)^c = \\bigcap A_i^c$ and $(\\bigcap A_i)^c = \\bigcup A_i^c$. In words: the obverse of "for every $i$, $A_i$" is "there exists $i$ such that not-$A_i$" — one $A_i$ failing is enough for the intersection to fail.'
  },
  {
    id: 'ardi-10',
    family: 2,
    conceptName: 'The Wheel of Inclusions',
    difficulty: 5,
    statement:
      'The shamans throw a bone until a 6. $E_n$ = "ritual ends exactly on the $n$-th throw". The scout says: "It\'s the infinite sequence in which the 6 never appears." Which event is he referring to?',
    options: [
      '$\\bigcup_n E_n$',
      '$\\bigcap_n E_n$',
      '$\\left(\\bigcup_n E_n\\right)^c$',
      '$\\left(\\bigcap_n E_n\\right)^c$'
    ],
    correctIndex: 2,
    solution:
      '$\\bigcup_n E_n$ = "the ritual ends at some finite $n$" = "the $6$ eventually appears". The obverse of this is "the $6$ never appears" = $\\left(\\bigcup_n E_n\\right)^c$. Note: $\\bigcap_n E_n = \\emptyset$, since the $E_n$ are disjoint (the ritual can only end exactly once).',
    source: { file: 'L1.pdf', page: 1, problem: 1 }
  }
];
