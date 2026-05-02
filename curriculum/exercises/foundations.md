# Foundations exercises (P0 tier)

Six in-game-wrapped exercises covering the three P0 families introduced in bible iteration 6 (timeline.md §14):

- **Family 1 — *A Forma do Mundo Possível*** (sample space + events + finite set algebra)
- **Family 2 — *A Roda das Inclusões*** (sequences of events, ⋃/⋂, De Morgan)
- **Family 3 — *As Juras da Chama*** (Kolmogorov axioms + derived properties)

Two problems per family at intensity B (light worldframe wrapper, math intact). Each is followed by a blockquote stating the expected approach and answer for alpha self-check — these are alignment notes for the reviewer, not student-facing answer keys.

Source-material traceability is tracked in `families.md` and `problems.json`; the σ-algebra material that Aula 1 gestures at without formalizing is *not* given an exercise here (iteration-6 decision: drop σ-algebras as a numbered family).

---

## Família 1 — *A Forma do Mundo Possível*

**1.1** A tribo lança duas pedras-de-osso de seis faces para divinhação noturna. Sejam $E$ o evento "a soma das duas pedras é ímpar", $F$ o evento "ao menos uma das pedras mostra $1$" e $G$ o evento "a soma é igual a $5$". Descreva, listando explicitamente os pares $(i, j)$, os eventos $E \cap F$, $E \cup F$, $F \cap G$, $E \cap F^c$ e $E \cap F \cap G$.

> $\Omega = \{(i,j) : i, j \in \{1, \ldots, 6\}\}$, $|\Omega| = 36$. $E = \{(i,j) : i+j\text{ ímpar}\}$, $F = \{(1,j) : j \in \{1,\ldots,6\}\} \cup \{(i,1) : i \in \{2,\ldots,6\}\}$, $G = \{(1,4), (2,3), (3,2), (4,1)\}$.
> - $E \cap F = \{(1,2),(1,4),(1,6),(2,1),(4,1),(6,1)\}$.
> - $E \cup F$: união explícita de $E$ (18 pares) com $F$ (11 pares), com sobreposição $E \cap F$ (6 pares); $|E \cup F| = 18 + 11 - 6 = 23$ pares.
> - $F \cap G = \{(1,4),(4,1)\}$.
> - $E \cap F^c$: pares de soma ímpar onde nenhum dado mostra $1$ — $\{(2,3),(2,5),(3,2),(3,4),(3,6),(4,3),(4,5),(5,2),(5,4),(5,6),(6,3),(6,5)\}$.
> - $E \cap F \cap G = \{(1,4),(4,1)\}$ (toda soma 5 com pelo menos um dado igual a $1$ tem soma ímpar; coincide com $F \cap G$).

**1.2** Os pajés lançam um dado-de-osso continuamente até obter um seis (o "sinal-do-fim"), momento em que o ritual se interrompe. Descreva o espaço amostral $\Omega$. Defina $E_n$ como o evento em que o dado é lançado exatamente $n$ vezes para que o ritual termine. Que pontos do espaço amostral pertencem a $E_n$? O que representa o complemento $\left(\bigcup_{n=1}^{\infty} E_n\right)^c$?

> $\Omega = \{(6),\ (x_1, 6),\ (x_1, x_2, 6),\ \ldots\} \cup \{(x_1, x_2, x_3, \ldots) : x_i \in \{1,\ldots,5\}\ \forall i\}$, isto é, todas as sequências finitas terminando no primeiro $6$, mais a sequência infinita sem nenhum $6$. $E_n = \{(x_1, \ldots, x_{n-1}, 6) : x_i \in \{1,2,3,4,5\}\ \forall i < n\}$, com $|E_n| = 5^{n-1}$. $\bigcup_n E_n$ = "o ritual termina em algum momento". $\left(\bigcup_n E_n\right)^c = \{(x_1, x_2, \ldots) : x_i \in \{1,2,3,4,5\}\ \forall i\}$ = "o seis nunca aparece" / "o ritual não termina".

---

## Família 2 — *A Roda das Inclusões*

**2.1** No litoral norte da Califórnia, a Mestra registra a intensidade da maré-espelho a cada amanhecer (em unidades-de-maré, valor real $\geq 0$). Para cada $n \in \mathbb{N}$, definem-se as faixas de intensidade:
$$A_n = \left[0,\ \tfrac{1}{n}\right], \quad B_n = \left(0,\ \tfrac{1}{n}\right), \quad C_n = [n,\ n+1], \quad D_n = (0,\ n).$$
Calcule $\bigcup_n A_n$, $\bigcap_n A_n$, $\bigcup_n B_n$, $\bigcap_n B_n$, $\bigcup_n C_n$, $\bigcap_n C_n$, $\bigcup_n D_n$, $\bigcap_n D_n$.

