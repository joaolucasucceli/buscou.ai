---
tipo: referencia
area: Sistema
tags: [referencias, multi-agente, framework, crewai, langgraph, claude]
atualizado: 2026-04-22
---

# Frameworks Multi-Agente

Comparacao detalhada dos principais frameworks para construir nosso [[Sistema Multi-Agente]] de SEO + AIO. A escolha do framework impacta diretamente velocidade de desenvolvimento, custo operacional e escalabilidade.

---

## 1. Claude Agent SDK (Anthropic)

**O que e:** SDK oficial da Anthropic que potencia o Claude Code. Permite construir agentes com tool use nativo, execucao de ferramentas, e integracao MCP (Model Context Protocol).

**Arquitetura:**
- Agente com tool execution built-in (nao precisa de framework externo)
- MCP para integracoes padronizadas com servicos externos (Slack, GitHub, Google Drive, etc.)
- Protocolo A2A (Agent-to-Agent) para comunicacao entre agentes
- Claude Managed Agents: servico em beta publico para deploy de agentes na nuvem Anthropic

**Pontos fortes:**
- Integracao nativa com Claude (melhor modelo para coding e raciocinio complexo em 2026)
- MCP elimina necessidade de escrever integracao custom para dezenas de servicos
- Tool use robusto e confiavel
- Claude Managed Agents permite deploy sem infraestrutura propria
- Melhor documentacao e suporte da Anthropic

**Pontos fracos:**
- Lock-in com Claude/Anthropic (nao e model-agnostic)
- Multi-agent orchestration ainda em "research preview" limitado
- Menos maduro que LangGraph para state management complexo
- Comunidade menor que LangChain/CrewAI

**Custo:** Pay-per-token do Claude API. Claude Sonnet: ~$3/MTok input, $15/MTok output. Claude Haiku: ~$0.25/MTok input, $1.25/MTok output.

