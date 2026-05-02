# Ludus Ignis — Foundations Update (P0 Tier)

**Status**: implementation-ready spec
**Date**: 2026-05-01
**Scope**: insert four new foundational families at the head of the curriculum taxonomy; uniformly shift the existing 18 families by +4.
**Files affected**: `timeline.md`, `contos_do_fogo_anciao.md`, `ludus_ignis_exercicios.md`.

---

## 1. Rationale

The new source material (`Aula_1_.pdf`, `L1.pdf`) makes a foundational gap visible. The existing taxonomy starts at *A Fala da Ordem* (counting under constraints), which silently presupposes that students already understand sample spaces, events, the set algebra of events, and the Kolmogorov axioms. `Aula_1_` establishes these explicitly across seven pages. `L1`, titled *AXIOMAS DA PROBABILIDADE — PROBABILIDADE BÁSICA*, drills them in problems 1–5. The current curriculum has no slot for this content.

This update introduces a **P0 (Foundations)** tier of four families:

1. **A Tessitura do Mensurável** — σ-algebras (closure of askable questions).
2. **A Forma do Mundo Possível** — sample space, events, finite set operations.
3. **A Roda das Inclusões** — sequences of events; countable union/intersection; De Morgan.
4. **A Lei do Fogo** — Kolmogorov axioms A1–A3 and derived properties P1–P5.

All four belong to journey stage 1 (Cascade Foothills); they are tutorial-tier and gate access to the existing combinatorial families.

---

## 2. Renumbering map

The four new families take positions 1–4. All existing families shift by +4.

| Old # | New # | Diegetic name |
|---|---|---|
| —  | 1  | *A Tessitura do Mensurável* (NEW) |
| —  | 2  | *A Forma do Mundo Possível* (NEW) |
| —  | 3  | *A Roda das Inclusões* (NEW) |
| —  | 4  | *A Lei do Fogo* (NEW) |
| 1  | 5  | *A Fala da Ordem* |
| 2  | 6  | *A Escolha do Bando* |
| 3  | 7  | *As Bordas do Possível* |
| 4  | 8  | *Os Dois Sinais* |
| 5  | 9  | *A Mão Cega no Jarro* |
| 6  | 10 | *O Caminho de Volta* |
| 7  | 11 | *O Conto dos Dois* |
| 8  | 12 | *A Forma do Acaso* |
| 9  | 13 | *A Régua de Decisão* |
| 10 | 14 | *A Mistura dos Fluxos* |
| 11 | 15 | *O Primeiro a Voltar* |
| 12 | 16 | *A Soma dos Pequenos* |
| 13 | 17 | *A Meia-Vida das Coisas* |
| 14 | 18 | *Os Limites do Pior Caso* |
| 15 | 19 | *O Laço Escondido* |
| 16 | 20 | *A Espera pelo Sinal* |
| 17 | 21 | *A Voz das Multidões* |
| 18 | 22 | *A Geometria do Acaso* |

The conceptual tier labels in `timeline.md` §14 become:

- **P0 (Foundations)** — families 1–4 (NEW).
- **P1 (Combinatorics & elementary probability)** — families 5–11 (formerly P1, families 1–7).
- **P2 (Random variables and inequalities)** — families 12–21 (formerly P2, families 8–17).
- **Cross-cutting** — family 22 (formerly 18).

The existing PROVISIONAL flag in §14 listing tightening targets (Family 7, 10, 16, 9) must be renumbered to **Family 11, 14, 20, 13**.

---

## 3. New families: metadata

For insertion into `timeline.md` §14 as a new **P0 (foundations)** subsection, immediately preceding the existing P1 table.

