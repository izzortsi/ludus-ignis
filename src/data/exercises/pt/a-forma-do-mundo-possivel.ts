// Family 1 — A Forma do Mundo Possível — sample space, events, set algebra.
// Counterpart to the Elder Fire's parable "Antes da Leitura, o nome".
// Source-derived (L1.1, L1.2, L1.4, L1.13 + Aula 1 examples) but reworded
// for in-world voice and adapted to multiple-choice form.
// Brazilian Portuguese (você-form).

import { Exercise } from '../../../core/exercises/exercise-model';

export const aFormaDoMundoPossivel: Exercise[] = [
  {
    id: 'afmp-1',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 1,
    statement:
      'Os pajés lançam dois ossos-de-osso de seis faces, um após o outro, e registram o par (i, j) de faces. Quantos pares ordenados o cesto contém?',
    options: ['12', '21', '36', '64'],
    correctIndex: 2,
    solution:
      'Cada osso tem 6 resultados possíveis, e os ossos são distinguíveis (primeiro vs segundo). Pelo princípio da multiplicação: $|\\Omega| = 6 \\times 6 = 36$. O espaço amostral $\\Omega = \\{(i, j) : i, j \\in \\{1, \\ldots, 6\\}\\}$ contém todos os pares ordenados.',
    source: { file: 'L1.pdf', page: 3, problem: 13 }
  },
  {
    id: 'afmp-2',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 2,
    statement:
      'No mesmo lançamento de dois ossos, quantos pares ordenados (i, j) têm soma igual a 7?',
    options: ['4', '5', '6', '7'],
    correctIndex: 2,
    solution:
      'Enumera os pares: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$. São $6$ pares. Repara que $7$ é a única soma que tem o número máximo de partições no intervalo $\\{2, \\ldots, 12\\}$ — daí ser a soma mais provável de dois ossos honestos.',
    source: { file: 'L1.pdf', page: 3, problem: 13 }
  },
  {
    id: 'afmp-3',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 2,
    statement:
      'Lança dois ossos. Sejam E o evento "a soma é ímpar" e F o evento "ao menos um osso mostra 1". Quantos pares pertencem a E ∩ F?',
    options: ['4', '6', '11', '18'],
    correctIndex: 1,
    solution:
      'E ∩ F = pares com soma ímpar onde algum osso mostra $1$. Soma ímpar exige um par e um ímpar; com um $1$ (ímpar), o outro tem de ser par. Listando: primeiro osso $=1$ → $(1,2), (1,4), (1,6)$; segundo osso $=1$ (e primeiro $\\neq 1$) → $(2,1), (4,1), (6,1)$. Total: $6$ pares.',
    source: { file: 'L1.pdf', page: 1, problem: 2 }
  },
  {
    id: 'afmp-4',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 2,
    statement:
      'Mesmo cenário (dois ossos). Sejam F = "ao menos um osso mostra 1" e G = "a soma é igual a 5". Quantos pares pertencem a F ∩ G?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1,
    solution:
      'G = soma 5 = $\\{(1,4), (2,3), (3,2), (4,1)\\}$. Destes, os que têm algum $1$ são $(1,4)$ e $(4,1)$. Logo $|F \\cap G| = 2$.',
    source: { file: 'L1.pdf', page: 1, problem: 2 }
  },
  {
    id: 'afmp-5',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 3,
    statement:
      'A Mestra observa um aglomerado de 5 Cinders, cada um aceso (1) ou apagado (0). Ela registra o vetor (x₁, x₂, x₃, x₄, x₅). Quantos resultados possíveis o cesto contém?',
    options: ['10', '25', '32', '120'],
    correctIndex: 2,
    solution:
      'Cada componente tem 2 estados independentes (aceso ou apagado), e há 5 componentes. Pela multiplicação: $|\\Omega| = 2^5 = 32$. Mais geralmente, o cesto de $n$ componentes binários tem cardinalidade $2^n$.',
    source: { file: 'L1.pdf', page: 1, problem: 4 }
  },
  {
    id: 'afmp-6',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 3,
    statement:
      'Mesmo aglomerado de 5 Cinders. Seja A o evento "os Cinders 4 e 5 estão apagados". Quantos resultados pertencem a A?',
    options: ['2', '4', '8', '16'],
    correctIndex: 2,
    solution:
      'Fixando $x_4 = x_5 = 0$, os outros três Cinders ($x_1, x_2, x_3$) são livres com 2 escolhas cada. Logo $|A| = 2^3 = 8$. Restringir $k$ componentes em um espaço $\\{0,1\\}^n$ corta a cardinalidade por $2^k$.',
    source: { file: 'L1.pdf', page: 1, problem: 4 }
  },
  {
    id: 'afmp-7',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 3,
    statement:
      'Os pajés lançam um osso de seis faces continuamente até obter o "sinal-do-fim" (a face 6), e o ritual termina. Seja Eₙ o evento "o ritual termina exatamente no n-ésimo lançamento". Quantos resultados pertencem a Eₙ?',
    options: ['n', '5 · n', '5ⁿ⁻¹', '6ⁿ'],
    correctIndex: 2,
    solution:
      'Para o ritual terminar exatamente no $n$-ésimo lançamento, os primeiros $n-1$ devem ser não-$6$ (cinco escolhas cada: $\\{1,2,3,4,5\\}$) e o $n$-ésimo deve ser $6$ (uma escolha). Pela multiplicação: $|E_n| = 5^{n-1} \\cdot 1 = 5^{n-1}$.',
    source: { file: 'L1.pdf', page: 1, problem: 1 }
  },
  {
    id: 'afmp-8',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 4,
    statement:
      'Mesmo ritual (osso lançado até sair 6). O que representa o evento (⋃ₙ₌₁^∞ Eₙ)ᶜ?',
    options: [
      'O ritual termina no primeiro lançamento.',
      'O ritual termina em algum momento finito.',
      'O 6 nunca aparece — o ritual nunca termina.',
      'O ritual termina exatamente após 6 lançamentos.'
    ],
    correctIndex: 2,
    solution:
      '$\\bigcup_n E_n$ = "o ritual termina em algum $n$ finito" — alguma vez aparece o $6$. O complemento $(\\bigcup_n E_n)^c$ é a negação: "para todo $n$, o ritual não terminou no $n$-ésimo lançamento" = "o $6$ nunca aparece". Esse evento corresponde à sequência infinita $(x_1, x_2, \\ldots)$ com $x_i \\in \\{1,\\ldots,5\\}$ para todo $i$.',
    source: { file: 'L1.pdf', page: 1, problem: 1 }
  },
  {
    id: 'afmp-9',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 4,
    statement:
      'A Mestra quer pesar a chance de uma amostra ser tocada sem se importar com a origem. O cesto dela tem três mundos: tocada, limpa, ambígua. Tu queres também distinguir o riacho de origem (são 3 riachos) para cada veredicto. Quantos mundos-possíveis o teu cesto contém?',
    options: ['3', '6', '9', '27'],
    correctIndex: 2,
    solution:
      'Cada amostra é descrita por um par (veredicto, riacho). Veredictos: $3$ valores. Riachos: $3$ valores. Pela multiplicação: $3 \\times 3 = 9$ mundos-possíveis. O cesto da Mestra (sem riacho) é uma projeção do teu — agrupa os $9$ em $3$ classes, uma por veredicto.'
  },
  {
    id: 'afmp-10',
    family: 1,
    conceptName: 'A Forma do Mundo Possível',
    difficulty: 2,
    statement:
      'Seja Ω = {1, 2, 3, 4, 5, 6}. Sejam A = {1, 2, 3} e B = {2, 4, 6}. Qual conjunto descreve A ∩ Bᶜ?',
    options: ['{2}', '{1, 3}', '{4, 6}', '{1, 2, 3, 5}'],
    correctIndex: 1,
    solution:
      '$B^c = \\Omega \\setminus B = \\{1, 3, 5\\}$. Então $A \\cap B^c = \\{1,2,3\\} \\cap \\{1,3,5\\} = \\{1, 3\\}$. Equivalentemente, $A \\cap B^c = A \\setminus B$ — os elementos de $A$ que não estão em $B$.'
  }
];
