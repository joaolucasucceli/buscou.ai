# /agentes — prompts e contexto dos agentes IA

> Camada de **prompts + contexto compartilhado** dos agentes IA.
> A **implementacao** vive no codigo do produto (pasta `/produto/` sera criada quando o codigo comecar — ver [ESTRUTURA.md](../ESTRUTURA.md)).
> O **design** mora em [`../base-de-conhecimento/13 - Agentes/`](../base-de-conhecimento/13 - Agentes/).
> Aqui moram os prompts operacionais + contexto condensado.

**Antes de escrever qualquer prompt, ler obrigatoriamente:**
- [VERDADE_UNICA_BUSCOU.md](../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md)
- [13 - Agentes/Arquitetura de Agentes.md](../base-de-conhecimento/13 - Agentes/Arquitetura de Agentes.md)

---

## Estrutura

| Pasta | Responsabilidade |
|---|---|
| `prompts/` | Prompts operacionais por agente (agente-redator.md, agente-pesquisador.md, etc.). |
| `contexto/` | Snapshots do contexto compartilhado: VERDADE_UNICA, ICP, oferta, tom de voz, linguagem. |

---

## 11 agentes V1 + Orquestrador

Quando um agente e chamado:

1. Recebe **contexto compartilhado** de `contexto/`:
   - **verdade-unica.md** — definicao, posicionamento, produto, oferta, ICP.
   - **icp.md** — perfil do cliente por nicho.
   - **oferta.md** — o que pode/nao pode prometer.
   - **tom-de-voz.md** — atributos da voz, estrutura, exemplos.
   - **linguagem.md** — proibido vs permitido.
2. Recebe o **prompt especifico** de `prompts/`:
   - agente-redator → "escreva artigo 800-1.200 palavras sobre X"
   - agente-revisor → "valide schema + answer-first + score >= 75"
3. Executa.

Agentes sao coerentes com a marca por construcao — o contexto obriga.

---

## Lista de agentes V1 (11 + orquestrador)

### 6 core (MVP)

- `agente-pesquisador` — SERP + keywords + gaps
- `agente-estrategista` — clusters + calendario 90/mes
- `agente-redator` — artigos 800-1.200 palavras
- `agente-revisor` — score SEO + AIO + answer-first (>= 75)
- `agente-publicador` — CMS + sitemap + GSC
- `agente-monitor` — ranking + trafego + IA

### 5 complementares (V1 completa)

- `agente-visual` — capa + alt text
- `agente-distribuidor` — RSS/sitemap + LinkedIn/Medium
- `agente-suporte` — chatbot + escalacao
- `agente-prospeccao` — outbound (renomeacao do SDR)
- `agente-pagamento` — confirmacao + parcelas 12x (renomeacao do Cobranca)

### Coordenacao

- `orquestrador` — coordena tudo via MCP

---

## Principios dos prompts

- **Citar VERDADE_UNICA no system prompt** — toda geracao ancora na verdade canonica.
- **Incluir linguagem proibida** — o agente sabe o que NAO escrever.
- **Exemplos concretos** — poucos mas literais (few-shot com 1-2 exemplos canonicos).
- **Output estruturado** — JSON com `titulo`, `slug`, `corpo_markdown`, `schema_jsonld`, `meta_description`.
- **Versionamento semantico** — v1.0.0 inicial, bump minor em tweaks, major em mudanca de objetivo.

---

## Convencao de arquivo de prompt

`agente-{nome}-v{versao}.md`.

Exemplos:
- `agente-redator-v1.0.0.md`
- `agente-pesquisador-v1.0.0.md`
- `agente-revisor-v1.0.0.md`
- `agente-publicador-v1.0.0.md`
- `agente-monitor-v1.0.0.md`
- `agente-estrategista-v1.0.0.md`
- `agente-visual-v1.0.0.md`
- `agente-distribuidor-v1.0.0.md`
- `agente-suporte-v1.0.0.md`
- `agente-prospeccao-v1.0.0.md`
- `agente-pagamento-v1.0.0.md`
- `orquestrador-v1.0.0.md`

---

## Exemplo de prompt (agente-redator)

```markdown
# Prompt: Agente Redator v1.0.0

## Contexto compartilhado
(carregado automaticamente de /contexto/ — verdade-unica.md, icp.md, oferta.md, tom-de-voz.md, linguagem.md)

## Tarefa
Escreva um artigo de 800-1.200 palavras sobre "{keyword}" para o cliente "{cliente_slug}".

## Regras
- Answer-first: primeira resposta em <100 palavras.
- Nicho: {nicho} (seguir tom especifico do nicho se aplicavel).
- Schema obrigatorio: {tipo_schema}.
- Incluir CTA mencionando a oferta do cliente {cliente_cta}.
- Linguagem permitida/proibida: ver /contexto/linguagem.md.

## Output
JSON com:
- titulo
- slug
- meta_description (<155 chars)
- corpo_markdown
- schema_jsonld
- keywords_alvo
```

---

## Referencia

- [13 - Agentes/](../base-de-conhecimento/13 - Agentes/) — design completo dos 11 agentes
- [13 - Agentes/Prompts/](../base-de-conhecimento/13 - Agentes/Prompts/) — prompts antigos de design
- [VERDADE_UNICA_BUSCOU.md](../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md) — canonico
