# Post 02 — Foto IA "Dor concreta do ICP local"

## Metadados

| | |
|---|---|
| **Publicado em** | 2026-04-23 |
| **Formato** | Foto unica · 1080x1350 (retrato 4:5) |
| **Issue Linear (produzir)** | [BAI-39](https://linear.app/joao-lucas-ucceli/issue/BAI-39) |
| **Papel na sequencia** | 2/3 — ativar a dor concreta do ICP local |

## Publicacoes (cross-network)

| Rede | URL | Data | Issue |
|---|---|---|---|
| Instagram | https://www.instagram.com/p/DXff54DFAAX/ | 2026-04-23 | [BAI-39](https://linear.app/joao-lucas-ucceli/issue/BAI-39) |
| TikTok | https://www.tiktok.com/@buscou.ai/photo/7632102698623438096 | 2026-04-23 | [BAI-63](https://linear.app/joao-lucas-ucceli/issue/BAI-63) |
| LinkedIn | https://www.linkedin.com/posts/buscou-ai-502875405_buscouai-seolocal-aio-share-7453229563205181440-V146 | 2026-04-23 | [BAI-65](https://linear.app/joao-lucas-ucceli/issue/BAI-65) |

Mesma imagem e mesma legenda nas 3 redes. Aspect ratio 4:5 (nativo IG) nao e otimo pro TikTok (prefere 9:16) nem pro LinkedIn (prefere 1:1 / 1.91:1) — aceitavel pra MVP de paridade; ambas as plataformas exibem com padding/crop. Iterar formato nativo em conteudo futuro produzido especificamente pra cada rede.

## Objetivo editorial

Segunda publicacao da marca no Instagram. Papel: **ativar a dor** do ICP primario (negocios locais — clinica, cafe, imobiliaria, advogado). Se o Post 1 plantou a bandeira com a frase central, o Post 2 faz o espectador **sentir** o problema na pele. Cria ponte pro Post 3 (mecanica/solucao).

## Conceito visual (V5 — direcao atual, aprovada)

Plano medio de um homem brasileiro 30s-40s, tracos latinos, cabelo escuro curto, barba bem aparada, avental sobre camiseta preta, relogio no pulso, **atras do balcao preto brilhante de seu proprio negocio moderno brasileiro** (barbearia premium / cafe especial / coworking). Ele olha pra tela do celular que segura nas maos — expressao concentrada e levemente preocupada, sobrancelha suavemente franzida, sem drama. Ao fundo, **neon ondulado branco-teal no teto** cria forte presenca tech, bokeh de luzes quentes e frias desfoca o ambiente, prateleiras com decor BR moderno.

**Aesthetic:** propaganda de tech brasileira contemporanea — dark-first com acento tech natural via decor real do ambiente, nao forcado. Ref: campanhas Nubank/iFood/Creditas de pequenos empreendedores BR.

**Metafora visual:** o dono de negocio moderno, no final do expediente, atras do proprio balcao, descobrindo que nao aparece nas buscas. A tecnologia esta no ambiente dele (o LED neon), mas nao esta a seu favor.

**Historico de iteracoes (5 versoes):**
- **V1** (rua noturna com 5 vitrines, uma escura) — descartada: generica, sem contexto BR, texto em ingles nas placas, pouco stop-scroll
- **V2** (close extremo, horror visual, olhos arregalados, pele verde-doentia) — descartada: stop-scroll forte mas **dissonante com o branding** ("marca vende tecnologia limpa; V2 entregava panico sensacionalista")
- **V3** (close medio, mulher em home-office, reflexiva, elegante, pele natural, mint sutil) — descartada: soberia mas **sem ar de tecnologia** (feedback do dono)
- **V4** (close medio, mulher com colar e cardigan bege, expressao neutra) — descartada: regrediu, ignorou instrucoes de lighting tech, vibe "joalheria" em vez de "tech BR"
- **V5** (homem em balcao de comercio moderno BR com LED neon branco-teal no teto) — **atual, aprovada**. Stop-scroll forte + branding consistent + contexto BR claro + ar tech via decor real + expressao composta. Todos os criterios em conjunto

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
- **Seed (V5 atual):** `2112010798`. V4 (descartada): `1929262769`. V3 (descartada): `1227136915`. V2 (descartada): `1663625176`. V1 (descartada): `1089638296`. Todas em `source/prompt-imagem.md` pra rastreabilidade + prompts completos.
- **Iteracao total: 5 versoes.** O salto critico foi V4 → V5: sair de "close de rosto em home-office" pra "plano medio em balcao de comercio com LED como decor real do ambiente". Quando o ar tech vira parte do cenario (nao acessorio adicionado depois), Ideogram V_2 entrega sem regredir nas outras dimensoes.
- **Aspect ratio nativo nao suportado:** V_2 nao tem `ASPECT_4_5`. Ao documentar [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36), registrar esse workaround (gerar em 3:4 + crop) como parte do playbook.