> A sequência $\{A_n\}$ é decrescente com $A_1 = [0,1]$ contendo todas: $\bigcup A_n = [0,1]$, $\bigcap A_n = \{0\}$ (único ponto em todo $[0,1/n]$). $\{B_n\}$ idem mas aberta em $0$: $\bigcup B_n = (0,1)$, $\bigcap B_n = \emptyset$ ($0$ não pertence a nenhum, e qualquer $x>0$ é excluído de $B_n$ para $n > 1/x$). $\{C_n\}$ disjuntos para $n \geq 2$: $\bigcup C_n = [1, \infty)$, $\bigcap C_n = \emptyset$ (já $C_1 \cap C_3 = \emptyset$). $\{D_n\}$ é crescente com $D_1 = (0,1)$ menor: $\bigcup D_n = (0, \infty)$, $\bigcap D_n = D_1 = (0,1)$.

**2.2** A tribo registra eventos meteorológicos para cada noite ao longo da migração. Seja $V_i$ o evento "vento-norte cortante na noite $i$", para $i = 1, 2, 3, \ldots$. Expresse, em termos dos $V_i$ e operações de conjuntos, os seguintes eventos:

(a) "vento-norte ocorre em ao menos uma noite";
(b) "vento-norte ocorre em todas as noites";
(c) "vento-norte não ocorre em noite alguma";
(d) "vento-norte ocorre em ao menos uma noite, mas não em todas".

> (a) $\bigcup_{i \geq 1} V_i$. (b) $\bigcap_{i \geq 1} V_i$. (c) $\bigcap_{i \geq 1} V_i^c = \left(\bigcup_{i \geq 1} V_i\right)^c$ (Lei do Espelho / De Morgan). (d) $\left(\bigcup_{i \geq 1} V_i\right) \cap \left(\bigcap_{i \geq 1} V_i\right)^c = \left(\bigcup_{i \geq 1} V_i\right) \setminus \left(\bigcap_{i \geq 1} V_i\right)$.

---

## Família 3 — *As Juras da Chama*

**3.1** Os Arquivistas registram que, em uma dada noite de verão, $P(\text{aurora visível}) = 0{,}3$ e $P(\text{vento-norte cortante}) = 0{,}5$. Estes dois fenômenos são disjuntos (nunca ocorrem na mesma noite). Calcule (a) $P(\text{aurora} \cup \text{vento})$, (b) $P(\text{aurora} \cap \text{vento}^c)$, (c) $P(\text{aurora} \cap \text{vento})$, (d) $P(\text{aurora}^c \cap \text{vento}^c)$.

> Sendo $A$ = aurora, $V$ = vento, com $A \cap V = \emptyset$:
> (a) Por A3: $P(A \cup V) = P(A) + P(V) = 0{,}8$.
> (b) $A \cap V^c = A$ (pois $A \cap V = \emptyset$ implica $A \subseteq V^c$): $P = 0{,}3$.
> (c) Disjuntos: $P = 0$.
> (d) Por De Morgan e P3: $P(A^c \cap V^c) = P((A \cup V)^c) = 1 - P(A \cup V) = 0{,}2$.

**3.2** Após uma temporada de Leituras, a Mestra calcula que, para uma dada amostra de água-de-poça: $P(\text{tocada}) = 0{,}4$, $P(\text{coletada à noite}) = 0{,}6$ e $P(\text{tocada} \cup \text{noite}) = 0{,}8$. Calcule $P(\text{tocada} \cap \text{noite})$, $P(\text{tocada} \cap \text{noite}^c)$, $P(\text{tocada}^c \cap \text{noite})$ e $P(\text{tocada}^c \cap \text{noite}^c)$.

> Sendo $T$ = tocada, $N$ = noite. Por inclusão-exclusão (P5): $P(T \cap N) = P(T) + P(N) - P(T \cup N) = 0{,}4 + 0{,}6 - 0{,}8 = 0{,}2$. Pela aditividade da decomposição $T = (T \cap N) \cup (T \cap N^c)$ disjunta: $P(T \cap N^c) = P(T) - P(T \cap N) = 0{,}2$. Simetricamente: $P(T^c \cap N) = P(N) - P(T \cap N) = 0{,}4$. Por De Morgan: $P(T^c \cap N^c) = 1 - P(T \cup N) = 0{,}2$. Verificação: a soma dos quatro vale $0{,}2 + 0{,}2 + 0{,}4 + 0{,}2 = 1$.