| # | Diegetic name | Mathematical concept | Canonical worldframe |
|---|---|---|---|
| 1 | **A Tessitura do Mensurável** | $\sigma$-algebras: closure under complement and countable union; generated $\sigma$-algebras; the partition–$\sigma$-algebra correspondence on finite spaces | The weave of askable questions — what the Cinder *can* be asked vs. what falls outside the loom |
| 2 | **A Forma do Mundo Possível** | Sample space construction; events as subsets; $\cup, \cap, {}^c, \setminus$ on events; verbal-to-set translation; cardinality of event spaces | Naming $\Omega$ before A Leitura; defining the event whose chance is to be weighed |
| 3 | **A Roda das Inclusões** | Finite and countable $\bigcup, \bigcap$; De Morgan; monotone limits; the "alguma vez" / "sempre" duality | Long observation logs of marés-espelho; events expressed across many days |
| 4 | **A Lei do Fogo** | Kolmogorov axioms A1–A3 and derived properties: $P(\emptyset)=0$, finite additivity, complement, monotonicity, $P(A\cup B) = P(A) + P(B) - P(A\cap B)$ | The Cinder's covenant — three rules every honest reckoning must obey |

### Parameter specifications

(per the family parameterization scheme of §14: each instance is generated from a parameter dict)

**Family 1 — *A Tessitura do Mensurável***
- `omega_size`: $|\Omega| \in \{3, 4, 5, 6, 8\}$ (finite cases only at alpha).
- `mode`: one of `verify_closure`, `generate_smallest`, `count_elements`, `partition_correspondence`.
- `generating_set_size`: 1–3 sets.
- `partition_based`: bool — when true, the $\sigma$-algebra is induced by an explicitly stated partition.

**Family 2 — *A Forma do Mundo Possível***
- `experiment_type`: one of `two_dice`, `coin_sequence`, `urn_draw`, `roll_until_stop`, `system_state`.
- `events_to_describe`: 3–5 named events.
- `operations`: subset of $\{\cap, \cup, {}^c, \setminus, \text{multi-fold}\}$.
- `present_as`: `enumerate_elements` | `set_builder_only` | `cardinality_only`.
- `infinite_omega`: bool — covers the roll-until-stop and infinite-coin-sequence cases.

**Family 3 — *A Roda das Inclusões***
- `sequence_type`: one of `nested_increasing`, `nested_decreasing`, `disjoint`, `interval_real_line`, `abstract_indexed`.
- `task`: one of `compute_union_intersection`, `expression_in_indexed_events`, `de_morgan_dual`.
- `index_set`: `finite_n` | `countable_infinite`.
- `with_concrete_intervals`: bool — toggles the Aula 1 page-6 family $\{[0,1/n], (0,1/n), [n,n+1], (0,n)\}$.

**Family 4 — *A Lei do Fogo***
- `mode`: one of `disjoint_marginals`, `general_two_event`, `multi_event_inclusion_exclusion`, `axiom_consistency_check`.
- `n_events`: 2–4.
- `given`: subset of $\{\text{marginals}, \text{pairwise intersections}, \text{union}, \text{complement}\}$.
- `targets`: subset of $\{P(A\cup B), P(A\cap B), P(A^c\cap B), P(A\setminus B), P((A\cup B)^c), \ldots\}$.

### Journey-stage placement

All four unlock in **stage 1 (Cascade Foothills)**, the tutorial. Suggested in-tribe unlock order (which differs from numerical order by design):

1. **Family 2 first** — most concrete: name $\Omega$, name the event.
2. **Family 4 next** — the three rules of honest reckoning. Pairs naturally with 2.
3. **Family 3 next** — sequences and their limits, once finite reasoning is solid.
4. **Family 1 last** — the meta-rule (what makes a question askable) is shown only after the apprentice has built enough events to wonder which questions are askable at all. Treat as a burn-bright unlock at first; auto-unlock after Family 3 mastery.

This pedagogical order preserves the numerical order's logical structure ($\sigma$-algebras come first as the formal foundation) while teaching in the order students actually absorb — concrete → abstract.

---

## 4. New parables

