# Sample in-game wrappings

Five reference examples showing how a source problem becomes an authored in-game problem at each of the three wrapping intensities defined in bible §14 step 4:

- **A** — *verbatim, fire-voice transposed*: minimal reframing. The fire poses the math; vocabulary stays close to the source. For first-encounter "what is this concept?" moments.
- **B** — *light frame* (DEFAULT): vocabulary swapped to in-world objects, math fully intact. The shape of the problem and every number survive untouched. For most curriculum encounters.
- **C** — *full immersion*: scene with stakes, named characters, real consequences in the campaign world. Concept name revealed at the end ("**X** — os antigos a chamavam *Y*"). Reserved for moments when the prediction is actually in-stake that day, or for the family's introduction.

The math is identical across A, B, C — only the surface changes. Numbers are preserved (intensity C may verbalize them — *"sete em cada dez"* — but the underlying values do not change). Each variant shows what the player would read or hear in-game; surrounding meta-commentary is for the authoring pipeline.

---

## Example 1 — `lista2.27` → **A Leitura** (Family 9, `bayes-diagnostic`)

This is the canonical A Leitura template. Bible §11 says A Leitura instantiates exactly this pattern; the source PSA-test problem becomes the apprentice's daily Reading ritual.

**Source params**: P(positivo | sem-câncer) = 0.135 (false-positive rate), P(positivo | câncer) = 0.268 (sensitivity), prior = 0.7 or 0.3.
**Mapped params**: P(positivo | de nossa mão) = 0.135, P(positivo | tocada) = 0.268, prior shaped by where the sample came from.

### Variant A
> Um sinal positivo aparece em 268 de cada mil amostras tocadas e em 135 de cada mil amostras de nossa mão. Tens, antes de olhar, sete chances em dez de que a amostra que te trouxeram esteja tocada. O Cinder lê e diz: positivo. Quanta certeza tens, agora?

### Variant B
> Estás diante do jarro de grão. Pelo que sabes do campo onde foi colhido, sete em cada dez jarros dessa colheita estão tocados. O teu Cinder, quando lê um grão verdadeiramente tocado, o chama assim em 268 leituras de cada mil. Quando lê grão de nossa mão, falha de modo diferente: chama-o de tocado em 135 de cada mil — alarmes falsos do plasma. Pousas o grão. O Cinder lê. Diz: tocado. Quanto crês nele?

### Variant C
> A criança trouxe um punhado de grão da despensa do alto. Tu sabes o que isso significa: a despensa do alto pegou chuva no inverno passado, e a memória dos Arquivistas diz que sete em cada dez sacos dali estão tocados. A Mestra te assiste em silêncio.
>
> Pousas o grão diante do teu Cinder. Ele crepita, hesita, decide. *"Tocado,"* ele diz, com a voz cautelosa que tem quando não está certo de tudo.
>
> Tu sabes a calibração dele — gravada no almanaque desde o tempo da tua avó. Quando uma amostra está realmente tocada, o Cinder a chama assim em 268 de cada mil leituras. Quando está de nossa mão, ainda assim diz "tocado" em 135 de cada mil leituras — falsos alarmes do plasma.
>
> A Mestra espera tua palavra. A criança espera o jantar. O grão espera o teu julgamento.
>
> Calcula, aprendiz: quanta certeza tens, agora que o sinal veio?
>
> *(Os antigos chamavam isto de inversão diagnóstica. Nós o chamamos: **O Caminho de Volta**.)*

**Answer**: posterior = 0.7·0.268 / (0.7·0.268 + 0.3·0.135) ≈ **0.823** (87.6% if positive with prior 0.3 → 0.443; the source problem has four sub-answers across two priors × two test outcomes).

