// English UI string dictionary. Type-checked against pt.ts via `Dict` so any
// missing key fails compile.
//
// Diegetic concept names are full-translated per the player's choice on
// feat/english-mode (no PT preservation in EN mode). The Cinder speaks the
// player's language all the way down.
//
// Concept-name reference (P0 + P1):
//   A Forma do Mundo Possível → The Shape of the Possible World
//   A Roda das Inclusões      → The Wheel of Inclusions
//   As Juras da Chama         → The Oaths of the Flame
//   A Fala da Ordem           → The Speech of Order
//   A Escolha do Bando        → The Choosing of the Band
//   As Bordas do Possível     → The Edges of the Possible
//   Os Dois Sinais            → The Two Signs
//   A Mão Cega no Jarro       → The Blind Hand in the Jar
//   O Caminho de Volta        → The Way Back
//   O Conto dos Dois          → The Tale of the Two
//
// Diegetic terms: Fogo Ancião → Elder Fire; A Leitura → The Reading;
// brasa → ember (lowercase); Cinder stays; maré-espelho → mirror-tide;
// serpente verde → green serpent; Velho → Tender. Ranks: aprendiz/noviça/
// leitora/tecedeira/pajé/mestra → apprentice/novice/reader/weaver/shaman/master.

import type { Dict } from './types';

