// Family 3 — As Juras da Chama — Kolmogorov axioms + derived properties.
// Counterpart to the Elder Fire's parable "As três juras da brasa".
// Source-derived (L1.5 disjoint events, L1.7 3-set inclusion-exclusion,
// foundations §3 of foundations.md). Brazilian Portuguese (você-form).

import { Exercise } from '../../core/exercises/exercise-model';

export const asJurasDaChama: Exercise[] = [
  {
    id: 'ajdc-1',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 1,
    statement:
      'Sejam A e B dois eventos disjuntos com P(A) = 0,3 e P(B) = 0,5. Qual o valor de P(A ∪ B)?',
    options: ['0,15', '0,5', '0,8', '1,0'],
    correctIndex: 2,
    solution:
      'Como $A \\cap B = \\emptyset$, vale a aditividade da terceira jura (A3): $P(A \\cup B) = P(A) + P(B) = 0{,}3 + 0{,}5 = 0{,}8$. Sem disjunção, teria de descontar a sobreposição.',
    source: { file: 'L1.pdf', page: 2, problem: 5 }
  },
  {
    id: 'ajdc-2',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 1,
    statement:
      'Mesmos eventos A e B disjuntos, com P(A) = 0,3 e P(B) = 0,5. Qual o valor de P(A ∩ B)?',
    options: ['0', '0,15', '0,2', '0,3'],
    correctIndex: 0,
    solution:
      'Disjunto significa $A \\cap B = \\emptyset$, e a chance do vazio é zero (propriedade derivada das juras): $P(\\emptyset) = 0$. Então $P(A \\cap B) = 0$. O valor $0{,}15 = 0{,}3 \\times 0{,}5$ seria correto sob *independência*, não disjunção — duas coisas diferentes.',
    source: { file: 'L1.pdf', page: 2, problem: 5 }
  },
  {
    id: 'ajdc-3',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 2,
    statement:
      'Mesmos A e B disjuntos, P(A) = 0,3 e P(B) = 0,5. Qual o valor de P(A \\ B), isto é, "A acontece e B não acontece"?',
    options: ['0', '0,2', '0,3', '0,5'],
    correctIndex: 2,
    solution:
      'Como $A$ e $B$ são disjuntos, $A \\subseteq B^c$ — todo elemento de $A$ está fora de $B$. Logo $A \\setminus B = A$, e $P(A \\setminus B) = P(A) = 0{,}3$. Em geral, $P(A \\setminus B) = P(A) - P(A \\cap B)$, que aqui dá $0{,}3 - 0 = 0{,}3$.',
    source: { file: 'L1.pdf', page: 2, problem: 5 }
  },
  {
    id: 'ajdc-4',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 2,
    statement:
      'Aurora visível e vento-norte cortante são eventos disjuntos numa dada noite, com P(aurora) = 0,3 e P(vento) = 0,5. Qual a probabilidade de a noite não trazer nem aurora nem vento?',
    options: ['0,1', '0,2', '0,4', '0,8'],
    correctIndex: 1,
    solution:
      'Sendo $A$ = aurora, $V$ = vento. Por A3 (disjuntos): $P(A \\cup V) = 0{,}3 + 0{,}5 = 0{,}8$. Por De Morgan: "nem $A$ nem $V$" = $A^c \\cap V^c = (A \\cup V)^c$. Por P3 (complemento): $P((A \\cup V)^c) = 1 - 0{,}8 = 0{,}2$.'
  },
  {
    id: 'ajdc-5',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 2,
    statement:
      'Para uma amostra de água-de-poça, sabe-se que P(tocada) = 0,4, P(coletada à noite) = 0,6 e P(tocada ∪ noite) = 0,8. Qual o valor de P(tocada ∩ noite)?',
    options: ['0,1', '0,2', '0,3', '0,4'],
    correctIndex: 1,
    solution:
      'Pela inclusão-exclusão (P5): $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$. Resolve para o que falta: $P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0{,}4 + 0{,}6 - 0{,}8 = 0{,}2$. Os eventos *não* são disjuntos aqui — há $0{,}2$ de sobreposição.'
  },
  {
    id: 'ajdc-6',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 3,
    statement:
      'Mesma amostra: P(tocada) = 0,4, P(noite) = 0,6, P(tocada ∩ noite) = 0,2. Qual a probabilidade de a amostra ser tocada mas não ter sido coletada à noite?',
    options: ['0,1', '0,2', '0,3', '0,4'],
    correctIndex: 1,
    solution:
      'Decomposição disjunta: $T = (T \\cap N) \\cup (T \\cap N^c)$, e estes dois pedaços não se sobrepõem. Por A3: $P(T) = P(T \\cap N) + P(T \\cap N^c)$. Resolve: $P(T \\cap N^c) = P(T) - P(T \\cap N) = 0{,}4 - 0{,}2 = 0{,}2$.'
  },
  {
    id: 'ajdc-7',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 2,
    statement:
      'Se P(E) = 0,4, qual o valor de P(Eᶜ)?',
    options: ['0,4', '0,5', '0,6', '1,0'],
    correctIndex: 2,
    solution:
      'P3 (regra do complemento): $P(E^c) = 1 - P(E) = 1 - 0{,}4 = 0{,}6$. Decorre direto de A2 ($P(\\Omega) = 1$) e A3 (aditividade sobre os disjuntos $E$ e $E^c$, que juntos cobrem $\\Omega$).'
  },
  {
    id: 'ajdc-8',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 4,
    statement:
      'A Mestra observa três sinais ao longo da noite: I, II e III. Sabe-se: P(I) = 0,5, P(II) = 0,4, P(III) = 0,3, P(I ∩ II) = 0,2, P(I ∩ III) = 0,1, P(II ∩ III) = 0,1, P(I ∩ II ∩ III) = 0,05. Qual o valor de P(I ∪ II ∪ III)?',
    options: ['0,75', '0,80', '0,85', '0,90'],
    correctIndex: 2,
    solution:
      'Inclusão-exclusão para três conjuntos: $P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)$. Substituindo: $0{,}5 + 0{,}4 + 0{,}3 - 0{,}2 - 0{,}1 - 0{,}1 + 0{,}05 = 1{,}2 - 0{,}4 + 0{,}05 = 0{,}85$.',
    source: { file: 'L1.pdf', page: 2, problem: 7 }
  },
  {
    id: 'ajdc-9',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 3,
    statement:
      'Um caçador promete ao bando: "a chance de a caça vir do norte é 0,6, e a chance de vir do leste é 0,5; somando, temos 1,1 de chance de comer". Qual jura da brasa o caçador violou?',
    options: [
      'A jura A1: "toda chance fica entre nada e tudo".',
      'A jura A2: "a chance de algo acontecer é um".',
      'A jura A3: "quando os eventos não se sobrepõem, suas chances somam" — pois norte e leste podem ocorrer juntos.',
      'Nenhuma — a soma está correta.'
    ],
    correctIndex: 2,
    solution:
      'A3 só permite somar as chances quando os eventos são *disjuntos*. Como caças podem vir do norte E do leste na mesma noite, os dois eventos se sobrepõem — a soma simples conta a sobreposição duas vezes. O sintoma é o resultado $1{,}1 > 1$ (que viola A1 e P(Ω)=1), mas a *causa* é a aplicação errada de A3 sem checar disjunção. Forma correta: $P(N \\cup L) = P(N) + P(L) - P(N \\cap L) \\leq 1$.'
  },
  {
    id: 'ajdc-10',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 4,
    statement:
      'Um aprendiz escreve, para dois eventos A e B: P(A) = 0,7 e P(A ∩ B) = 0,8. Qual jura da brasa este escrito viola?',
    options: [
      'A1: probabilidades fora de [0, 1] — pois 0,8 > 0,7 = P(A).',
      'A1: a monotonicidade exige P(A ∩ B) ≤ P(A); 0,8 ≤ 0,7 é falso.',
      'A2: o cesto inteiro pesa mais de 1.',
      'A3: somente eventos disjuntos podem ter chances somando.'
    ],
    correctIndex: 1,
    solution:
      'Como $A \\cap B \\subseteq A$, a *monotonicidade* (P4, derivada das juras) exige $P(A \\cap B) \\leq P(A)$. Aqui $0{,}8 > 0{,}7$ — violação. Os dois valores individualmente estão em $[0,1]$ (A1 satisfeita), mas a relação entre eles é impossível.'
  }
];
