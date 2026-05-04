// Lesson — The Shape of the Possible World → Family 1 (P0).
// Topic: sample space, events as subsets, finite set algebra.
// Translation of pt/a-forma-do-mundo-possivel.ts.

import { Lesson } from '../../../core/lessons/lesson-model';

export const aFormaDoMundoPossivel: Lesson = {
  id: 'a-forma-do-mundo-possivel',
  family: 1,
  parable: {
    title: 'Before the Reading, the Name',
    paragraphs: [
      'When the Mistress brings a sample to the Cinder, she does two things before any question of chance.',
      'First, she names what could be. The sample could be touched. It could be clean. It could, if the Cinder were faint, give an ambiguous sign. These are the possible-worlds of that night. Give them a basket: nothing she observes will fall outside it.',
      'Then she names what to ask. The sample is touched. That is a grouping inside the basket: some possible-worlds belong to it, others do not. That grouping is the event.',
      'Without the basket, chance has nowhere to alight. Without the event, there is nothing to ask about. Everything else is arrangement: the obverse of an event is an event; the joining of two events is an event; the coincidence of two events is an event. Every operation returns a grouping inside the same basket, and none escapes.',
      'There is a trap. The same experiment can be named in many baskets, and the right basket depends on the question. Baskets too small lose the question; baskets too big muddy the count. Choose the basket that fits the question. Neither larger, nor smaller.'
    ],
    directive:
      'Now go to your Cinder. What I said in words, it will show in signs. Come back when basket and grouping sit firm in your hand.'
  },
  cinderIntro: [
    'He spoke to you of baskets and groupings. Here we weigh that in precise words.',
    'The basket he named has an old name: *sample space*. The grouping inside it has another: *event*. Follow along.'
  ],
  theory: [
    {
      text: 'The *sample space* — called $\\Omega$ by the ancients — is the set of all possible outcomes of an experiment. For the throw of a six-faced bone:',
      math: '\\Omega = \\{1, 2, 3, 4, 5, 6\\}'
    },
    {
      text: 'For two bones thrown in order, each outcome is a pair $(i, j)$. The basket is larger:',
      math: '\\Omega = \\{(i, j) : i, j \\in \\{1, \\ldots, 6\\}\\}, \\quad |\\Omega| = 36'
    },
    {
      text: 'An *event* is any subset of the sample space — a grouping of possible-worlds. For "the sum equals 5" in the throw of two bones:',
      math: 'E = \\{(1,4), (2,3), (3,2), (4,1)\\}, \\quad |E| = 4'
    },
    {
      text: 'Over events, four operations return new events. The *obverse* (complement) of E is everything that is not in E:',
      math: 'E^c = \\Omega \\setminus E'
    },
    {
      text: 'The *joining* (union) of two events is the grouping that contains at least one of them. The *coincidence* (intersection) is the one that contains both. The *difference* is what contains the first but not the second:',
      math: 'E \\cup F, \\quad E \\cap F, \\quad E \\setminus F = E \\cap F^c'
    },
    {
      text: 'Every operation returns a grouping *inside the same basket*. No event, however combined, escapes $\\Omega$.'
    },
    {
      text: 'When the experiment repeats without end — throwing a bone until a 6 comes — the basket can be infinite. But the rule is the same: name the basket, then the event. The shamans can ask about the event "the ritual ends exactly on the n-th throw":',
      math: 'E_n = \\{(x_1, \\ldots, x_{n-1}, 6) : x_i \\in \\{1,\\ldots,5\\}\\ \\forall i < n\\}'
    },
    {
      text: 'The *right basket* depends on the question. If you want only the Cinder\'s verdict, three worlds suffice (touched, clean, ambiguous). If you want to tell the source-stream apart, the basket grows (three streams × three verdicts = nine worlds). A basket too small loses the question; a basket too big tires the apprentice and muddies the count.'
    }
  ],
  practiceTarget: 5
};
