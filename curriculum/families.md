# Phase 1 families — patterns and source-problem index

Ten locked families for the alpha curriculum: a P0 (foundations) tier of three families, plus a P1 (combinatorics & elementary probability) tier of seven. For each family, this file lists:
- the canonical sub-patterns (the actual structural forms the family takes in problems),
- which source problems instantiate which pattern,
- in-game wrapping templates for re-authoring.

`pattern` strings here are the same strings used in `problems.json` — keep them in sync.

Numbering follows bible iteration 6 (timeline.md §14): families 1–3 are the P0 tier prepended in iteration 6; the original families 1–7 of iteration 5 are now families 4–10. Family 6 (As Bordas do Possível) is reinstated in iteration 6 under the permissive criterion (canonical concept + written parable; source material may follow).

---

## Family 1 — *A Forma do Mundo Possível* (P0)

**Concept**: sample space construction; events as subsets of Ω; finite set algebra (∪, ∩, ᶜ, \\); verbal-to-set translation; cardinality of event spaces. The first move of any probability question: name the basket, name the grouping.

### Patterns

| `pattern` | What it asks |
|---|---|
| `sample-space-finite` | Enumerate Ω for a small experiment (two dice, two coins, k-sided die). |
| `sample-space-product` | Build Ω as a Cartesian product (n components, each in {0,1}; sequences of length k). |
| `sample-space-infinite` | Describe Ω when the experiment is "repeat until X" (countably infinite or with infinite-trajectory branch). |
| `events-as-subsets` | Given verbal descriptions of events E, F, G, write them as subsets of Ω. |
| `set-algebra-on-events` | Compute E ∩ F, E ∪ F, E ∖ F, E ∩ Fᶜ, E ∩ F ∩ G as explicit subsets. |

### Source problems
- L1.1 — *dado rolado até sair 6, descrever Ω, Eₙ, (∪Eₙ)ᶜ* → `sample-space-infinite` + `events-as-subsets`
- L1.2 — *dois dados, E∩F, E∪F, F∩G* → `sample-space-finite` + `set-algebra-on-events`
- L1.3 — *A, B, C alternam jogando moeda até cara* → `sample-space-infinite`
- L1.4 — *sistema de 5 componentes, vetor (x₁,…,x₅)* → `sample-space-product`
- Aula 1 ex.1–5 (six worked sample-space examples: gender, race ordering, two coins, two dice, transistor lifetime) → `sample-space-finite` + `sample-space-product`

### Wrapping templates
- *Naming Ω before A Leitura*: the apprentice articulates the sample space of "what could the Cinder say tonight" before the Reading itself. Three-world Ω (tocada/limpa/ambígua) vs nine-world Ω (also conditioned on origin riacho).
- *Two divination bones*: 36-element Ω for a pair of bone-tokens; events "soma é ímpar", "ao menos um mostra a marca-de-sol", "soma igual a cinco".
- *Roll-until-stop ritual*: the pajés cast a six-faced bone until the "sinal-do-fim" appears; describe Ω, the event Eₙ that the ritual ends after exactly n casts, and the meaning of (⋃ₙ Eₙ)ᶜ.

---

## Family 2 — *A Roda das Inclusões* (P0)

**Concept**: finite and countable ⋃, ⋂; De Morgan; monotone limits over indexed event sequences; the "alguma vez" / "sempre" duality.

### Patterns

| `pattern` | What it asks |
|---|---|
| `union-intersection-of-sequence` | Compute ⋃ₙ Aₙ and ⋂ₙ Aₙ for a concrete sequence of sets (typically intervals on the real line). |
| `event-expression-from-prose` | Express verbal events ("ocorre em alguma noite", "sempre ocorre", "ocorre em alguma noite, mas não em todas") in terms of ⋃, ⋂, complement on indexed events Vᵢ. |
| `de-morgan-dual` | Apply De Morgan to convert between "alguma vez" and "sempre" forms. |
| `monotone-sequence-limit` | Recognize nested-increasing or nested-decreasing sequences and read off ⋃/⋂ as limits. |