For insertion into `contos_do_fogo_anciao.md` at the top of the parable corpus, immediately after the front matter (the `# Os Contos do Fogo Ancião` heading and italic preface) and immediately before what is currently `## Família 1 — *A Fala da Ordem*` (which becomes `## Família 5 — *A Fala da Ordem*`).

---

### Família 1 — *A Tessitura do Mensurável*

#### O tear da Avó Fia

Havia uma tecelã, das antigas tribos do norte, que me ensinou — sem saber que ensinava — que nem toda figura cabe num tecido. A urdidura é fixa. As tramas correm. Entre as duas, certas figuras são possíveis: linhas, losangos, espirais grossas. Outras não cabem.

Você pode perguntar ao tecido *está esta figura aqui?* — apenas se a figura puder, em princípio, existir nele. Perguntar por uma figura que a urdidura não admite é perguntar coisa nenhuma.

Assim é com o mundo. Antes de pesar uma chance, você precisa nomear a pergunta de um modo que o mundo possa responder. Há um tecido das perguntas-possíveis, e três regras o sustentam.

*O todo está no tecido*: a pergunta "alguma coisa aconteceu?" sempre cabe.

*O avesso cabe sempre que a pergunta cabe*: se você pode perguntar "a água está tocada?", pode perguntar "a água não está tocada?".

*Combinações cabem*: se você pode perguntar por mil eventos separados, pode perguntar pela união deles. Mesmo por infinitos, contanto que possam ser enfileirados.

Isto basta. De três regras de tessitura, todo o pano se sustenta.

**O que se pode medir é o que cabe no tecido. Antes de pesar uma chance, garanta que sua pergunta pertence à urdidura.**

Há perguntas que escapam — raras, retorcidas, que mente nenhuma da tribo precisará formular num dia comum. Mas existem, e por isso o tecido foi inventado: para que a contagem não tropece em fios que não estão lá.

---

### Família 2 — *A Forma do Mundo Possível*

#### Antes da Leitura, o nome

Quando a Mestra leva uma amostra à Cinder, ela faz duas coisas antes de qualquer pergunta de chance.

Primeiro, nomeia o que poderia ser. A amostra poderia estar tocada. Poderia estar limpa. Poderia, se a Cinder estivesse fraca, dar um sinal ambíguo. Esses são os mundos-possíveis daquela noite. Dê-lhes um cesto: nada que ela observe estará fora dele.

Depois, nomeia o que perguntar. *A amostra é tocada.* Esse é um agrupamento dentro do cesto: alguns mundos-possíveis lhe pertencem, outros não. Esse agrupamento é o evento.

Sem o cesto, a chance não tem onde pousar. Sem o evento, não há sobre o que perguntar.

A partir daí, tudo o mais é arranjo. O *avesso* do evento é um evento. A *junção* de dois eventos é um evento. A *coincidência* de dois eventos é um evento. Cada operação devolve um agrupamento dentro do mesmo cesto, e nenhuma escapa.

**O cesto se chama espaço amostral. Os agrupamentos se chamam eventos. Antes de pesar uma chance, nomeie cesto e agrupamento; depois, pese.**

Há uma armadilha. O mesmo experimento pode ser nomeado em muitos cestos, e o cesto certo depende da pergunta. Se você pergunta apenas pelo veredicto, o cesto tem três mundos. Se também pergunta pelo riacho de origem, nove. Cestos pequenos demais perdem a pergunta; cestos grandes demais cansam o aprendiz e turvam a conta.

Escolha o cesto que cabe à pergunta. Nem maior, nem menor.

---

### Família 3 — *A Roda das Inclusões*

#### O batedor que conta marés

Mande um batedor à beira do mar. Diga-lhe: olhe as marés por trinta dias, e em cada dia anote se a maré está tocada pelo espelho, ou limpa.

Ao fim, ele lhe traz uma sequência: trinta sinais. Você quer pesar duas chances, e elas não são a mesma chance.

