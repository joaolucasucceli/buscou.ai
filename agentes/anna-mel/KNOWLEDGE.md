# KNOWLEDGE.md — Verdade canônica da buscou.ai (inline)

> Resumo curado da VERDADE_UNICA do projeto. Consulto antes de responder qualquer dúvida substantiva (preço, produto, ICP, linguagem). Se algo aqui conflitar com o arquivo completo do vault (`base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md`), o arquivo completo tem precedência e eu escalo pro João pra corrigir este inline.

## 1. Definição da empresa

**buscou.ai é uma tecnologia que coloca empresas nos resultados de busca e nas respostas de IA automaticamente.**

- **Não é agência.**
- **Não é consultoria.**
- **Não é serviço de gestão.**

É **tecnologia vendida como produto fechado**: estrutura (blog) + motor (sistema de geração de conteúdo), com implementação única e infra mensal.

## 2. Posicionamento

- **Frase central (inegociável):** *"Se alguém buscou, quem apareceu foi você?"*
- **O que fazemos (uma frase):** fazemos sua empresa aparecer quando seu cliente busca — no Google e na IA.
- **Canais onde aparecemos:** Google (SEO tradicional) + IA (ChatGPT, Gemini, Perplexity, Claude, Google AI Overviews).
- **Promessa:** presença em buscas organicas + presença em respostas de IAs generativas.
- **Não prometemos top 1** — prometemos **aparecer com consistência**.

## 3. ICP (público-alvo)

### Primário (foco de comunicação e go-to-market)

Negócios locais que dependem de canal de intenção (busca):
- Clínicas (odontológicas, estéticas, médicas, veterinárias)
- Imobiliárias e corretores
- Advogados e escritórios jurídicos
- Serviços locais (contabilidade, marketing, consultoria, assistência técnica, reformas)

### Secundário (atende, mas não é foco)

Qualquer empresa que trabalhe com canal de aquisição por intenção (SEO + AIO), mesmo não-local.

### Regra

**Em toda comunicação externa, posiciono pra "negócios locais".** Mesmo que a tecnologia sirva outros, o ICP de marketing é local.

## 4. Produto

### Componente 1 — Estrutura (Blog)
- Site/blog completo, configurado e hospedado.
- Otimizado tecnicamente pra SEO + AIO (schema, llms.txt, Core Web Vitals, interlinking).
- Integração com domínio do cliente.
- **Entregue uma vez** na implementação. Depois disso, pertence ao cliente (permanece no ar mesmo se a infra for cancelada).

### Componente 2 — Motor (buscou.ai)
- Sistema automatizado de geração de conteúdo.
- **3 conteúdos por dia = 90 por mês**.
- Cada conteúdo: **800-1.200 palavras** (~5.000-8.000 caracteres).
- Volume mensal: até **720.000 caracteres otimizados** (90 × ~8.000).
- Cada conteúdo otimizado pra SEO + AIO (answer-first, schema, dados, interlinking).
- Publicação automática no blog do cliente.
- **Requer infra mensal ativa** pra operar. Sem infra paga, motor pausa — blog e conteúdo já publicado permanecem no ar.

### Timeline canônica

- **Até 7 dias:** blog no ar, identidade aplicada, estrutura SEO+AIO, motor ativo.
- **Até 30 dias:** indexação no Google, primeiras impressões, primeiras aparições em IA.
- **Mês 1 (0-30 dias):** incluso na implementação — cliente não paga infra ainda.
- **Mês 2 em diante:** infra mensal de R$ 300 começa.
- **A partir daí:** presença organica escala continuamente enquanto infra ativa.

## 5. Modelo comercial

### 5.1 Implementação (one-time)

| Forma | Valor |
|---|---|
| À vista | **R$ 2.500** |
| Parcelado até 12x (cliente assume juros) | **R$ 3.000** (12x de R$ 250) |

**Cobre:** blog publicado + motor configurado + primeira estratégia + onboarding + **mês 1 de operação incluso** (primeiros ~90 conteúdos).

Pago uma vez. Payment Link enviado via WhatsApp pelo João depois do cliente aceitar a proposta personalizada. À vista via Pix ou cartão. Parcelado via cartão (12x).

### 5.2 Infra mensal (recurring)

| Item | Valor |
|---|---|
| Infra mensal (a partir do mês 2) | **R$ 300/mês** |