### Source problems
- Aula 1 p. 6 (concrete sequences Aₙ=[0,1/n], Bₙ=(0,1/n), Cₙ=[n,n+1], Dₙ=(0,n)) → `union-intersection-of-sequence` + `monotone-sequence-limit`
- L1.1 (the (⋃Eₙ)ᶜ subitem) → cross-instance with Family 1: `de-morgan-dual` on the "ritual nunca termina" event.

### Wrapping templates
- *Maré-spelho observation log over n days*: indexed events Vᵢ = "maré tocada no dia i"; compute "tocou em algum dia", "tocou em todos os dias", "tocou em algum dia mas não em todos".
- *Intensity bands of mirror-tide measurements*: real-line interval sequences (Aulas-1-page-6 form) framed as bands of measured intensity at the litoral norte; the apprentice computes ⋃ and ⋂ to find the union of "ever within band" and the intersection of "always within band".
- *Vento-norte over the migration*: indexed events across the multi-week journey; De Morgan converts the Mestra's "houve alguma noite sem vento?" into the apprentice's accounting language.

---

## Family 3 — *As Juras da Chama* (P0)

**Concept**: Kolmogorov axioms A1 (P ≥ 0), A2 (P(Ω) = 1), A3 (countable additivity for disjoint events) and the derived properties P(∅) = 0, finite additivity, P(Eᶜ) = 1 − P(E), monotonicity, and inclusion-exclusion P(A∪B) = P(A) + P(B) − P(A∩B). The covenant every honest reckoning obeys.

### Patterns

| `pattern` | What it computes |
|---|---|
| `disjoint-additivity` | P(A∪B) when A∩B = ∅, plus the four-cell partition derived from disjointness. |
| `inclusion-exclusion-two` | P(A∪B), P(A∩B), and the four cells {A∩B, A∩Bᶜ, Aᶜ∩B, Aᶜ∩Bᶜ} from any subset of {P(A), P(B), P(A∪B), P(A∩B)}. |
| `complement-and-monotonicity` | Use P(Eᶜ) = 1 − P(E) and A ⊆ B ⇒ P(A) ≤ P(B). |
| `axiom-consistency-check` | Given proposed P-values, verify whether the assignment is a valid probability (non-negative, sums to 1 over disjoint partition, no internal contradictions). |
| `multi-event-inclusion-exclusion` | Generalize to three or more events: P(A∪B∪C) = ΣP(Aᵢ) − ΣP(Aᵢ∩Aⱼ) + P(A∩B∩C). |

### Source problems
- Aula 1 pp. 6–7 (Kolmogorov A1, A2, A3 and derived P1–P5) → defines the family verbatim
- L1.5 — *A, B disjuntos com P(A) = 0.3, P(B) = 0.5; computar P(A∪B), P(A∖B), P(A∩B)* → `disjoint-additivity`
- L1.7 — *3 jornais, sobreposição de leitores* → `multi-event-inclusion-exclusion` (the three-newspaper inclusion-exclusion)
- L1.13 — *probabilidades de eventos compostos* → `inclusion-exclusion-two`

### Wrapping templates
- *Disjoint omens*: P(aurora visível esta noite) and P(vento-norte cortante) are recorded as disjoint by the Arquivistas; compute the four-cell partition.
- *Touched-water marginals*: prior P(amostra tocada), P(coletada à noite), P(tocada ∪ noite); recover P(tocada ∩ noite) and the other three cells via inclusion-exclusion.
- *Three-readership lineage poll*: which fraction of the tribe reads each of three pre-collapse texts (or, in-world: tracks each of three signal types); use inclusion-exclusion across the three sets.

---

## Family 4 — *A Fala da Ordem*

**Concept**: counting arrangements under order/adjacency/equivalence constraints.

