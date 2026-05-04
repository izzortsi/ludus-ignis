// Canonical UI string dictionary, Brazilian Portuguese. Defines the shape
// `en.ts` (and any future locale) must match.
//
// Conventions:
//   - keys are flat camelCase
//   - leaf values are strings or string-returning functions
//   - parameterised messages take a single object argument: `({ count }) => ...`
//   - diegetic concept names (família names, "A Leitura", "Cinder") are
//     full-translated per locale (the Cinder speaks the player's language)

export const pt = {
  // === modal chrome ======================================================
  app: {
    backToIntro: '← introdução',
  },

  // === settings panel ====================================================
  settings: {
    title: 'configurações',
    language: 'idioma',
    languagePt: 'português',
    languageEn: 'inglês',
    close: 'fechar',
    open: 'configurações',
  },

  // === Cinder modal — chrome + headers ===================================
  cinder: {
    titlePrefix: 'Cinder',
    quietHint: 'O Cinder está quieto.',
    quietDirective: 'Vai primeiro até o Fogo Ancião.',
    practicedHint: 'O Fogo Ancião espera te provar.',
    vitalidade: 'vitalidade',
    band: {
      bright: 'viva',
      warm:   'quente',
      low:    'fraca',
      ember:  'brasa',
    },
    backLink: 'voltar',
    next: 'próxima →',
    askQuestion: 'pedir uma questão →',
    revealLink: 'ver resposta',
    seeWithoutBreaking: (price: number) => `ver sem quebrar a sequência · ${price} grãos`,
    rerollOption: (price: number) => `outra pergunta · ${price} grãos`,
    correctsOf: (correct: number, target: number) => `${correct}/${target} corretas`,
    practice: 'prática',
    theory: 'teoria',
    parable: 'parábola',
    family: 'família',
    families: 'famílias',
    familyN: (n: number) => `família ${n}`,
  },

  // === Cinder hub options =================================================
  hub: {
    teoria: {
      label: 'Teoria',
      desc:  'rever famílias já apresentadas',
    },
    pratica: {
      label: 'Prática',
      descActive:   'questões da família atual',
      descWaiting:  'aguarda a próxima parábola',
    },
    galeria: {
      label: 'Galeria',
      desc:  'cenas guardadas pela brasa',
    },
    aprendiz: {
      label: 'Aprendiz',
      desc:  'teu posto, teu caminho',
    },
    inventario: {
      label: 'Inventário',
      desc:  'o que carregas, o que podes gastar',
    },
    greetingPreParable: 'O Fogo Ancião ainda não acendeu a próxima parábola. Mas posso te mostrar o que já estudámos.',
  },

  // === Cinder voice — personality + stage modulated ======================
  cinderVoice: {
    greeting: {
      warm: {
        studying:  'Voltaste. Que queres? Posso rever a teoria contigo, ou pesar uns números.',
        practiced: 'Estás pronto, parece. Queres rever antes de ele te provar?',
        other:     'Aguardamos. Mas se queres rever o que falamos, fica à vontade.',
      },
      laconic: {
        studying:  'Hm? Teoria, prática, ou parábola.',
        practiced: 'Pronto. Revê, ou vai.',
        other:     'Espera.',
      },
      playful: {
        studying:  'De volta! Teoria de novo, ou já vamos pesar?',
        practiced: 'Conseguiste! Queres dar uma última olhada antes da prova?',
        other:     'Esperando o próximo!',
      },
      severe: {
        studying:  'Ainda não terminamos. Escolhe: teoria, prática, ou parábola.',
        practiced: 'Preparado. Se queres rever, revê.',
        other:     'Aguarda.',
      },
    },
    exerciseIntro: {
      warm:    'Venha. Vamos pensar juntos.',
      laconic: 'Pense.',
      playful: 'Outro enigma?',
      severe:  'Atenção. Esta é a questão.',
    },
    correctFeedback: {
      warm:    'Bem feito. Isso nos fortalece.',
      laconic: 'Sim.',
      playful: 'Boa! Você pegou o jeito.',
      severe:  'Correto.',
    },
    wrongFeedback: {
      warm:    'Não foi assim. Vamos olhar de novo, com calma.',
      laconic: 'Não.',
      playful: 'Hmmm... não. Tente de novo.',
      severe:  'Errado. Decore a senda.',
    },
    correctVitalitySuffix: (gain: number) => `+${gain} vitalidade.`,
    wrongVitalitySuffix:   (loss: number) => `−${loss} vitalidade.`,
    revealedNotice: 'A resposta certa está marcada. A sequência foi quebrada.',
  },

  // === A Leitura verdict frames ==========================================
  reading: {
    confident:  (name: string) => ({ prefix: `${name} diz: `, suffix: '.' }),
    cautious:   (name: string) => ({ prefix: `${name} olha por mais tempo. Hesita. Diz: `, suffix: '.' }),
    histrionic: (name: string) => ({ prefix: `${name} estala e quase grita: `, suffix: '!' }),
  },

  // === Concept reveal panel ==============================================
  conceptReveal: {
    prologue: {
      warm:    (name: string, def: string, formal: string) =>
        `Veja. Isto que você aprendeu — chama-se ${name}. ${def} Os antigos chamavam isso de ${formal}; o nome quase se perdeu.`,
      laconic: (name: string, def: string, formal: string) =>
        `${name}. ${def} Os antigos: ${formal}.`,
      playful: (name: string, def: string, formal: string) =>
        `Você descobriu sozinho. Tem nome: ${name}. ${def} Os antigos chamavam ${formal}, mas o termo se esqueceu.`,
      severe:  (name: string, def: string, formal: string) =>
        `Saiba o nome. ${name}. ${def} Os antigos chamavam ${formal}.`,
    },
    /** Diegetic concept names + their formal (pre-collapse) names. The
     *  Cinder reveals these once the apprentice's per-family streak hits
     *  threshold. `formal` is the "antigos chamavam" word. */
    concept: {
      'forma-mundo-possivel': {
        name: 'A Forma do Mundo Possível',
        definition: 'O cesto de mundos antes da Leitura, e os agrupamentos que dele se tiram.',
        formal: 'espaço amostral e eventos',
      },
      'roda-inclusoes': {
        name: 'A Roda das Inclusões',
        definition: 'Quando o "alguma vez" e o "sempre" se convertem um no outro pelo avesso.',
        formal: 'sequências de eventos e De Morgan',
      },
      'juras-chama': {
        name: 'As Juras da Chama',
        definition: 'As três promessas que toda chance honesta cumpre — e o resto que delas decorre.',
        formal: 'axiomas de Kolmogorov',
      },
      'dois-sinais': {
        name: 'Os Dois Sinais',
        definition: 'Quando dois sinais não se tocam, suas chances multiplicam.',
        formal: 'independência',
      },
      'mao-cega': {
        name: 'A Mão Cega no Jarro',
        definition: 'Quando o que sai depende do que está dentro — e do jeito de tirar.',
        formal: 'amostragem',
      },
      'caminho-de-volta': {
        name: 'O Caminho de Volta',
        definition: 'Quando o sinal chega e queremos voltar à fonte.',
        formal: 'Bayes',
      },
    },
  },

  // === Elder Fire dialog =================================================
  elder: {
    speaker: 'Fogo Ancião',
    studyingRemark: 'Já te disse o que tinha a dizer. Vai pensar com o teu Cinder. Quando os números pesarem firme na tua mão, eu te provo.',
    testedHasNext: [
      'Bem. Aprendeste o que esta parábola tinha a ensinar.',
      'Há outra história à minha espera, e outra brasa que ela acende. Quando estiveres pronto, conta-me — começo a próxima.',
    ],
    testedAtEnd: 'Bem. Aprendeste o que esta parábola tinha a ensinar. Por ora, descansa — outras virão, mas não esta noite.',
    finalHints: {
      parable:    'ir até o cinder →',
      tested:     'próxima parábola →',
      close:      'fechar →',
    },
    test: {
      title:        'Fogo Ancião — a prova',
      intro:        'Senta. Esta é a prova. Uma só pergunta — vê se os números pesam firme na tua mão.',
      correctTitle: 'Bem. Já tens o passo.',
      hearElder:    'ouvir o Fogo Ancião →',
      wrongHint:    'Não foi assim. Volta ao teu Cinder ou tenta outra pergunta.',
      revealedHint: 'A resposta certa está marcada. A prova não passa assim — tenta outra.',
      anotherQuestion: 'outra pergunta →',
      backToCinder:    'voltar ao Cinder',
    },
  },

  // === Reveal panel (concept name disclosed) ============================
  revealPanel: {
    prologue: '— o fogo arde mais alto —',
    dismiss: 'entendi',
  },

  // === Solution panel ===================================================
  solution: {
    label: 'caminho da resposta',
  },

  // === Apprentice (XP + level) ==========================================
  apprentice: {
    rank: {
      apprentice: 'aprendiz',
      novice:     'noviça',
      reader:     'leitora',
      weaver:     'tecedeira',
      shaman:     'pajé',
      master:     'mestra',
    },
    sectionLabel: 'aprendiz',
    sectionMeta:  (xp: number) => `${xp} XP`,
    youAre:       (_rank: string) => `Estás como`,
    rankTo: (n: number) => `— faltam ${n} XP para o próximo posto.`,
    atMax: '— posto mais alto. O fogo te chama de igual.',
    rankN: (n: number) => `${n} XP`,
    earnHint: (bonus: number) =>
      `Cada resposta certa: 5 × dificuldade XP. Cada parábola dominada na prova do Fogo Ancião: +${bonus} XP.`,
    stripPrefix: 'aprendiz',
  },

  // === Level-up panel ===================================================
  levelup: {
    prologue:     'subiste de posto',
    title:        (level: number, rank: string) => `nível ${level} — ${rank}`,
    text:         'O Cinder reconhece o teu progresso. A vitalidade dele se renova.',
    dismiss:      'seguir →',
  },

  // === Inventory ========================================================
  inventory: {
    sectionLabel: 'inventário',
    sectionMeta:  'o que carregas',
    emptyHint:    'Não carregas nada ainda. Acerta perguntas com o teu Cinder e vão aparecer grãos.',
    feedAction: (price: number, gain: number) =>
      `alimentar Cinder · −${price} grão · +${gain} vitalidade`,
    spendsElsewhere:
      'Outras saídas para grãos aparecem nas perguntas do Cinder e na prova do Fogo Ancião — botões para trocar de pergunta ou ver a resposta sem quebrar a sequência.',
    items: {
      graos: {
        label:    'grãos',
        flavour:  'A moeda dos vivos. Comida e pagamento, indistinguíveis.',
        singular: 'grão',
        plural:   'grãos',
      },
    },
  },

  // === Gallery ==========================================================
  gallery: {
    sectionLabel:  'galeria',
    sectionMeta:   'cenas guardadas pela brasa',
    closeHint:     'toque para fechar',
    cards: {
      'rio-miyake': {
        title:   'A Tempestade',
        caption: 'Quando o Sol soltou a serpente verde sobre as cidades do litoral. As redes de aço silenciaram em horas; as palavras que cruzavam os mares emudeceram em uma semana.',
      },
      'mirror-leak': {
        title:   'O Vazamento',
        caption: 'Quando os antigos, famintos, *espelharam* a vida, uma das metades fugiu dos campos do norte. Dela nasce a maré-espelho — e ainda intensifica para o sul.',
      },
    },
  },

  // === Cinder spontaneous walk-through (first visit per lesson) ===========
  spontaneous: {
    title: 'estudo',
    finalHint: 'vamos praticar →',
    skipLabel: 'pular',
  },

  // === Review tree (Teoria → families → parable/theory) ================
  review: {
    sectionLabel: 'teoria',
    sectionMeta:  'famílias já apresentadas',
    nothingYet:   'Nada apresentado ainda.',
    cardDesc:     'parábola e teoria',
    backFamilies: 'famílias',
    parableOption: {
      label: 'Parábola',
      desc:  'o que o Fogo Ancião disse',
    },
    theoryOption: {
      label: 'Teoria',
      desc:  'o que o Cinder ensinou',
    },
    /** Used in family-card label "Família N — {parable.title}" */
    cardLabel: (n: number, title: string) => `Família ${n} — ${title}`,
  },

  // === Intro scene ======================================================
  intro: {
    skipHint:        'toque para continuar',
    morningSkipHint: '→ toque para variante de manhã',
    wakeText:        'Acorda.',
    nameForm: {
      prompt:  'dá um nome à tua brasa.',
      submit:  'nomear →',
      cinderSays: (name: string) => `"eu sou ${name}."`,
      begin:   'começar',
    },
    subtitle: {
      walkingToFire:    'o Velho me leva ao Fogo Ancião.',
      arriving:         'a tribo se reúne.',
      dancing:          'a dança começa.',
      receivingCinder:  'a brasa passa.',
    },
    text: {
      // Tender's framing monologue
      one:   'Escutem. O fogo está bom esta noite. Puxem a pele para perto.',
      two:   'Vocês já viram o futuro chegar. Já se perguntaram se a chuva cairá, se a caça passará pelo vale do oeste, se a criança viverá. Falam dessas coisas com palavras como talvez e provavelmente.',
      three: 'Quero dizer a vocês que o talvez não é nada. É uma forma de saber — uma forma que o amanhã lança de volta sobre o hoje. Aqueles do outro lado das águas grandes aprenderam a pesar essa forma. Aqui está um pouco do que aprenderam.',
    },
    apprenticeDream: 'Tive o sonho mais estranho... e hoje, hoje é o Dia do Ritual.',
    lore: [
      'Aproxima-te. Senta. O fogo escuta.',
      'Houve uma Era dos Homens. Eram muitos. Construíam com aço, e o céu era amigo.',
      'Mas o Sol se voltou contra eles. Soltou a serpente verde — e ela ainda gira lá em cima, onde podes ver.',
      'As cidades silenciaram. As águas grandes engoliram o que sobrou. Os antigos morreram.',
      'Nós somos os que ficaram. Poucos, sob a serpente.',
      'O fogo é o que nos resta dos antigos. Hoje, recebes o teu.',
    ],
    loreFinalHint: 'receber a brasa →',
  },
};