**Cobre:** tokens LLM (Claude, OpenAI) pra gerar os 90 conteúdos/mês + APIs externas (Ahrefs, DataForSEO, GSC, Stripe) + hospedagem do pipeline.

**Natureza:** passthrough de custo operacional com margem pequena. Não é mensalidade de serviço — é taxa de infraestrutura que permite o motor rodar.

**Cobrado via:** cartão recorrente cadastrado no onboarding.

**Primeira cobrança:** mês 2 (30 dias depois do blog ir ao ar).

### Política de inadimplência (infra)

1. Gateway tenta cobrança 3 vezes com smart retry (D+0, D+3, D+7).
2. Se todas falharem: motor pausa — para de gerar e publicar novos conteúdos.
3. Blog + conteúdo já publicado permanecem no ar.
4. Cliente recebe notificação em cada tentativa + aviso de pausa.
5. Ao regularizar, motor retoma no próximo ciclo.

### 5.3 Política de desconto (implementação)

- **Implementação:** negociável caso-a-caso via Cupom Stripe.
- **Infra mensal:** **inegociável em qualquer cenário** — passthrough de custo.
- **Âncora pública preservada:** toda copy pública mostra R$ 2.500 / R$ 3.000 em 12x. Descontos **nunca** aparecem em material público.
- **Aprovador único:** o João. Nem Vitória, nem eu, nem qualquer outro agente emite cupom.
- **Canal de aplicação:** Payment Link Stripe enviado via WhatsApp pelo João pós-reunião, já com cupom aplicado se houve negociação.
- **Piso operacional:** não ir abaixo de R$ 1.000 de implementação (60% off) salvo exceção documentada pelo João.

### O que NÃO existe

- Sem tiers (Starter / Growth / Scale).
- Sem plano mensal de serviço.
- Sem mensalidade de gestão, de consultoria, de agência.
- Sem setup separado da implementação.
- Sem assinatura de SaaS (no sentido comercial clássico).
- Sem outros descontos além da política 5.3.

## 6. Linguagem (proibida e permitida)

### Proibido usar em uso próprio

| Termo proibido | Por quê |
|---|---|
| "agência" | Não somos. |
| "gestão de X" | Não gerimos — entregamos tecnologia. |
| "consultoria" | Não consultamos. |
| "serviço mensal" | Não é serviço. |
| "mensalidade de serviço" | Mensalidade só existe pra infra (componente técnico). |
| "mensalidade de gestão" | Idem. |
| "plano mensal" | Não há planos. |
| "assinatura SaaS" (em copy público) | Comercialmente não somos. |
| "plano" (Starter/Growth/Scale) | Não há planos. Oferta única. |
| "contrato mensal" | Não há. |
| "horas de trabalho" | Não vendemos horas. |
| "piloto automático" | Abstrato — usar "automação de presença". |
| "sistema operacional" | Abstrato — cortar. |
| "transformação digital" | Clichê. |
| "jornada" | Clichê. |
| "sinergia" | Clichê. |
| "soluções" (soltinho) | Usar "tecnologia", "sistema" ou "motor". |
| "plano total" / "pacote total" | Nunca unificar implementação + infra como pacote. |
| "checkout direto" / "comprar agora" (em copy público) | Revogado 2026-04-24. |
| "self-service" (em copy público) | Revogado 2026-04-24. |
| Expor "R$ 2.500" / "R$ 3.000" / "R$ 300" em copy público | Revogado 2026-04-24. Valores só em reunião + proposta + Payment Link via WhatsApp. |

### Permitido e recomendado

| Termo | Uso |
|---|---|
| "tecnologia" | Como vendemos. |
| "sistema" | O que o cliente compra. |
| "motor" | Componente de geração automática. |
| "estrutura" | Componente blog. |
| "automação" | O que o motor faz. |
| "implementação única" | Componente 1 do pagamento. |
| "infra mensal" | Componente 2 — nome preferido em copy público. |
| "custo de operação do motor" | Forma explicativa do R$ 300. |
| "taxa de infraestrutura" | Forma técnica. |
| "aparecer" | O que o produto entrega. |
| "busca" | Onde aparecemos. |
| "SEO" / "AIO" | Canais onde otimizamos. |
| "presença organica" | Resultado pro cliente. |
| "reunião de diagnóstico" | Termo canônico do fluxo consultivo único. |
| "proposta personalizada" | Documento enviado em até 24h pós-reunião. |
| "agendar diagnóstico" | CTA canônico único de conversão da landing. |
| "Payment Link" | Link Stripe enviado via WhatsApp pelo João pós-aceite. |
| "diagnóstico hiperpersonalizado" | Variação pra enfatizar que é sobre o negócio dele. |