### Patterns

| `pattern` | What it counts |
|---|---|
| `permutations-distinct` | n! arrangements of n distinct items. |
| `permutations-with-repetition` | n!/(k₁! k₂! …) when some items are interchangeable. |
| `arrangements-with-adjacency` | Permutations where particular items must / must not sit together. |
| `arrangements-with-position` | Permutations conditioned on a specific item being at a specific slot ("probabilidade da i-ésima posição ser uma garota"). |
| `circular-arrangements` | Round-table style: (n-1)! after rotation symmetry. |

### Source problems
- L1.17 — *m meninos, n garotas em fila, P(i-ésima posição é garota)* → `arrangements-with-position`
- L1.24 — *5 pessoas A,B,C,D,E em fila, P(exatamente k entre A e B)* → `arrangements-with-adjacency`
- L1.27 — *4 casais em linha, nenhum marido ao lado da esposa* → `arrangements-with-adjacency`
- L1.28 — *5 selecionados de 10 casais, nenhum par* → `arrangements-with-adjacency`
- Aula2 ex.6 (full house) — partial; the full-house counting uses `permutations-with-repetition` / `arrangements-with-position`.

### Wrapping templates
- *Marching order through a defile*: 12 walkers, the Mestra cannot walk near the Hearth, the youngest cannot lead. Variants: pure `permutations-distinct`, then with adjacency rules.
- *Glyph sequences on a recovered artifact*: counting valid sequences on a pre-collapse plaque under transcription rules.
- *Ritual procession ordering*: Hearth-Bearers + Tender + Apprentice + dancers; some pairs must be adjacent (Tender & Apprentice), others must not (rival lineages).

---

## Family 5 — *A Escolha do Bando*

**Concept**: team / committee selection where order doesn't matter, with skill / overlap / exclusion constraints.

### Patterns

| `pattern` | What it counts |
|---|---|
| `combinations-basic` | C(n, k) selections from a single pool. |
| `combinations-stratified` | C(n₁, k₁) · C(n₂, k₂) — quotas across multiple pools (e.g. "3 men + 2 women"). |
| `combinations-with-required` | At least one of X must be present; complement-counting works well here. |
| `combinations-with-forbidden` | Pair X-Y must not both appear. |
| `urn-pile-distribution` | Multinomial distribution of items across labeled piles ("bridge: 13 cards each to 4 players"). |

### Source problems
- L1.6 — *3 cursos de línguas, distribuir 100 alunos* → `combinations-basic` + inclusion-exclusion (concept tag)
- L1.8 — *poker hands: flush, par, dois pares, trinca, quadra* → `combinations-basic` + `permutations-with-repetition`
- L1.18 — *2 cartas de 52: ambos ases / mesmo valor* → `combinations-basic`
- L1.19 — *5 problemas de 10, estudante sabe 7* → `combinations-stratified`
- L1.21 — *4 técnicos, 4 aparelhos, exatamente 2 técnicos chamados* → `combinations-stratified` + complement
- L1.26 — *6 homens + 6 mulheres em 2 grupos de 6* → `combinations-stratified`
- L1.29 — *bridge: cada jogador recebe um ás* → `urn-pile-distribution`
- Aula2 ex.4 (committee 3 homens + 2 mulheres) → `combinations-stratified`

### Wrapping templates
- *Choosing a scout band*: 4 batedores from 12, with required at least one wind-reader and at least one bird-reader, no wounded.
- *Distributing grain bins among lineages*: multinomial over family groups.
- *Hearth-Bearer rotation selection*: who carries which side of the Hearth this season; constraints on lineage and skill.

---

## Family 6 — *As Bordas do Possível* (REINSTATED, iteration 6)

**Concept**: Fréchet-style intersection / union bounds. Given marginals P(A) and P(B) with the joint unknown, derive the range [max(0, P(A) + P(B) − 1), min(P(A), P(B))] for P(A ∩ B). Decision-making under partial information.

