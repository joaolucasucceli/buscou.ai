# Changelog — Vault buscou.ai

Historico de mudancas estruturais + canonicas da base de conhecimento. Seguindo [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

---

## [2.6.0] — 2026-04-23 — Pivot para venda consultiva (reuniao obrigatoria + proposta personalizada)

Mudanca de Nivel 1 no processo de venda: de **self-service com preco exposto na landing** para **venda consultiva com reuniao de diagnostico obrigatoria + proposta personalizada escrita pos-call**. **Valores canonicos nao mudam** (R$ 2.500 / R$ 3.000 implementacao + R$ 300/mes infra). Executada no escopo da issue [BAI-57](https://linear.app/joao-lucas-ucceli/issue/BAI-57) como pre-requisito da landing ([BAI-30](https://linear.app/joao-lucas-ucceli/issue/BAI-30)).

### Novo (core canonico)

- `05 - Modelo de Negocio/Decision Log - 2026-04-23 - Venda Consultiva.md` — formaliza o pivot. Contem: contexto, decisao antes/depois, fluxo novo detalhado (agendamento → diagnostico → proposta → pagamento), conteudo canonico da proposta personalizada (cabecalho, contexto, diagnostico, metodologia, escopo, valores, timeline, proximos passos), alternativas descartadas (self-service mantido, consultivo leve, consultivo com preco variavel), trade-offs, impacto em linguagem (novos termos proibidos: self-service, call opcional, sem BANT, sem reuniao obrigatoria, checkout direto; novos permitidos: reuniao de diagnostico, proposta personalizada, agendar diagnostico), arquivos afetados em cascata, gatilhos de revisao.

### Reescrito (nucleo canonico)

- `00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md`:
  - **Topo:** entrada nova em "Ultimas alteracoes Nivel 1".
  - **§5 (Modelo Comercial):** pagamento da implementacao agora e "link enviado via WhatsApp apos o cliente aceitar a proposta personalizada" (era "checkout direto").
  - **§6 (Linguagem):** 5 termos novos proibidos (self-service, call opcional, sem reuniao obrigatoria, sem BANT em copy, checkout direto) e 5 novos permitidos (reuniao de diagnostico, proposta personalizada, agendar diagnostico, compra consultiva, diagnostico hiperpersonalizado).
  - **§7 (Promessa vs Entrega):** linha "Implementacao unica" detalha pagamento pos-proposta; nova linha "Diagnostico e proposta personalizada".
  - **§8 (Estrutura de venda):** reescrita completa. Remove "sem reuniao obrigatoria", "sem BANT", "call opcional". Substitui por fluxo consultivo de 13 passos (landing → WhatsApp → reuniao 30-60min → proposta em 24h → aceite → pagamento → onboarding → blog no ar 7d).
  - **§11 (Contato Oficial):** mensagem pre-preenchida do WhatsApp muda de "quero entender melhor como funciona" para "quero agendar um diagnostico do meu negocio".
- `03 - Oferta/Oferta Comercial.md`:
  - Secao "O que voce NAO vende" ganha "nao vende self-service".
  - Secao "O que voce vende" reescrita — menciona reuniao + proposta por escrito.
  - Pitch reescrito de "call opcional 20-30 min" para **roteiro canonico de reuniao de diagnostico de 30-60 min em 6 blocos** (abertura com busca ao vivo / entendimento / metodologia / solucao aplicada / oferta / fechamento com proposta em 24h).
  - Objecoes recalibradas: novas ("por que precisa de reuniao?", "vou receber proposta quando?", "nao sei se quero fazer a reuniao") + 3 existentes ajustadas pra referenciar reuniao/proposta.
  - "Fluxo de venda" reescrito como 13 passos consultivos. Remove "sem BANT, sem reuniao obrigatoria, sem ciclo longo".
  - **Nova secao "Proposta personalizada (PDF/HTML)"** com estrutura canonica do documento (cabecalho, contexto, diagnostico, metodologia, escopo, valores canonicos, timeline, proximos passos, dados BuscouAI) + regra critica (valores nao negociam — personalizacao e de contexto e escopo).
  - "Funil esperado" atualizado com etapa de reuniao/proposta + novos percentuais calibrados pra consultivo.
  - "Regras inegociaveis" ganha 4 novas (nao fechar sem reuniao, nao expor preco na landing, nao enviar proposta sem reuniao, nao negociar preco na proposta).

### Atualizado (camada operacional)

- `01 - Posicionamento/Proposta de Valor.md` — tabela "vs agencia" ganha 2 linhas (reuniao de diagnostico real + proposta hiperpersonalizada).
- `01 - Posicionamento/Conceito e Posicionamento.md` — tabela "Aplicacoes do conceito" ajustada: CTA do hero agora e "Agendar diagnostico"; nova linha "CTA canonico da landing"; nova linha "Reuniao de diagnostico"; nova linha "Proposta personalizada".

### Motivacao

Durante o planejamento da landing (BAI-30), ao apresentar wireframe com preco exposto e CTA WhatsApp direto, o dono revisou a direcao:
- Landing com teor de chamar pra **agendar diagnostico**, nao pra conversa solta.
- **Compra e consultiva** — precisa de reuniao. Preco nao expoe em landing.
- Funil: marketing → WhatsApp → reuniao → proposta → pagamento.
- Comunicacao publica alveja fundo de funil.

Ticket B2B de R$ 2.500+ em ICP de negocios locais exige construcao de confianca que self-service nao entrega. O diagnostico gratuito dentro da reuniao vira diferencial percebido — e a proposta escrita em 24h vira segundo touchpoint de conversao (cliente pode compartilhar com socio/conjuge/contador dentro da validade de 7 dias).

### Impacto operacional

- **Landing (BAI-30):** CTA unico "Agendar diagnostico"; zero exposicao de preco; mensagem pre-preenchida do WhatsApp muda; dobra de oferta vira dobra de "Como funciona o processo" (reuniao → proposta).
- **Constante `WHATSAPP_URL`** em `site/src/lib/constants.ts` puxa a nova mensagem "quero agendar um diagnostico do meu negocio".
- **Agente Prospeccao (outbound):** emails agora agendam reuniao, nao venda direta.
- **Sistema de proposta personalizada:** feature futura em painel admin (cola transcricao → LLM gera HTML slide) — issue separada em Ideias.
- **Template V1 manual:** HTML/slide on-brand preenchido manualmente pelo dono enquanto a automacao nao existe — issue separada em Ideias.

### Governanca

- Nivel 1 (altera VERDADE_UNICA §5, §6, §7, §8, §11) → Decision Log criado + aprovacao do dono (2026-04-23) + cascata no mesmo ciclo.
- Gatilho de revisao explicito: volume >20 reunioes/semana; no-show >30%; fechamento pos-proposta <25%; pedidos recorrentes de "comprar sem reuniao" de leads qualificados.

---

## [2.5.0] — 2026-04-23 — Contato oficial canonico (WhatsApp)

Adicao de canal de atendimento oficial na VERDADE_UNICA. Nivel 1 (canonico) — requer Decision Log. Executado no escopo da issue [BAI-24](https://linear.app/joao-lucas-ucceli/issue/BAI-24) dentro da umbrella [BAI-23](https://linear.app/joao-lucas-ucceli/issue/BAI-23) (Pagina de vendas buscou.ai).

### Novo (core canonico)

- `05 - Modelo de Negocio/Decision Log - 2026-04-23 - Contato Oficial.md` — formaliza WhatsApp como canal unico de leads entrantes na V1. Inclui formato canonico do numero (`+55 27 99696-0847` / `5527996960847` / `https://wa.me/5527996960847`), mensagem pre-preenchida padrao, alternativas descartadas (formulario, email, chat widget, telefone de voz), trade-offs e gatilho de revisao (volume 30-50 leads/semana, ou quando ICP secundario superar 30%).

### Reescrito (VERDADE_UNICA)

- `00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md`:
  - **Nova secao 11 — Contato Oficial.** Tabela canonica com 4 campos (numero humano, formato internacional, link wa.me, mensagem padrao) + regras de uso canonico + uso NAO-canonico (suporte pos-venda nao e esse canal) + regra de consistencia tecnica (constante centralizada no codigo) + gatilho de revisao.
  - **Secao 8 ganhou subsecao "Canal de contato (V1)"** apontando pro canonical na secao 11.
  - **Links cruzados** ampliados com o novo Decision Log.

### Motivacao

Antes desta release o numero de WhatsApp ja tinha sido definido pelo dono mas nao estava em lugar canonico — ia acabar sendo hardcoded em multiplos artefatos (landing, prompts de agente, emails de prospeccao) sem fonte unica. A landing publica (futura [BAI-30](https://linear.app/joao-lucas-ucceli/issue/BAI-30)) precisava referenciar o numero como decisao registrada, nao como escolha ad-hoc de 1 componente.

### Impacto operacional

- **Landing page (BAI-30):** constante `WHATSAPP_NUMBER` / `WHATSAPP_URL` em `produto/site/src/lib/constants.ts` puxa exatamente os valores desta release. Todos os CTAs consomem dessa constante.
- **Agente Prospeccao:** templates de email outbound devem referenciar `+55 27 99696-0847` como CTA. Prompts em `13 - Agentes/Agente Prospeccao.md` validados/atualizados em onda futura.
- **Oferta Comercial:** quando reescrita pra copy de vendas V1, puxa numero dessa secao 11.

### Governanca

- Nivel 1 (altera VERDADE_UNICA) → Decision Log criado (feito) + aprovacao do dono (feita 2026-04-23) + cascata no mesmo ciclo (esta entrada + VERDADE_UNICA atualizada).
- Gatilho de revisao explicito no Decision Log — reabrir novo Decision Log quando volume/ICP secundario/CRM passarem os limites definidos.

---

## [2.4.0] — 2026-04-23 — Limpeza profunda de wiki-links + alinhamento Estados/Eventos

Terceira varredura apos a Fase 8 revelou tres eixos de residuo nao relacionado aos arquivos deletados: ~70 wiki-links quebrados historicos, divergencia de nomenclatura entre `Estados e Maquina de Estado.md` e os schemas, e residuo pontual de framing de consultoria. Nivel 2 (operacional) — nao altera a VERDADE_UNICA, nao requer Decision Log.

### Wiki-links quebrados — corrigidos ~70 refs em 16+ arquivos

**Agentes sem prefixo (16 refs):** `[[Estrategista]]` / `[[Pesquisador]]` / `[[Redator]]` / `[[Revisor]]` / `[[Publicador]]` / `[[Distribuidor]]` / `[[Monitor]]` → `[[Agente X]]`. Afetou `Orquestracao.md` e `Jobs.md`.

**`[[Agente Orquestrador]]` (12 refs):** substituido por `[[Orquestrador]]` (nome real do arquivo). Afetou `Eventos e Gatilhos.md` e `Arquitetura do Sistema.md`.

**Links curtos/abreviados (~18 refs):** expandidos para alias no destino canonico:
- `[[AIO]]` → `[[O que e AIO|AIO]]`
- `[[SEO]]` → `[[O que e SEO|SEO]]`
- `[[Schema Markup]]` → `[[Schema Markup para IA|Schema Markup]]`
- `[[SEO On-Page]]` → `[[On-Page SEO]]`
- `[[SEO Local]]` → `[[Local SEO]]`
- `[[Core Web Vitals]]` → `[[SEO Tecnico|Core Web Vitals]]`
- `[[Google Keyword Planner]]` → `[[Google Trends e Keyword Planner]]`

**Links para pasta (2):** `[[11 - Distribuicao/]]` → `[[Estrategia de Distribuicao]]`; `[[13 - Queries/]]` → `[[Queries que Rankeamos]]` + frameworks por tipo.

**Sistemas/entidades que nunca existiram (~32 refs):** mapeados para ativos reais:
- `[[Sistema Multi-Agente]]` / `[[Arquitetura Multi-Agente]]` → `[[Arquitetura de Agentes]]`
- `[[Agente Auditor]]` → `[[Agente Pesquisador]]`
- `[[Agente Editor]]` → `[[Agente Revisor]]`
- `[[Agente Writer]]` → `[[Agente Redator]]`
- `[[Agente Publisher]]` → `[[Agente Publicador]]`
- `[[Sistema de Distribuicao]]` → `[[Agente Distribuidor]]`
- `[[Sistema de Billing]]` → `[[Agente Pagamento]]`
- `[[Sistema de Onboarding]]` / `[[Checklist Onboarding Cliente]]` → `[[Onboarding Automatico]]`
- `[[Sales Pitch]]` → `[[Oferta Comercial]]`
- `[[Modelo de Pricing]]` → `[[Modelo de Negocio]]`
- `[[Estrategia Go-to-Market]]` → `[[Go To Market Inicial]]`
- `[[Estrategia de Conteudo]]` → `[[Estrategia de Conteudo Autonomo]]`
- `[[Posicionamento]]` → `[[Conceito e Posicionamento]]`
- `[[Roadmap de Produto]]` → `[[Roadmap do Produto]]`
- `[[Estrategias de Distribuicao]]` → `[[Estrategia de Distribuicao]]`
- `[[Pricing]]` → `[[Oferta Comercial]]`
- `[[Automacao SEO e AIO]]` → removido (buscou.ai)
- `[[Dashboard Admin]]` / `[[Sistema de Notificacoes]]` / `[[ROI Calculator]]` / `[[One-Pager SEO-AIO para Cliente]]` / `[[Estimativa de Custos LLM]]` / `[[Pipeline]]` → substituidos por referencias vivas ou texto sem wiki-link.
- `[[Zod]]` / `[[Supabase]]` → removidos wiki-links (sao bibliotecas externas, nao documentos internos).

### Alinhamento Estados.md ↔ Schemas

**Reescrito:** `12 - Sistema/Estados e Maquina de Estado.md` — traduzido de ingles para portugues; alinhado 1-a-1 com os CHECK constraints dos schemas.

- `ContentPiece` (ingles) → `Conteudo` (pt); estados `queued/researching/briefed/writing/written/reviewing/approved/revision_needed/publishing/published/monitoring` → `na_fila/pesquisando/escrevendo/revisando/aprovado/revisao_necessaria/publicando/publicado/monitorando`.
- `AgentJob` (ingles, 8 estados) → `ExecucaoAgente` (pt, 8 estados): `na_fila/atribuido/executando/concluido/falhou/tentando_novamente/morto/cancelado`.
- `Project` (ingles) → `Projeto` (pt).
- **Adicionadas novas maquinas** (antes faltavam): `SessaoOnboarding` (`em_andamento/completo/abandonado`) e `ConversaSuporte` (`aberta/em_andamento/resolvida/escalonada`).

**Atualizado:** `Entidades e Schema - Fase 2 (Conteudo e Publicacao).md` — `execucoes_agentes.status` expandido de 5 para 8 estados + nova coluna `worker_id` + `max_tentativas`.

### Padronizacao de nomenclatura de eventos (PT em todo lugar)

**Reescrito:** `12 - Sistema/Eventos e Gatilhos.md` — todos os 58 eventos em 10 dominios padronizados para `entidade.acao_no_passado` em portugues.

- `org.created/activated/...` → `organizacao.criada/ativada/...`
- `project.created/configured/...` → `projeto.criado/configurado/...`
- `keywords.researched/...` → `palavras_chave.pesquisadas/...`
- `content.queued/written/published/...` → `conteudo.enfileirado/escrito/publicado/...`
- `ranking.checked/dropped/...` → `ranking.verificado/caiu/...`
- `citation.checked/gained/...` → `citacao.verificada/ganha/...`
- `support.ticket_created/...` → `suporte.ticket_criado/...`
- `report.due/generated/...` → `relatorio.pendente/gerado/...`

IDs de cron jobs permanecem em ingles como identificadores tecnicos estaveis (`ranking.check`, `citation.check`, `report.generate`, `infra.activate_subscriptions`, `infra.reconcile`, `cleanup.old_jobs`).

### Catalogo de eventos expandido (Fase 3 schema)

`Entidades e Schema - Fase 3 (Dados e Auditoria).md` — catalogo de eventos expandido de 24 para 58 eventos, agrupados por 10 dominios (Organizacao, Projeto, Onboarding, Palavras-Chave, Conteudo, Monitoramento, Pagamento-Implementacao, Pagamento-Infra, Financeiro, Suporte, Relatorio). Dev que ler so o schema agora tem visao completa.

### Residuo de framing de consultoria removido

- `06 - SEO/Oportunidades no Mercado BR.md` — secao "Como se Posicionar como Consultor SEO/AIO" (linhas 80-104) removida. Resto do arquivo (panorama, precos, cenario competitivo) mantido. Tag `consultoria` removida do frontmatter.

### Pastas vazias removidas

- `09 - Execucao/Estudos de Caso/` — deletada (vazia).
- `Midia/` (raiz do vault) — deletada (vazia). Referencia removida do `CLAUDE.md`.

### Frontmatter atualizado para 2026-04-23

- `06 - SEO/Oportunidades no Mercado BR.md`
- `06 - SEO/Ferramentas de Automacao SEO.md`
- `14 - Marketing/Casos de Estudo do Mercado.md`
- `14 - Marketing/Concorrentes e Benchmarks.md`
- `13 - Agentes/Frameworks Multi-Agente.md`
- `13 - Agentes/Agente Monitor.md` (ja feito na Fase 8 — confirmado)
- MOCs SEO e AIO (ja feitos na Fase 8 — confirmados)

### Falsos positivos validados

- Escapes `\|` em celulas de tabela (`[[LinkedIn e Medium\|LinkedIn]]` em `Estrategia de Distribuicao.md`) sao sintaxe Obsidian valida para alias dentro de celula markdown — **nao sao bugs**.

---

## [2.3.0] — 2026-04-23 — Limpeza final pos-Fase 7

Segunda auditoria apos a Fase 7 revelou tres residuos: 8 arquivos legados com framing de agencia + wiki-links orfaos, 3 playbooks referenciados em 14+ lugares mas que nunca existiram, e um arquivo de schema (734 linhas) denso demais. Nivel 2 (operacional) — nao altera a VERDADE_UNICA, nao requer novo Decision Log.

### Deletado (10 arquivos + 1 playbook fantasma extra descoberto no grep final)

- `03 - Oferta/Prova Social.md` — framing 100% de agencia/freelancer, fora de contexto SaaS automatizado.
- `03 - Oferta/ROI para Cliente.md` — calculadora para "sua call de vendas", framing de consultor.
- `09 - Execucao/00 - Pipeline.md` — pipeline manual do modelo antigo (agora substituido pelo [[Fluxo V1]] automatizado).
- `09 - Execucao/Checklist Operacional.md` — SOP diario/semanal de operacao manual.
- `09 - Execucao/Dashboard de Resultados.md` — tracker manual de casos por cliente (substituido pelo [[Dashboard do Cliente]] + [[Agente Monitor]]).
- `09 - Execucao/Nichos Testados.md` — portfolio manual de nichos trabalhados.
- `09 - Execucao/Palavras-Chave Dominadas.md` — tracker manual de keywords (substituido pelo [[Agente Monitor]]).
- `Templates/Template - Caso de Estudo.md` — template de caso para prospect.

Motivo: conteudo pensado para modelo de consultoria anterior ao pivo; nao cabe em SaaS automatizado. Consistente com a politica "nao arquivar passado" (ja aplicada a `99 - Arquivo Morto/` na Fase 7).

### Removido — referencias a playbooks que nunca existiram (15+ refs em 13 arquivos)

- `[[Playbook - Aparecer na IA em 30 Dias]]` (8 refs) — substituido por links para [[Framework AIO Completo]] ou [[Agente Monitor]] conforme contexto.
- `[[Playbook - Cliente Novo em 30 Dias]]` (1 ref) — removido de MOC - SEO.
- `[[Playbook - Auditoria Relampago]]` (2 refs) — substituido por referencia ao [[Agente Pesquisador]] em contexto de onboarding automatico.
- `[[Playbook - Teste de Citacao em IA]]` (4 refs) — descoberto no grep final; substituido por [[Testes IA]] (que existe).

Arquivos tocados: MOC - AIO, MOC - SEO, Framework AIO Completo, Estrategia de Conteudo Autonomo, Template - Experimento AIO, Prompts/Testes IA, Prompts/Otimizacao AIO, Prompts/Analise SEO, Modo Manual, Framework de Priorizacao SEO + AIO, Feedback Loop.

Motivo: evitar navegacao quebrada e falsa impressao de conteudo existente. Se virarem prioridade na V1, escrever como notas novas dentro do contexto SaaS.

### Reestruturado — `12 - Sistema/Entidades e Schema.md` (734 linhas) dividido em 3 arquivos

- `12 - Sistema/Entidades e Schema - Fase 1 (Onboarding).md` — Blocos A (Identidade), B (Contexto), C (Pagamentos), D (Suporte). 18 tabelas. E a porta de entrada do schema.
- `12 - Sistema/Entidades e Schema - Fase 2 (Conteudo e Publicacao).md` — Blocos A (Pipeline), B (Monitoramento IA), C (Midia e Versionamento). 10 tabelas.
- `12 - Sistema/Entidades e Schema - Fase 3 (Dados e Auditoria).md` — Relacionamentos, indices, JSONB vs colunas, `eventos_sistema` + catalogo, ordem de implementacao consolidada.

16 refs genericas a `[[Entidades e Schema]]` atualizadas em 15 arquivos (MOC - Empresa, Arquitetura do Sistema, Estados e Maquina de Estado, Estrutura de Codigo, Jobs, Permissoes e Roles, Orquestracao, Objeto Business Context, Midia e Assets, Modulos, Onboarding Automatico, Agente Pagamento, Inputs dos Agentes).

Motivo: leitura focada por fase de implementacao — dev da Fase 1 nao precisa carregar schema de observabilidade da Fase 3. Schema continua sendo uma unidade coerente via cross-links no rodape de cada arquivo.

### Limpeza de backlinks em 20 arquivos vivos

Referencias aos arquivos deletados substituidas por ativos vivos:

- `[[Dashboard de Resultados]]` → `[[Dashboard do Cliente]]` ou `[[Agente Monitor]]` conforme contexto.
- `[[Palavras-Chave Dominadas]]` / `[[Nichos Testados]]` → `[[Agente Monitor]]` (que consolida esses dados em tempo real na V1).
- `[[00 - Pipeline]]` → `[[Fluxo V1]]` (versao automatizada).
- `[[Checklist Operacional]]` → removido (conteudo de operacao manual nao se aplica mais).
- `[[ROI para Cliente]]` → `[[Modelo de Negocio]]` (formulas vivem la).
- `[[Prova Social]]` → `[[Oferta Comercial]]` ou removido.

Arquivos tocados: MOC - SEO, MOC - AIO, MOC - Execucao, Mental Models, Requisitos Produto Autonomo, Dashboard do Cliente, Como IA Escolhe Respostas, Melhor X, Modo Manual, Queries que Rankeamos, Conteudos que Ranqueiam, Ranking IA - Tracking Manual, Agente Estrategista, Agente Monitor, Prompts/Testes IA, Prompts/Otimizacao AIO, Case Proprio como Prova, Citacoes e Mencoes, Backlinks, Estrategia de Distribuicao.

### Ajustes pontuais

- `MOC - Empresa.md` — adicionado link para `[[Casos de Estudo do Mercado]]` (que estava orfao).
- `04 - Produto/Suporte Automatizado.md` — FAQ #10 reescrita para diferenciar explicitamente **indexacao** (ate 30 dias — tecnico), **ranking** (30-90 dias — competitivo) e **AIO** (14-30 dias — citacoes em IA). Resolve confusao recorrente em prospects.

### Snapshots dos agentes

Nao foram alterados. Permanecem em v1.1.0 / 2026-04-23 — as mudancas desta versao sao operacionais, nao canonicas.

---

## [2.2.0] — 2026-04-23 — Modelo comercial evoluido + saneamento residual

**BREAKING (Nivel 1):** evolucao da oferta canonica — agora e **implementacao unica + infra mensal**. Sem alteracao nos valores da implementacao (R$ 2.500 a vista / R$ 3.000 em 12x), mas incluida nova cobranca recorrente de **R$ 300/mes de infra** a partir do mes 2 (mes 1 incluso na implementacao). Motivo: cobrir custos reais de tokens LLM + APIs + hospedagem do motor, que nao cabiam indefinidamente dentro de pagamento unico.

Detalhes completos: [`05 - Modelo de Negocio/Decision Log - 2026-04-23 - Infra Mensal.md`](05 - Modelo de Negocio/Decision Log - 2026-04-23 - Infra Mensal.md).

### Novo (core canonico)

- `05 - Modelo de Negocio/Decision Log - 2026-04-23 - Infra Mensal.md` — decisao Nivel 1 criada, aprovada pelo dono em 2026-04-23.

### Reescrito (VERDADE_UNICA + CLAUDE + MOC Empresa)

- `00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` — secoes 4, 5, 6, 7, 8, 9 reescritas para incluir o componente infra mensal + politica de inadimplencia + linguagem atualizada.
- `00 - Verdade Unica/MOC - Empresa.md` — numeros-chave (infra mensal, margens por linha, MRR real) e links para o novo Decision Log.
- `CLAUDE.md` (raiz) — decisoes canonicas + linguagem proibida/permitida ajustadas; referencia removida a `99 - Arquivo Morto/` (que foi deletado).

### Cascata nos 9 consolidados (Fase 2)

- `01 - Posicionamento/Conceito e Posicionamento.md`
- `01 - Posicionamento/Proposta de Valor.md`
- `03 - Oferta/Oferta Comercial.md` (heavy rewrite — pitch, objecoes, FAQ da infra)
- `05 - Modelo de Negocio/Modelo de Negocio.md` (heavy rewrite — unit economics, margens por linha, metricas ajustadas)
- `05 - Modelo de Negocio/Canvas.md`
- `02 - ICP/ICP por Nicho.md`
- `02 - ICP/Nicho Inicial.md`
- `14 - Marketing/Tom de Voz e Marketing.md`

### Cascata nos 20 reescritos da Fase 1

- `04 - Produto/`: Site Publico, Dashboard do Cliente, Suporte Automatizado, Requisitos Produto Autonomo, Roadmap do Produto, Time to Value, Onboarding Automatico.
- `09 - Execucao/Fluxo V1.md` (checkout com duas linhas: implementacao + subscription da infra).
- `11 - Operacao/`: Fluxo Operacional Completo, Jornada do Cliente, Jornada Interna, Pontos Criticos UX, SLAs e Garantias.
- `13 - Agentes/`: Agente Pagamento (heavy rewrite — dois fluxos), Agente Suporte, Arquitetura de Agentes, Inputs dos Agentes, Orquestrador.
- `14 - Marketing/`: Funil Completo, Tipos de Conteudo, Casos de Estudo do Mercado, Concorrentes e Benchmarks.

### Snapshots operacionais atualizados (v1.1.0)

- `agentes/contexto/verdade-unica.md` — inclui infra mensal como componente 5.2 da oferta.
- `agentes/contexto/oferta.md` — duas linhas explicitas + FAQ para agentes de venda.
- `agentes/contexto/linguagem.md` — regras ajustadas (mensalidade de infra permitida; mensalidade de servico continua proibida).

### Reprojetamento de 12-Sistema (6 arquivos)

- `12 - Sistema/Entidades e Schema.md` — substituida tabela `assinaturas` por: `compras` (implementacao), `parcelas_implementacao` (1-12 quando parcelado), `assinaturas_infra` (subscription mensal), `tentativas_cobranca` (historico de retries). Status da organizacao reescrito (`pending_payment → implementing → live_free_period → live_active → motor_paused`).
- `12 - Sistema/Estados e Maquina de Estado.md` — state machines separadas para Compra, AssinaturaInfra e Organizacao. `trial` eliminado.
- `12 - Sistema/Eventos e Gatilhos.md` — eventos discriminados (implementacao vs infra): `compra.confirmada`, `parcela.paga`, `infra.assinatura_iniciada`, `infra.cobranca_falhou`, `motor.pausar_por_inadimplencia`, `motor.retomar_apos_regularizacao`. Eventos antigos (`org.trial_*`, `org.plan_upgraded/downgraded`, `subscription.cancelled` generico) removidos.
- `12 - Sistema/Integracoes Externas.md` — adapter Stripe/Asaas com metadata discriminando tipo (implementacao vs infra); webhooks especificos por fluxo.
- `12 - Sistema/Modulos.md` — modulo "Billing e Assinaturas" renomeado para "Pagamentos" com submodulos Implementacao e Infra Mensal.
- `12 - Sistema/Stack Tecnologica.md` — ADR-005 de gateway reaberto (Stripe vs Asaas em funcao do parcelamento 12x em cartao no Brasil), decisao final a tomar em producao.

### Deletado (limpeza radical — sem pasta de arquivo morto)

- Pasta `base-de-conhecimento/99 - Arquivo Morto/` **inteira removida** (11 arquivos legados de modelo de agencia). Decisao do dono em 2026-04-23: "nao armazenar passado".
- `base-de-conhecimento/02 - ICP/ICP - Cliente Ideal.md` (modelo de agencia).
- `base-de-conhecimento/10 - Go To Market/Script de Vendas.md` (BANT, modelo de agencia).
- `identidade-visual/Buscou.ai - Brand Book.html` renomeado para `brand-book.html` (capitalizacao canonica).

### Saneamento residual (wiki-links, frontmatter, polimento)

- Todos os MOCs (SEO, AIO, Execucao, Identidade Visual) tiveram referencias para arquivos deletados removidas ou substituidas por links ativos.
- `MOC - Execucao.md` reescrito integralmente (era todo voltado ao modelo de agencia).
- Arquivos canonicos atualizados: `[[ICP - Cliente Ideal]]` → `[[ICP por Nicho]]`; `[[Landing Page]]` → `[[Site Publico]]`; links para `[[Relatorio para Cliente - Modelo]]` e afins removidos.
- Frontmatter de 4 arquivos em 04-Produto atualizado de `2026-04-22` para `2026-04-23`.

### Impacto operacional

- **Agente Pagamento (reescrita pesada):** agora opera dois fluxos distintos no gateway (checkout da implementacao + subscription recorrente da infra), com state machines e cadencias de retry separadas. Cron mensal dispara ativacao da subscription da infra em D+30 do cliente.
- **Orquestrador:** novos eventos `motor.pausar_por_inadimplencia` e `motor.retomar_apos_regularizacao` que atualizam o status da organizacao para `motor_paused` / `live_active` e controlam se o pipeline de conteudo executa ou nao.
- **Dashboard do cliente:** tela Billing agora exibe duas linhas separadas (implementacao e infra mensal) com historico e botoes de self-service.
- **Landing page e FAQ publica:** duas linhas de preco explicitas; nova pergunta "E uma assinatura de servico?" respondida com explicacao sobre passthrough de infra.

### Governanca

- Nivel 1 da decisao: exige novo Decision Log (ja registrado) + aprovacao explicita do dono (feita) + cascata em ate 7 dias (executada hoje).
- Debito tecnico da `[2.1.0]` sobre 12-Sistema (state machine SaaS): **resolvido** nesta release.

---

## [2.1.0] — 2026-04-23 — Saneamento para V1

Limpeza final antes de iniciar o desenvolvimento da V1. Zerou contradicoes herdadas, consolidou arquivos derivados contra a VERDADE_UNICA e renomeou agentes descartados para suas versoes compativeis com venda unica.

### Reescrito (24 arquivos — removidas contradicoes com VERDADE_UNICA)

- `04 - Produto/Requisitos Produto Autonomo.md`
- `04 - Produto/Modo MVP.md`
- `04 - Produto/Site Publico.md`
- `04 - Produto/Failure Modes.md`
- `04 - Produto/Tratamento de Falhas.md`
- `04 - Produto/O que Automatizar vs Humano.md`
- `09 - Execucao/Fluxo V1.md`
- `11 - Operacao/Fluxo Operacional Completo.md`
- `11 - Operacao/Jornada do Cliente.md`
- `11 - Operacao/Jornada Interna.md`
- `11 - Operacao/Pontos Criticos UX.md`
- `11 - Operacao/SLAs e Garantias.md`
- `13 - Agentes/Arquitetura de Agentes.md`
- `13 - Agentes/Agente Distribuidor.md`
- `13 - Agentes/Agente Visual.md`
- `13 - Agentes/Agente Suporte.md`
- `13 - Agentes/Orquestrador.md`
- `13 - Agentes/Inputs dos Agentes.md`
- `14 - Marketing/Funil Completo.md`
- `14 - Marketing/Tipos de Conteudo.md`
- `14 - Marketing/Distribuicao Automatica.md`
- `14 - Marketing/Case Proprio como Prova.md`

### Renomeado (agentes V1)

- `13 - Agentes/Agente SDR.md` → **`13 - Agentes/Agente Prospeccao.md`** (outbound paralelo, nao qualifica BANT)
- `13 - Agentes/Agente Cobranca.md` → **`13 - Agentes/Agente Pagamento.md`** (confirma compra unica + monitora parcelas 12x)

### Consolidado agressivamente (10 arquivos — removidas duplicacoes com VERDADE_UNICA)

Arquivos derivados agora apontam via wiki-link para a verdade canonica em vez de repetir. Conteudo operacional unico preservado.

- `01 - Posicionamento/Conceito e Posicionamento.md`
- `01 - Posicionamento/Proposta de Valor.md`
- `02 - ICP/ICP por Nicho.md`
- `02 - ICP/Nicho Inicial.md`
- `03 - Oferta/Oferta Comercial.md`
- `05 - Modelo de Negocio/Modelo de Negocio.md`
- `05 - Modelo de Negocio/Canvas.md`
- `14 - Marketing/Tom de Voz e Marketing.md`
- `00 - Verdade Unica/MOC - Empresa.md`

### Criado (snapshots de contexto para agentes)

- `agentes/contexto/verdade-unica.md` — snapshot condensado da VERDADE_UNICA para system prompt.
- `agentes/contexto/icp.md` — perfil do cliente por nicho.
- `agentes/contexto/oferta.md` — o que pode/nao pode prometer.
- `agentes/contexto/tom-de-voz.md` — atributos da voz + estrutura.
- `agentes/contexto/linguagem.md` — tabela proibido vs permitido.

Todos com frontmatter `sincronizado_em: 2026-04-23`. Atualizar quando houver novo Decision Log.

### Arquivado (movido para 99 - Arquivo Morto)

- `00 - Verdade Unica/MOC - Roadmap de Aprendizado.md` — trilha de estudos, nao faz parte de V1.

### Deletado (sem valor mesmo arquivado)

- `99 - Arquivo Morto/Como Oferecer SEO como Servico.md` — modelo de agencia, nada reaproveitavel.
- `99 - Arquivo Morto/Precificacao de Servicos SEO.md` — preco por hora/mes, incompativel com buscou.ai.
- `99 - Arquivo Morto/Proposta Comercial - Modelo.md` — template de agencia, V1 usa checkout direto.

### Sincronizado

- `CLAUDE.md` (raiz do projeto):
  - Paths corrigidos (apontavam para pastas antigas `00 - Indice` e `14 - Empresa`).
  - Nova secao "Camada canonica vs camada operacional" — codifica a regra de consolidacao agressiva.
  - Nova secao "Agentes V1" com listagem dos 11 + orquestrador e descontinuacao de SDR/Cobranca.
- `produto/README.md` — lista os 11 agentes V1 + descontinuados. Ordem de construcao por fase.
- `produto/agents/README.md` — tabela dos 11 agentes + descontinuados.
- `agentes/README.md` — lista dos 11 agentes + convencoes de prompt + 5 snapshots em `contexto/`.

### Debito conhecido de [2.0.0] — resolvido

Todos os 8 arquivos que tinham aviso explicito "DIVIDA CONHECIDA" no topo foram reescritos e o aviso removido:
- `11 - Operacao/SLAs e Garantias.md` ✓
- `11 - Operacao/Pontos Criticos UX.md` ✓
- `11 - Operacao/Jornada Interna.md` ✓
- `11 - Operacao/Jornada do Cliente.md` ✓
- `11 - Operacao/Fluxo Operacional Completo.md` ✓
- `14 - Marketing/Tipos de Conteudo.md` ✓
- `14 - Marketing/Funil Completo.md` ✓
- `14 - Marketing/Distribuicao Automatica.md` ✓

E os 4 arquivos sem aviso (mas com contradicoes) tambem:
- `13 - Agentes/Arquitetura de Agentes.md` ✓
- `13 - Agentes/Agente SDR.md` → renomeado para Prospeccao ✓
- `13 - Agentes/Agente Cobranca.md` → renomeado para Pagamento ✓
- `13 - Agentes/Orquestrador.md` ✓
- `13 - Agentes/Inputs dos Agentes.md` ✓

### Decisao que motivou [2.1.0]

Usuario pediu saneamento final antes de comecar o desenvolvimento da V1: zerar contradicoes, remover duplicacoes, deixar documentacao coerente e enxuta. Consolidacao foi **agressiva** — arquivos derivados nao repetem mais a verdade canonica, apontam para ela via wiki-link.

Ver [[Decision Log - 2026-04-23]] para o contexto completo das decisoes Nivel 1 que fundamentam essa reescrita.

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

### Debito conhecido — RESOLVIDO em [2.1.0] (2026-04-23)

> Todos os arquivos abaixo foram reescritos em [2.1.0]. Mantido por rastreabilidade historica.

Arquivos que refletiam o modelo anterior (Starter/Growth/Scale com mensalidade, 11 agentes incluindo SDR e Cobranca, pipeline envolvendo reuniao BANT). Foram movidos na reestruturacao mas **nao foram reescritos** imediatamente. Foram reescritos em [2.1.0] (2026-04-23).

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