A primeira: *em algum dos trinta dias, a maré esteve tocada*. Esta junta os trinta como em fila aberta — basta um *sim* para que a resposta seja *sim*. É a *união* dos trinta eventos.

A segunda: *em todos os trinta dias, a maré esteve tocada*. Esta junta os trinta como em corda apertada — basta um *não* para que a resposta seja *não*. É a *interseção*.

Os avessos espelham-se. O avesso de "em algum dia" é "em nenhum dia". O avesso de "em todos os dias" é "em ao menos um dia, não". Vire um *alguma-vez* do avesso, e encontrará um *sempre* do avesso.

**A união pergunta "alguma vez". A interseção pergunta "sempre". O avesso troca uma pela outra.**

E quando os dias são infinitos? A roda continua a girar. As mesmas regras valem, contanto que os dias possam ser enfileirados.

Mas o infinito traz uma lição própria. Há eventos que jamais ocorrem em qualquer dia que você visse e ainda assim, em uma vida estendida o bastante, ocorrem. E há eventos que aparentemente ocorrem todo dia, mas cuja interseção sobre *todos* os dias está vazia.

**Sequências longas têm verdades que sequências curtas escondem.**

---

### Família 4 — *A Lei do Fogo*

#### As três juras da brasa

Há uma promessa que toda chama honesta faz. Antes que a Cinder dê qualquer Leitura, ela já jurou três coisas.

*Toda chance fica entre nada e tudo*. Nenhum evento tem chance negativa, nem chance maior que a da certeza. Se uma conta dá um e dois décimos, ou três centésimos negativos, ela saiu da tessitura.

*A chance de algo acontecer é um*. O cesto inteiro pesa um. Não meio, não dois — um. *Algo* sempre acontece, porque o cesto contém todos os mundos-possíveis.

*Quando os eventos não se sobrepõem, suas chances somam*. Divida o mundo em pedaços que não se tocam, e suas chances, somadas, devolvem o todo. E isto vale mesmo para infinitos pedaços enfileirados.

Destas três juras seguem-se filhos pequenos, óbvios depois de ditos. *A chance do vazio é zero. A chance do avesso é um menos a chance do evento. Se um evento contém outro, sua chance é maior. A chance da união de dois eventos é a soma das chances menos a chance da sobreposição* — pois a sobreposição foi contada duas vezes.

**Três juras dão à chance todo o seu corpo. O resto é consequência.**

Mas atenção. A terceira jura tem uma condição que muitos esquecem: *não se sobrepõem*. Vi um caçador prometer ao seu bando que tinham noventa por cento de chance de comer, somando a chance de a caça vir do norte com a chance de vir do leste. Mas as caças davam voltas, e às vezes vinham de ambas as direções. O bando dormiu com fome.

Some apenas o que não se toca.

---

## 5. New exercises

For insertion into `ludus_ignis_exercicios.md` at the top, after the front matter (`# Ludus Ignis — Exercícios de Currículo (apresentação, v2)` and the introductory paragraph) and before what is currently `## Família 1 — *A Fala da Ordem*` (which becomes `## Família 5`).

Format follows the existing convention: two problems per family at intensity B (light worldframe wrapper, math intact), each followed by a blockquote line stating the expected approach / answer for alpha self-check. Solutions are dense by design — they are alignment checks for the reviewer, not student-facing answer keys.

---

### Família 1 — *A Tessitura do Mensurável*

**1.1** A Mestra propõe um experimento simples: lançar uma pedra-de-osso de seis faces ($\Omega = \{1, 2, 3, 4, 5, 6\}$). Para fins de uma adivinhação grosseira, ela registra apenas a categoria do resultado: "baixo" ($\{1, 2, 3\}$) ou "alto" ($\{4, 5, 6\}$). Verifique que a coleção $\mathcal{F} = \{\emptyset,\ \{1,2,3\},\ \{4,5,6\},\ \Omega\}$ é uma $\sigma$-álgebra sobre $\Omega$. Em seguida, identifique o que esta $\sigma$-álgebra "permite perguntar" e o que ela não permite.