### Patterns

| `pattern` | What it computes |
|---|---|
| `frechet-intersection-bounds` | Lower and upper bounds on P(A ∩ B) from marginals only. |
| `frechet-union-bounds` | Lower and upper bounds on P(A ∪ B) from marginals only. |
| `bounds-multi-event` | Generalization to three or more marginals (Bonferroni-type). |
| `decision-under-bound` | Given a decision threshold, decide whether the lower bound suffices to act. |

### Source problems
- (none in current corpus — reinstated in iteration 6 under permissive criterion; source material may follow in future PDFs)

### Wrapping templates
- *Two omens with unknown joint*: P(chuva amanhã) = 0.4, P(maré-espelho subirá) = 0.7, but the Arquivistas never crossed the registers; bound the joint and decide whether to prepare the abrigo.
- *Tribal vote bounds*: fraction in favor of route A and fraction in favor of route B are known separately; bound the fraction supporting both.
- *Joint Reading bounds*: two Cinders give independent positives; without their joint calibration, bound the probability both are correct.

---

## Family 7 — *Os Dois Sinais*

**Concept**: independence of joint events. Test by frequency, not by reasoning about origins.

### Patterns

| `pattern` | What it tests |
|---|---|
| `independence-test` | Given P(A), P(B), P(A∩B), decide if A ⊥ B. |
| `independence-construct` | Given partial info, find the value that makes A ⊥ B (or A ⊥ Bᶜ, etc.). |
| `mutual-vs-pairwise` | Three or more events: pairwise independence ≠ mutual independence. |
| `bernoulli-trials` | Independent repetitions of a single-success-prob trial; count successes / first success / etc. |
| `parallel-system` | System works iff at least one component works; component independence assumed. |

### Source problems
- Aula4 ex.1 (two coins, A = "1ª cara", B = "2ª coroa") → `independence-test`
- Aula4 ex.2 (carta de 52, ás × naipe espadas) → `independence-test`
- Aula4 ex.3 (two dice, sum = 6, first = 4) → `independence-test` (negative example: not independent)
- Aula4 ex.5 (sequência infinita, n tentativas, k sucessos) → `bernoulli-trials`
- Aula4 ex.6 (sistema paralelo, n componentes) → `parallel-system`
- Aula4 ex.7 (5 antes de 7 em par de dados) → `bernoulli-trials` (geometric subpattern)
- L1.22 — *6 sai pelo menos uma vez em 4 lançamentos* → `bernoulli-trials` (complement form)
- L1.23 — *duplo-6 em n lançamentos, P ≥ 1/2* → `bernoulli-trials`
- lista2.29 — *calouros / veteranos: número de veteranas para independência* → `independence-construct`
- lista2.31 — *casal independente respondendo verdadeiro/falso, melhor estratégia* → `bernoulli-trials` + decision

### Wrapping templates
- *Two omens on the same morning*: gavião's cry, north wind. Test independence by counting frequencies in the Arquivistas' almanac.
- *Parallel Cinder readings*: multiple Cinders read the same sample; system "works" if at least one calls it correctly.
- *Sequence of independent foraging trips*: each trip succeeds with prob p; how many until first success?

---

## Family 8 — *A Mão Cega no Jarro*

**Concept**: urn / bin draws, with or without replacement; conditional probabilities chain naturally.

### Patterns

| `pattern` | What it computes |
|---|---|
| `urn-without-replacement` | Sequential draws, no return; jar's state evolves. |
| `urn-with-replacement` | Sequential draws, returned; jar's state constant. |
| `urn-multinomial-batch` | Draw k from urn at once; counts of each color follow hypergeometric. |
| `urn-weighted` | Each ball has its own weight; selection prob ∝ weight (Aula3 ex.3 part b). |
| `urn-polya` | After drawing, replace plus an extra of the same color (lista2.21). |
| `urn-randomized-count` | Number of draws is itself random (lista2.26: roll a die, then draw that many). |

