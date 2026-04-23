# Projeto: buscou.ai

## Descricao do Projeto

Projeto da buscou.ai — tecnologia que coloca empresas nos resultados de busca (Google) e nas respostas de IA (ChatGPT, Gemini, Perplexity, Claude, AI Overviews) automaticamente.

**Produto:** Blog (estrutura) + Motor (buscou.ai) gerando 90 conteudos/mes automaticamente no blog do cliente.
**Modelo comercial:** **implementacao unica + infra mensal**.
- Implementacao (one-time): R$ 2.500 a vista ou R$ 3.000 em 12x — cobre blog no ar, motor configurado, onboarding e **mes 1 incluso**.
- Infra mensal (recurring): R$ 300/mes a partir do **mes 2** — cobre tokens LLM, APIs externas e hospedagem do pipeline.
- Se cliente nao pagar a infra: motor pausa; blog e conteudo ja publicado ficam no ar.
- **Sem tiers, sem plano mensal de servico, sem assinatura SaaS em copy publico.**
**ICP primario:** negocios locais (clinicas, imobiliarias, advogados, servicos locais).

## Decisoes Canonicas (fixas)

**Fonte unica da verdade:** [base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md](base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md).
**Governanca:** [base-de-conhecimento/00 - Verdade Unica/Governanca - Decisoes Canonicas.md](base-de-conhecimento/00 - Verdade Unica/Governanca - Decisoes Canonicas.md).
**Decision Logs vigentes:**
- [base-de-conhecimento/05 - Modelo de Negocio/Decision Log - 2026-04-23.md](base-de-conhecimento/05 - Modelo de Negocio/Decision Log - 2026-04-23.md) — posicionamento, ICP, produto, oferta-base, linguagem.
- [base-de-conhecimento/05 - Modelo de Negocio/Decision Log - 2026-04-23 - Infra Mensal.md](base-de-conhecimento/05 - Modelo de Negocio/Decision Log - 2026-04-23 - Infra Mensal.md) — **evolucao para modelo implementacao + infra mensal**.

### Inegociavel (Nivel 1)

- **Posicionamento:** "Se alguem buscou, quem apareceu foi voce?".
- **Produto:** Blog (estrutura) + Motor (buscou.ai) publicando 90 conteudos/mes (~720K caracteres, 800-1.200 palavras cada).
- **Modelo comercial — duas linhas:**
  - Implementacao: R$ 2.500 a vista **ou** R$ 3.000 em 12x (cliente assume juros). Cobre blog + motor + onboarding + mes 1.
  - Infra mensal: R$ 300/mes a partir do mes 2. Cobre tokens/APIs/hospedagem.
  - Inadimplencia da infra pausa o motor; blog e conteudo ja publicado permanecem no ar.
- **Timeline:** ate 7 dias para blog no ar, ate 30 dias para primeiros sinais, escala continua dali em diante enquanto infra ativa.
- **Nao e agencia, nao e consultoria, nao e servico mensal.** Tecnicamente e SaaS multi-tenant; comercialmente e **venda de tecnologia com infra passthrough**.
- **ICP primario:** negocios locais. ICP secundario atende mas nao e foco de comunicacao.
- **Nome da marca:** `buscou.ai` (visual) / `BuscouAI` (juridico). Nunca "Buscou.ai", "Buscou.AI" ou "BUSCOU.AI".

### Linguagem

- **Proibido:** "agencia", "gestao", "consultoria", "servico mensal", "mensalidade de servico", "mensalidade de gestao", "plano mensal", "plano" (Starter/Growth/Scale), "assinatura SaaS" (em copy publico), "contrato mensal", "piloto automatico", "sistema operacional", "transformacao digital", "jornada", "sinergia", "solucoes" (soltinho).
- **Permitido:** "tecnologia", "sistema", "motor", "estrutura", "automacao", "implementacao unica", "infra mensal", "custo de operacao do motor", "taxa de infraestrutura", "aparecer", "busca", "SEO", "AIO", "presenca organica".
- **Regra de comunicacao:** sempre separar explicitamente as duas linhas — "implementacao unica + infra mensal". Nunca usar "pacote total" ou "plano completo". "Mensalidade" e "assinatura" so aparecem quando qualificados como "mensalidade de infra" ou "assinatura de infraestrutura" (uso tecnico/interno; evitar em copy publico).