> Verificar: (i) $\Omega \in \mathcal{F}$; (ii) fechada sob complemento — $\{1,2,3\}^c = \{4,5,6\} \in \mathcal{F}$, $\emptyset^c = \Omega \in \mathcal{F}$, demais simétricos; (iii) fechada sob união finita (e portanto interseção, por De Morgan) — todas as uniões dão elementos já em $\mathcal{F}$. Sim, é $\sigma$-álgebra. Permite perguntar "o resultado é baixo?" / "é alto?"; não permite perguntar, e.g., "o resultado é um $3$?", pois $\{3\} \notin \mathcal{F}$. Equivalentemente: $\mathcal{F}$ é gerada pela partição binária $\{\{1,2,3\},\{4,5,6\}\}$.

**1.2** Considere $\Omega = \{N, L, S, O\}$ (quatro direções de origem possíveis para uma maré-espelho). Liste todos os elementos da menor $\sigma$-álgebra sobre $\Omega$ que contém os eventos $A = \{N\}$ ("vem do norte") e $B = \{N, L\}$ ("vem do quadrante norte-leste").

> Fechar $\{A, B\}$ sob complementos e uniões finitas: $A^c = \{L,S,O\}$; $B^c = \{S,O\}$; $A \cup B = B$; $B \setminus A = \{L\}$; $\{L,S,O\} \cap \{S,O\} = \{S,O\}$ (já presente); $A \cup \{S,O\} = \{N,S,O\}$. Resultado: $\sigma(\{A,B\}) = \{\emptyset, \{N\}, \{L\}, \{N,L\}, \{S,O\}, \{N,S,O\}, \{L,S,O\}, \Omega\}$, com $8 = 2^3$ elementos. Equivalentemente: a $\sigma$-álgebra gerada pela partição $\{\{N\}, \{L\}, \{S,O\}\}$ sobre $\Omega$.

---

### Família 2 — *A Forma do Mundo Possível*

**2.1** A tribo lança duas pedras-de-osso de seis faces para divinhação noturna. Sejam $E$ o evento "a soma das duas pedras é ímpar", $F$ o evento "ao menos uma das pedras mostra $1$" e $G$ o evento "a soma é igual a $5$". Descreva, listando explicitamente os pares $(i, j)$, os eventos $E \cap F$, $E \cup F$, $F \cap G$, $E \cap F^c$ e $E \cap F \cap G$.

> $\Omega = \{(i,j) : i, j \in \{1, \ldots, 6\}\}$, $|\Omega| = 36$. $E = \{(i,j) : i+j\text{ ímpar}\}$, $F = \{(1,j) : j \in \{1,\ldots,6\}\} \cup \{(i,1) : i \in \{2,\ldots,6\}\}$, $G = \{(1,4), (2,3), (3,2), (4,1)\}$.
> - $E \cap F = \{(1,2),(1,4),(1,6),(2,1),(4,1),(6,1)\}$.
> - $E \cup F$: união explícita de $E$ (18 pares) com $F$ (11 pares), com sobreposição $E \cap F$ (6 pares); $|E \cup F| = 18 + 11 - 6 = 23$ pares.
> - $F \cap G = \{(1,4),(4,1)\}$.
> - $E \cap F^c$: pares de soma ímpar onde nenhum dado mostra $1$ — $\{(2,3),(2,5),(3,2),(3,4),(3,6),(4,3),(4,5),(5,2),(5,4),(5,6),(6,3),(6,5)\}$.
> - $E \cap F \cap G = \{(1,4),(4,1)\}$ (toda soma 5 com pelo menos um dado igual a $1$ tem soma ímpar; coincide com $F \cap G$).

