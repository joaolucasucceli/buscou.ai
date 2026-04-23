# Post 02 — Foto IA "Dor concreta do ICP local"

## Metadados

| | |
|---|---|
| **Publicado em** | _aguardando publicacao_ |
| **Formato** | Foto unica · 1080x1350 (retrato 4:5) |
| **URL** | _sera preenchido apos publicar_ |
| **Issue Linear** | [BAI-39](https://linear.app/joao-lucas-ucceli/issue/BAI-39) |
| **Papel na sequencia** | 2/3 — ativar a dor concreta do ICP local |

## Objetivo editorial

Segunda publicacao da marca no Instagram. Papel: **ativar a dor** do ICP primario (negocios locais — clinica, cafe, imobiliaria, advogado). Se o Post 1 plantou a bandeira com a frase central, o Post 2 faz o espectador **sentir** o problema na pele. Cria ponte pro Post 3 (mecanica/solucao).

## Conceito visual (V3 — direcao atual)

Close medio (cabeca + ombros + maos com celular) de uma brasileira de negocio local (final dos 30 / inicio dos 40, tracos latinos, cabelo preso, maquiagem natural, cardigan casual-profissional, unha vermelha) olhando com **atencao reflexiva** pra tela do celular. Sobrancelha levemente franzida, olhos fixos, boca levemente entreaberta — momento de **"deixa eu entender isso"**, concentracao e leve incomodo, **jamais panico**. Pele natural preservada (nada verde-doentio). Acento mint-teal sutil vindo da tela ilumina a mao e o queixo de baixo pra cima. Fundo desfocado em bokeh quente: ambiente interno brasileiro (home-office ou sala de atendimento pequeno), lampada ambar distante.

**Aesthetic:** propaganda de tech brasileira elegante (ref: Nubank, iFood, Creditas) — **nao** editorial frio (V1), **nao** body horror (V2).

**Metafora visual:** o momento reflexivo em que voce finalmente testa o nome do seu negocio na busca e percebe que nao aparece. A descoberta consciente. Bate com a legenda ("Doeu?") sem recorrer a susto.

**Historico de iteracoes:**
- **V1** (rua noturna com vitrines) — descartada: generica, sem contexto BR, texto em ingles, pouco stop-scroll
- **V2** (close extremo, horror visual, olhos arregalados, verde-doentio) — descartada: stop-scroll forte mas **dissonante com o branding** (a marca vende "tecnologia limpa, inteligente", V2 entregava "panico sensacionalista"). Risco alto de afastar o ICP em vez de qualificar
- **V3** (close medio, reflexiva, elegante, pele natural, mint como acento sutil) — atual, aprovada

## Arquivos

- [`assets/imagem-principal.png`](assets/imagem-principal.png) — imagem final 1080x1350 gerada via Ideogram API + crop sharp
- [`source/prompt-imagem.md`](source/prompt-imagem.md) — prompt usado, config da API, seed (pra reprodutibilidade)
- [`legenda.md`](legenda.md) — legenda publicada seguindo estrutura canonica de 8 blocos

## Metricas

Preencher nas janelas 48h / 7d / 30d apos publicacao.

| Data | Janela | Alcance | Impressoes | Curtidas | Comentarios | Salvamentos | Compartilhamentos | Seguidores novos |
|---|---|---|---|---|---|---|---|---|
| TBD | 48h | — | — | — | — | — | — | — |
| TBD | 7d | — | — | — | — | — | — | — |
| TBD | 30d | — | — | — | — | — | — | — |

## Aprendizados pos-publicacao

_Preencher apos a janela de 48h. Comparar CTR, salvamentos e comentarios com o Post 1 (carrossel manifesto) pra identificar qual formato engaja mais neste ICP._

## Notas de producao

- **Producao ad-hoc** (E2 antes de F3 ser executada — ver comentario [Abertura] em [BAI-39](https://linear.app/joao-lucas-ucceli/issue/BAI-39)). Aprendizados devem migrar pro vault quando [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36) rodar.
- **Ferramenta:** Ideogram API V_2 REALISTIC. Escolhida pelo dono em chat 2026-04-23. Chave da API usada apenas via variavel de ambiente; **nao foi escrita em nenhum arquivo versionado**. Chave sera rotacionada pelo dono pos-uso.
- **Pipeline de geracao:** Ideogram gera 864x1152 (ASPECT_3_4, unico ratio mais proximo disponivel na V_2) → sharp cropa altura central pra 864x1080 → resize pra 1080x1350 (4:5). Script em `c:/tmp/buscou-ideogram/gen.js` (nao versionado).
- **Seed (V3 atual):** `1227136915`. V2 (descartada): `1663625176`. V1 (descartada): `1089638296`. Todas em `source/prompt-imagem.md` pra rastreabilidade + prompts completos.
- **Iteracao total: 3 versoes.** V1 descartada por falta de contexto BR e pouco stop-scroll. V2 descartada por horror visual e dissonancia com branding (marca = tecnologia limpa; V2 transmitia panico sensacionalista). V3 recalibrou pro ponto justo: close emocional mas composto, pele natural, acento mint sutil, vibe "propaganda tech BR elegante".
- **Aspect ratio nativo nao suportado:** V_2 nao tem `ASPECT_4_5`. Ao documentar [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36), registrar esse workaround (gerar em 3:4 + crop) como parte do playbook.