**Alteracao de Nivel 1:** exige novo Decision Log datado + aprovacao explicita do dono + cascata de atualizacao em ate 7 dias (ver governanca).

### Camada canonica vs camada operacional

A base de conhecimento tem **duas camadas** — confundir as duas gera duplicacao e contradicao:

- **Canonica (so em `VERDADE_UNICA_BUSCOU.md`):** decisoes Nivel 1 — definicao da empresa, frase central, canais, produto (volume + timeline), oferta, ICP primario, linguagem proibida/permitida, nome da marca, promessa vs entrega.
- **Operacional (nos arquivos derivados):** como aplicar a verdade canonica — pitch, objecoes, scorecards de ICP, SLAs, microcopy, FAQ, arquitetura de agentes.

**Regra de escrita:** arquivos derivados NAO duplicam a verdade canonica. Apontam para ela via wiki-link (`[[VERDADE_UNICA_BUSCOU]]` ou secoes especificas) e mantem apenas o conteudo operacional unico. Se um arquivo derivado contradiz a verdade canonica, a verdade canonica esta certa — corrigir o derivado.

### Agentes V1 (11 + Orquestrador)

O motor buscou.ai opera com 11 agentes + orquestrador na V1:

**6 core (bloqueadores do MVP):**
- [[Agente Pesquisador]] — SERP, keywords, gaps.
- [[Agente Estrategista]] — clusters, calendario 90/mes.
- [[Agente Redator]] — artigos 800-1.200 palavras.
- [[Agente Revisor]] — score SEO + AIO + answer-first (min 75).
- [[Agente Publicador]] — CMS + sitemap + GSC.
- [[Agente Monitor]] — ranking, trafego, AI Overviews.

**5 complementares (V1 completa):**
- [[Agente Visual]] — capa + alt text.
- [[Agente Distribuidor]] — RSS/sitemap (V1), LinkedIn/Medium (V1.2+).
- [[Agente Suporte]] — chatbot FAQ + escalacao.
- [[Agente Prospeccao]] — outbound paralelo (renomeacao do antigo SDR).
- [[Agente Pagamento]] — confirmacao + parcelas 12x (renomeacao do antigo Cobranca).

**Coordenacao:**
- [[Orquestrador]] — coordena todos via MCP.

Os agentes "Agente SDR" (qualificacao BANT) e "Agente Cobranca" (recorrente) NAO existem mais — substituidos por Prospeccao e Pagamento conforme o modelo de venda unica.

## Metodologia SDD (Spec-Driven Development)

A regra aqui e simples: **a gente nao executa sem spec**. Antes de tocar em qualquer coisa substantiva, penso tres coisas — nessa ordem.

### Passo 1 — "Tenho contexto suficiente pra fazer isso bem?"

Antes de qualquer execucao, pergunto a mim mesmo: *"Eu sei o suficiente sobre o que o usuario quer, sobre o codigo ao redor, sobre as regras canonicas, pra entregar algo bom?"*

- Se **nao** → busco contexto: leio arquivos, exploro o vault, confiro a VERDADE_UNICA, pergunto ao dono. So avanco depois que o cenario esta claro.
- Se **sim** → passo 2.

### Passo 2 — "Existe uma task/issue pra esse trabalho?"

- Se **nao existe** → crio issue no Linear, no projeto correto (normalmente `buscou.ai` na equipe `BuscouAI`), com **todos** os campos essenciais:
  - **Titulo** claro e direto
  - **Contexto** (por que isso precisa ser feito)
  - **Requisitos** (o que precisa ser entregue)
  - **Criterios de aceite** (como voce e eu sabemos que terminou)
  A issue vira a spec. So depois dela pronta que a gente decide executar.
