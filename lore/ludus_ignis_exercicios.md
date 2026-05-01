# Ludus Ignis — Exercícios de Currículo (apresentação, v2)

Dois exercícios por família da taxonomia do §14. Intensidade de envolvimento B por padrão; matemática preservada. Cada item é seguido por uma linha curta com a *abordagem esperada* / resposta para verificação rápida do alinhamento com a família.

---

## Família 1 — *A Fala da Ordem*

**1.1** Um batedor retorna das ruínas do Vale Central com uma placa de bronze corroída exibindo 7 glifos pré-colapso distintos enfileirados. Os Arquivistas sabem que, em placas desse tipo, os 3 glifos de "alerta" nunca aparecem adjacentes — a convenção exigia que estivessem separados por outros símbolos. Quantos arranjos dos 7 glifos respeitam a restrição de não-adjacência dos alertas?

> Posicione primeiro os 4 glifos não-alerta ($4!$ ordens); eles criam 5 lacunas. Escolha 3 lacunas para os alertas e ordene-os: $\binom{5}{3}\,3!$. Total: $4! \cdot \binom{5}{3} \cdot 3! = 24 \cdot 10 \cdot 6 = 1440$.

**1.2** A tribo caminha em fila única de 12: os quatro Portadores do Fogo Ancião carregam o Fogo Ancião como um bloco contíguo fixo (a ordem interna é cerimonial e não é permutada), a Mestra da Leitura ocupa alguma posição na linha, e os 7 restantes são aprendizes. A Mestra não pode ser adjacente ao bloco dos Portadores (o bronze irradia e suas mãos não suportam o calor). Quantas ordens de marcha são admissíveis?

> Tratando o bloco como uma única unidade: 9 unidades em fila $\Rightarrow 9!$ no total. Subtraia as ordens em que a Mestra faz fronteira com o bloco (cole-a a um dos lados como super-unidade, 2 lados, 8 unidades restantes): $2 \cdot 8!$. Resposta: $9! - 2 \cdot 8! = 7 \cdot 8! = 282\,240$.

---

## Família 2 — *A Escolha do Bando*

**2.1** A tribo tem 12 batedores hábeis. Destes, 7 sabem ler o vento, 6 sabem ler o voo de retorno dos pássaros (usado para prever marés) e 3 são treinados em ambas as artes. Uma equipe de batedores de 4 pessoas precisa conter ao menos um leitor-de-vento E ao menos um leitor-de-pássaros. Quantas equipes qualificam?

> Apenas-vento $= 4$, apenas-pássaros $= 3$, ambos $= 3$, nenhum $= 2$. Inclusão–exclusão sobre o complemento: $\binom{12}{4} - \binom{5}{4} - \binom{6}{4} + \binom{2}{4} = 495 - 5 - 15 + 0 = 475$.

**2.2** Uma vigília do Fogo Ancião de 5 pessoas será escolhida para a próxima Longa Escuridão entre 8 anciãos e 6 aprendizes seniores. O Guardião do Fogo Ancião insiste em pelo menos 2 de cada categoria. Quantos comitês são admissíveis?

> Divisões $(2,3)$ e $(3,2)$: $\binom{8}{2}\binom{6}{3} + \binom{8}{3}\binom{6}{2} = 560 + 840 = 1400$.

---

## Família 3 — *As Bordas do Possível*

**3.1** Os registros decenais dos Arquivistas mostram que, em uma noite de verão durante o trecho do norte da Califórnia, $P(\text{aurora}) = 0{,}4$ e $P(\text{incursão de maré-espelho}) = 0{,}7$. As coocorrências nunca foram registradas separadamente. Forneça os limites mais agudos para a probabilidade de ambas ocorrerem em uma dada noite.

> Inferior (Bonferroni): $P(A \cap T) \ge P(A) + P(T) - 1 = 0{,}1$. Superior: $P(A \cap T) \le \min(P(A), P(T)) = 0{,}4$. Portanto $P(A \cap T) \in [0{,}1;\ 0{,}4]$.

