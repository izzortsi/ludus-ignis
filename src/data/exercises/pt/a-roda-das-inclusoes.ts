// Family 2 — A Roda das Inclusões — sequences of events, ⋃, ⋂, De Morgan,
// monotone limits.
// Counterpart to the Elder Fire's parable "O batedor que conta marés".
// Source-derived (Aula 1 page 6 sequences, L1.1's (⋃Eₙ)ᶜ, indexed-events
// idioms) and adapted to multiple-choice form.
// Brazilian Portuguese (você-form).

import { Exercise } from '../../../core/exercises/exercise-model';

export const aRodaDasInclusoes: Exercise[] = [
  {
    id: 'ardi-1',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 1,
    statement:
      'O batedor anota se há vento-norte cortante a cada noite $i = 1, 2, 3, \\ldots$ Seja $V_i$ o evento "vento-norte na noite $i$". Qual expressão captura "houve vento-norte em ao menos uma noite"?',
    options: [
      '$\\bigcap_i V_i$',
      '$\\bigcup_i V_i$',
      '$\\bigcap_i V_i^c$',
      '$\\left(\\bigcup_i V_i\\right)^c$'
    ],
    correctIndex: 1,
    solution:
      '"Ao menos uma noite" = "existe um $i$ tal que $V_i$ ocorre" = $\\bigcup_i V_i$. A união captura a quantificação existencial sobre o índice: basta um $V_i$ verdadeiro para a união ser verdadeira.'
  },
  {
    id: 'ardi-2',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 1,
    statement:
      'Mesma sequência de eventos $V_i$. Qual expressão captura "vento-norte ocorreu em todas as noites"?',
    options: [
      '$\\bigcup_i V_i$',
      '$\\bigcup_i V_i^c$',
      '$\\bigcap_i V_i$',
      '$V_1 \\cup V_2$'
    ],
    correctIndex: 2,
    solution:
      '"Em todas as noites" = "para todo $i$, $V_i$ ocorre" = $\\bigcap_i V_i$. A interseção captura a quantificação universal: basta um $V_i$ falso para derrubar toda a interseção.'
  },
  {
    id: 'ardi-3',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 2,
    statement:
      'Mesma sequência $V_i$. Qual expressão captura "vento-norte não ocorreu em noite alguma"?',
    options: [
      '$\\bigcap_i V_i$',
      '$\\bigcup_i V_i^c$',
      '$\\bigcap_i V_i^c$',
      '$\\bigcup_i V_i$'
    ],
    correctIndex: 2,
    solution:
      '"Em nenhuma noite ocorreu" = "para todo $i$, $V_i$ não ocorreu" = $\\bigcap_i V_i^c$. Pela Lei do Espelho (De Morgan), isto é equivalente a $\\left(\\bigcup_i V_i\\right)^c$ — o avesso de "ocorreu em alguma noite".'
  },
  {
    id: 'ardi-4',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'Mesma sequência $V_i$. Qual expressão captura "vento-norte ocorreu em ao menos uma noite, mas não em todas"?',
    options: [
      '$\\bigcup_i V_i \\cap \\left(\\bigcap_i V_i\\right)^c$',
      '$\\bigcup_i V_i \\cap \\bigcap_i V_i$',
      '$\\bigcap_i V_i^c$',
      '$\\left(\\bigcup_i V_i\\right)^c$'
    ],
    correctIndex: 0,
    solution:
      '"Em ao menos uma" = $\\bigcup_i V_i$. "Não em todas" = $\\left(\\bigcap_i V_i\\right)^c$. A conjunção das duas é $\\bigcup_i V_i \\cap \\left(\\bigcap_i V_i\\right)^c$, equivalentemente $\\bigcup_i V_i \\setminus \\bigcap_i V_i$ — os mundos em que houve pelo menos um sim e pelo menos um não.'
  },
  {
    id: 'ardi-5',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'A Mestra registra a intensidade da maré-espelho a cada amanhecer (real $\\geq 0$). Para cada $n \\geq 1$, define a faixa $A_n = [0, 1/n]$. Qual conjunto é $\\bigcap_{n=1}^{\\infty} A_n$?',
    options: [
      '$\\{0\\}$',
      '$[0, 1]$',
      '$(0, 1)$',
      '$\\emptyset$'
    ],
    correctIndex: 0,
    solution:
      'A sequência $A_n = [0, 1/n]$ é decrescente: $A_1 \\supseteq A_2 \\supseteq \\ldots$ Para $x$ pertencer a todos os $A_n$, é preciso $x \\leq 1/n$ para todo $n$. Como $1/n \\to 0$, isso força $x = 0$ (e $0 \\geq 0$ está em todos). Logo $\\bigcap_n A_n = \\{0\\}$. O ponto $0$ sobrevive porque é fechado em $[0, 1/n]$.',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-6',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 4,
    statement:
      'Mesma Mestra; agora $B_n = (0, 1/n)$ (intervalo aberto em 0). Qual conjunto é $\\bigcap_{n=1}^{\\infty} B_n$?',
    options: [
      '$\\{0\\}$',
      '$(0, 1)$',
      '$[0, 1]$',
      '$\\emptyset$'
    ],
    correctIndex: 3,
    solution:
      'Diferente do caso $A_n$: agora $0 \\notin B_n$ para todo $n$ (intervalo aberto). E qualquer $x > 0$ é excluído de $B_n$ assim que $n > 1/x$ (pois $1/n < x$). Logo nenhum ponto sobrevive: $\\bigcap_n B_n = \\emptyset$. **Esta é a lição:** sequências de conjuntos não-vazios podem ter interseção vazia no infinito.',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-7',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'Faixas de intensidade $C_n = [n, n+1]$ para $n = 1, 2, 3, \\ldots$ Qual conjunto é $\\bigcup_{n=1}^{\\infty} C_n$?',
    options: [
      '$[1, 2]$',
      '$[1, \\infty)$',
      '$(0, \\infty)$',
      '$\\emptyset$'
    ],
    correctIndex: 1,
    solution:
      '$C_n = [n, n+1]$ cobre os inteiros $n$ a $n+1$. A união $\\bigcup_n C_n = [1, 2] \\cup [2, 3] \\cup [3, 4] \\cup \\ldots = [1, \\infty)$ — todos os reais $\\geq 1$. (Repara que os $C_n$ se "encadeiam" em $n+1$ — o ponto $n+1$ está em $C_n$ e em $C_{n+1}$.)',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-8',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 3,
    statement:
      'Faixas $D_n = (0, n)$ para $n = 1, 2, 3, \\ldots$ Qual conjunto é $\\bigcup_{n=1}^{\\infty} D_n$?',
    options: [
      '$(0, 1)$',
      '$(0, \\infty)$',
      '$[0, \\infty)$',
      '$\\emptyset$'
    ],
    correctIndex: 1,
    solution:
      '$D_n = (0, n)$ é crescente: $D_1 \\subseteq D_2 \\subseteq \\ldots$ Para $x > 0$, basta tomar $n > x$ para que $x \\in D_n$. Logo $\\bigcup_n D_n = (0, \\infty)$. O ponto $0$ não está em nenhum $D_n$ (intervalo aberto em $0$), então fica fora.',
    source: { file: 'Aula 1 -.pdf', page: 6, problem: 'sequencias' }
  },
  {
    id: 'ardi-9',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 4,
    statement:
      'Lei do Espelho (De Morgan). Sabendo que $\\left(\\bigcup_i A_i\\right)^c = \\bigcap_i A_i^c$, qual expressão é equivalente a $\\left(\\bigcap_i A_i\\right)^c$?',
    options: [
      '$\\bigcup_i A_i$',
      '$\\bigcap_i A_i^c$',
      '$\\bigcup_i A_i^c$',
      '$\\bigcap_i A_i$'
    ],
    correctIndex: 2,
    solution:
      'De Morgan tem duas formas espelhadas: $(\\bigcup A_i)^c = \\bigcap A_i^c$ e $(\\bigcap A_i)^c = \\bigcup A_i^c$. Em palavras: o avesso de "para todo $i$, $A_i$" é "existe $i$ tal que não-$A_i$" — basta um $A_i$ falhar para a interseção falhar.'
  },
  {
    id: 'ardi-10',
    family: 2,
    conceptName: 'A Roda das Inclusões',
    difficulty: 5,
    statement:
      'Os pajés lançam um osso até sair 6. $E_n$ = "ritual termina exatamente no $n$-ésimo lançamento". O batedor fala assim: "É a sequência infinita em que o 6 nunca aparece." A qual evento ele se refere?',
    options: [
      '$\\bigcup_n E_n$',
      '$\\bigcap_n E_n$',
      '$\\left(\\bigcup_n E_n\\right)^c$',
      '$\\left(\\bigcap_n E_n\\right)^c$'
    ],
    correctIndex: 2,
    solution:
      '$\\bigcup_n E_n$ = "o ritual termina em algum $n$ finito" = "o $6$ aparece eventualmente". O avesso disso é "o $6$ nunca aparece" = $\\left(\\bigcup_n E_n\\right)^c$. Repara: $\\bigcap_n E_n = \\emptyset$, pois os $E_n$ são disjuntos (o ritual só pode terminar exatamente uma vez).',
    source: { file: 'L1.pdf', page: 1, problem: 1 }
  }
];
