// Lesson 1 — Duas Flechas → Family 4 (Os Dois Sinais).
// Topic: independence of joint events; multiplication rule.

import { Lesson } from '../../core/lessons/lesson-model';

export const duasFlechas: Lesson = {
  id: 'duas-flechas',
  family: 4,
  parable: {
    title: 'Duas flechas',
    paragraphs: [
      'Solto uma flecha para o leste. Tu soltas uma para o oeste. Que a minha encontre o veado não diz nada sobre se a tua encontrará. Os ventos que as carregam são ventos diferentes. Os destinos estão desentrelaçados.',
      'Pois bem: se uma em três das minhas flechas atinge, e uma em quatro das tuas, qual é a chance de ambos voltarmos com carne? Uma em três, multiplicada por uma em quatro. Uma em doze. O número fica menor. Uma conjunção de fortunas alheias entre si encolhe ao multiplicar.',
      'Por isso um bando que depende de três golpes de sorte separados é um bando que muitas vezes passa fome. E por isso um caçador bom em uma coisa difícil é muito mais raro do que um caçador bom em uma coisa fácil — porque a sua habilidade é a conjunção de muitas habilidades pequenas, e conjunções multiplicam.',
      'Mas cuidado. Alguns destinos não estão desentrelaçados. Se vem tempestade, ambas as flechas voam na chuva, e a falha de uma vira notícia sobre a outra. Antes de multiplicar, procura o vento que toca os dois. A ilusão da independência é o erro mais caro que uma pessoa pensante pode cometer.'
    ],
    directive:
      'Vai agora ao teu Cinder. Os números pesam o que eu disse — deixa que ele te ensine. Quando voltares, te provo.'
  },
  theory: [
    {
      type: 'paragraph',
      content:
        'Dois eventos são *independentes* quando saber que um aconteceu não muda a probabilidade do outro. As flechas do leste e do oeste, ditas pelo Fogo Ancião, são independentes: o vento de uma não toca a outra.'
    },
    {
      type: 'paragraph',
      content:
        'Se A e B são independentes, a probabilidade de ambos acontecerem é o produto das probabilidades individuais:'
    },
    {
      type: 'math',
      content: 'P(A \\cap B) = P(A) \\cdot P(B)'
    },
    {
      type: 'paragraph',
      content:
        'É a regra que o Fogo Ancião chamou de "conjunção que encolhe ao multiplicar". Cada fator é um número entre 0 e 1, então o produto é menor do que qualquer um dos fatores. Por isso conjunções de fortunas alheias entre si ficam pequenas depressa.'
    },
    {
      type: 'paragraph',
      content:
        'Quando os eventos *não* são independentes — quando há um vento que toca os dois — multiplicar ingenuamente leva à resposta errada. Para esses casos, usa-se a probabilidade condicional:'
    },
    {
      type: 'math',
      content: 'P(A \\cap B) = P(A) \\cdot P(B \\mid A)'
    },
    {
      type: 'paragraph',
      content:
        'O símbolo $P(B \\mid A)$ lê-se *probabilidade de B dado A*: a chance de B acontecer quando já se sabe que A aconteceu. Quando A e B são independentes, $P(B \\mid A) = P(B)$ e voltamos à fórmula simples.'
    },
    {
      type: 'paragraph',
      content:
        'O teste, então, antes de multiplicar: existe algo que toca os dois? Se existe, a multiplicação simples mente.'
    }
  ],
  practiceTarget: 3
};