**Fontes:** [Claude Agent SDK GitHub](https://github.com/anthropics/claude-agent-sdk-python) | [Agent SDK Overview](https://code.claude.com/docs/en/agent-sdk/overview) | [Building Agents with Claude](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk) | [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)

---

## 2. CrewAI

**O que e:** Framework de orquestracao multi-agente baseado em roles (papeis), inspirado em estruturas organizacionais do mundo real. Cada agente tem role, goal, e backstory.

**Arquitetura:**
- Role-based DSL: define agentes como membros de um "crew" com papeis especificos
- Task-based workflow: tarefas sao atribuidas a agentes especificos
- Crew orchestration: coordena a execucao das tasks entre agentes
- Suporte a A2A protocol (adicionado em 2026)

**Pontos fortes:**
- **Menor curva de aprendizado**: prototipo funcional em ~20 linhas de codigo
- **Mais rapido para prototipar**: conceito intuitivo (montar um time com roles)
- Muito alinhado com nosso conceito de "time de SEO com agentes"
- Model-agnostic: funciona com Claude, GPT, Gemini, modelos locais
- Comunidade ativa e crescente
- Integracao com ferramentas (tools) simples

**Pontos fracos:**
- **Production readiness media**: checkpointing limitado, menos observabilidade
- Menos controle granular sobre fluxo de execucao vs LangGraph
- Token overhead moderado (mais que LangGraph, menos que AutoGen)
- Streaming limitado
- Menos maduro para workflows complexos com loops e condicoes

**Custo:** Open source (gratuito). Custo sao apenas tokens do LLM escolhido.

**Fontes:** [CrewAI](https://www.crewai.com/) | [CrewAI vs LangGraph DataCamp](https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen) | [Multi-Agent Frameworks 2026](https://gurusup.com/blog/best-multi-agent-frameworks-2026)

---

## 3. LangGraph (LangChain)

**O que e:** Framework de orquestracao baseado em grafos (state machines) para workflows de agentes complexos. Parte do ecossistema LangChain.

**Arquitetura:**
- Graph-based: nos (nodes) representam acoes, arestas (edges) representam transicoes
- State management explicito: cada no tem acesso a um estado compartilhado
- Checkpointing: salva estado para retomada e time-travel debugging
- Streaming per-node: cada no pode transmitir tokens em tempo real

**Pontos fortes:**
- **Maior production readiness**: LangSmith para observabilidade, checkpointing, streaming
- **Melhor eficiencia de tokens**: menor overhead entre os frameworks
- Controle granular sobre fluxo de execucao (loops, condicoes, branches)
- Graph visualization e time-travel debugging (unico no mercado)
- Durable execution: retoma de onde parou apos falhas
- Model-agnostic

**Pontos fracos:**
- **Curva de aprendizado alta**: pensar em grafos e estados nao e intuitivo
- Mais verboso para casos simples (overkill para pipelines lineares)
- Ecossistema LangChain pode ser "over-engineered" para alguns casos
- Documentacao densa

**Custo:** Open source (gratuito). LangSmith (observabilidade): free tier + planos pagos ($39+/mes).

**Fontes:** [LangGraph](https://langchain-ai.github.io/langgraph/) | [LangGraph vs CrewAI Medium](https://medium.com/data-science-collective/langgraph-vs-crewai-vs-autogen-which-agent-framework-should-you-actually-use-in-2026-b8b2c84f1229) | [Agent Frameworks Compared](https://pecollective.com/blog/ai-agent-frameworks-compared/)

---

## 4. AutoGen (Microsoft)

**O que e:** Framework multi-agente baseado em conversacao. Agentes interagem via dialogo (chat patterns) para resolver tarefas colaborativamente.

**Arquitetura:**
- Conversational: agentes "conversam" entre si para chegar a solucoes
- Multiple chat patterns: round-robin, selector, broadcast
- AG2 rewrite: nova versao mais madura (2025-2026)

**Pontos fortes:**
- Maior acuracia em tarefas de raciocinio complexo
- Flexibilidade nos padroes de conversa
- Suporte nativo da Microsoft
- Bom para tarefas que exigem deliberacao multi-perspectiva

**Pontos fracos:**
- **5-6x mais caro** em tokens que LangGraph (overhead conversacional)
- Production readiness media (AG2 rewrite ainda amadurecendo)
- Streaming limitado (baseado em conversacao)
- Menos eficiente para pipelines lineares de execucao (como SEO)

**Custo:** Open source. Mas custo de tokens e 5-6x maior devido ao overhead de "conversas" entre agentes.

**Veredicto para nosso caso:** NAO recomendado. O overhead de tokens e inaceitavel para um pipeline de SEO que precisa ser executado centenas de vezes por mes. Melhor para research/analise do que para execucao repetitiva.

**Fontes:** [AutoGen](https://microsoft.github.io/autogen/) | [CrewAI vs AutoGen](https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen)

---

## 5. n8n

**O que e:** Plataforma de automacao de workflows visuais com nodes de IA integrados. Nao e um framework de agentes per se, mas permite construir workflows de agentes com drag-and-drop.

**Arquitetura:**
- Visual canvas: arrastar e soltar nodes
- 70+ nodes de IA com integracao LangChain profunda
- Multi-agent orchestration via sub-workflows
- Cada agente roda em ambiente Node.js containerizado isolado
- MCP support para integracao com servicos externos

**Pontos fortes:**
- **Visual e acessivel**: nao-devs podem entender e modificar workflows
- 400+ integracoes nativas (Google, Slack, WordPress, Stripe, etc.)
- Self-hosted ou cloud
- Evaluations para testar confiabilidade de IA
- Failover automatico com preservacao de estado

**Pontos fracos:**
- Menos flexibilidade que codigo puro para logica complexa
- Performance pode degradar com workflows muito grandes
- Dependencia da plataforma para execucao
- Menos controle sobre token optimization

**Pricing:**
| Plano | Preco |
|-------|-------|
| Community (self-hosted) | Gratuito |
| Starter (cloud) | $24/mes |
| Pro (cloud) | $60/mes |
| Enterprise | Custom |

**Veredicto para nosso caso:** Excelente para MVP e workflows auxiliares (notificacoes, integracao com ferramentas, scheduling). Nao ideal como framework principal para o core multi-agent engine, mas complementar.

**Fontes:** [n8n.io](https://n8n.io) | [n8n AI Agents](https://n8n.io/ai-agents/) | [n8n 2026 Guide](https://hatchworks.com/blog/ai-agents/n8n-guide/)

---

## Tabela Comparativa

| Criterio | Claude Agent SDK | CrewAI | LangGraph | AutoGen | n8n |
|----------|-----------------|--------|-----------|---------|-----|
| **Facilidade de uso** | Media | Alta | Baixa | Media | Muito Alta |
| **Production readiness** | Media-Alta | Media | Alta | Media | Alta |
| **Eficiencia de tokens** | Alta | Media | Melhor | Pior (5-6x) | Media |
| **Controle de fluxo** | Medio | Medio | Maximo | Medio | Medio |
| **Model-agnostic** | Nao (Claude) | Sim | Sim | Sim | Sim |
| **Observabilidade** | Boa | Limitada | Melhor (LangSmith) | Limitada | Boa |
| **Streaming** | Bom | Limitado | Melhor | Limitado | Bom |
| **Custo framework** | Gratis | Gratis | Gratis (+LangSmith) | Gratis | Gratis/Self-host |
| **Comunidade** | Crescente | Grande | Maior | Grande | Muito Grande |
| **MCP/A2A** | Nativo | A2A (2026) | Via LangChain | Nao | MCP support |
| **Checkpointing** | Managed Agents | Limitado | Nativo | Limitado | Nativo |

---

## Recomendacao

### Para MVP (Meses 1-3):

**CrewAI + n8n**

**Justificativa:**
- CrewAI e o mais rapido para prototipar um time multi-agente (CEO, Strategist, Researcher, Writer, Editor, Publisher) - conceito identico ao nosso
- 20 linhas de codigo para um crew funcional
- n8n para workflows auxiliares (webhooks Stripe, notificacoes WhatsApp, agendamento)
- Custo: apenas tokens do LLM
- Risco: se precisar de mais controle, migrar para LangGraph

### Para Producao (Mes 4+):

**LangGraph (core) + Claude Agent SDK (agentes inteligentes) + n8n (integracao)**

**Justificativa:**
- LangGraph para o pipeline principal: checkpointing, state management, observabilidade via LangSmith
- Claude Agent SDK para os agentes que precisam de raciocinio complexo (Strategist, Editor) via MCP
- n8n para integracoes e workflows auxiliares que nao-devs podem manter
- Melhor eficiencia de tokens = menor custo operacional
- Time-travel debugging e essencial para diagnosticar problemas em producao

### Decisao de modelo LLM:

| Agente | Modelo Recomendado | Justificativa |
|--------|-------------------|---------------|
| CEO/Orchestrador | Claude Sonnet | Bom raciocinio, custo moderado |
| Estrategista | Claude Opus | Raciocinio complexo, analise profunda |
| Pesquisador | Claude Haiku | Rapido, barato, bom para extracao de dados |
| Writer | Claude Sonnet | Boa escrita, custo-beneficio |
| Editor | Claude Sonnet | Analise de qualidade, scoring |
| Publisher | Claude Haiku | Tarefas simples de formatacao e publicacao |
| SDR | Claude Sonnet | Conversacao natural, persuasao |

> **Nota:** Ver [[Arquitetura do Sistema]] para diagrama de como os frameworks se integram e [[Estimativa de Custos LLM]] para projecao de gastos com tokens.
