// Family 7 — Os Dois Sinais — independence of joint events.
// Counterpart to the Elder Fire's parable "Duas flechas".
// Brazilian Portuguese (você-form).

import { Exercise } from '../../core/exercises/exercise-model';

export const osDoisSinais: Exercise[] = [
  {
    id: 'ods-1',
    family: 7,
    conceptName: 'Os Dois Sinais',
    difficulty: 1,
    statement:
      'Lanço duas moedas honestas, uma após a outra. Os resultados são independentes. Qual a probabilidade de ambas saírem cara?',
    options: ['1/2', '1/3', '1/4', '1/8'],
    correctIndex: 2,
    solution:
      'Independência permite multiplicar: $P(C_1 \\cap C_2) = P(C_1) \\cdot P(C_2) = (1/2)(1/2) = 1/4$. Equivalentemente, $\\Omega$ tem $4$ resultados igualmente prováveis (CC, CK, KC, KK) e só CC é favorável.'
  },
  {
    id: 'ods-2',
    family: 7,
    conceptName: 'Os Dois Sinais',
    difficulty: 2,
    statement:
      'Solto uma flecha que atinge o alvo com probabilidade 1/3. Tu soltas outra, em direção oposta, que atinge o seu alvo com probabilidade 1/4. As duas flechas são independentes. Qual a probabilidade de ambas atingirem?',
    options: ['1/12', '7/12', '1/2', '2/7'],
    correctIndex: 0,
    solution:
      'Sendo $A$ = minha flecha atinge, $B$ = tua flecha atinge, ambos independentes: $P(A \\cap B) = P(A) \\cdot P(B) = (1/3)(1/4) = 1/12$. A conjunção de fortunas alheias entre si encolhe ao multiplicar — cada fator $\\leq 1$ reduz o produto.'
  },
  {
    id: 'ods-3',
    family: 7,
    conceptName: 'Os Dois Sinais',
    difficulty: 3,
    statement:
      'Dois caçadores partem em direções opostas. Sem tempestade, cada um retorna com caça com probabilidade 1/2, e os retornos são independentes. Mas se vem uma tempestade — o que acontece com probabilidade 1/4 — nenhum retorna. Qual a probabilidade de ambos retornarem com caça?',
    options: ['1/4', '3/16', '1/8', '5/16'],
    correctIndex: 1,
    solution:
      'Condiciona pela tempestade. $P(\\text{ambos} \\mid \\text{tempestade}) = 0$ e $P(\\text{ambos} \\mid \\text{não-tempestade}) = (1/2)(1/2) = 1/4$ (independência condicional). Pela probabilidade total: $P(\\text{ambos}) = (1/4) \\cdot 0 + (3/4) \\cdot (1/4) = 3/16$. Sem condicionar, multiplicar diretamente $1/2 \\cdot 1/2$ daria $1/4$ — errado, porque há um vento que toca os dois (a tempestade).'
  },
  {
    id: 'ods-4',
    family: 7,
    conceptName: 'Os Dois Sinais',
    difficulty: 2,
    statement:
      'Em uma noite de aurora, a probabilidade de o vento mudar é 1/5. Em outra noite qualquer, é também 1/5. Suponha que os ventos de noites diferentes são independentes. Qual a probabilidade de o vento mudar em três noites seguidas?',
    options: ['3/5', '1/15', '1/125', '3/125'],
    correctIndex: 2,
    solution:
      'Independência sobre $n$ tentativas idênticas: $P = p^n = (1/5)^3 = 1/125$. Repara que somar as probabilidades ($3 \\times 1/5 = 3/5$) seria a chance de "mudar em pelo menos uma das três" — diferente conta.'
  },
  {
    id: 'ods-5',
    family: 7,
    conceptName: 'Os Dois Sinais',
    difficulty: 3,
    statement:
      'A Mestra observa que P(gavião grita) = 0,3, P(vento-norte cortante) = 0,5, e P(ambos) = 0,15. Os dois sinais são independentes?',
    options: [
      'Sim — pois 0,3 × 0,5 = 0,15.',
      'Não — pois 0,15 ≠ 0,3 + 0,5.',
      'Não — pois P(ambos) deveria ser 0,3 + 0,5 − 0,15 = 0,65 se independentes.',
      'Indeterminado sem mais dados.'
    ],
    correctIndex: 0,
    solution:
      'Teste de independência: $A \\perp B \\iff P(A \\cap B) = P(A) \\cdot P(B)$. Aqui $0{,}3 \\times 0{,}5 = 0{,}15 = P(A \\cap B)$ — bate exatamente. Logo independentes. (Se a frequência conjunta observada igualar o produto das marginais, não há laço entre os sinais.)'
  },
  {
    id: 'ods-6',
    family: 7,
    conceptName: 'Os Dois Sinais',
    difficulty: 4,
    statement:
      'Quatro Cinders independentes leem a mesma amostra. Cada um, individualmente, identifica uma amostra tocada com probabilidade 0,7. Qual a probabilidade de ao menos um dos quatro identificá-la corretamente?',
    options: ['0,7', '0,9', '0,9919', '0,2401'],
    correctIndex: 2,
    solution:
      'Truque do complemento: $P(\\text{ao menos um}) = 1 - P(\\text{nenhum})$. Cada Cinder falha com probabilidade $0{,}3$; por independência, todos os 4 falham com $0{,}3^4 = 0{,}0081$. Logo $P(\\text{ao menos um}) = 1 - 0{,}0081 = 0{,}9919$. (Esta é a base do "sistema paralelo" — redundância amplifica confiabilidade rapidamente.)'
  },
  {
    id: 'ods-7',
    family: 7,
    conceptName: 'Os Dois Sinais',
    difficulty: 4,
    statement:
      'Lanço dois ossos honestos. Sejam A = "primeiro osso é par" e B = "soma dos ossos é 7". Os eventos A e B são independentes?',
    options: [
      'Sim — pois P(A) · P(B) = (1/2)(1/6) = 1/12 = P(A ∩ B).',
      'Não — pois P(A ∩ B) = 1/12 mas P(A) · P(B) = 1/24.',
      'Não — pois "soma é 7" depende de quem rolou primeiro.',
      'Indeterminado sem saber se os ossos são honestos.'
    ],
    correctIndex: 0,
    solution:
      '$P(A) = 3/6 = 1/2$ (o primeiro osso é $2, 4$ ou $6$). $P(B) = 6/36 = 1/6$ (são 6 pares com soma 7). $A \\cap B$ = pares com primeiro par e soma 7: $(2,5), (4,3), (6,1)$ — 3 pares, então $P(A \\cap B) = 3/36 = 1/12$. Verifica: $P(A) \\cdot P(B) = 1/2 \\cdot 1/6 = 1/12 = P(A \\cap B)$. Independentes — a "soma é 7" tem uma estrutura especial: a paridade do primeiro não muda a chance da soma fechar em 7.'
  }
];