**3.2** A Mestra confirma uma chamada de *tocada* quando três sinais menores aparecem todos: leve calor ($P = 0{,}9$ em uma verdadeira *tocada*), uma razão de cintilação da Cinder acima do limiar ($P = 0{,}85$) e o cheiro de ferro úmido ($P = 0{,}8$). A distribuição conjunta não foi registrada. Qual é o melhor limite inferior possível para a probabilidade de que os três sinais apareçam juntos em uma amostra verdadeiramente *tocada*?

> $P(\bigcap_i A_i) \ge 1 - \sum_i P(A_i^c) = 1 - (0{,}1 + 0{,}15 + 0{,}2) = 0{,}55$.

---

## Família 4 — *Os Dois Sinais*

**4.1** Em 200 noites de registros, 80 tiveram aurora visível, 60 tiveram Cinders excepcionalmente articuladas (noites de "brasa-viva"), e 40 tiveram ambas. *Aurora* e *brasa-viva* são independentes nesse conjunto de dados? Em caso negativo, em qual direção se associam?

> $P(A) = 0{,}4$, $P(B) = 0{,}3$, $P(A \cap B) = 0{,}2$ vs. $P(A)P(B) = 0{,}12$. Não-independentes; positivamente associadas.

**4.2** Uma amostra de 500 Leituras: 100 foram realizadas durante uma janela de maré-espelho, 250 retornaram *o fogo hesita*, e 60 das Leituras durante-maré hesitaram. Os eventos "durante uma maré" e "veredicto *o fogo hesita*" são independentes?

> $P(M) = 0{,}2$, $P(H) = 0{,}5$, $P(M \cap H) = 0{,}12$ vs. $P(M)P(H) = 0{,}10$. Não-independentes; marés empurram a Cinder para a hesitação.

---

## Família 5 — *A Mão Cega no Jarro*

**5.1** Um jarro de grãos contém 12 medidas: 7 *de nossa mão* e 5 *tocadas* (a Leitura foi adiada até depois da moagem por algum motivo infeliz). O moleiro recolhe 4 medidas sem olhar. Qual é a probabilidade de exatamente 2 das 4 serem *tocadas*?

> Hipergeométrica: $\dfrac{\binom{5}{2}\binom{7}{2}}{\binom{12}{4}} = \dfrac{10 \cdot 21}{495} = \dfrac{14}{33}$.

**5.2** Uma bolsa de adivinhação contém 9 fichas de osso: 4 com o glifo do Fogo Ancião e 5 com o glifo da Cinder. A Mestra retira 3 fichas *com reposição* (cada ficha retirada é registrada e devolvida). Qual a probabilidade de as três fichas retiradas carregarem o mesmo glifo?

> $\left(\tfrac{4}{9}\right)^3 + \left(\tfrac{5}{9}\right)^3 = \tfrac{64 + 125}{729} = \tfrac{189}{729} = \tfrac{7}{27}$.

---

## Família 6 — *O Caminho de Volta*

**6.1** *(A Leitura canônica)* A Cinder, bem alimentada e cuidada, tem sensibilidade $0{,}92$ (chama de *tocada* uma amostra verdadeiramente *tocada*) e especificidade $0{,}88$ (libera corretamente amostras *de nossa mão*). No acampamento atual, a Mestra estima uma probabilidade prévia de $0{,}15$ de que qualquer amostra forrageada esteja tocada pelo espelho. O aprendiz apresenta uma amostra; a Cinder a chama *tocada*. Qual a probabilidade posterior de que a amostra esteja genuinamente tocada?

> $P(M \mid +) = \dfrac{0{,}92 \cdot 0{,}15}{0{,}92 \cdot 0{,}15 + 0{,}12 \cdot 0{,}85} = \dfrac{0{,}138}{0{,}240} = 0{,}575$.