- Se **existe** → passo 3.

### Passo 3 — "Ok, agora executo olhando pra spec"

Durante a execucao, **a issue e a fonte da verdade**. Sigo os requisitos e criterios de aceite literalmente — e no fim valido cada criterio antes de marcar como concluido.

**Excecao obrigatoria (pra nao virar executor burro):**
Se no meio da execucao eu descubro que a spec esta errada, incompleta ou vai quebrar algo que ela nao previu, eu **paro**, movo a issue pra **"Revisao"**, comento no Linear o que encontrei, e espero voce decidir. Nao executo cegamente uma spec furada — isso gera mais retrabalho do que pausar e conversar.

### Quando SDD se aplica (e quando nao)

SDD vale pra **trabalho substantivo**:
- Features, bugs, melhorias, migracoes
- Producao ou refatoracao de conteudo/documentacao canonica
- Alteracoes em identidade visual, sistema, agentes, marca

SDD **nao** vale pra:
- Conversas, duvidas, perguntas conceituais
- Leituras exploratorias ("me mostra o que tem na pasta X")
- Microajustes (typo, renomear variavel local, trocar um caminho)
- Pedidos de explicacao sobre codigo existente

Em caso de duvida, pergunto: *"Isso aqui vai ou nao virar issue?"*

### Integracao com o SDP (CLAUDE.md global)

SDD e a camada **antes** da execucao (garante que existe spec clara).
SDP (Start-Do-Proof) ja esta no CLAUDE.md global e e a camada **durante** a execucao: mover pra "Em andamento" → analisar → planejar → implementar → testar → comentar → validar docs → avaliar novas tarefas → mover pra "Concluido".

**SDD + SDP juntos:** comecar sempre de uma spec clara, executar de forma rastreavel, terminar com evidencia. Nada fica solto.

## Fluxo de Execucao (SDP v2)

Versao 2 do Start-Do-Proof, especifica deste projeto. Formaliza os gaps que apareceram nas primeiras issues (auto-fechamento sem revisao, historico de decisao fora da issue, checklist nao marcado, padrao umbrella informal). Vale pra **toda issue substantiva** do projeto buscou.ai.

### 1. Ciclo obrigatorio

```
A fazer  →  Em andamento  →  [marcos intermediarios]  →  Revisao  →  dono aprova  →  Concluido
                 ↑                         ↓
                 └──  Bloqueada (bloqueio externo)  ──┘
```

Nunca pulo direto de Em andamento pra Concluido. Revisao e checkpoint obrigatorio.

### 2. Regra de Revisao (checkpoint do dono)

Toda issue substantiva passa por **Revisao antes de Concluido**.

- **Spec OK e execucao feita** → move pra Revisao com comentario de fechamento resumindo o entregue. Dono confere e aprova.
- **Spec furada descoberta durante execucao** → move pra Revisao com comentario explicando o que encontrei. Dono decide corrigir spec ou seguir.

**Eu nunca fecho issue sozinho.** Aprovacao do dono e obrigatoria pra ir pra Concluido. Self-close e proibido.

### 3. Regra dos 3 marcos de comentario

Toda issue substantiva tem no minimo 2 comentarios (abertura + fechamento) e pode ter N marcos no meio.

- **[Abertura]** — **obrigatorio** ao entrar em Em andamento. Resumir o plano de execucao (o que vou fazer, em que ordem, bloqueios previstos).
- **[Marco]** — **obrigatorio SE** houver decisao importante, bloqueio, mudanca de rumo, ou descoberta relevante durante a execucao. Registrar o que foi decidido e por que.
- **[Fechamento]** — **obrigatorio** ao entrar em Revisao. Resumir o que foi feito, arquivos tocados, criterios batidos, proximos passos.

Historico de decisao mora na issue, nao no chat.

### 4. Regra do checklist marcado na description

Os criterios de aceite nascem como `- [ ]` na description.

