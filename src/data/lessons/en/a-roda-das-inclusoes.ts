// Lesson — The Wheel of Inclusions → Family 2 (P0).
// Topic: sequences of events; ⋃, ⋂; De Morgan; monotone limits.
// Translation of pt/a-roda-das-inclusoes.ts.

import { Lesson } from '../../../core/lessons/lesson-model';

export const aRodaDasInclusoes: Lesson = {
  id: 'a-roda-das-inclusoes',
  family: 2,
  parable: {
    title: 'The Scout Who Counts Tides',
    paragraphs: [
      'Send a scout to the seashore. Tell him: watch the tides for thirty days, and on each day note whether the tide is touched by the mirror, or clean.',
      'At the end, he brings you back a sequence: thirty signs. You want to weigh two chances, and they are not the same chance.',
      'The first: on some one of the thirty days, the tide was touched. This binds the thirty as in an open line — one yes is enough for the answer to be yes. It is the union of the thirty events.',
      'The second: on every one of the thirty days, the tide was touched. This binds the thirty as in a tight rope — one no is enough for the answer to be no. It is the intersection.',
      'The obverses mirror each other. The obverse of "on some day" is "on no day". The obverse of "on every day" is "on at least one day, not". Turn an ever inside-out, and you will find a never-not. Turn a never inside-out, and you will find an ever-not.',
      'And when the days are infinite? The wheel keeps turning. The same rules hold, so long as the days can be lined up. But infinity carries a lesson of its own: long sequences hold truths that short ones hide.'
    ],
    directive:
      'Go to your Cinder. He teaches you the wheel — how "ever" and "always" turn into one another by way of their obverses. Come back when you can turn the wheel.'
  },
  cinderIntro: [
    'He spoke of tides counted day by day. Here that becomes signs and formulas.',
    'When events come in sequence — V₁, V₂, V₃, … — union and intersection get proper names. Follow along.'
  ],
  theory: [
    {
      text: 'Let $V_i$ be the event "the tide was touched on night $i$", for $i = 1, 2, 3, \\ldots$ The *union* over all $i$ is the event "there was a touched tide on some night":',
      math: '\\bigcup_{i=1}^{\\infty} V_i = \\{\\omega : \\omega \\in V_i \\text{ for some } i\\}'
    },
    {
      text: 'The *intersection* over all $i$ is the event "the tide was touched on every night":',
      math: '\\bigcap_{i=1}^{\\infty} V_i = \\{\\omega : \\omega \\in V_i \\text{ for every } i\\}'
    },
    {
      text: 'The obverses mirror each other. The *Mirror Law* — called *De Morgan* by the ancients — turns unions into intersections through complements:',
      math: '\\left(\\bigcup_i A_i\\right)^c = \\bigcap_i A_i^c \\qquad \\left(\\bigcap_i A_i\\right)^c = \\bigcup_i A_i^c'
    },
    {
      text: 'In words: the obverse of "ever" is "never"; the obverse of "always" is "at least once, not".'
    },
    {
      text: 'Sequences can be *nested*. If $A_1 \\supseteq A_2 \\supseteq A_3 \\supseteq \\ldots$ (decreasing), the intersection is the limit — what survived every restriction. If $A_1 \\subseteq A_2 \\subseteq A_3 \\subseteq \\ldots$ (increasing), the union is the limit — what entered at some moment.',
      math: 'A_n = [0, 1/n] \\implies \\bigcap_n A_n = \\{0\\}, \\quad \\bigcup_n A_n = [0, 1]'
    },
    {
      text: 'In the infinite, the shape of the limit can surprise you. For the sequence $B_n = (0, 1/n)$, each $B_n$ is non-empty, but the intersection is empty: no point is in every $B_n$ at once.',
      math: 'B_n = (0, 1/n) \\implies \\bigcap_n B_n = \\emptyset'
    },
    {
      text: 'This is the lesson short sequences hide. Events that seem to persist can, in the limit, vanish; events that seem fleeting can, in the limit, capture everything. The wheel keeps turning — but with care.'
    }
  ],
  practiceTarget: 5
};