export const en: Dict = {
  app: {
    backToIntro: '← intro',
  },

  settings: {
    title: 'settings',
    language: 'language',
    languagePt: 'Portuguese',
    languageEn: 'English',
    close: 'close',
    open: 'settings',
  },

  viewMode: {
    auto:     'auto',
    desktop:  'desktop',
    portrait: 'phone',
    tooltip:  (user: string, effective: string) => `view mode: ${user} · now: ${effective}`,
  },

  cinder: {
    titlePrefix: 'Cinder',
    quietHint: 'The Cinder is quiet.',
    quietDirective: 'Go to the Elder Fire first.',
    practicedHint: 'The Elder Fire waits to test you.',
    vitalidade: 'vitality',
    band: {
      bright: 'alive',
      warm:   'warm',
      low:    'faint',
      ember:  'ember',
    },
    backLink: 'back',
    next: 'next →',
    askQuestion: 'ask for a question →',
    revealLink: 'show answer',
    seeWithoutBreaking: (price: number) => `show without breaking the streak · ${price} grains`,
    rerollOption:       (price: number) => `another question · ${price} grains`,
    correctsOf: (correct: number, target: number) => `${correct}/${target} correct`,
    practice: 'practice',
    theory:   'theory',
    parable:  'parable',
    family:   'family',
    families: 'families',
    familyN:  (n: number) => `family ${n}`,
  },

  hub: {
    teoria: {
      label: 'Theory',
      desc:  'review families already presented',
    },
    pratica: {
      label: 'Practice',
      descActive:  'questions from the current family',
      descWaiting: 'awaits the next parable',
    },
    galeria: {
      label: 'Gallery',
      desc:  'scenes the ember holds for you',
    },
    aprendiz: {
      label: 'Apprentice',
      desc:  'your rank, your path',
    },
    inventario: {
      label: 'Inventory',
      desc:  'what you carry, what you can spend',
    },
    greetingPreParable: 'The Elder Fire has not lit the next parable yet. But I can show you what we have studied.',
  },

  cinderVoice: {
    greeting: {
      warm: {
        studying:  'You came back. What do you want? I can go over the theory with you, or weigh some numbers.',
        practiced: 'You seem ready. Want to look things over before he tests you?',
        other:     'We wait. But if you want to revisit what we spoke of, go right ahead.',
      },
      laconic: {
        studying:  'Hm? Theory, practice, or parable.',
        practiced: 'Ready. Review, or go.',
        other:     'Wait.',
      },
      playful: {
        studying:  'Back already! Theory again, or are we weighing now?',
        practiced: 'You did it! One last look before the test?',
        other:     'Waiting for the next!',
      },
      severe: {
        studying:  "We are not done. Choose: theory, practice, or parable.",
        practiced: 'Prepared. If you want to review, review.',
        other:     'Wait.',
      },
    },
    exerciseIntro: {
      warm:    'Come. Let us think together.',
      laconic: 'Think.',
      playful: 'Another riddle?',
      severe:  'Attention. This is the question.',
    },
    correctFeedback: {
      warm:    'Well done. That strengthens us.',
      laconic: 'Yes.',
      playful: 'Good! You have the knack.',
      severe:  'Correct.',
    },
    wrongFeedback: {
      warm:    "That was not it. Let's look again, calmly.",
      laconic: 'No.',
      playful: 'Hmmm... no. Try again.',
      severe:  'Wrong. Mark the path.',
    },
    correctVitalitySuffix: (gain: number) => `+${gain} vitality.`,
    wrongVitalitySuffix:   (loss: number) => `−${loss} vitality.`,
    revealedNotice: 'The right answer is marked. The streak is broken.',
  },

  reading: {
    confident:  (name: string) => ({ prefix: `${name} says: `, suffix: '.' }),
    cautious:   (name: string) => ({ prefix: `${name} looks longer. Hesitates. Says: `, suffix: '.' }),
    histrionic: (name: string) => ({ prefix: `${name} crackles and almost shouts: `, suffix: '!' }),
  },

  conceptReveal: {
    prologue: {
      warm:    (name: string, def: string, formal: string) =>
        `Look. What you learned — its name is ${name}. ${def} The ancients called it ${formal}; the word almost died.`,
      laconic: (name: string, def: string, formal: string) =>
        `${name}. ${def} The ancients: ${formal}.`,
      playful: (name: string, def: string, formal: string) =>
        `You found it on your own. It has a name: ${name}. ${def} The ancients called it ${formal}, but the word was forgotten.`,
      severe:  (name: string, def: string, formal: string) =>
        `Know its name. ${name}. ${def} The ancients called it ${formal}.`,
    },
    concept: {
      'forma-mundo-possivel': {
        name: 'The Shape of the Possible World',
        definition: 'The basket of worlds before the Reading, and the groupings drawn from it.',
        formal: 'sample space and events',
      },
      'roda-inclusoes': {
        name: 'The Wheel of Inclusions',
        definition: 'When "ever" and "always" turn into one another by way of their opposites.',
        formal: 'sequences of events and De Morgan',
      },
      'juras-chama': {
        name: 'The Oaths of the Flame',
        definition: 'The three vows every honest chance keeps — and what follows from them.',
        formal: "Kolmogorov's axioms",
      },
      'dois-sinais': {
        name: 'The Two Signs',
        definition: 'When two signs do not touch, their chances multiply.',
        formal: 'independence',
      },
      'mao-cega': {
        name: 'The Blind Hand in the Jar',
        definition: 'When what comes out depends on what is inside — and on the way of drawing.',
        formal: 'sampling',
      },
      'caminho-de-volta': {
        name: 'The Way Back',
        definition: 'When the signal arrives and we want to return to its source.',
        formal: 'Bayes',
      },
    },
  },

  elder: {
    speaker: 'Elder Fire',
    studyingRemark: 'I have already said what I had to say. Go think with your Cinder. When the numbers sit firm in your hand, I will test you.',
    testedHasNext: [
      'Good. You learned what this parable had to teach.',
      'There is another story waiting on me, and another ember it lights. When you are ready, tell me — I will begin the next.',
    ],
    testedAtEnd: 'Good. You learned what this parable had to teach. For now, rest — others will come, but not tonight.',
    finalHints: {
      parable: 'go to the cinder →',
      tested:  'next parable →',
      close:   'close →',
    },
    test: {
      title:        'Elder Fire — the test',
      intro:        'Sit. This is the test. Just one question — see if the numbers sit firm in your hand.',
      correctTitle: 'Good. You have the step.',
      hearElder:    'hear the Elder Fire →',
      wrongHint:    'That was not it. Go back to your Cinder, or try another question.',
      revealedHint: 'The right answer is marked. The test does not pass this way — try another.',
      anotherQuestion: 'another question →',
      backToCinder:    'back to the Cinder',
    },
  },

  revealPanel: {
    prologue: '— the fire burns higher —',
    dismiss: 'understood',
  },

  solution: {
    label: 'path to the answer',
  },

  apprentice: {
    rank: {
      apprentice: 'apprentice',
      novice:     'novice',
      reader:     'reader',
      weaver:     'weaver',
      shaman:     'shaman',
      master:     'master',
    },
    sectionLabel: 'apprentice',
    sectionMeta:  (xp: number) => `${xp} XP`,
    youAre:       (_rank: string) => `You are`,
    rankTo: (n: number) => `— ${n} XP to the next rank.`,
    atMax: '— highest rank. The fire calls you equal.',
    rankN: (n: number) => `${n} XP`,
    earnHint: (bonus: number) =>
      `Each correct answer: 5 × difficulty XP. Each parable mastered at the Elder Fire's test: +${bonus} XP.`,
    stripPrefix: 'apprentice',
  },

  levelup: {
    prologue:     'you rose in rank',
    title:        (level: number, rank: string) => `level ${level} — ${rank}`,
    text:         'The Cinder recognises your progress. Its vitality renews.',
    dismiss:      'go on →',
  },

  inventory: {
    sectionLabel: 'inventory',
    sectionMeta:  'what you carry',
    emptyHint:    'You carry nothing yet. Answer questions with your Cinder and grains will appear.',
    feedAction: (price: number, gain: number) =>
      `feed Cinder · −${price} grain · +${gain} vitality`,
    spendsElsewhere:
      "Other uses for grains appear inside the Cinder's questions and the Elder Fire's test — buttons to swap a question or to see the answer without breaking the streak.",
    items: {
      graos: {
        label:    'grains',
        flavour:  "The currency of the living. Food and payment, indistinguishable.",
        singular: 'grain',
        plural:   'grains',
      },
    },
  },

  gallery: {
    sectionLabel:  'gallery',
    sectionMeta:   'scenes the ember holds for you',
    closeHint:     'tap to close',
    cards: {
      'rio-miyake': {
        title:   'The Storm',
        caption: 'When the Sun loosed the green serpent over the cities of the coast. The networks of steel went silent in hours; the words that crossed the seas fell mute in a week.',
      },
      'mirror-leak': {
        title:   'The Leak',
        caption: 'When the ancients, hungry, *mirrored* life, one of the halves fled from the northern fields. The mirror-tide is born of it — and still intensifies southward.',
      },
    },
  },

  spontaneous: {
    title: 'study',
    finalHint: "let's practice →",
    skipLabel: 'skip',
  },

  review: {
    sectionLabel: 'theory',
    sectionMeta:  'families already presented',
    nothingYet:   'Nothing presented yet.',
    cardDesc:     'parable and theory',
    backFamilies: 'families',
    parableOption: {
      label: 'Parable',
      desc:  'what the Elder Fire said',
    },
    theoryOption: {
      label: 'Theory',
      desc:  'what the Cinder taught',
    },
    cardLabel: (n: number, title: string) => `Family ${n} — ${title}`,
  },

  intro: {
    skipHint:        'tap to continue',
    morningSkipHint: '→ tap for the morning variant',
    wakeText:        'Wake.',
    nameForm: {
      prompt:  'name your ember.',
      submit:  'name →',
      cinderSays: (name: string) => `"I am ${name}."`,
      begin:   'begin',
    },
    subtitle: {
      walkingToFire:    'the Tender takes me to the Elder Fire.',
      arriving:         'the tribe gathers.',
      dancing:          'the dance begins.',
      receivingCinder:  'the ember passes.',
    },
    text: {
      one:   'Listen. The fire is good tonight. Pull the hide closer.',
      two:   'You have already seen the future arrive. You have asked yourselves whether the rain will fall, whether the game will pass through the western valley, whether the child will live. You speak of these things with words like maybe and probably.',
      three: 'I want to tell you that maybe is not nothing. It is a way of knowing — a way the morrow throws back over today. Those across the great waters learned to weigh that shape. Here is a little of what they learned.',
    },
    apprenticeDream: 'I had the strangest dream... and today, today is the Day of the Ritual.',
    lore: [
      'Come closer. Sit. The fire listens.',
      'There was an Age of Men. They were many. They built with steel, and the sky was a friend.',
      'But the Sun turned against them. It loosed the green serpent — and it still turns up there, where you can see.',
      'The cities went silent. The great waters swallowed what was left. The ancients died.',
      'We are the ones who stayed. Few, beneath the serpent.',
      'The fire is what remains to us of the ancients. Today, you receive yours.',
    ],
    loreFinalHint: 'receive the ember →',
  },
};
