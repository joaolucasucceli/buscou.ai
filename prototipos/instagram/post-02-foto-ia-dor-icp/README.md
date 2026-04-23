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

## Conceito visual

Rua noturna de um bairro local, com cinco vitrines de pequenos negocios iluminadas (cafe, clinica, boutique, imobiliaria, escritorio). No centro da composicao, **uma loja esta completamente escura** — vitrine preta, placa apagada, invisivel comparada as vizinhas. Uma pessoa passa em primeiro plano, celular na mao emitindo glow mint/teal suave. Fotografia cinematografica, moody, 35mm film grain.

**Metafora visual:** "todas as outras lojas aparecem; a sua nao". Vale tanto pra vitrine fisica quanto pra busca digital — que e o ponto da legenda.

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
- **Seed:** `1089638296` — gravada em `source/prompt-imagem.md` pra reprodutibilidade.
- **Aspect ratio nativo nao suportado:** V_2 nao tem `ASPECT_4_5`. Ao documentar [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36), registrar esse workaround (gerar em 3:4 + crop) como parte do playbook.
