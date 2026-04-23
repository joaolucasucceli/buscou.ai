# ESTRUTURA.md — mapa fisico e politica de nomenclatura

Complementa [CLAUDE.md](CLAUDE.md) (processo) e [VERDADE_UNICA_BUSCOU.md](base-de-conhecimento/00%20-%20Verdade%20Unica/VERDADE_UNICA_BUSCOU.md) (canonico).
Aqui mora a resposta para **"onde fica isso?"** e **"como nomear?"**.

## Mapa fisico da raiz

```
Buscou.ai/
├── CLAUDE.md               Processo (SDD + SDP v2 + Tom)
├── README.md               Overview curto do repo
├── ESTRUTURA.md            Este arquivo
├── .gitignore .gitattributes
├── .claude/                Config Claude Code (settings)
├── .vercel/                Link Vercel (deploy)
├── .git/                   Versionamento
├── agentes/                Prompts + contexto compartilhado dos agentes IA
├── base-de-conhecimento/   Vault Obsidian (16 secoes canonicas 00-16 + Templates)
├── identidade-visual/      Design System — CODIGO + ASSETS (tokens, SVGs, React)
├── prototipos/             HTMLs de prototipo (site publico V1, brand book) + publicacoes Instagram (instagram/)
└── supabase/               Config + migrations SQL do banco
```

**Pastas removidas em 2026-04-23 (BAI-31):** `/produto/` e `/conteudo/`. Eram placeholders. `/produto/` sera recriada quando o codigo comecar — **decidir estrutura primeiro** (Next.js puro vs monorepo com workers) antes de criar subpastas.

## Principio de uma funcao por pasta

Cada pasta da raiz tem responsabilidade unica e disjunta das outras. Se um arquivo nao cabe em nenhuma, repense o que ele e — provavelmente falta contexto ou a pasta que deveria existir e outra.

- `identidade-visual/` tem **codigo** do DS; a **documentacao** do DS mora em `base-de-conhecimento/16 - Identidade Visual/`. Nao duplicar.
- `agentes/` tem **prompts operacionais** (o "o que falar com o modelo"); o **design** dos agentes mora em `base-de-conhecimento/13 - Agentes/`; a **implementacao** vivera em `produto/` quando existir.

## Politica de nomenclatura

Unificada, uma regra por camada. Se estiver em duvida, copie o padrao do vizinho mais proximo.

| Camada | Padrao | Exemplo |
|---|---|---|
| **Pastas do filesystem** (raiz e abaixo, fora do vault) | `kebab-case` | `identidade-visual/`, `site-publico-v1/` |
| **Pastas do vault Obsidian** | `NN - Nome em Title Case` (ordenacao) | `00 - Verdade Unica/`, `16 - Identidade Visual/` |
| **Arquivos do vault Obsidian** | `Nome Da Nota.md` (Title Case com espacos) | `Regras de Uso.md`, `Tokens de Design.md` |
| **Componentes React** | `PascalCase.tsx` | `Button.tsx`, `SearchBar.tsx` |
| **Hooks e utilitarios JS/TS** | `camelCase` | `useSearch.ts`, `formatCurrency.ts` |
| **CSS / JSON / config** | `kebab-case` ou `lowercase` | `tokens.json`, `colors.css`, `next.config.js` |
| **Decision Logs** | `Decision Log - YYYY-MM-DD[ - Sufixo].md` | `Decision Log - 2026-04-23 - Infra Mensal.md` |
| **Issues Linear** | prefixo `BAI-X:` em commits | `BAI-31: reorganizacao de pastas raiz` |
| **Branches** | `kebab-case` com prefixo | `chore/BAI-31-reorganizacao-pastas`, `feature/BAI-23-pagina-vendas` |

**Nunca misturar padroes na mesma camada.** Ex: em um filesystem `kebab-case`, nao criar uma pasta `MyComponents/`.

## Quando criar pasta nova na raiz

Criterio: **responsabilidade unica + nao encaixa em nenhuma pasta existente**. Se encaixa em `identidade-visual/`, `base-de-conhecimento/`, `agentes/`, `prototipos/`, `supabase/` — ela vai la.

Justifique a nova pasta em 1 frase no commit que a cria. Atualize este `ESTRUTURA.md` no mesmo commit.

## O que NAO criar

- `misc/`, `utils/`, `helpers/`, `shared/` soltos na raiz — ambiguos, viram gaveta.
- `temp/`, `tmp/`, `backup/`, `old/`, `_archive/` — nao existe arquivo morto neste repo; conteudo obsoleto e deletado na hora (decisao de 2026-04-23, ver CHANGELOG do vault).
- Pastas vazias com so README placeholder "a implementar" — ver licao aprendida com `/produto/` e `/conteudo/`. Planejamento e spec mora em issue/decision log, nao em arvore de pastas.
- Duplicidades de conteudo entre camadas — escolha uma fonte unica (ex: docs do DS so no vault; codigo do DS so em `identidade-visual/`).

## Fontes canonicas (quando duas pastas parecem falar do mesmo)

| Topico | Fonte unica |
|---|---|
| Identidade visual (docs narrativos) | `base-de-conhecimento/16 - Identidade Visual/` |
| Identidade visual (codigo + assets) | `identidade-visual/` |
| Agentes (design/arquitetura) | `base-de-conhecimento/13 - Agentes/` |
| Agentes (prompts operacionais) | `agentes/prompts/` |
| Produto (o que construir) | `base-de-conhecimento/04 - Produto/` |
| Produto (stack tecnico) | `base-de-conhecimento/12 - Sistema/` |
| Processo operacional | `CLAUDE.md` |
| Verdade canonica da empresa | `base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` |
| Publicacoes Instagram (artefatos finais: HTML, PNG, MP4, legenda) | `prototipos/instagram/` |
| Publicacoes Instagram (conhecimento narrativo: playbook, tom, calendario) | `base-de-conhecimento/14 - Marketing/Social/` (criado em [BAI-34](https://linear.app/joao-lucas-ucceli/issue/BAI-34)) |

## Subpastas de `prototipos/instagram/`

Cada publicacao IG e arquivada em subpasta nomeada `post-{NN}-{tipo}-{slug-curto}/`:

- **NN** — numero sequencial zero-padded (01, 02, ...)
- **tipo** — `carrossel`, `foto-ia`, `motion`, `reel`, `story`
- **slug-curto** — 2-5 palavras kebab-case

Estrutura canonica de cada subpasta: `README.md` (ficha) + `source/` (fonte) + `assets/` (binarios finais) + `legenda.md` (copy publicada). Politica completa em [prototipos/instagram/README.md](prototipos/instagram/README.md).