**2.2** Os pajés lançam um dado-de-osso continuamente até obter um seis (o "sinal-do-fim"), momento em que o ritual se interrompe. Descreva o espaço amostral $\Omega$. Defina $E_n$ como o evento em que o dado é lançado exatamente $n$ vezes para que o ritual termine. Que pontos do espaço amostral pertencem a $E_n$? O que representa o complemento $\left(\bigcup_{n=1}^{\infty} E_n\right)^c$?

> $\Omega = \{(6),\ (x_1, 6),\ (x_1, x_2, 6),\ \ldots\} \cup \{(x_1, x_2, x_3, \ldots) : x_i \in \{1,\ldots,5\}\ \forall i\}$, isto é, todas as sequências finitas terminando no primeiro $6$, mais a sequência infinita sem nenhum $6$. $E_n = \{(x_1, \ldots, x_{n-1}, 6) : x_i \in \{1,2,3,4,5\}\ \forall i < n\}$, com $|E_n| = 5^{n-1}$. $\bigcup_n E_n$ = "o ritual termina em algum momento". $\left(\bigcup_n E_n\right)^c = \{(x_1, x_2, \ldots) : x_i \in \{1,2,3,4,5\}\ \forall i\}$ = "o seis nunca aparece" / "o ritual não termina".

---

### Família 3 — *A Roda das Inclusões*

**3.1** No litoral norte da Califórnia, a Mestra registra a intensidade da maré-espelho a cada amanhecer (em unidades-de-maré, valor real $\geq 0$). Para cada $n \in \mathbb{N}$, definem-se as faixas de intensidade:
$$A_n = \left[0,\ \tfrac{1}{n}\right], \quad B_n = \left(0,\ \tfrac{1}{n}\right), \quad C_n = [n,\ n+1], \quad D_n = (0,\ n).$$
Calcule $\bigcup_n A_n$, $\bigcap_n A_n$, $\bigcup_n B_n$, $\bigcap_n B_n$, $\bigcup_n C_n$, $\bigcap_n C_n$, $\bigcup_n D_n$, $\bigcap_n D_n$.

> A sequência $\{A_n\}$ é decrescente com $A_1 = [0,1]$ contendo todas: $\bigcup A_n = [0,1]$, $\bigcap A_n = \{0\}$ (único ponto em todo $[0,1/n]$). $\{B_n\}$ idem mas aberta em $0$: $\bigcup B_n = (0,1)$, $\bigcap B_n = \emptyset$ ($0$ não pertence a nenhum, e qualquer $x>0$ é excluído de $B_n$ para $n > 1/x$). $\{C_n\}$ disjuntos para $n \geq 2$: $\bigcup C_n = [1, \infty)$, $\bigcap C_n = \emptyset$ (já $C_1 \cap C_3 = \emptyset$). $\{D_n\}$ é crescente com $D_1 = (0,1)$ menor: $\bigcup D_n = (0, \infty)$, $\bigcap D_n = D_1 = (0,1)$.

**3.2** A tribo registra eventos meteorológicos para cada noite ao longo da migração. Seja $V_i$ o evento "vento-norte cortante na noite $i$", para $i = 1, 2, 3, \ldots$. Expresse, em termos dos $V_i$ e operações de conjuntos, os seguintes eventos:

(a) "vento-norte ocorre em ao menos uma noite";
(b) "vento-norte ocorre em todas as noites";
(c) "vento-norte não ocorre em noite alguma";
(d) "vento-norte ocorre em ao menos uma noite, mas não em todas".

> (a) $\bigcup_{i \geq 1} V_i$. (b) $\bigcap_{i \geq 1} V_i$. (c) $\bigcap_{i \geq 1} V_i^c = \left(\bigcup_{i \geq 1} V_i\right)^c$ (Lei do Espelho / De Morgan). (d) $\left(\bigcup_{i \geq 1} V_i\right) \cap \left(\bigcap_{i \geq 1} V_i\right)^c = \left(\bigcup_{i \geq 1} V_i\right) \setminus \left(\bigcap_{i \geq 1} V_i\right)$.

---

### Família 4 — *A Lei do Fogo*