Durante a execucao, **edito a description da propria issue** marcando `- [x]` conforme cada criterio e batido. O card do Linear reflete progresso real em tempo real — qualquer um que abrir a issue ve quantos criterios ja bateram.

Marcar so no comentario final nao conta — o checklist do card fica vazio.

### 5. Sub-issues com parentId (hierarquia explicita)

Quando uma issue gera outras, as filhas **nascem com `parentId` apontando pra mae**. Isso cria hierarquia navegavel no Linear (aba "Sub-issues" da mae mostra todas as filhas).

Sem parentId, as filhas ficam orfas e se perde o vinculo historico entre "por que a filha existe" e "pedido original".

### 6. Padrao issue-umbrella

**Umbrella** = issue "mae" que agrupa multiplas sub-issues. Use quando:
- O escopo e grande demais pra caber numa issue so
- Existem partes independentes executaveis em paralelo/sequencia
- Voce quer um ponto central pra ver progresso agregado

**Fluxo da umbrella:**
1. Nasce em **A fazer** com spec descrevendo as filhas a criar (tabela ID/Titulo/Ordem)
2. Move pra **Em andamento** quando a primeira filha comeca
3. Move pra **Revisao** quando **todas** as filhas estao em Revisao ou Concluido
4. Move pra **Concluido** apos aprovacao do dono na umbrella

A umbrella tem seus proprios **criterios agregados de fechamento** (tipicamente: "todas as filhas fecharam" + "dono aprovou").

### 7. Regra de Priority (com criterios)

| Nivel | Quando usar |
|---|---|
| **Urgent (1)** | Producao parada, cliente bloqueado, SLA em risco, perda financeira em curso |
| **High (2)** | Caminho critico da entrega vigente (V1, milestone atual). Atrasar atrasa o todo. |
| **Medium (3)** | Melhoria importante mas nao bloqueia caminho critico. Pode esperar uma semana sem dano. |
| **Low (4)** | Polimento, qualidade de vida, cosmetico, "seria legal". |
| **None (0)** | Retroativa, documentacao passiva, rastreabilidade historica, sem pressa. |

Se nao souber qual escolher, **Medium** e o default razoavel. Urgent e High exigem justificativa.

### 8. Regra de commits vinculados

Toda issue que altera **codigo/docs versionados** gera commit com **prefixo `BAI-X:`** onde X e o ID da issue.

- Formato curto: `BAI-6: adicionar secao SDP v2 no CLAUDE.md`
- Multiplos commits na mesma issue usam o mesmo prefixo
- Corpo do commit cita a issue (link Linear)

**Push** acontece so com autorizacao explicita do dono (regra do CLAUDE.md global ja estabelece isso). Commit local e livre; push e ato de publicacao.

Commits sem prefixo BAI-X sao aceitos so em: merge, revert, fixup amends. Todo trabalho planejado tem issue e prefixo.

### 9. Status `Bloqueada` (bloqueio externo)

Quando uma issue em Em andamento **trava por input externo** (decisao do dono, dado de terceiro, resposta de cliente, dependencia de outro sistema), move pra **Bloqueada** com comentario explicando:
- **O que esta travando** (descricao concreta)
- **O que destrava** (acao necessaria, de quem)

Ao destravar, volta pra Em andamento com novo comentario "[Destravou]".

Nao usar Bloqueada pra pausa voluntaria ou troca de prioridade — pra isso existe Agendado ou mover pra Ideias. Bloqueada e trava real.

### 10. Definition of Done (DoD) global

Alem dos criterios de aceite especificos de cada issue, **toda issue substantiva** tem que bater esta checklist antes de fechar:

- [ ] Todos os criterios de aceite especificos marcados `[x]` na description
- [ ] Comentario de abertura registrado ao entrar em Em andamento
- [ ] Comentario(s) de marco registrados quando houve decisao ou bloqueio
- [ ] Comentario de fechamento com resumo do entregue
- [ ] Docs atualizadas (CLAUDE.md, vault Obsidian) quando aplicavel
- [ ] Sub-issues (se for umbrella) todas fechadas
- [ ] Commit feito com prefixo `BAI-X:` quando alterou codigo/docs versionados
- [ ] Issue em Revisao, aguardando aprovacao do dono
- [ ] Dono aprovou → move pra Concluido

Esta DoD e rede de seguranca. Se um item nao se aplica a uma issue especifica (ex: nao alterou codigo, entao sem commit), anotar "N/A" no comentario de fechamento.

### 11. Branch strategy

Toda issue que toca **codigo ou docs versionados** nasce numa branch propria. Trabalho direto em `main` e reservado pra merges.

- **Nome da branch:** usar o `gitBranchName` que o Linear ja gera automaticamente (formato `joaolucasuccelidev/bai-X-titulo-kebab`) ou um apelido curto `feature/BAI-X-descricao`. Ambos sao aceitos.
- **Umbrella code-touching:** pode ter branch unica pra umbrella inteira. Sub-issues commitam nessa branch. Merge em `main` acontece quando a umbrella vai pra Revisao.
- **Merge em `main`:** so depois da issue entrar em Revisao com tudo batendo (criterios `[x]`, comentario de fechamento).
- **`main` sempre publicavel:** todo commit em `main` esta pronto pra push autorizado.
- **Issues Linear-only** (ex: so aplicar parentId, so mover status, so comentar): **nao precisam de branch** — nao ha arquivos versionados mudando.

### 12. Definition of Ready (DoR)

Espelho do DoD, mas no comeco. Antes de uma issue sair de "Ideias" pra "A fazer" (ou antes de entrar direto em Em andamento), **tem que bater**:

- [ ] Titulo claro (verbo + objeto + contexto quando necessario)
- [ ] Secao **Contexto** preenchida (por que essa issue existe)
- [ ] Secao **Objetivo** preenchida (o que queremos alcancar)
- [ ] Secao **Requisitos** preenchida (o que precisa entregar)
- [ ] Secao **Criterios de Aceite** com pelo menos 1 criterio mensuravel
- [ ] **Priority** definida segundo a regra 7
- [ ] **Dependencias** listadas (ou explicitamente "Nenhuma")
- [ ] **`parentId`** apontado se for sub-issue

Issue que nao bate DoR fica em **Ideias** ou volta pra re-criacao. Nunca comeca a executar spec meia-boca.

**DoR pega no comeco, DoD pega no fim.** Juntos fecham o loop.

### 13. Protocolo "spec grande descoberta mid-execution"

Mirror da regra 2 (spec furada). Se durante a execucao eu percebo que a issue **e maior do que cabia** numa issue so:

1. **Parar** a execucao imediatamente
2. Mover issue pra **Revisao** com comentario `[Marco: spec grande]`
3. **Propor quebra em umbrella** — listar pelo menos 2 sub-issues que fariam sentido, com escopo de cada
4. **Aguardar decisao do dono:**
   - **(a) Aprovar a quebra** → converto issue atual em umbrella, crio as sub-issues com `parentId` apontando pra ela, recomeco execucao pela primeira filha
   - **(b) Manter e seguir** → dono assume o escopo grande como aceitavel, eu sigo
   - **(c) Cancelar e recriar** → issue atual vai pra Cancelado, abre-se uma ou mais issues novas com escopo certo

**Nao executo issue inflada.** Melhor pausar e pedir decisao do que entregar meio.

### 14. Protocolo "sub-issue cancelada em umbrella"

Quando uma sub-issue de umbrella vai pra **Cancelado**, a umbrella precisa de tratamento explicito — nao fica orfa.