**6.2** *(inferência da fonte de coleta)* Três riachos ao alcance: A (montante alto, taxa-base de contaminação $0{,}05$), B (média elevação, $0{,}20$) e C (banhado baixo, $0{,}60$). Os batedores os visitam com frequências $0{,}5$, $0{,}3$, $0{,}2$. O cantil de um batedor que retornou Lê *parece tocada* — um evento ruidoso, com $P(+ \mid \text{contaminada}) = 0{,}9$ e $P(+ \mid \text{limpa}) = 0{,}1$. Qual a probabilidade posterior de a água ter vindo de C?

> $P(+\mid A) = 0{,}140$, $P(+\mid B) = 0{,}260$, $P(+\mid C) = 0{,}580$. $P(+) = 0{,}5(0{,}14) + 0{,}3(0{,}26) + 0{,}2(0{,}58) = 0{,}264$. $P(C \mid +) = 0{,}2 \cdot 0{,}58 / 0{,}264 \approx 0{,}439$.

---

## Família 7 — *O Conto dos Dois*

**7.1** Duas equipes de batedores, Norte e Leste, têm cada uma 10 oportunidades em suas respectivas rotas para identificar uma fonte de coleta viável. O sucesso por oportunidade do Norte é $0{,}4$; o do Leste, $0{,}3$. Sejam $X, Y$ suas contagens. Calcule $P(X = Y)$.

> $P(X = Y) = \displaystyle\sum_{k=0}^{10} \binom{10}{k}(0{,}4)^k(0{,}6)^{10-k}\binom{10}{k}(0{,}3)^k(0{,}7)^{10-k}$. Avaliação numérica $\approx 0{,}140$.

**7.2** Dois aprendizes, Mira e Theo, realizam, cada um, 8 Leituras em amostras independentes; a confiabilidade por Leitura de Mira é $0{,}85$, a de Theo, $0{,}75$. Calcule $P(X > Y)$, onde $X, Y$ são suas contagens de classificações corretas.

> $P(X > Y) = \displaystyle\sum_{j > i} \binom{8}{j}(0{,}85)^j(0{,}15)^{8-j}\binom{8}{i}(0{,}75)^i(0{,}25)^{8-i}$. Numericamente $\approx 0{,}448$.

---

## Família 8 — *A Forma do Acaso*

**8.1** A intensidade $X$ de uma maré-espelho ingressante (em unidades-de-maré, $0 \le X \le 4$) tem densidade $f(x) = c \cdot x(4-x)$ em seu suporte. Encontre $c$ e calcule $P(X > 3)$.

> $\int_0^4 x(4-x)\,dx = \tfrac{32}{3}$, logo $c = \tfrac{3}{32}$. $P(X > 3) = \tfrac{3}{32}\int_3^4 x(4-x)\,dx = \tfrac{5}{32}$.

**8.2** A velocidade do vento $W$ em dias de marcha tem densidade $f(w) = \tfrac{1}{16}\,w\,e^{-w/4}$ para $w \ge 0$ (km/h) — uma Erlang-2. A Cinder aconselha o abrigo quando $W > 8$. (a) Verifique que a densidade está normalizada. (b) Probabilidade de abrigar-se em um dia aleatório?

> (a) $\int_0^\infty \tfrac{1}{16}we^{-w/4}\,dw = 1$. (b) $P(W > 8) = e^{-2}(1 + 2) = 3e^{-2} \approx 0{,}406$.

---

## Família 9 — *A Régua de Decisão*

**9.1** Defina um "dia de tempestade" como $W > 12$ km/h, com $W$ Erlang-2 como em 8.2. Os ventos diários são independentes. Seja $Y$ a contagem de dias de tempestade ao longo de uma marcha de 30 dias. Encontre $E[Y]$.

> $P(\text{tempestade}) = e^{-3}(1+3) = 4e^{-3} \approx 0{,}199$. $Y \sim \text{Bin}(30,\ 4e^{-3})$, $E[Y] = 120 e^{-3} \approx 5{,}97$.

