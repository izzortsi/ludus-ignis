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
    correctIndex: 1
  },
  {
    id: 'ajdc-5',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 2,
    statement:
      'Para uma amostra de água-de-poça, sabe-se que P(tocada) = 0,4, P(coletada à noite) = 0,6 e P(tocada ∪ noite) = 0,8. Qual o valor de P(tocada ∩ noite)?',
    options: ['0,1', '0,2', '0,3', '0,4'],
    correctIndex: 1
  },
  {
    id: 'ajdc-6',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 3,
    statement:
      'Mesma amostra: P(tocada) = 0,4, P(noite) = 0,6, P(tocada ∩ noite) = 0,2. Qual a probabilidade de a amostra ser tocada mas não ter sido coletada à noite?',
    options: ['0,1', '0,2', '0,3', '0,4'],
    correctIndex: 1
  },
  {
    id: 'ajdc-7',
    family: 3,
    conceptName: 'As Juras da Chama',
    difficulty: 2,
    statement:
      'Se P(E) = 0,4, qual o valor de P(Eᶜ)?',
    options: ['0,4', '0,5', '0,6', '1,0'],
    correctIndex: 2
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
    correctIndex: 2
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
    correctIndex: 1
  }
];