### Como falar do modelo comercial

- **Certo:** "R$ 2.500 à vista (ou 12x R$ 250) de implementação + R$ 300/mês de infra a partir do mês 2."
- **Certo:** "Paga a implementação uma vez e a infra que mantém o motor rodando."
- **Certo:** "Mês 1 incluso na implementação. A infra mensal começa no mês 2."
- **Errado:** "Plano mensal de R$ 300."
- **Errado:** "Assinatura de R$ 300."
- **Errado:** "Mensalidade do serviço."

### Nome da marca (obrigatório)

- **Visual:** `buscou.ai` — minúsculo, com ponto.
- **Institucional (jurídico):** `BuscouAI`.
- **Domínio real:** `buscouai.com`.
- **Nunca:** `Buscou.ai`, `Buscou.AI`, `BUSCOU.AI`, `buscou.AI`.

## 7. Promessa vs entrega (sem venda enganosa)

| Prometemos | Entregamos | Verdade |
|---|---|---|
| Aparecer em Google e IA | Blog + 90 conteúdos/mês otimizados SEO+AIO | Coerente |
| Automação | Motor publica 3x/dia sem intervenção | Coerente (infra ativa) |
| Implementação única | Cliente paga 1x (à vista ou 12x), pós-aceite | Coerente |
| Diagnóstico e proposta personalizada | Reunião 30-60 min + documento 24h | Coerente |
| Infra mensal transparente | R$ 300/mês via cartão recorrente | Coerente |
| Mês 1 incluso | Motor opera no mês 1 sem cobrança de infra | Coerente |
| Motor pausa sem pagamento | Blog e artigos antigos ficam no ar | Coerente |
| Resultado organico | 90 conteúdos/mês gera presença em 3-6 meses | Honesto |

### O que NÃO prometemos

- Top 1 no Google.
- Ranqueamento em 24h.
- Aparição em 100% das buscas do nicho.
- Retorno financeiro X% em Y meses.
- Exclusividade de nicho.
- Motor rodando de graça pra sempre.
- Suporte técnico 24/7.

## 8. Estrutura de venda (fluxo único consultivo — parte Lead)

**Fluxo onde eu atuo:**

1. Lead chega pela landing `www.buscouai.com` ou WhatsApp direto.
2. Se landing: clica "Agendar diagnóstico" (CTA único), preenche modal (nome, telefone, empresa, @IG), seleciona slot no Cal.com.
3. Se WhatsApp direto: **cai comigo (Anna Mel)**. Eu me apresento, qualifico leve, respondo dúvidas, ofereço agendamento.
4. Cliente agenda (eu crio o booking via Cal.com API dentro do chat).
5. No dia: reunião de diagnóstico 30 min com João + Vitória, online, gravada/transcrita.
6. Pós-reunião: João gera proposta personalizada em até 24h.
7. Cliente aceita → João envia Payment Link Stripe via WhatsApp (cupom aplicado se negociou).
8. Cliente paga pelo Payment Link.
9. Webhook promove lead a cliente → João/Vitória mandam credenciais do painel.
10. Onboarding, blog no ar em 7 dias, motor publicando 3x/dia.

**Meu escopo na V1:** passos 3 e 4. Todo o resto é operação manual de João/Vitória. V1.1+ eu assumo gradualmente.

### Regras

- **CTA único:** "Agendar diagnóstico" em header, hero e final-cta. Landing não tem botão de compra direta nem preço exposto.
- **Reunião obrigatória antes de pagamento.** Sem self-service público.
- **Qualificação leve na reunião.** Se não for fit, João entrega diagnóstico de cortesia e não envia proposta.
- **Canal de pagamento:** Payment Link Stripe via WhatsApp. Não é Checkout público.
- **Ciclo-alvo:** primeiro contato → pagamento em até 7 dias.

## 11. Contato oficial

- **WhatsApp (formato humano):** `+55 27 99696-0847`
- **Formato internacional:** `5527996960847`
- **Link wa.me padrão:** `https://wa.me/5527996960847`
- **Mensagem pré-preenchida padrão (landing):** *"Oi, vi o site da buscou.ai e quero agendar um diagnóstico do meu negócio."*

Este é o canal único de atendimento e leads entrantes na V1. É o número em que eu opero.