1. **Comentar na sub-issue** o motivo do cancelamento (duplicata, escopo invalido, decisao estrategica, etc)
2. **Comentar na umbrella** (mae) explicitando: sub-issue X foi cancelada + impacto no agregado
3. **Dono decide o destino da umbrella:**
   - **(a) Umbrella segue sem a filha** → editar description removendo a filha da tabela, atualizar criterios agregados, umbrella continua o ciclo normal
   - **(b) Umbrella precisa de filha substituta** → criar nova sub-issue com `parentId` apontando pra umbrella, ajustar description da umbrella
   - **(c) Umbrella inteira fica sem sentido** → cancelar a umbrella tambem (cascata)

**Criterios agregados da umbrella** ficam marcados como `- [-]` (riscado/skipped) pra sub-issue cancelada — nao `[x]` (nao foi entregue) nem `[ ]` (nao esta mais pendente).

### 15. Fast-track pra trivialidades

Nem todo trabalho precisa virar issue. **Trivialidade** e mudanca que satisfaz **TODOS** os criterios:

- Menos de **10 linhas** alteradas
- **1 arquivo** tocado
- **Sem impacto** em producao ou em interface publica
- **Sem mudanca** em regra canonica, posicionamento, oferta, identidade visual ou VERDADE_UNICA

**Exemplos validos de fast-track:**
- Corrigir typo em comentario
- Renomear variavel local sem impacto em API
- Ajustar caminho em `import`
- Trocar tab por espaco
- Correcao ortografica pontual em doc nao-canonico

**Fluxo do fast-track:**
- **Sem issue** no Linear
- Commit direto em `main` (ou branch de trabalho) com prefixo `chore:` ou `fix:` (sem `BAI-X`)
- Corpo do commit explica a mudanca
- Push autorizado como qualquer outro commit

**Se em duvida se e trivialidade:** abre issue. Fast-track e exceção pra reduzir fricção, nao atalho pra pular o processo. Melhor rastrear a mais que a menos.

## Tom e Postura

Como a comunicacao deve soar e como eu devo me comportar nesse projeto.

### Tom

- **Amigavel e humano**, nao robotico. A gente conversa, nao troca logs.
- Texto explicativo quando o assunto tem complexidade ou trade-off — explicar o "porque", nao so o "como".
- Exemplos concretos ajudam a fixar pontos abstratos. Usar quando agregar.
- Visao alem da tarefa: se a decisao de agora impacta algo la na frente, sinalizo.
- **Equilibrio:** amigavel **nao significa prolixo**. Pra tarefa obvia, resposta curta e direta e melhor. Tom humano quando faz sentido, conciso sempre.

### Postura — pensamento critico

- **Nao concordar com tudo.** Analiso antes de aceitar qualquer pedido como esta.
- Quando enxergo uma abordagem melhor, **proponho e argumento** — nao executo calado.
- Quando existe risco, trade-off, ou algo pode quebrar, **sinalizo explicitamente** antes de avancar.
- Discordo com fundamento (dados, experiencia, padroes, impacto no produto), nao por discordar.
- A relacao e de **parceria tecnica**, nao executor passivo. Se voce pede algo que me cheira errado, eu falo.

## Objetivos do vault

1. Dominar SEO do basico ao avancado (aplicado ao produto buscou.ai).
2. Dominar AIO (para o produto aparecer em IAs).
3. Mapear ferramentas, especialistas e tendencias do mercado BR e global.
4. Blueprint completo da empresa (modelo, operacao, produto, marketing).

## Estrutura do Vault Obsidian

Todo conteudo de conhecimento fica em `base-de-conhecimento/`:

