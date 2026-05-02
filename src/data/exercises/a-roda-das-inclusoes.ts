// Family 2 — A Roda das Inclusões — sequences of events, ⋃, ⋂, De Morgan,
// monotone limits.
// Counterpart to the Elder Fire's parable "O batedor que conta marés".
// Source-derived (Aula 1 page 6 sequences, L1.1's (⋃Eₙ)ᶜ, indexed-events
// idioms) and adapted to multiple-choice form.
// Brazilian Portuguese (você-form).

import { Exercise } from '../../core/exercises/exercise-model';

export const aRodaDasInclusoes: Exercise[] = [
  {
    id: 'ardi-1',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 1,
    statement:
      'O batedor anota se há vento-norte cortante a cada noite i = 1, 2, 3, … Seja Vᵢ o evento "vento-norte na noite i". Qual expressão captura "houve vento-norte em ao menos uma noite"?',
    options: [
      '⋂ᵢ Vᵢ',
      '⋃ᵢ Vᵢ',
      '⋂ᵢ Vᵢᶜ',
      '(⋃ᵢ Vᵢ)ᶜ'
    ],
    correctIndex: 1
  },
  {
    id: 'ardi-2',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 1,
    statement:
      'Mesma sequência de eventos Vᵢ. Qual expressão captura "vento-norte ocorreu em todas as noites"?',
    options: [
      '⋃ᵢ Vᵢ',
      '⋃ᵢ Vᵢᶜ',
      '⋂ᵢ Vᵢ',
      'V₁ ∪ V₂'
    ],
    correctIndex: 2
  },
  {
    id: 'ardi-3',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 2,
    statement:
      'Mesma sequência Vᵢ. Qual expressão captura "vento-norte não ocorreu em noite alguma"?',
    options: [
      '⋂ᵢ Vᵢ',
      '⋃ᵢ Vᵢᶜ',
      '⋂ᵢ Vᵢᶜ',
      '⋃ᵢ Vᵢ'
    ],
    correctIndex: 2
  },
  {
    id: 'ardi-4',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'Mesma sequência Vᵢ. Qual expressão captura "vento-norte ocorreu em ao menos uma noite, mas não em todas"?',
    options: [
      '⋃ᵢ Vᵢ ∩ (⋂ᵢ Vᵢ)ᶜ',
      '⋃ᵢ Vᵢ ∩ ⋂ᵢ Vᵢ',
      '⋂ᵢ Vᵢᶜ',
      '(⋃ᵢ Vᵢ)ᶜ'
    ],
    correctIndex: 0
  },
  {
    id: 'ardi-5',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'A Mestra registra a intensidade da maré-espelho a cada amanhecer (real ≥ 0). Para cada n ≥ 1, define a faixa Aₙ = [0, 1/n]. Qual conjunto é ⋂ₙ₌₁^∞ Aₙ?',
    options: [
      '{0}',
      '[0, 1]',
      '(0, 1)',
      '∅'
    ],
    correctIndex: 0,
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-6',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 4,
    statement:
      'Mesma Mestra; agora Bₙ = (0, 1/n) (intervalo aberto em 0). Qual conjunto é ⋂ₙ₌₁^∞ Bₙ?',
    options: [
      '{0}',
      '(0, 1)',
      '[0, 1]',
      '∅'
    ],
    correctIndex: 3,
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-7',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'Faixas de intensidade Cₙ = [n, n+1] para n = 1, 2, 3, … Qual conjunto é ⋃ₙ₌₁^∞ Cₙ?',
    options: [
      '[1, 2]',
      '[1, ∞)',
      '(0, ∞)',
      '∅'
    ],
    correctIndex: 1,
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-8',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'Faixas Dₙ = (0, n) para n = 1, 2, 3, … Qual conjunto é ⋃ₙ₌₁^∞ Dₙ?',
    options: [
      '(0, 1)',
      '(0, ∞)',
      '[0, ∞)',
      '∅'
    ],
    correctIndex: 1,
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-9',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 4,
    statement:
      'Lei do Espelho (De Morgan). Sabendo que (⋃ᵢ Aᵢ)ᶜ = ⋂ᵢ Aᵢᶜ, qual expressão é equivalente a (⋂ᵢ Aᵢ)ᶜ?',
    options: [
      '⋃ᵢ Aᵢ',
      '⋂ᵢ Aᵢᶜ',
      '⋃ᵢ Aᵢᶜ',
      '⋂ᵢ Aᵢ'
    ],
    correctIndex: 2
  },
  {
    id: 'ardi-10',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 5,
    statement:
      'Os pajés lançam um osso até sair 6. Eₙ = "ritual termina exatamente no n-ésimo lançamento". O batedor fala assim: "É a sequência infinita em que o 6 nunca aparece." A qual evento ele se refere?',
    options: [
      '⋃ₙ Eₙ',
      '⋂ₙ Eₙ',
      '(⋃ₙ Eₙ)ᶜ',
      '(⋂ₙ Eₙ)ᶜ'
    ],
    correctIndex: 2,
    source: { file: 'L1.pdf', page: 1, problem: 1 }
  }
];