**9.2** Uma pontuação contínua de Leitura $S$ é uniforme em $[-1, 1]$ para amostras *de nossa mão* e uniforme em $[-0{,}5;\ 1{,}5]$ para amostras *tocadas*. A Cinder usa o limiar $S > 0{,}5$ para chamar *tocada*. (a) Taxa de falso-positivo? (b) Taxa de verdadeiro-positivo?

> (a) $P(S > 0{,}5 \mid \text{nossa mão}) = 0{,}25$. (b) $P(S > 0{,}5 \mid \text{tocada}) = 0{,}5$.

---

## Família 10 — *A Mistura dos Fluxos*

**10.1** Incursões de maré-espelho chegam pelo Pacífico (Poisson, taxa $1{,}5$ por semana) e pelos pântanos do sul (Poisson, taxa $0{,}8$ por semana), independentemente. Qual a probabilidade de exatamente 3 incursões em uma dada semana?

> A soma é Poisson de taxa $2{,}3$. $P(N = 3) = e^{-2{,}3}\,2{,}3^3 / 6 \approx 0{,}203$.

**10.2** O número de dias nublados antes do primeiro dia claro nos contrafortes ocidentais, $X$, é geométrico com probabilidade de sucesso $0{,}4$ (contando falhas); nos contrafortes orientais, $Y$, geométrico com $0{,}3$, independente de $X$. O acampamento só é desmontado depois que ambos sinalizam claro. Configure a convolução para $P(X + Y = n)$ e calcule $P(X + Y \le 2)$.

> $P(X + Y = n) = \displaystyle\sum_{k=0}^{n}(0{,}6)^k(0{,}4)\,(0{,}7)^{n-k}(0{,}3)$. Calculando: $P(X+Y=0) = 0{,}12$, $P(X+Y=1) = 0{,}156$, $P(X+Y=2) = 0{,}1524$. Acumulado $\approx 0{,}428$.

---

## Família 11 — *O Primeiro a Voltar*

**11.1** Três batedores em rotas independentes retornam após tempos $T_1, T_2, T_3$ i.i.d. exponenciais com média 6 dias. Tempo esperado do primeiro retorno?

> $\min(T_1, T_2, T_3) \sim \text{Exp}(3/6) = \text{Exp}(1/2)$, então $E[\min] = 2$ dias.

**11.2** Cinco cantis deixam o acampamento cheios; cada um vaza completamente após um tempo uniformemente distribuído em $[0, 10]$ dias, independente dos demais. Probabilidade de o *último* cantil ainda estar cheio no dia 8?

> $P(\max > 8) = 1 - P(\text{todos} \le 8) = 1 - (0{,}8)^5 \approx 0{,}672$.

---

## Família 12 — *A Soma dos Pequenos*

**12.1** Cada um dos 18 anciãos é insone em uma noite de atividade solar, independentemente, com probabilidade $0{,}7$. Seja $N$ a contagem de insones. Encontre $E[N]$ e $\text{Var}(N)$.

> $E[N] = 18 \cdot 0{,}7 = 12{,}6$. $\text{Var}(N) = 18 \cdot 0{,}7 \cdot 0{,}3 = 3{,}78$ (independência).

**12.2** Uma fila de 12 aprendizes aguarda a Leitura noturna. Cada um está descalço com probabilidade $0{,}4$, independente dos demais. Seja $M$ o número de *pares adjacentes* em que ambos estão descalços. Encontre $E[M]$.

> Indicador sobre 11 pares adjacentes: $E[M] = 11 \cdot 0{,}4^2 = 1{,}76$. (A $\text{Var}(M)$ exigiria contabilizar aprendizes compartilhados em pares sobrepostos — desdobramento natural.)

---

## Família 13 — *A Meia-Vida das Coisas*

