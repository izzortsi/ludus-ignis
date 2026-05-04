// Lesson — The Oaths of the Flame → Family 3 (P0).
// Topic: Kolmogorov axioms A1, A2, A3 and derived properties.
// Translation of pt/as-juras-da-chama.ts.

import { Lesson } from '../../../core/lessons/lesson-model';

export const asJurasDaChama: Lesson = {
  id: 'as-juras-da-chama',
  family: 3,
  parable: {
    title: 'The Three Oaths of the Ember',
    paragraphs: [
      'There is a promise every honest flame makes. Before the Cinder gives any Reading, it has already sworn three things.',
      'Every chance lies between nothing and everything. No event has negative chance, nor chance greater than certainty. If a count comes out at one and two-tenths, or three-hundredths negative, it has left the weave.',
      'The chance of something happening is one. The whole basket weighs one. Not half, not two — one. Something always happens, because the basket holds every possible-world.',
      'When events do not overlap, their chances add. Divide the world into pieces that do not touch one another, and their chances, summed, give back the whole. And this holds even for infinitely many lined-up pieces.',
      "From these three oaths follow small children, obvious once spoken. The chance of the empty is zero. The chance of the obverse is one minus the chance of the event. If one event contains another, its chance is larger. The chance of the union of two events is the sum of the chances minus the chance of the overlap — for the overlap was counted twice.",
      'But take heed. The third oath has a condition many forget: do not overlap. I saw a hunter promise his band that they had ninety percent chance of eating, by adding the chance of game from the north to the chance of game from the east. But the game roamed in circles, and sometimes came from both directions. The band slept hungry.'
    ],
    directive:
      'Go to your Cinder. Learn the three oaths as one learns a family vow. And learn also what follows from them, without needing to repeat them.'
  },
  cinderIntro: [
    'He told you the three oaths. Here we weigh each one and what follows from them.',
    'The three have an old name: *Kolmogorov\'s axioms*. The names are forgotten, but the oaths still stand. Follow along.'
  ],
  theory: [
    {
      text: '*First oath* (A1): every probability lies between 0 and 1. For any event $A$:',
      math: '0 \\leq P(A) \\leq 1'
    },
    {
      text: '*Second oath* (A2): the probability of the whole basket is 1. Something always happens.',
      math: 'P(\\Omega) = 1'
    },
    {
      text: '*Third oath* (A3): if the events $A_1, A_2, A_3, \\ldots$ are *pairwise disjoint* (do not overlap), their probabilities add:',
      math: 'P\\left(\\bigcup_{i} A_i\\right) = \\sum_{i} P(A_i) \\quad \\text{(when } A_i \\cap A_j = \\emptyset \\text{ for } i \\neq j\\text{)}'
    },
    {
      text: 'From these three oaths follow other truths, with no need to swear them separately. The chance of the empty is zero:',
      math: 'P(\\emptyset) = 0'
    },
    {
      text: 'The chance of the obverse is one minus the chance of the event:',
      math: 'P(A^c) = 1 - P(A)'
    },
    {
      text: 'If $A$ is contained in $B$, then $A$ happening implies $B$ happens — so the chance of $B$ is larger (*monotonicity*):',
      math: 'A \\subseteq B \\implies P(A) \\leq P(B)'
    },
    {
      text: 'For the union of *any* two events — which may overlap — the *inclusion-exclusion* rule holds: add the individual chances and subtract the overlap (which was counted twice).',
      math: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)'
    },
    {
      text: "The hunter's trap was exactly this: he applied the third oath without checking whether the events were disjoint. When A and B can occur together, the simple sum lies — always by excess. Before adding, always ask: can these events touch?"
    }
  ],
  practiceTarget: 5
};