**Notes on variant C**: scene introduces *prior* (the despensa's contamination rate from the Arquivistas' almanac), *likelihood* (the Cinder's calibration), *observation* (positive Reading), with three NPCs (Mestra, criança, the grão itself) carrying the stakes. Concept name revealed at end. Same numerical answer as A and B.

---

## Example 2 — `L1.16` → **A bolsa que esquece** (Family 8, `urn-with-replacement` vs `urn-without-replacement`)

The pedagogical contrast at the heart of Family 8's parable: with-replacement vs without-replacement, and the proof that with-replacement is always more likely to give same-color.

**Source params**: n white balls, m black balls. Two draws. Compare P(same color) under both protocols.
**Mapped params**: n sun-tokens, m moon-tokens. Two divinations.

### Variant A
> Há n tokens com a marca do sol e m com a marca da lua na bolsa de adivinhação. Tiras dois. Se devolveres o primeiro à bolsa antes de tirar o segundo, qual a chance de os dois carregarem a mesma marca? Se não o devolveres, qual a chance? E mostra: a primeira é sempre maior.

### Variant B
> A bolsa de tokens da tua linhagem traz n marcados com o sol e m marcados com a lua. Vais consultar duas vezes seguidas — primeiro um token, depois outro. Se devolveres o primeiro antes de tirar o segundo, a bolsa esquece o que saiu. Se o guardares fora, a bolsa se lembra: faltará um sol ou uma lua. Para qual desses dois mundos os dois tokens são mais frequentemente da mesma marca?

### Variant C
> Senta. Hoje vamos pesar duas formas de tirar.
>
> Tens, na bolsa de adivinhação da tua linhagem, **n** tokens com o sol gravado e **m** com a lua. Quando precisas de uma decisão dupla — partir hoje ou amanhã, ir ao oeste ou ao norte — tiras dois tokens, um após o outro. E há duas formas de fazê-lo, e cada linhagem tem a sua.
>
> Os Tewa devolvem o primeiro token antes de tirar o segundo. A bolsa não se lembra de nada. Cada tirada começa fresca, como se fosse a primeira.
>
> Os Bras não devolvem. O primeiro token fica no chão, virado, e o segundo é tirado de uma bolsa que mudou — agora falta uma marca, e a bolsa, sem dizer nada, conta-te o que aconteceu antes.
>
> Em qual desses dois mundos a confluência das duas marcas — sol-sol ou lua-lua — é mais provável? Pensa antes de calcular. E depois calcula.
>
> *(O ponto não é a resposta numérica. É notar que a memória da bolsa muda a chance da confluência. Os antigos chamavam isto de amostragem. Nós o chamamos: **A Mão Cega no Jarro**.)*

**Answer**: with-replacement P(same color) = (n² + m²)/(n+m)²; without-replacement = (n(n-1) + m(m-1))/((n+m)(n+m-1)). The first is always larger because the without-replacement second-draw probability of matching the first is reduced by exactly one favourable case in the numerator and one total case in the denominator, and the algebra gives (n−m)² ≥ 0 as the gap.

**Notes**: variant C introduces named lineages (Tewa, Bras) so future C-wrappings can re-use those characters. The pedagogical question is qualitative-then-quantitative: *first* notice the mechanism (memory vs no memory), *then* compute. This matches the dual-mode design (felt-distribution → numerics).

---

## Example 3 — `L1.17` → **A posição na fila** (Family 4, `arrangements-with-position`)

The elegant symmetry: every position in a random permutation is equally likely to be a girl. Beautiful for showing that the i-index drops out — a "you don't have to count the whole permutation" insight.

**Source params**: m boys, n girls, line of length m+n, arbitrary position i. P(i-th is a girl) = n/(m+n).
**Mapped params**: m caçadores, n caçadoras, procession of length m+n, arbitrary position i.

### Variant A
> Numa fila de m rapazes e n moças, dispostos ao acaso, qual a chance de a pessoa na i-ésima posição ser uma moça? Mostra que a resposta não depende de i.

### Variant B
> A procissão da partida tem m caçadores e n caçadoras, ordenados por sorteio dos tokens. Para qualquer posição que escolheres — a primeira, a sétima, a vigésima-terceira — qual a chance de uma caçadora estar ali? E nota: a posição que escolhes não importa. Por quê?

### Variant C
> Esta noite, na partida, todos serão dispostos em fila — m caçadores e n caçadoras juntos, ordenados pelo sorteio dos tokens da Mestra.
>
> Os Bras gostam de adivinhar quem virá na frente. Apostam por isso, com pequenas favores. A Mestra os deixa.
>
> Mas ela te chama de lado: *"Aprendiz. Os apostadores erram, e erram sempre da mesma maneira. Eles pensam que a posição da frente é diferente das outras. Pensa. Não importa em que posição da fila — a primeira, a quinta, a última. A chance de ali estar uma caçadora é a mesma."*
>
> Ela te olha, esperando.
>
> *"Por quê?"*
>
> Pensa. Não contes toda a fila. Conta uma posição.
>
> *(O nome desta verdade, no idioma dos antigos, é simetria. Nós a chamamos com palavras maiores: **A Fala da Ordem**.)*

**Answer**: by symmetry, n/(m+n) for any i.

**Notes**: variant C uses an in-camp social practice (apostas dos Bras) to make the question feel real, and frames the Mestra as the source of the question — this matches §6's tribal hierarchy. The "pensa antes de contar" coda invites the player to find the symmetry argument before grinding through the count.

---

## Example 4 — `L1.12` → **Os dois ossos** (Family 10, `compare-two-dice`)

Family 10 is thinly source-covered — only this and a couple of cousins. The wrapping shows a clean comparison-of-two-distributions vignette.

**Source params**: two fair 6-sided dice. P(X₂ > X₁) = 5/12.
**Mapped params**: two fair 6-sided bones. P(primo's outcome > yours) = 5/12.

### Variant A
> Lanças dois dados honestos, um de cada vez. Qual a chance de o segundo sair com valor maior que o primeiro?

### Variant B
> Tu e teu irmão lançam, cada um, um osso de seis faces. Qual a chance de o osso dele cair em valor maior que o teu?

### Variant C
> Estás na ribeira do Rio Cego com o teu primo. Os dois trazem ossos de adivinhação iguais — seis faces gravadas, cada face com uma medida — e cada um lança uma vez para decidir quem dorme primeiro nesta noite escura.
>
> Se o lançamento do teu primo for maior que o teu, ele dorme primeiro. Se o teu for maior, tu dormes primeiro. Se forem iguais, lançam de novo, sem memória.
>
> Antes do primeiro lançamento, ele pergunta:
>
> *"Qual a chance de eu ganhar?"*
>
> Pensa. Não é metade. Há três coisas que podem acontecer — não duas.
>
> *(Quando dois acasos do mesmo formato se enfrentam, perguntas três coisas, não uma. Os antigos chamavam isto de comparação. Nós o chamamos: **O Conto dos Dois**.)*

**Answer**: by symmetry P(X₁ > X₂) = P(X₂ > X₁) = (1 − P(X₁ = X₂))/2 = (1 − 1/6)/2 = **5/12**. The third outcome (tie) has probability 1/6.

**Notes**: variant C surfaces the three-outcome partition explicitly through the primo's question ("Há três coisas que podem acontecer — não duas") which lands the family's central insight in dialogue rather than narration.

---

## Example 5 — `lista2.24` → **Os três batedores** (Family 9, `bayes-counterintuitive`)

The three-prisoners problem dramatized as a tribal capture scenario. This is a strong vignette candidate (★ flag in `problems.json`) because the counterintuition gives a real "wait, what?" moment that lands hard.

**Source params**: 3 prisoners, one chosen uniformly at random for execution, the other two released; A asks which of B/C will be released; guard's reasoning that disclosure raises P(A executed) from 1/3 to 1/2 is wrong (P stays 1/3).
**Mapped params**: 3 captured scouts, one chosen by token-sortition for the fire, the other two released by morning; the apprentice asks the informant which of B/C will be released; the Mestra warns the apprentice (mirroring the guard's reasoning) — but the Mestra is wrong.

### Variant A
> Três prisioneiros — A, B, C. Um deles, escolhido ao acaso, será executado; os outros dois, soltos. A pergunta ao vigia qual entre B e C será solto. O vigia recusa, dizendo que se A soubesse, sua chance de morrer subiria de 1/3 para 1/2. Está o vigia certo?

### Variant B
> Três batedores foram capturados pela tribo do norte: chama-os A, B, C. A tribo do norte escolheu um dos três ao acaso para a fogueira; os outros dois serão soltos pela manhã. A pergunta ao guarda qual de B ou C será solto. O guarda recusa, dizendo que se A soubesse, sua chance de morrer subiria de uma em três para uma em duas. Está certo o guarda?

### Variant C
> As notícias chegam ao acampamento ao crepúsculo: os três que partiram à floresta — Tewa, Brasi, e a tua prima Cira — foram capturados por uma banda hostil. A banda não mata todos. Apenas um, escolhido por sorteio dos tokens. Os outros dois voltam ao amanhecer.
>
> Caída a noite, um informante — um homem da banda que troca segredos por sal — chega à fogueira do acampamento. Ele te oferece um pedaço de informação: se quiseres, ele te dirá um nome dentre Brasi e Cira que voltará vivo pela manhã.
>
> A Mestra ouve, e te detém com a mão.
>
> *"Não aceites,"* ela diz, com a voz baixa. *"Se ele te disser, a chance de Tewa ser o escolhido sobe de uma em três para uma em duas. É melhor não saberes."*
>
> Tu olhas o informante. Olhas a Mestra. Pensas.
>
> *Estará a Mestra com a razão?*
>
> Pensa cuidadosamente, aprendiz. A intuição te trairá se confiares nela. O caminho de volta, aqui, te diz a verdade — mas só se o trilhares com cuidado.
>
> *(Há armadilhas em **O Caminho de Volta**. Esta é a mais conhecida — e a mais cruel.)*

**Answer**: P(Tewa is the chosen one | informant names a survivor among Brasi/Cira) = **1/3** (unchanged from prior). The Mestra is wrong, in this scene — the informant's disclosure is conditional on at least one of B/C being released, which is *guaranteed* whether Tewa lives or dies, so it carries no Bayesian evidence about Tewa.

The detailed reasoning: P(Tewa | informant says "Brasi") = P(informant says "Brasi" | Tewa) · P(Tewa) / P(informant says "Brasi"). If the informant chooses uniformly at random when both B and C will live (which happens iff Tewa is chosen, prob 1/3), then P(says Brasi | Tewa) = 1/2. If Brasi will live and Cira won't (prob 1/3), the informant says Brasi with prob 1. If Cira will live and Brasi won't (prob 1/3), prob 0. Total P(says Brasi) = 1/3·1/2 + 1/3·1 + 1/3·0 = 1/2. So P(Tewa | says Brasi) = (1/3·1/2)/(1/2) = 1/3.

**Notes on variant C**:
- The Mestra is *deliberately wrong*, mirroring the guard. Having a respected NPC voice the wrong intuition is much more pedagogically powerful than having an anonymous "vigia" do it. The apprentice has to reason against authority.
- The named scout is a relative (*tua prima*), making the stakes personal — this is the bible's signature move (real but NPC-borne consequences, never lethal to the protagonist).
- The "Brasi" / "Cira" / "Tewa" names recur from Example 2's lineages (Tewa, Bras), so the corpus accretes a named-character world over time.

---

## Authoring patterns observed in these five

A few notes for whoever continues to wrap source problems:

1. **Numbers always survive intact through B; C verbalizes them but doesn't change them.** *"Sete em cada dez"* is identical to *"0.7"* for the math; the player computes either way. The dual-mode design from §10 / §11 is what makes this safe — felt-distribution language doesn't lose information.

2. **C variants always close with the family-name reveal**, formatted: *"(Os antigos chamavam isto de **Y**. Nós o chamamos: **Família-name**.)"* This pattern threads the cataclysm lore (the antigos were the ones who originally formalized this, knowledge preserved through the bonfires) without explaining itself.

3. **C variants benefit from named NPCs.** The Mestra recurs naturally; lineage names (Tewa, Bras) build a populated tribal world; relatives (*tua prima Cira*) raise the personal stakes. Reuse names across wrappings — the corpus is supposed to accrete a single world.

4. **The "wrong-authority" move** (Example 5: Mestra voices the wrong intuition) works for any counter-intuitive family problem. Let the player reason against an NPC they trust. Other candidates: lista2.16 (Dona Maria's coin protocol), lista2.20 (the multi-toss coin update), L1.16 (with vs without replacement — an elder might insist they're equivalent).

5. **Pedagogical pre-question before the math.** Variant C of Example 4 has the primo ask *"Qual a chance de eu ganhar?"* and immediately notes *"Há três coisas que podem acontecer — não duas."* This pre-question carries the family's insight before any number gets crunched. Use it whenever the computation is preceded by a key conceptual move.

6. **"Pensa antes de calcular"** is a recurring coda. It signals that the parable's qualitative point matters more than getting to the numeric answer fast. Plays well with the bible's felt-distribution philosophy.