### Source problems
- L1.14 — *urna 3 vermelhas + 7 pretas, A vs B alternando, P(A tira vermelha)* → `urn-without-replacement`
- L1.15 — *urna 5 + 6 + 8, 3 bolas: mesma cor / cores diferentes* → `urn-multinomial-batch`
- L1.16 — *n brancas + m pretas, P(mesma cor) com vs sem reposição* → comparing `urn-without-replacement` vs `urn-with-replacement`
- L1.20 — *3 vermelhas em n meias, P(2 vermelhas) = 1/12; resolver para n* → `urn-multinomial-batch`
- L1.11 — *20 famílias com diferentes contagens de crianças, criança escolhida* → `urn-weighted` (size-biased sampling)
- Aula2 ex.3 (3 bolas: 1 branca + 2 pretas de 6+5) → `urn-multinomial-batch`
- Aula2 ex.5 (n bolas, 1 especial, retirar k) → `urn-multinomial-batch`
- Aula3 ex.3a (8 vermelhas + 4 brancas, 2 bolas vermelhas, sem reposição) → `urn-without-replacement`
- Aula3 ex.3b (mesmo, mas com pesos r e w) → `urn-weighted`
- lista2.2 — *6 brancas + 9 pretas, 4 bolas, ordem específica* → `urn-without-replacement`
- lista2.11 — *urna I para urna II e depois sortear* → composite urn problem
- lista2.14 — *15 bolas de tênis, 3 usadas + 3 não-usadas* → `urn-without-replacement`
- lista2.15 — *2 caixas, escolha de caixa + bola* → composite (mixture + urn)
- lista2.21 — *Pólya urn: 5 brancas + 7 pretas, com reposição + extra* → `urn-polya`
- lista2.26 — *5 brancas + 10 pretas, número de bolas determinado por dado* → `urn-randomized-count`
- lista2.34 — *3 jogadores, 12 bolas (4 brancas), primeiro a tirar branca vence* → `urn-without-replacement` competitive variant

### Wrapping templates
- *Bone-token divination*: tokens of two kinds (sun-marked, moon-marked) drawn from a leather bag.
- *Grain bin sampling*: handfuls drawn to assess proportion of mirror-touched grain (with vs without replacement = whether the handful is returned to the bin or set aside).
- *Hearth-ember selection*: when starting a new Cinder, ember tokens of different lineage origins are drawn from a ceremonial pouch.

---

## Family 9 — *O Caminho de Volta*

**Concept**: Bayesian inversion. Given an observed signal, infer the source. **Diagnostic-Bayes sub-pattern is canonical for A Leitura.**

### Patterns

| `pattern` | What it computes |
|---|---|
| `bayes-direct` | P(cause \| effect) given P(effect \| cause) and prior P(cause). |
| `bayes-diagnostic` | Sensitivity + specificity + prior → posterior. **A Leitura template.** |
| `bayes-multiple-update` | Update prior over multiple independent observations. |
| `bayes-partition` | E₁, …, Eₙ partition Ω; total probability + Bayes for each Eᵢ. |
| `bayes-inverse-conditional` | P(F \| E∩G) given P(E\|F), P(G\|F), P(F). |
| `bayes-counterintuitive` | Three-prisoners-style problems where intuition mis-updates. |