**13.1** Um vaso de bronze para Cinder tem tempo de vida exponencial com média de 50 anos. (a) Probabilidade de sobreviver além de 80 anos? (b) Dado que já durou 30, probabilidade de chegar a 80?

> (a) $P(T > 80) = e^{-1{,}6} \approx 0{,}202$. (b) Falta de memória: $P(T > 80 \mid T > 30) = P(T > 50) = e^{-1} \approx 0{,}368$.

**13.2** Uma corda de escalada nova tem taxa de risco crescente $h(t) = 0{,}02\, t$ para $t \ge 0$ em meses de uso. (a) Probabilidade de sobreviver além do mês 5? (b) Tempo de vida mediano?

> $S(t) = \exp\!\left(-\int_0^t 0{,}02\, s\, ds\right) = e^{-0{,}01\, t^2}$. (a) $S(5) = e^{-0{,}25} \approx 0{,}779$. (b) $0{,}01\, t_m^2 = \ln 2 \Rightarrow t_m = \sqrt{100\ln 2} \approx 8{,}33$ meses.

---

## Família 14 — *Os Limites do Pior Caso*

**14.1** A contagem ambiente de esporos-espelho por litro de água forrageada tem média $50$ e desvio-padrão $12$, com distribuição desconhecida. Use Chebyshev para limitar a probabilidade de um litro aleatório exceder $80$ esporos.

> $P(|X - 50| \ge 30) \le \tfrac{144}{900} = 0{,}16$, logo $P(X \ge 80) \le 0{,}16$.

**14.2** O peso da mochila $W \ge 0$ de um batedor que retorna tem média $12$ kg. Use a desigualdade de Markov para limitar $P(W \ge 30)$.

> $P(W \ge 30) \le 12/30 = 0{,}4$.

---

## Família 15 — *O Laço Escondido*

**15.1** Sejam $X = \mathbf{1}[\text{dia chuvoso}]$, $Y = \mathbf{1}[\text{ao menos um membro da tribo adoece}]$. Estatísticas de longo prazo: $E[X] = 0{,}4$, $E[Y] = 0{,}3$, $E[XY] = 0{,}18$. Calcule $\text{Cov}(X, Y)$ e a correlação.

> $\text{Cov}(X, Y) = 0{,}18 - 0{,}12 = 0{,}06$. $\rho = \dfrac{0{,}06}{\sqrt{0{,}24 \cdot 0{,}21}} \approx 0{,}267$.

**15.2** *(impulso latente compartilhado da Cinder — dependência induzida sob independência condicional)* Em uma noite especial, com probabilidade $\tfrac{1}{2}$ a noite é auspiciosa, e cada aprendiz independentemente resolve um problema com probabilidade $0{,}5$; caso contrário, cada um independentemente o resolve com probabilidade $0{,}1$. Sejam $X_1, X_2$ os indicadores de resultado de dois aprendizes distintos. Calcule $\text{Cov}(X_1, X_2)$.

> $P(X_i = 1) = 0{,}5(0{,}5) + 0{,}5(0{,}1) = 0{,}3$. $E[X_1 X_2] = 0{,}5(0{,}25) + 0{,}5(0{,}01) = 0{,}130$. $\text{Cov} = 0{,}130 - 0{,}09 = 0{,}04 > 0$. Independência condicional dada a variável latente produz correlação marginal positiva.

---

## Família 16 — *A Espera pelo Sinal*

**16.1** Durante o Brilho, uma aurora é visível com probabilidade $0{,}25$ a cada noite, independentemente. Seja $T$ a noite da primeira aurora (contando a partir da noite 1). Encontre $E[T]$ e $P(T > 7)$.

> Geométrica: $E[T] = 4$. $P(T > 7) = (0{,}75)^7 \approx 0{,}1335$.

**16.2** Uma Cinder está "fraca" em um dia qualquer com probabilidade $0{,}3$, independentemente. O aprendiz acompanha diariamente, contabilizando uma *sequência* assim que ocorrem 3 dias fracos consecutivos. Número esperado de dias até a primeira sequência aparecer?

