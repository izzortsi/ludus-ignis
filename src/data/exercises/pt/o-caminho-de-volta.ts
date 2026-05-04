// Family 9 — O Caminho de Volta — Bayesian inversion.
// Alpha-zero hand-authored set; A-style transposition to fire-voice.
// Brazilian Portuguese (você-form).

import { Exercise } from '../../../core/exercises/exercise-model';

export const oCaminhoDeVolta: Exercise[] = [
  {
    id: 'ocdv-1',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 1,
    statement:
      'Considere duas moedas. Uma é honesta — cara com probabilidade 1/2. A outra é viciada — cara com probabilidade 3/4. Escolho uma moeda ao acaso e jogo. Sai cara. Qual a probabilidade de eu ter escolhido a moeda honesta?',
    options: ['1/3', '2/5', '1/2', '5/8'],
    correctIndex: 1,
    solution:
      'Bayes direto. Prior: $P(H) = P(V) = 1/2$. Verossimilhança: $P(\\text{cara} \\mid H) = 1/2$, $P(\\text{cara} \\mid V) = 3/4$. Marginal: $P(\\text{cara}) = (1/2)(1/2) + (1/2)(3/4) = 1/4 + 3/8 = 5/8$. Posterior: $P(H \\mid \\text{cara}) = \\frac{(1/2)(1/2)}{5/8} = \\frac{1/4}{5/8} = 2/5$. A cara é evidência (fraca) a favor da viciada — o posterior em honesta cai de $1/2$ para $2/5$.'
  },
  {
    id: 'ocdv-2',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 2,
    statement:
      'Considere duas urnas. A primeira tem 3 bolas vermelhas e 2 azuis. A segunda tem 4 vermelhas e 6 azuis. Escolho uma urna uniformemente e dela tiro uma bola, também uniformemente. A bola é azul. Qual a probabilidade de eu ter escolhido a primeira urna?',
    options: ['1/5', '2/5', '1/2', '3/5'],
    correctIndex: 1,
    solution:
      'Prior: $P(U_1) = P(U_2) = 1/2$. Verossimilhança: $P(\\text{azul} \\mid U_1) = 2/5$, $P(\\text{azul} \\mid U_2) = 6/10 = 3/5$. Marginal: $P(\\text{azul}) = (1/2)(2/5) + (1/2)(3/5) = 1/5 + 3/10 = 1/2$. Posterior: $P(U_1 \\mid \\text{azul}) = \\frac{(1/2)(2/5)}{1/2} = 2/5$. A azul é evidência a favor da urna $U_2$ (que tem maior fração de azuis).'
  },
  {
    id: 'ocdv-3',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 3,
    statement:
      'Considere um teste para uma doença. A doença afeta 1% da população. O teste detecta a doença em 95% das pessoas doentes, e dá positivo erradamente em 10% das pessoas saudáveis. Uma pessoa testou positivo. Qual a probabilidade aproximada de ela estar doente?',
    options: ['0,05', '0,09', '0,50', '0,95'],
    correctIndex: 1,
    solution:
      'Bayes diagnóstico. Prior $P(D) = 0{,}01$, $P(\\bar D) = 0{,}99$. Sensibilidade $P(+ \\mid D) = 0{,}95$, falso-positivo $P(+ \\mid \\bar D) = 0{,}10$. Marginal $P(+) = (0{,}01)(0{,}95) + (0{,}99)(0{,}10) = 0{,}0095 + 0{,}099 = 0{,}1085$. Posterior $P(D \\mid +) = 0{,}0095 / 0{,}1085 \\approx 0{,}0876 \\approx 0{,}09$. A intuição falha aqui: o falso-positivo em $99\\%$ saudável domina o numerador. Doença rara + teste imperfeito $\\Rightarrow$ posterior baixo apesar do positivo.'
  },
  {
    id: 'ocdv-4',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 4,
    statement:
      'Considere três urnas. A primeira tem 2 bolas vermelhas e 8 azuis. A segunda tem 5 vermelhas e 5 azuis. A terceira tem 8 vermelhas e 2 azuis. Escolho uma urna uniformemente e dela tiro uma bola. A bola é vermelha. Qual a probabilidade de eu ter escolhido a segunda urna?',
    options: ['1/5', '1/3', '1/2', '3/5'],
    correctIndex: 1,
    solution:
      'Prior uniforme: $P(U_i) = 1/3$. Verossimilhanças: $P(R \\mid U_1) = 2/10$, $P(R \\mid U_2) = 5/10$, $P(R \\mid U_3) = 8/10$. Marginal: $P(R) = (1/3)(2 + 5 + 8)/10 = 15/30 = 1/2$. Posterior: $P(U_2 \\mid R) = \\frac{(1/3)(5/10)}{1/2} = \\frac{5/30}{15/30} = 5/15 = 1/3$. (As três urnas se balanceiam — $U_2$ é a mediana e o posterior fica próximo do prior $1/3$.)'
  },
  {
    id: 'ocdv-5',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 5,
    statement:
      'Considere uma urna com uma bola que pode ser verde ou azul, com a mesma probabilidade. Coloco uma bola verde na urna — agora há duas bolas. Tiro uma bola uniformemente, e ela é verde. Qual a probabilidade de a primeira bola ser verde?',
    options: ['1/3', '1/2', '2/3', '3/4'],
    correctIndex: 2,
    solution:
      'Estados antes da tirada: (V,V) com prob $1/2$, (A,V) com prob $1/2$ (a "V" do final é a que adicionei). Verossimilhança de tirar verde: $P(\\text{verde} \\mid VV) = 1$ (ambas verdes), $P(\\text{verde} \\mid AV) = 1/2$ (uma das duas). Marginal: $P(\\text{verde}) = (1/2)(1) + (1/2)(1/2) = 3/4$. Posterior: $P(VV \\mid \\text{verde}) = \\frac{(1/2)(1)}{3/4} = 2/3$. Tirar verde é evidência a favor de (V,V), porque (V,V) garante verde enquanto (A,V) só a metade do tempo.'
  },
  {
    id: 'ocdv-6',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 2,
    statement:
      'Considere uma família com duas crianças. Sabendo que pelo menos uma delas é menina, qual a probabilidade de que ambas sejam meninas?',
    options: ['1/4', '1/3', '1/2', '2/3'],
    correctIndex: 1,
    solution:
      'Espaço amostral original (4 igualmente prováveis): $\\{MM, MF, FM, FF\\}$ onde $M$ = menino, $F$ = menina. Condicionar em "pelo menos uma menina" remove o caso $MM$. Restam 3 casos igualmente prováveis: $\\{MF, FM, FF\\}$. Só $FF$ é "ambas meninas". Logo $P(FF \\mid \\geq 1 F) = 1/3$. (Não confundir com "a primeira é menina, qual a chance da segunda?" — essa é $1/2$.)'
  },
  {
    id: 'ocdv-7',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 3,
    statement:
      'Uma urna tem 4 bolas vermelhas e 6 azuis. Tiro duas bolas sem reposição. A primeira foi vermelha. Qual a probabilidade de a segunda também ser vermelha?',
    options: ['1/3', '4/9', '2/5', '1/2'],
    correctIndex: 0,
    solution:
      'Após tirar uma vermelha, restam $3$ vermelhas em $9$ bolas. $P(V_2 \\mid V_1) = 3/9 = 1/3$. (Sem reposição, a chance da segunda condiciona ao que saiu da primeira.)'
  },
  {
    id: 'ocdv-8',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 4,
    statement:
      'Uma fábrica tem três máquinas: A produz 50% das peças, B produz 30%, C produz 20%. As taxas de defeito são: A=2%, B=4%, C=5%. Uma peça defeituosa é encontrada. Qual a probabilidade aproximada de ela ter sido feita pela máquina B?',
    options: ['0,30', '0,38', '0,42', '0,50'],
    correctIndex: 1,
    solution:
      'Prior: $P(A) = 0{,}50$, $P(B) = 0{,}30$, $P(C) = 0{,}20$. Verossimilhança: $P(D \\mid A) = 0{,}02$, $P(D \\mid B) = 0{,}04$, $P(D \\mid C) = 0{,}05$. Marginal: $P(D) = (0{,}50)(0{,}02) + (0{,}30)(0{,}04) + (0{,}20)(0{,}05) = 0{,}01 + 0{,}012 + 0{,}01 = 0{,}032$. Posterior: $P(B \\mid D) = 0{,}012 / 0{,}032 = 0{,}375 \\approx 0{,}38$.'
  },
  {
    id: 'ocdv-9',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 3,
    statement:
      'Em uma cidade, 60% das pessoas leem o jornal X, 50% leem o jornal Y, e 30% leem ambos. Escolho uma pessoa ao acaso entre os leitores do jornal X. Qual a probabilidade de ela também ler o jornal Y?',
    options: ['0,30', '0,40', '0,50', '0,60'],
    correctIndex: 2,
    solution:
      'Definição de probabilidade condicional: $P(Y \\mid X) = P(X \\cap Y) / P(X) = 0{,}30 / 0{,}60 = 0{,}50$. (Repara que $P(Y) = 0{,}50$ também — então $X$ e $Y$ são independentes neste exemplo, embora não fosse pedido para verificar.)'
  },
  {
    id: 'ocdv-10',
    family: 9,
    conceptName: 'O Caminho de Volta',
    difficulty: 4,
    statement:
      'Tenho três moedas em uma sacola. Uma é honesta (P(cara)=1/2). Outra é viciada (P(cara)=3/4). A terceira sempre dá cara (P(cara)=1). Pego uma ao acaso e jogo. Sai cara. Qual a probabilidade de eu ter pegado a moeda honesta?',
    options: ['1/9', '2/9', '1/4', '1/3'],
    correctIndex: 1,
    solution:
      'Prior: $P(H) = P(V) = P(C) = 1/3$. Verossimilhança: $P(\\text{cara} \\mid H) = 1/2$, $P(\\text{cara} \\mid V) = 3/4$, $P(\\text{cara} \\mid C) = 1$. Marginal: $P(\\text{cara}) = (1/3)(1/2 + 3/4 + 1) = (1/3)(9/4) = 3/4$. Posterior: $P(H \\mid \\text{cara}) = \\frac{(1/3)(1/2)}{3/4} = \\frac{1/6}{3/4} = 4/18 = 2/9$.'
  }
];