```
00 - Verdade Unica/       → VERDADE_UNICA_BUSCOU, Governanca, MOCs, Mental Models
01 - Posicionamento/      → Conceito e Posicionamento, Proposta de Valor
02 - ICP/                 → ICP por Nicho, Nicho Inicial, ICP - Cliente Ideal
03 - Oferta/              → Oferta Comercial, Prova Social, ROI para Cliente
04 - Produto/             → Requisitos, Roadmap, Dashboard, Onboarding, Suporte, Modo MVP
05 - Modelo de Negocio/   → Modelo de Negocio, Canvas, Unit Economics, NSM, Decision Logs
06 - SEO/                 → Fundamentos, Tecnico, Local, On/Off-page, Ferramentas SEO, Mercado BR/Global
07 - AIO/                 → AIO, GEO, AEO, LLMO, Schema para IA, llms.txt, Ferramentas AIO
08 - Estrategia Conteudo/ → Frameworks SEO/AIO, Topic Clusters, Frameworks por Query
09 - Execucao/            → Pipeline, Playbooks, Experimentos, Dominio, Rankings
10 - Go To Market/        → Go To Market Inicial, Script de Vendas
11 - Operacao/            → Fluxo Operacional, Jornadas, UX critica, SLAs
12 - Sistema/             → Arquitetura, Modulos, Entidades, State machines, Integracoes
13 - Agentes/             → Orquestrador + agentes + Prompts (subpasta) + Frameworks Multi-Agente
14 - Marketing/           → Funil, Dog-fooding, Distribuicao, Tom de Voz, Casos, Concorrentes
15 - Glossario/           → Termos tecnicos com definicoes
21 - Identidade Visual/   → Design System (camada visual/UI — separada das 15 canonicas)
Templates/                → Templates padrao para notas
CHANGELOG.md              → Historico de mudancas estruturais do vault
```

Principio: cada pasta tem uma funcao clara. Se a nota nao couber em nenhuma, **deleta**. Nao ha mais pasta de "arquivo morto" — conteudo obsoleto e removido na hora para manter o vault enxuto (decisao de 2026-04-23).

## Camadas do projeto (raiz)

Alem do vault, o projeto tem camadas paralelas na raiz:

```
/base-de-conhecimento/   → Vault Obsidian (conhecimento canonico)
/identidade-visual/      → Design System de codigo (tokens, SVGs, componentes React)
/produto/                → Codigo do produto (frontend, backend, pipeline, agents, cms, integracoes)
/conteudo/               → Producao de conteudo (artigos, clusters, templates, imagens)
/agentes/                → Prompts e contexto dos agentes IA
/CLAUDE.md               → Este arquivo
```

## Identidade Visual (obrigatoria)

Fonte da verdade: pasta `identidade-visual/` (tokens, SVGs, componentes React)
+ documentacao navegavel em `base-de-conhecimento/21 - Identidade Visual/`.
MOC: `base-de-conhecimento/00 - Verdade Unica/MOC - Identidade Visual.md`.
**Consultar sempre antes de qualquer trabalho de UI, logo ou copy da marca.**

### Regras inegociaveis

- **Tokens primeiro.** Consumir via CSS variables (`var(--color-*)`, `var(--radius-*)`, `var(--space-*)`, `var(--transition-*)`). Nunca hardcode HEX/px fora da paleta.
- **Componentes do DS.** Reusar `Button`, `Card`, `SearchBar`, `Badge` de `identidade-visual/components/`. Nao duplicar.
- **Logo.** Sempre via SVG em `identidade-visual/logos/`. Em HTML, usar `buscou.ai` (preferido) ou `BuscouAI` (institucional). Nunca "Buscou.AI", "BUSCOU.AI" ou "Buscou.ai".
- **Dark-first.** Fundo padrao `#08090D`. Em fundo claro, mint troca para `#00B37A` (nunca usar `#00E5A0` sobre claro).
- **Proporcoes.** Mint (`--color-ai`) <= 10% da composicao. Coral (`--color-coral`) <= 2% (so erro/alerta critico).
- **Icones.** 24x24, stroke 1.75, `currentColor` - sem excecao. Novo icone entra em `identidade-visual/icons/` antes de ser usado.
- **Tipografia.** Geist para corpo/display, Geist Mono para `.ai`/labels/eyebrow, Instrument Serif restrita a citacoes/manifestos. Tracking negativo (-0.03 a -0.05em) em displays.
- **SearchBar com cursor piscante** e a assinatura visual - usar em momentos-chave.
- **Tom de voz.** Direto, inteligente, moderno. Numeros em vez de adjetivos. Sem "transformacao digital", "sinergia", "jornada".

