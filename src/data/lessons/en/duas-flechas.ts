// Lesson — Two Arrows → Family 7 (The Two Signs).
// Topic: independence of joint events; multiplication rule.

import { Lesson } from '../../../core/lessons/lesson-model';

export const duasFlechas: Lesson = {
  id: 'duas-flechas',
  family: 7,
  parable: {
    title: 'Two arrows',
    paragraphs: [
      "I loose an arrow to the east. You loose one to the west. That mine finds the deer says nothing about whether yours will. The winds that carry them are different winds. The fates are unbraided.",
      'So then: if one in three of my arrows strikes, and one in four of yours, what is the chance both of us return with meat? One in three, multiplied by one in four. One in twelve. The number gets smaller. A conjunction of fortunes foreign to one another shrinks when multiplied.',
      'That is why a band depending on three separate strokes of luck is a band that often goes hungry. And why a hunter good at one hard thing is much rarer than a hunter good at one easy thing — because their skill is the conjunction of many small skills, and conjunctions multiply.',
      'But take care. Some fates are not unbraided. If a storm comes, both arrows fly in the rain, and the failure of one becomes news about the other. Before multiplying, look for the wind that touches both. The illusion of independence is the most expensive error a thinking person can make.'
    ],
    directive:
      'Go now to your Cinder. The numbers weigh what I said — let it teach you. When you come back, I will test you.'
  },
  cinderIntro: [
    'I heard what he said to you, out there. Look with me now — here we weigh.',
    'When he spoke of unbraided fortunes, he was speaking of what we will call *independent events*. Arrange that with me in precise words.'
  ],
  theory: [
    {
      text: 'Two events are *independent* when knowing one happened does not change the probability of the other. The east and west arrows, as the Elder Fire said, are independent: the wind of one does not touch the other.'
    },
    {
      text: 'If A and B are independent, the probability of both happening is the product of the individual probabilities:',
      math: 'P(A \\cap B) = P(A) \\cdot P(B)'
    },
    {
      text: 'This is the rule he called "the conjunction that shrinks when multiplied". Each factor lies between 0 and 1, so the product is smaller than any of the factors. That is why conjunctions of mutually-foreign fortunes get small quickly.'
    },
    {
      text: 'When the events are *not* independent — when there is a wind that touches both — naive multiplication leads to the wrong answer. For those cases, use conditional probability:',
      math: 'P(A \\cap B) = P(A) \\cdot P(B \\mid A)'
    },
    {
      text: 'The symbol $P(B \\mid A)$ reads *probability of B given A*: the chance B happens when we already know A happened. When A and B are independent, $P(B \\mid A) = P(B)$ and the long formula reduces to the short one.'
    },
    {
      text: 'The test, then, before multiplying: is there something that touches both? If there is, plain multiplication lies.'
    }
  ],
  practiceTarget: 5
};