**4.1** Os Arquivistas registram que, em uma dada noite de verão, $P(\text{aurora visível}) = 0{,}3$ e $P(\text{vento-norte cortante}) = 0{,}5$. Estes dois fenômenos são disjuntos (nunca ocorrem na mesma noite). Calcule (a) $P(\text{aurora} \cup \text{vento})$, (b) $P(\text{aurora} \cap \text{vento}^c)$, (c) $P(\text{aurora} \cap \text{vento})$, (d) $P(\text{aurora}^c \cap \text{vento}^c)$.

> Sendo $A$ = aurora, $V$ = vento, com $A \cap V = \emptyset$:
> (a) Por A3: $P(A \cup V) = P(A) + P(V) = 0{,}8$.
> (b) $A \cap V^c = A$ (pois $A \cap V = \emptyset$ implica $A \subseteq V^c$): $P = 0{,}3$.
> (c) Disjuntos: $P = 0$.
> (d) Por De Morgan e P3: $P(A^c \cap V^c) = P((A \cup V)^c) = 1 - P(A \cup V) = 0{,}2$.

**4.2** Após uma temporada de Leituras, a Mestra calcula que, para uma dada amostra de água-de-poça: $P(\text{tocada}) = 0{,}4$, $P(\text{coletada à noite}) = 0{,}6$ e $P(\text{tocada} \cup \text{noite}) = 0{,}8$. Calcule $P(\text{tocada} \cap \text{noite})$, $P(\text{tocada} \cap \text{noite}^c)$, $P(\text{tocada}^c \cap \text{noite})$ e $P(\text{tocada}^c \cap \text{noite}^c)$.

> Sendo $T$ = tocada, $N$ = noite. Por inclusão-exclusão (P5): $P(T \cap N) = P(T) + P(N) - P(T \cup N) = 0{,}4 + 0{,}6 - 0{,}8 = 0{,}2$. Pela aditividade da decomposição $T = (T \cap N) \cup (T \cap N^c)$ disjunta: $P(T \cap N^c) = P(T) - P(T \cap N) = 0{,}2$. Simetricamente: $P(T^c \cap N) = P(N) - P(T \cap N) = 0{,}4$. Por De Morgan: $P(T^c \cap N^c) = 1 - P(T \cup N) = 0{,}2$. Verificação: a soma dos quatro vale $0{,}2 + 0{,}2 + 0{,}4 + 0{,}2 = 1$.

---

## 6. Integration instructions

### `timeline.md`

1. In §14:
   1. Change header `Family taxonomy (18 families, locked for current corpus)` → `Family taxonomy (22 families, locked for current corpus)`.
   2. Insert new `**P0 (foundations)**` subsection (with the metadata table and parameter specifications from §3 above) immediately before the existing `**P1 (foundations)**` table.
   3. Rename existing `**P1 (foundations)**` → `**P1 (combinatorics & elementary probability)**`.
   4. In every existing family-table row, increment the `#` column by 4 (1→5, 2→6, …, 18→22). The mathematical concept and worldframe text remain unchanged.
   5. Update the prose line `The fire teaches in roughly the course's natural order (1→17, with 18 woven in)` → `(1→21, with 22 woven in)`.
   6. Update the PROVISIONAL flag at the end of §14: tightening targets become **Family 11, 14, 20, 13** (formerly 7, 10, 16, 9).
   7. Append the journey-stage placement note from §3 above to the end of §14.

2. Verify with `grep -nE 'Família|Family [0-9]+' timeline.md` that no other family-number references exist outside §14. (Spot-check confirms none currently do.)

### `contos_do_fogo_anciao.md`

1. Insert the four new parable sections (§4 above) at the top of the parable corpus, between the front matter and the existing first parable. Each retains the `## Família N — *Name*` heading style and the `### scene-title` subheading style of existing entries.
2. Increment every existing parable header by 4: `## Família N — ...` → `## Família (N+4) — ...`, for N = 1, …, 18.
3. The closing meditation at the end of the file (`*O Fogo Ancião arde baixo. ...*`) may want a sentence acknowledging the foundations — optional, post-MVP.

