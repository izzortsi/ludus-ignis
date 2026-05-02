// Lesson — A Roda das Inclusões → Family 2 (P0).
// Topic: sequences of events; ⋃, ⋂; De Morgan; monotone limits.
// Parable text drawn verbatim from lore/contos_do_fogo_anciao.md.

import { Lesson } from '../../core/lessons/lesson-model';

export const aRodaDasInclusoes: Lesson = {
  id: 'a-roda-das-inclusoes',
  family: 2,
  parable: {
    title: 'O batedor que conta marés',
    paragraphs: [
      'Mande um batedor à beira do mar. Diga-lhe: olha as marés por trinta dias, e em cada dia anota se a maré está tocada pelo espelho, ou limpa.',
      'Ao fim, ele te traz uma sequência: trinta sinais. Tu queres pesar duas chances, e elas não são a mesma chance.',
      'A primeira: em algum dos trinta dias, a maré esteve tocada. Esta junta os trinta como em fila aberta — basta um sim para que a resposta seja sim. É a união dos trinta eventos.',
      'A segunda: em todos os trinta dias, a maré esteve tocada. Esta junta os trinta como em corda apertada — basta um não para que a resposta seja não. É a interseção.',
      'Os avessos espelham-se. O avesso de "em algum dia" é "em nenhum dia". O avesso de "em todos os dias" é "em ao menos um dia, não". Vira um alguma-vez do avesso, e encontrarás um sempre do avesso.',
      'E quando os dias são infinitos? A roda continua a girar. As mesmas regras valem, contanto que os dias possam ser enfileirados. Mas o infinito traz uma lição própria: sequências longas têm verdades que sequências curtas escondem.'
    ],
    directive:
      'Vai ao teu Cinder. Ele te ensina a roda — como o "alguma vez" e o "sempre" se convertem um no outro pelo avesso. Volta quando souberes virar a roda.'
  },
  cinderIntro: [
    'Ele falou de marés contadas por dias. Aqui isso vira sinais e fórmulas.',
    'Quando os eventos vêm em sequência — V₁, V₂, V₃, … — a união e a interseção ganham nomes próprios. Acompanha.'
  ],
  theory: [
    {
      text: 'Seja $V_i$ o evento "a maré esteve tocada na noite $i$", para $i = 1, 2, 3, \\ldots$ A *união* sobre todos os $i$ é o evento "houve maré tocada em alguma noite":',
      math: '\\bigcup_{i=1}^{\\infty} V_i = \\{\\omega : \\omega \\in V_i \\text{ para algum } i\\}'
    },
    {
      text: 'A *interseção* sobre todos os $i$ é o evento "a maré esteve tocada em todas as noites":',
      math: '\\bigcap_{i=1}^{\\infty} V_i = \\{\\omega : \\omega \\in V_i \\text{ para todo } i\\}'
    },
    {
      text: 'Os avessos espelham-se. A *Lei do Espelho* — chamada *De Morgan* pelos antigos — converte uniões em interseções pelos complementos:',
      math: '\\left(\\bigcup_i A_i\\right)^c = \\bigcap_i A_i^c \\qquad \\left(\\bigcap_i A_i\\right)^c = \\bigcup_i A_i^c'
    },
    {
      text: 'Em palavras: o avesso de "alguma vez" é "nunca"; o avesso de "sempre" é "ao menos uma vez não".'
    },
    {
      text: 'Sequências podem ser *encaixadas*. Se $A_1 \\supseteq A_2 \\supseteq A_3 \\supseteq \\ldots$ (decrescente), a interseção é o limite — o que sobreviveu a todas as restrições. Se $A_1 \\subseteq A_2 \\subseteq A_3 \\subseteq \\ldots$ (crescente), a união é o limite — o que entrou em algum momento.',
      math: 'A_n = [0, 1/n] \\implies \\bigcap_n A_n = \\{0\\}, \\quad \\bigcup_n A_n = [0, 1]'
    },
    {
      text: 'No infinito, a forma do limite pode surpreender. Para a sequência $B_n = (0, 1/n)$, cada $B_n$ é não-vazio, mas a interseção é vazia: nenhum ponto está em todos os $B_n$ ao mesmo tempo.',
      math: 'B_n = (0, 1/n) \\implies \\bigcap_n B_n = \\emptyset'
    },
    {
      text: 'Esta é a lição que sequências curtas escondem. Eventos que parecem persistir podem, no limite, desaparecer; eventos que parecem efêmeros podem, no limite, capturar tudo. A roda continua girando — mas com cuidado.'
    }
  ],
  practiceTarget: 5
};