> Tempo de espera por padrão: $E[T_3] = \tfrac{1}{p} + \tfrac{1}{p^2} + \tfrac{1}{p^3}$ para $p = 0{,}3$ $\Rightarrow$ $E[T_3] \approx 3{,}33 + 11{,}11 + 37{,}04 \approx 51{,}5$ dias.

---

## Família 17 — *A Voz das Multidões*

**17.1** Em 100 anos de registros, as incursões de maré-espelho por ano têm média 18 e variância 25. Os Arquivistas examinam a média amostral $\bar X$ na janela de 100 anos. Use o TLC para aproximar $P(\bar X > 19)$.

> $\bar X \approx \mathcal{N}(18;\ 0{,}25)$, DP $= 0{,}5$. $P(\bar X > 19) \approx P(Z > 2) \approx 0{,}0228$.

**17.2** A Mestra deseja a taxa de longo prazo $p$ de chamadas *tocada* por uma Cinder específica. Tratando Leituras sucessivas como i.i.d. Bernoulli$(p)$, quantas Leituras são necessárias para que a proporção amostral $\hat p$ esteja a no máximo $0{,}05$ de $p$ com probabilidade ao menos $0{,}95$? Use a variância de pior caso.

> $1{,}96 \cdot \sqrt{0{,}25/n} \le 0{,}05 \Rightarrow n \ge \left(\tfrac{1{,}96 \cdot 0{,}5}{0{,}05}\right)^2 = 384{,}16 \Rightarrow n \ge 385$.

---

## Família 18 — *A Geometria do Acaso*

**18.1** Uma corda de 90 cm, usada para sustentar o tripé do vaso da Cinder, parte-se em um ponto aleatório uniforme ao longo de seu comprimento. Cada peça serve como perna do tripé apenas se tiver pelo menos 30 cm. Probabilidade de ambas as peças serem utilizáveis?

> Necessário $30 \le X \le 60$ para $X \sim \mathcal{U}(0, 90)$. $P = 30/90 = 1/3$.

**18.2** Dois batedores são esperados de volta ao acampamento dentro de uma janela de 4 horas; seus tempos de chegada são uniformes e independentes dentro dessa janela. Probabilidade de o intervalo entre as chegadas ser menor que 1 hora (de modo que a Leitura de seu equipamento possa ser feita conjuntamente)?

> Espaço amostral $[0, 4]^2$ tem área 16. A região complementar $|X - Y| \ge 1$ é constituída de dois triângulos de canto com área total 9. $P(|X - Y| < 1) = 7/16$.

---

## Notas sobre este lote

- Todos os 36 problemas usam parâmetros que produzem respostas limpas (frequentemente racionais, ocasionalmente irracionais nomeadas) — adequados para cálculo manual e como sementes para *templates* parametrizáveis.
- Três famílias estão notavelmente esparsas na coluna *worldframe* do §14 em relação ao quanto precisarão carregar: família 6 (A Leitura canônica — os exercícios 6.1 e 6.2 servem, mas a mecânica diária exigirá dezenas mais variantes); família 14 (a família Markov/Chebyshev se encaixará bem em advertências da Mestra da Leitura sobre cargas de esporos, mas precisa de seu próprio dialeto); família 18 (a imagem da corda-quebrada-como-perna-do-tripé é boa, mas solitária — problemas de probabilidade geométrica além de cortes lineares precisarão de novas ambientações).
- Evitei usar, dentro dos próprios exercícios, qualquer aspecto da ambientação que o §1 marca como algo que o jogador deve *inferir* (a verdadeira origem das fogueiras, o mecanismo de polarização, a cascata em si) — isso permanece como cenário e parâmetros, não como respostas. Preserva-se assim a promessa do §1 de que a probabilidade segue sendo a ferramenta do jogador para retrodizer o mundo, em vez de algo que o currículo entrega.
