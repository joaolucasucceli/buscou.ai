# Changelog — Vault buscou.ai

Historico de mudancas estruturais + canonicas da base de conhecimento. Seguindo [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

---

## [2.0.0] — 2026-04-23 — Padronizacao Definitiva

Grande reestruturacao apos decisoes canonicas tomadas em [[Decision Log - 2026-04-23]].

### Decisoes canonicas travadas (Nivel 1)
- Posicionamento: "Se alguem buscou, quem apareceu foi voce?".
- Produto: Blog + Motor (90 conteudos/mes, ~720K chars).
- Oferta unica: R$ 2.500 a vista ou R$ 3.000 parcelado 12x. Sem mensalidade. Sem tiers.
- Nao e SaaS, nao e agencia, nao e consultoria. E venda de tecnologia.
- ICP primario: negocios locais.
- Timeline: 7 dias ativacao / 30 dias primeiros sinais / escala continua.

### Adicionado
- `00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` — fonte unica da verdade.
- `00 - Verdade Unica/Governanca - Decisoes Canonicas.md` — processo de governanca.
- `05 - Modelo de Negocio/Decision Log - 2026-04-23.md` — registro formal da decisao.
- `Templates/Template - Nota Padrao.md` — padrao para novas notas.
- `CHANGELOG.md` — este arquivo.

### Estrutura reorganizada (de 21 pastas para 15 canonicas + 21 - IV + 99 - Arquivo Morto)

| De | Para |
|---|---|
| `00 - Indice` | `00 - Verdade Unica` |
| Extraido de `14 - Empresa` + `21 - IV` | `01 - Posicionamento` |
| Extraido de `14 - Empresa` + `07 - Negocio e Servico` | `02 - ICP` |
| Extraido de `14 - Empresa` + `07 - Negocio e Servico` | `03 - Oferta` |
| `18 - Produto` + Roadmap do Produto | `04 - Produto` |
| Extraido de `14 - Empresa` | `05 - Modelo de Negocio` |
| `01 - SEO Fundamentos` + `03 - Ferramentas/SEO` + `04 - Mercado` + parte de `20 - Referencias` | `06 - SEO` |
| `02 - AIO - AI Optimization` + `03 - Ferramentas/AIO` | `07 - AIO` |
| `05 - Estrategias e Frameworks` + `13 - Queries` | `08 - Estrategia Conteudo` |
| `09 - Execucao` + `10 - Dominio` | `09 - Execucao` |
| Go To Market + Script de Vendas | `10 - Go To Market` |
| `15 - Operacao` | `11 - Operacao` |
| `17 - Sistema` | `12 - Sistema` |
| `16 - Agentes` + `12 - Prompts` + Frameworks Multi-Agente | `13 - Agentes` |
| `19 - Marketing Automatizado` + `11 - Distribuicao` + Tom de Voz + Concorrentes + Casos | `14 - Marketing` |
| `08 - Glossario` | `15 - Glossario` |
| `21 - Identidade Visual` | `21 - Identidade Visual` (mantido, camada paralela) |
| `06 - Recursos de Aprendizado` + modelos de servico + SaaS Conteudo IA | `99 - Arquivo Morto` |

### Reescrito (conteudo alinhado com novas decisoes canonicas)
- `01 - Posicionamento/Proposta de Valor.md`
- `01 - Posicionamento/Conceito e Posicionamento.md`
- `02 - ICP/ICP por Nicho.md`
- `02 - ICP/Nicho Inicial.md`
- `03 - Oferta/Oferta Comercial.md`
- `04 - Produto/Roadmap do Produto.md`
- `05 - Modelo de Negocio/Modelo de Negocio.md`
- `05 - Modelo de Negocio/Canvas.md`
- `05 - Modelo de Negocio/Unit Economics.md`
- `05 - Modelo de Negocio/North Star Metric.md`
- `10 - Go To Market/Go To Market Inicial.md`
- `14 - Marketing/Tom de Voz e Marketing.md`
- `00 - Verdade Unica/MOC - Empresa.md`

### Corrigido
- `identidade-visual/Design System - README.md` — "BuscouAI" → "buscou.ai" em contexto tecnico.
- `21 - Identidade Visual/Auditoria da Identidade Visual.md` — removida referencia com capitalizacao errada.
- `00 - Verdade Unica/MOC - SEO.md` — link quebrado `[[Link Building Estrategico]]` consolidado.

### Arquivado (movido para 99 - Arquivo Morto)
- 7 arquivos de `06 - Recursos de Aprendizado` (Livros, Podcasts, Cursos, Blogs, Canais YouTube BR/Gringo, Comunidades).
- 6 modelos de servico de `07 - Negocio e Servico` (Contrato, Proposta Comercial, Precificacao, Relatorio, Como Oferecer SEO, Prova Social e ROI foram para 03 - Oferta).
- `20 - Referencias/SaaS de Conteudo IA.md` (ref de competidores, nao canonico).

### Camadas novas criadas na raiz do projeto
- `/produto/` — codigo da aplicacao (frontend, backend, pipeline, agents, cms, integracoes).
- `/conteudo/` — producao de conteudo (artigos, clusters, templates, imagens).
- `/agentes/` — prompts e contexto dos agentes IA.

### Atualizado
- `CLAUDE.md` do projeto — adicionada secao "Decisoes Canonicas (fixas)" e estrutura nova.

### Debito conhecido (revisar em proximo sprint)

Arquivos que ainda refletem o modelo anterior (Starter/Growth/Scale com mensalidade, 11 agentes incluindo SDR e Cobranca, pipeline envolvendo reuniao BANT). Foram movidos na reestruturacao mas **nao foram reescritos**. Ate serem revisados, tratar como historicos — a verdade canonica e [[VERDADE_UNICA_BUSCOU]].

**Com aviso explicito no topo (8 arquivos):**
- `11 - Operacao/SLAs e Garantias.md`
- `11 - Operacao/Pontos Criticos UX.md`
- `11 - Operacao/Jornada Interna.md`
- `11 - Operacao/Jornada do Cliente.md`
- `11 - Operacao/Fluxo Operacional Completo.md`
- `14 - Marketing/Tipos de Conteudo.md`
- `14 - Marketing/Funil Completo.md`
- `14 - Marketing/Distribuicao Automatica.md`

**Sem aviso (arquitetura tecnica — consultar com cuidado):**
- `13 - Agentes/Arquitetura de Agentes.md` (mencao a 11 agentes — modelo de venda unica reduz para 3-7 conforme [[Roadmap do Produto]])
- `13 - Agentes/Agente SDR.md` (nao entra no modelo de venda unica self-service)
- `13 - Agentes/Agente Cobranca.md` (pagamento e upfront, nao ha recorrencia a cobrar)
- `13 - Agentes/Orquestrador.md`, `Inputs dos Agentes.md`
- Demais agentes (Estrategista, Pesquisador, Redator, Revisor, Publicador, Monitor, Distribuidor, Suporte, Visual) — revisar prompts para consumir contexto de `/agentes/contexto/`
- `12 - Sistema/*` — varios arquivos mencionam tiers, SDR, Cobranca. Revisar conforme modelo venda unica.
- `04 - Produto/Requisitos Produto Autonomo.md`, `Modo MVP.md`, `Site Publico.md`, `Failure Modes.md`, `Tratamento de Falhas.md`, `O que Automatizar vs Humano.md` — auditar e realinhar.
- `09 - Execucao/Fluxo V1.md` — rever.
- `14 - Marketing/Case Proprio como Prova.md` — rever (dog-fooding mantem, numeros podem mudar).

**Acao:** abrir issue no Linear "Revisao de arquivos herdados apos Decision Log 2026-04-23" e priorizar em 2-3 sprints.

---

## [1.0.0] — 2026-04-22 — Versao inicial do vault

Estrutura inicial com 21 pastas (00-20 + Templates + Midia).

### Adicionado
- Base de conhecimento completa em SEO, AIO, frameworks, playbooks.
- Design System da buscou.ai v1.0 em `identidade-visual/`.
- Identidade Visual (secao 21) como memoria navegavel no vault.
