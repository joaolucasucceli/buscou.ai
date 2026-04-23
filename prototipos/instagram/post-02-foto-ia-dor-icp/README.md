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

## Conceito visual (V2 — direcao atual)

Close-up do rosto de uma brasileira de negocio local (40s, tracos latinos, expressao de choque silencioso) iluminada pela **luz mint-teal intensa** da tela do celular que ela segura. Olhos arregalados, boca ligeiramente aberta — momento de descoberta desconfortavel, de "ver algo que nao da pra nao ter visto". Fundo desfocado: ambiente brasileiro aconchegante (prateleiras, lampada ambar quente ao longe). Elemento surreal: o glow da tela e exagerado, volumetrico, quase pulsando — como se a tela fosse um pequeno portal puxando toda a atencao e luz do comodo.

**Metafora visual:** o momento em que voce finalmente testa o proprio negocio na busca e percebe que nao aparece. A descoberta. O "doeu?" da legenda, visualmente.

**Por que essa direcao e nao a anterior:** a V1 (rua noturna com vitrine escura) era visualmente cinematografica mas **generica e sem contexto brasileiro** (placas em ingles, arquitetura anglo-saxa, sem stop-scroll real). O formato "foto unica no IG" exige imagem **chamativa, surreal, com retencao** — proxima a um still de filme do que a uma foto editorial de revista. V2 entrega isso.

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
- **Seed (V2 atual):** `1663625176`. V1 (descartada) tinha seed `1089638296`. Ambas em `source/prompt-imagem.md` pra historico.
- **Iteracao:** V1 foi descartada por feedback do dono (sem contexto BR, texto em ingles nas placas, pouco stop-scroll). V2 muda direcao completa — close-up emocional em vez de cenario amplo.
- **Aspect ratio nativo nao suportado:** V_2 nao tem `ASPECT_4_5`. Ao documentar [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36), registrar esse workaround (gerar em 3:4 + crop) como parte do playbook.