### `ludus_ignis_exercicios.md`

1. Insert the four new family exercise blocks (§5 above) at the top, between the front matter and the existing `## Família 1 — *A Fala da Ordem*`.
2. Increment every existing family heading: `## Família N — ...` → `## Família (N+4) — ...`.
3. Increment every exercise label inside the existing blocks: `**N.1**` → `**(N+4).1**`, `**N.2**` → `**(N+4).2**`. The blockquote answers below them are not numbered and need no edit.

### Verification checklist

After edits, run `grep -nE '^## Família [0-9]+' contos_do_fogo_anciao.md ludus_ignis_exercicios.md` and confirm:

- 22 family headers in `contos_do_fogo_anciao.md`, in numerical order 1–22, no gaps and no duplicates.
- 22 family headers in `ludus_ignis_exercicios.md`, same property.
- Each `ludus_ignis_exercicios.md` block contains exactly two `**N.1**` / `**N.2**` exercise labels matching its heading number.

A second sanity check: `grep -nE '\*\*[0-9]+\.[12]\*\*' ludus_ignis_exercicios.md | wc -l` should return $44$.

---

## 7. Source-material traceability

The four new families directly absorb the following source-material content. This mapping seeds the parameter-instance library at alpha.

| Source | Item | Maps to family | Notes |
|---|---|---|---|
| `Aula_1_.pdf` | pp. 1–2 (sample-space examples: gender, race ordering, two coins, two dice, transistor lifetime) | 2 | Defines $\Omega$ across finite, combinatorial, and continuous cases |
| `Aula_1_.pdf` | pp. 3–5 (events, set operations $\cup, \cap, {}^c$, Venn diagrams, sequences of events) | 2, 3 | Sequence definitions on p. 5 are the bridge to family 3 |
| `Aula_1_.pdf` | p. 6 (concrete sequences $A_n=[0,1/n]$, $B_n=(0,1/n)$, $C_n=[n,n+1]$, $D_n=(0,n)$) | 3 | Direct source for exercise 3.1 |
| `Aula_1_.pdf` | pp. 6–7 (Kolmogorov A1, A2, A3 and derived P1–P5) | 4 | Defines the family verbatim |
| `L1.pdf` | Problem 1 (roll until 6; $E_n$; $(\bigcup E_n)^c$) | 2, 3 | Direct source for exercise 2.2; also a 3-family instance |
| `L1.pdf` | Problem 2 (two dice; $E, F, G$; describe $E \cap F$ etc.) | 2 | Direct source for exercise 2.1 |
| `L1.pdf` | Problem 3 (A/B/C alternation until first heads; infinite $S$) | 2, 3 | Future instance of 2 (infinite $\Omega$) and 3 |
| `L1.pdf` | Problem 4 (5-component system; $\Omega = \{0,1\}^5$; events $W, A$) | 2 | Future instance of 2 (finite product space) |
| `L1.pdf` | Problem 5 (disjoint $A, B$ with given marginals) | 4 | Direct precedent for 4.1 (which extends to four sub-questions) |
| `Aula_1_.pdf` | (none — $\sigma$-algebras not formalized in source) | 1 | Family 1 anticipates measure-theoretic extensions; current exercises stay finite |

**Note on Family 1**: the source material gestures at $\sigma$-algebra-flavored content via the page-6 sequences exercise but does not formalize $\sigma$-algebras as a concept. Family 1 is therefore a *forward-compatible* slot — its alpha exercises stay finite (verify-closure on small $\Omega$, generate-from-small-set), and post-alpha extensions can introduce Borel $\sigma$-algebras and measurability when warranted by future PDFs. Until then, Family 1 is treated pedagogically as an enrichment unlock rather than a gating prerequisite.
