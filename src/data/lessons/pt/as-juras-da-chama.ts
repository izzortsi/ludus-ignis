// Lesson — As Juras da Chama → Family 3 (P0).
// Topic: Kolmogorov axioms A1, A2, A3 and derived properties.
// Parable text drawn verbatim from lore/contos_do_fogo_anciao.md.

import { Lesson } from '../../../core/lessons/lesson-model';

export const asJurasDaChama: Lesson = {
  id: 'as-juras-da-chama',
  family: 3,
  parable: {
    title: 'As três juras da brasa',
    paragraphs: [
      'Há uma promessa que toda chama honesta faz. Antes que a Cinder dê qualquer Leitura, ela já jurou três coisas.',
      'Toda chance fica entre nada e tudo. Nenhum evento tem chance negativa, nem chance maior que a da certeza. Se uma conta dá um e dois décimos, ou três centésimos negativos, ela saiu da tessitura.',
      'A chance de algo acontecer é um. O cesto inteiro pesa um. Não meio, não dois — um. Algo sempre acontece, porque o cesto contém todos os mundos-possíveis.',
      'Quando os eventos não se sobrepõem, suas chances somam. Divide o mundo em pedaços que não se tocam, e suas chances, somadas, devolvem o todo. E isto vale mesmo para infinitos pedaços enfileirados.',
      'Destas três juras seguem-se filhos pequenos, óbvios depois de ditos. A chance do vazio é zero. A chance do avesso é um menos a chance do evento. Se um evento contém outro, sua chance é maior. A chance da união de dois eventos é a soma das chances menos a chance da sobreposição — pois a sobreposição foi contada duas vezes.',
      'Mas atenção. A terceira jura tem uma condição que muitos esquecem: não se sobrepõem. Vi um caçador prometer ao seu bando que tinham noventa por cento de chance de comer, somando a chance de a caça vir do norte com a chance de vir do leste. Mas as caças davam voltas, e às vezes vinham de ambas as direções. O bando dormiu com fome.'
    ],
    directive:
      'Vai ao teu Cinder. Aprende as três juras como quem aprende um juramento de família. E aprende também o que delas se segue, sem precisar repeti-las.'
  },
  cinderIntro: [
    'Ele te disse as três juras. Aqui pesamos cada uma e o que delas se segue.',
    'As três têm nome antigo: *axiomas de Kolmogorov*. Nomes esquecidos, mas as juras continuam de pé. Acompanha.'
  ],
  theory: [
    {
      text: '*Primeira jura* (A1): toda probabilidade fica entre 0 e 1. Para qualquer evento $A$:',
      math: '0 \\leq P(A) \\leq 1'
    },
    {
      text: '*Segunda jura* (A2): a probabilidade do cesto inteiro é 1. Algo sempre acontece.',
      math: 'P(\\Omega) = 1'
    },
    {
      text: '*Terceira jura* (A3): se os eventos $A_1, A_2, A_3, \\ldots$ são *disjuntos dois a dois* (não se sobrepõem), suas probabilidades somam:',
      math: 'P\\left(\\bigcup_{i} A_i\\right) = \\sum_{i} P(A_i) \\quad \\text{(quando } A_i \\cap A_j = \\emptyset \\text{ para } i \\neq j\\text{)}'
    },
    {
      text: 'Destas três juras seguem-se outras verdades, sem que precisemos jurá-las separadamente. A chance do vazio é zero:',
      math: 'P(\\emptyset) = 0'
    },
    {
      text: 'A chance do avesso é um menos a chance do evento:',
      math: 'P(A^c) = 1 - P(A)'
    },
    {
      text: 'Se $A$ está contido em $B$, então $A$ acontecer implica $B$ acontecer — logo a chance de $B$ é maior (*monotonicidade*):',
      math: 'A \\subseteq B \\implies P(A) \\leq P(B)'
    },
    {
      text: 'Para a união de dois eventos *quaisquer* — que podem se sobrepor — vale a regra da *inclusão-exclusão*: soma as chances individuais e desconta a sobreposição (que foi contada duas vezes).',
      math: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)'
    },
    {
      text: 'A armadilha do caçador foi exatamente esta: ele aplicou a terceira jura sem checar se os eventos eram disjuntos. Quando A e B podem ocorrer juntos, a soma simples mente — sempre por excesso. Antes de somar, pergunta sempre: estes eventos podem se tocar?'
    }
  ],
  practiceTarget: 5
};