### Quando mexer em UI

1. Ler `base-de-conhecimento/21 - Identidade Visual/Regras de Uso.md` (checklist completo).
2. Importar `identidade-visual/index.css` no entry point do app.
3. Consumir tokens e componentes existentes.
4. Se algo nao existe no DS, criar seguindo `Templates/Template - Componente UI.md` e documentar em `21 - Identidade Visual/` antes de usar.

## Principio Guia

> "Nao e um estudo de SEO/AIO — e o blueprint de uma empresa automatizada de aquisicao organica."

A base tem tres camadas:
1. **Conhecimento** (secoes 01-08): fundamentos, ferramentas, mercado, estrategias
2. **Execucao** (secoes 09-13): pipeline, playbooks, distribuicao, prompts, queries
3. **Empresa** (secoes 14-20): modelo de negocio, agentes, sistema, produto, marketing

## Convencoes

### Nomenclatura de Arquivos
- Nomes em portugues, capitalizados normalmente
- Espacos permitidos (padrao Obsidian)
- Exemplo: `O que e SEO.md`, `Ahrefs.md`, `Panorama SEO Brasil 2026.md`

### Frontmatter Obrigatorio
Toda nota deve ter frontmatter YAML com:
- `tipo`: conceito | ferramenta | especialista | estrategia | recurso | mercado | glossario | playbook | template | rastreamento
- `area`: SEO | AIO | Ambos
- `tags`: lista de tags relevantes
- `atualizado`: data YYYY-MM-DD

### Links Internos
- Usar wiki links do Obsidian: `[[Nome da Nota]]`
- Sempre linkar termos do glossario na primeira mencao
- Linkar ferramentas, conceitos e especialistas relacionados

### Qualidade do Conteudo
- Sempre citar fontes com links
- Incluir dados e estatisticas quando disponiveis
- Usar exemplos praticos
- Manter linguagem acessivel (usuario e iniciante)
- Atualizar a data no frontmatter ao editar

## Ferramentas Disponiveis para Pesquisa

| Ferramenta | Quando Usar |
|---|---|
| WebSearch | Pesquisar qualquer topico no Google |
| WebFetch | Extrair conteudo de uma URL especifica |
| yt-search | Buscar videos no YouTube por tema |
| Write | Criar novos arquivos .md |
| Edit | Atualizar notas existentes |

## Glossario Rapido de Termos

- **SEO** - Search Engine Optimization: otimizacao para motores de busca tradicionais
- **AIO** - AI Optimization: otimizacao para aparecer em respostas de IAs
- **GEO** - Generative Engine Optimization: otimizacao para motores de busca generativos
- **AEO** - Answer Engine Optimization: otimizacao para motores de resposta
- **LLMO** - Large Language Model Optimization: otimizacao para LLMs
- **E-E-A-T** - Experience, Expertise, Authoritativeness, Trustworthiness: criterios de qualidade do Google
- **SERP** - Search Engine Results Page: pagina de resultados do buscador
- **AI Overviews** - Resumos gerados por IA do Google no topo dos resultados
- **Schema Markup** - Dados estruturados que ajudam buscadores e IAs a entender conteudo
- **Topic Cluster** - Estrategia de conteudo com pillar page + cluster pages interligadas
- **Backlink** - Link de outro site apontando para o seu
- **On-Page SEO** - Otimizacoes feitas dentro da propria pagina
- **Off-Page SEO** - Otimizacoes feitas fora do site (backlinks, mencoes, etc.)
- **SEO Tecnico** - Aspectos tecnicos do site (velocidade, crawlability, indexacao)
- **llms.txt** - Arquivo que ajuda IAs a entenderem a estrutura do site

## Perfil do Usuario

- Nivel atual: Iniciante em SEO
- Idioma: Portugues (Brasil)
- Foco: Conhecimento generico aplicavel a multiplos nichos
- Objetivo final: Oferecer como servico profissional
