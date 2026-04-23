# prototipos/instagram/

Pasta que arquiva **artefatos finais** (HTML, PNG, video, legendas) de cada publicacao de Instagram da buscou.ai. Versionado pra ser rastreavel e reusavel.

## Distincao canonica

| Pasta | Conteudo | Exemplo |
|---|---|---|
| `prototipos/instagram/` (este diretorio) | Artefatos: o que foi publicado | `post-01-carrossel-manifesto/` (HTML + PNGs + legenda) |
| `base-de-conhecimento/14 - Marketing/Social/` | Conhecimento narrativo: playbooks, Tom Instagram, Calendario Editorial | `Playbook - Carrossel Instagram.md` |

Os dois trabalham juntos: os playbooks apontam pra este diretorio via wiki-link ("exemplo canonico") e os READMEs daqui apontam pros playbooks.

## Nomenclatura padrao

Cada publicacao vira uma subpasta no formato:

```
post-{NN}-{tipo}-{slug-curto}/
```

- **NN** — numero sequencial zero-padded (01, 02, 03, ...)
- **tipo** — formato da peca: `carrossel`, `foto-ia`, `motion`, `reel`, `story`
- **slug-curto** — 2-5 palavras em kebab-case descrevendo o tema

Exemplos:

- `post-01-carrossel-manifesto/`
- `post-02-foto-ia-dor-icp/`
- `post-03-motion-mecanica/`
- `post-04-carrossel-educativo-seolocal/`

## Estrutura canonica de cada subpasta

```
post-{NN}-{tipo}-{slug}/
├── README.md          Ficha do post: contexto, data, URL, metricas
├── source/            Codigo-fonte (HTML, projeto AE, export Figma, etc.)
├── assets/            Binarios finais (PNGs, MP4, etc.) — prontos pra subir no IG
└── legenda.md         Legenda + hashtags efetivamente publicados
```

- **`README.md`**: ficha obrigatoria com contexto editorial, URL do post, tabela de metricas (atualizada em 48h / 7d / 30d), secao de aprendizados pos-publicacao.
- **`source/`**: fonte versionavel. Pra carrossel/HTML e o `.html`; pra foto IA e o prompt + config; pra motion e o projeto da ferramenta escolhida.
- **`assets/`**: output final exportado (PNG, MP4, JPG). O que foi subido no IG.
- **`legenda.md`**: a legenda final, exatamente como publicada, com hashtags. Markdown simples com secao de estrutura aplicada.

## Politica de versionamento

- HTML / prompts / projetos fonte → **sempre** no repo.
- PNGs 1080x1350 (~200-500KB cada) → versionar diretamente; reavaliar em 6-12 meses se o volume crescer.
- MP4 / motion 15s → versionar ate ~10MB; acima disso, avaliar Git LFS.
- `assets/.gitkeep` existe enquanto a pasta nao tem binarios, pra manter a estrutura visivel no git.

## Publicacoes arquivadas

Mesmo conteudo pode viver em mais de uma rede — cada linha representa uma peca produzida, com URLs das redes em que foi publicada.

| # | Tipo | Data | Instagram | TikTok | Issues |
|---|---|---|---|---|---|
| 01 | carrossel manifesto | 2026-04-23 | https://www.instagram.com/p/DXfUQawjv8A | https://www.tiktok.com/@buscou.ai/photo/7632102014847159553 | [BAI-38](https://linear.app/joao-lucas-ucceli/issue/BAI-38) · [BAI-64](https://linear.app/joao-lucas-ucceli/issue/BAI-64) |
| 02 | foto IA — dor ICP local | 2026-04-23 | https://www.instagram.com/p/DXff54DFAAX | https://www.tiktok.com/@buscou.ai/photo/7632102698623438096 | [BAI-39](https://linear.app/joao-lucas-ucceli/issue/BAI-39) · [BAI-63](https://linear.app/joao-lucas-ucceli/issue/BAI-63) |

Atualizar esta tabela a cada novo post arquivado (URL e data apos publicar em cada rede).

## Fontes relacionadas

- [CLAUDE.md](../../CLAUDE.md) — processo (SDD + SDP v2 + Tom de Voz)
- [ESTRUTURA.md](../../ESTRUTURA.md) — mapa fisico + politica de nomenclatura da raiz
- `base-de-conhecimento/14 - Marketing/Social/` — playbooks, Tom Instagram, Calendario Editorial (criados em [BAI-34](https://linear.app/joao-lucas-ucceli/issue/BAI-34))
- [identidade-visual/](../../identidade-visual/) — Design System (tokens, cores, tipografia) consumidos pelos HTMLs