### Source problems
- Aula3 ex.1 (two coin tosses, "ambas cara dado pelo menos uma cara") → `bayes-direct`
- Aula3 ex.2 (Celina, francês vs química) → `bayes-partition`
- Aula3 ex.4 (lanternas tipo 1/2/3, dada duração > 100h, P(tipo i)) → `bayes-partition`
- Aula3 ex.5 (cartas de duas faces) → `bayes-counterintuitive` (the "famous" double-card problem)
- Aula3 ex.6 (lanternas, marginal + condicional) → `bayes-partition`
- lista2.1 — *par de dados, ao menos um 6 dado soma = i* → `bayes-direct`
- lista2.3 — *3 urnas, urna A dá branca dado que 2 brancas saíram* → `bayes-partition`
- lista2.4 — *gravidez ectópica: fumantes 2× mais provável* → `bayes-direct`
- lista2.5 — *bebê sobrevive, dado parto não cesariano* → `bayes-partition`
- lista2.7 — *participantes da festa: % de mulheres na turma original* → `bayes-partition`
- lista2.8 — *estudante: mulher e ciência da computação* → `bayes-direct`
- lista2.12 — *daltônico: P(homem)* → `bayes-direct`
- lista2.16 — *Dona Maria: notícias boas, dado que médico não ligou* → `bayes-counterintuitive` (subtle prior structure)
- lista2.17 — *r crianças, primogênita / caçula* → `bayes-partition` (size-biased)
- lista2.18 — *Joe atrasado, P(choveu)* → `bayes-direct`
- lista2.19 — *presente escondido por mãe vs pai, andar 1 vs 2* → `bayes-direct`
- lista2.20 — *moeda honesta vs duas-caras, dado k caras seguidas* → `bayes-multiple-update`
- lista2.22 — *cozinheiros A/B/C, fracassos atribuídos a A* → `bayes-direct`
- lista2.23 — *3 moedas, P(duas caras dado cara)* → `bayes-direct`
- lista2.24 — *três prisioneiros e o vigia* → `bayes-counterintuitive` ⭐ (classic)
- lista2.25 — *10 moedas, P(quinta moeda) dado cara* → `bayes-partition`
- lista2.27 — *teste PSA câncer de próstata* → `bayes-diagnostic` ⭐ **canonical A Leitura template**
- lista2.28 — *seguros: risco baixo/médio/alto, sem acidente em 1997* → `bayes-partition`
- lista2.32 — *gene hemofilia, 3 filhos saudáveis* → `bayes-multiple-update`
- lista2.33 — *dado A vs B, vermelho nas duas primeiras* → `bayes-multiple-update`

### Wrapping templates
- *A Leitura* (canonical): the apprentice presents a sample to the Cinder. Sensitivity + specificity + prior → posterior on whether it's mirror-touched.
- *Foraging source inference*: a strange root is brought back; was it picked from the safe slope or the touched valley?
- *Sickness diagnosis*: a child has fever + rash. Prior over conditions + likelihood of symptoms → most probable cause.
- *Three captives variant*: a tribal scenario echoing lista2.24 — three scouts captured by a hostile band; only one will be released; partial information from a turncoat.

---

## Family 10 — *O Conto dos Dois*

**Concept**: comparison of two random outcomes. P(X<Y), P(X=Y), P(X>Y). The "winner" of two binomials is not the one with higher mean.

### Patterns

| `pattern` | What it computes |
|---|---|
| `compare-two-binomials` | Two binomial RVs with different (n, p); compute P(X < Y), P(X = Y), P(X > Y). |
| `compare-two-dice` | Sum or face comparison between two dice rolls. |
| `mean-vs-majority` | The pedagogical contrast — the higher-mean result is not always the more-frequent winner. |

### Source problems
- L1.12 — *par de dados, P(2º > 1º)* → `compare-two-dice`
- lista2.1 — *par de dados, ao menos um 6 dado soma i* (dual structure with Family 9) → `compare-two-dice` framing
- lista2.10 — *3 dados (azul, amarelo, vermelho), P(B < A < V)* → multi-dice ordering / `compare-two-dice` extended

### Wrapping templates
- *Two scout teams returning*: north team has high success per try but few tries; south team has many tries but low per-try success. Who comes back with more game?
- *Two fishing nets compared*: each gets a catch; predict which had the better day.
- *Mean-vs-majority demo*: explicit two-character vignette where one routinely brings more on average and the other routinely "wins" more often.
