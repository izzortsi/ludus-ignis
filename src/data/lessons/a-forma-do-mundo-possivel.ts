// Lesson — A Forma do Mundo Possível → Family 1 (P0).
// Topic: sample space, events as subsets, finite set algebra.
// Parable text drawn verbatim from lore/contos_do_fogo_anciao.md.

import { Lesson } from '../../core/lessons/lesson-model';

export const aFormaDoMundoPossivel: Lesson = {
  id: 'a-forma-do-mundo-possivel',
  family: 1,
  parable: {
    title: 'Antes da Leitura, o nome',
    paragraphs: [
      'Quando a Mestra leva uma amostra à Cinder, ela faz duas coisas antes de qualquer pergunta de chance.',
      'Primeiro, nomeia o que poderia ser. A amostra poderia estar tocada. Poderia estar limpa. Poderia, se a Cinder estivesse fraca, dar um sinal ambíguo. Esses são os mundos-possíveis daquela noite. Dê-lhes um cesto: nada que ela observe estará fora dele.',
      'Depois, nomeia o que perguntar. A amostra é tocada. Esse é um agrupamento dentro do cesto: alguns mundos-possíveis lhe pertencem, outros não. Esse agrupamento é o evento.',
      'Sem o cesto, a chance não tem onde pousar. Sem o evento, não há sobre o que perguntar. Tudo o mais é arranjo: o avesso de um evento é um evento; a junção de dois eventos é um evento; a coincidência de dois eventos é um evento. Cada operação devolve um agrupamento dentro do mesmo cesto, e nenhuma escapa.',
      'Há uma armadilha. O mesmo experimento pode ser nomeado em muitos cestos, e o cesto certo depende da pergunta. Cestos pequenos demais perdem a pergunta; cestos grandes demais turvam a conta. Escolhe o cesto que cabe à pergunta. Nem maior, nem menor.'
    ],
    directive:
      'Vai agora ao teu Cinder. O que eu disse em palavras, ele vai mostrar em sinais. Volta quando o cesto e o agrupamento couberem firmes na tua mão.'
  },
  cinderIntro: [
    'Ele te falou de cestos e agrupamentos. Aqui pesamos isso em palavras precisas.',
    'O cesto que ele nomeou tem nome antigo: *espaço amostral*. O agrupamento dentro dele tem outro: *evento*. Acompanha.'
  ],
  theory: [
    {
      text: 'O *espaço amostral* — chamado $\\Omega$ pelos antigos — é o conjunto de todos os resultados possíveis de um experimento. Para o lançamento de um osso de seis faces:',
      math: '\\Omega = \\{1, 2, 3, 4, 5, 6\\}'
    },
    {
      text: 'Para dois ossos lançados em ordem, cada resultado é um par $(i, j)$. O cesto é maior:',
      math: '\\Omega = \\{(i, j) : i, j \\in \\{1, \\ldots, 6\\}\\}, \\quad |\\Omega| = 36'
    },
    {
      text: 'Um *evento* é qualquer subconjunto do espaço amostral — um agrupamento de mundos-possíveis. Para "a soma é igual a 5" no lançamento de dois ossos:',
      math: 'E = \\{(1,4), (2,3), (3,2), (4,1)\\}, \\quad |E| = 4'
    },
    {
      text: 'Sobre eventos, quatro operações devolvem novos eventos. O *avesso* (complemento) de E é tudo o que não está em E:',
      math: 'E^c = \\Omega \\setminus E'
    },
    {
      text: 'A *junção* (união) de dois eventos é o agrupamento que contém ao menos um deles. A *coincidência* (interseção) é o que contém ambos. A *diferença* é o que contém o primeiro mas não o segundo:',
      math: 'E \\cup F, \\quad E \\cap F, \\quad E \\setminus F = E \\cap F^c'
    },
    {
      text: 'Cada operação devolve um agrupamento *dentro do mesmo cesto*. Nenhum evento, por mais combinado que seja, escapa de $\\Omega$.'
    },
    {
      text: 'Quando o experimento se repete sem fim — lançar um osso até sair 6 — o cesto pode ser infinito. Mas a regra é a mesma: nomeia o cesto, depois o evento. Os pajés podem perguntar pelo evento "o ritual termina exatamente no n-ésimo lançamento":',
      math: 'E_n = \\{(x_1, \\ldots, x_{n-1}, 6) : x_i \\in \\{1,\\ldots,5\\}\\ \\forall i < n\\}'
    },
    {
      text: 'O *cesto certo* depende da pergunta. Se queres apenas o veredicto da Cinder, três mundos bastam (tocada, limpa, ambígua). Se queres distinguir o riacho de origem, o cesto cresce (três riachos × três veredictos = nove mundos). Cesto pequeno demais perde a pergunta; cesto grande demais cansa o aprendiz e turva a conta.'
    }
  ],
  practiceTarget: 5
};
