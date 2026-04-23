---
tipo: agente
area: Sistema
tags: [agente, prospeccao, outbound, leads, funil]
atualizado: 2026-04-23
---

# Agente Prospeccao

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O Agente Prospeccao gera **outbound** para levar leads qualificados ate a landing buscou.ai. **Nao qualifica BANT, nao agenda reuniao, nao fecha venda.** O modelo e self-service — quem fecha e a landing.

Relacionado: [[Arquitetura de Agentes]] | [[Orquestrador]] | [[ICP - Cliente Ideal]] | [[Site Publico]] | [[Funil Completo]]

---

## Funcao

Alimenta o topo do funil com prospecao ativa paralela ao marketing organico. Gera listas de negocios locais (ICP primario), escreve e-mails personalizados, envia, monitora abertura e respostas. Qualquer resposta positiva e direcionada para a landing — **nao ha reuniao de qualificacao**.

---

## Input

| Input | Origem |
|---|---|
| Lista de leads por nicho + cidade | Base publica (Google Maps API, CNPJ por segmento, diretorios setoriais) |
| Template de e-mail | Biblioteca de sequencias outbound |
| Perfil do lead | Dados coletados: nome da empresa, site, presenca atual em Google/IA, tamanho |
| Criterios ICP | [[ICP - Cliente Ideal]] (clinicas, imobiliarias, advogados, servicos locais) |
| Calendario de envio | Configuracao do Orquestrador (cadencia por lead) |

---

## Output

| Output | Destino |
|---|---|
| E-mails enviados | SMTP/SendGrid |
| Mensagens LinkedIn (V1.2+) | LinkedIn Sales Navigator / API |
| Metricas de campanha | Dashboard admin (abertura, clique, resposta, bounces) |
| Leads com resposta positiva | Entram no CRM como "interessado" e sao direcionados para a landing (nao para call obrigatoria) |
| Leads sem resposta apos sequencia | Vao para nurture ou sao descartados |

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| Google Maps API | Buscar negocios locais por nicho + cidade |
| SerpAPI / Bright Data | Extrair dados publicos do website do lead |
| Claude Sonnet 4 | Personalizar e-mail por lead (baseado em contexto publico) |
| SendGrid / Resend | Envio de e-mails + tracking de abertura/clique |
| WhatsApp Business API | Follow-up personalizado (V1.2+) |
| LinkedIn Sales Navigator API | Prospecao no LinkedIn (V1.2+) |
| PostgreSQL | Historico da campanha, status de cada lead |
| MCP Tools | `find_leads`, `personalize_email`, `send_email`, `track_response` |

---

## Gatilho

- **Cron** (diario, 8h): envia proximo batch da sequencia.
- **Manual**: admin importa lista de leads e dispara campanha.
- **Webhook de resposta**: e-mail de resposta chega → dispara fluxo de "interessado".

---

## Criterios de sucesso

| Metrica | Meta |
|---|---|
| Taxa de abertura | > 30% |
| Taxa de clique para a landing | > 5% |
| Taxa de resposta | > 3% |
| Taxa de conversao lead outbound → cliente | > 2% do total de leads abordados |
| Spam rate | < 0,1% (manter domain reputation) |

---

## Sequencia padrao (5 toques)

| Dia | Canal | Mensagem |
|---|---|---|
| 0 | E-mail | Primeiro contato — identifica o problema ("vi que seu negocio nao aparece quando alguem busca [keyword-nicho]") + link para analise gratuita |
| 3 | E-mail | Caso concreto de negocio similar + link para landing |
| 7 | LinkedIn (V1.2+) | Conexao + mensagem curta com referencia ao e-mail |
| 12 | E-mail | Desafio/pergunta direta ("voce chega em outubro com seu blog atualizado ou sem?") |
| 20 | E-mail | Break-up ("vou parar de enviar. Se mudar de ideia, aqui esta o link") |

Leads que responderem em qualquer ponto saem da sequencia automatica e entram no CRM.

---

## Casos de erro

1. **E-mail cai em spam.** Monitorar bounce rate e reputation. Pausar campanha se bounce > 5%. Escalar warmup de novo dominio se necessario.
2. **Lead pede reuniao.** Responder com link para call opcional (20-30 min) + link para landing. **Nao forcar reuniao como pre-requisito de venda.**
3. **Lead responde hostil.** Tirar da base imediatamente, marcar como "nao contactar".
4. **Lead fora do ICP mas interessado.** Responder com a landing. Se nao fechar, fica no CRM como "expansao ICP" (revisar trimestralmente).
5. **Lead ja e cliente.** Verificar CRM antes de enviar. Atualizar lista.

---

## Fallback

- **Provedor de e-mail falha**: alternar entre SendGrid/Resend/SMTP proprio. Nunca deixar fila de outbound parada.
- **API LinkedIn falha**: cair para canal e-mail apenas. Logar para escalacao.
- **Rate limit de Google Maps**: usar cache + fallback para listas pagas (ZoomInfo, Lusha).

---

## Dependencias

- **Depende de**: [[Orquestrador]], [[ICP - Cliente Ideal]], SendGrid, Google Maps API.
- **Quem depende**: funil organico e a [[Landing buscou.ai]] (recebe trafego pago do outbound).
- **Nao depende mais de**: "Agente SDR" (descartado), reuniao BANT (descartada).

---

## Exemplo de execucao

**Cenario:** lista de 50 clinicas de estetica em Vitoria-ES.

```
1. [08:00] Cron dispara Prospeccao
2. [08:00] Prospeccao carrega lista + contexto ICP
3. [08:01] Para cada lead, Prospeccao consulta site publico + extrai:
   - Nome da clinica
   - Numero de procedimentos/servicos visiveis
   - Se tem blog (se nao: forte sinal de dor)
   - Ranking no Google para keywords locais obvias
4. [08:05] Prospeccao personaliza e-mail (via Claude):
   - Hook: "Olha, pesquisei '{keyword-primaria}' em Vitoria e encontrei 3 concorrentes. O seu nome nao apareceu."
   - Corpo: "Fiz uma analise rapida do seu site — voce ainda nao tem blog. Se tivesse 90 artigos/mes otimizados para as buscas da sua regiao, isso mudava."
   - CTA: "Em 10 min te mostro como: [link landing]"
5. [08:06-09:00] Envia 50 e-mails escalonadamente (evita spam rate).
6. [12:00] Monitor de abertura + clique roda.
7. [16:00] Leads que clicaram no link mas nao compraram recebem follow-up via retarget.
8. [D+3] Segundo toque da sequencia dispara.
```

**Tempo total por batch (50 leads):** ~2 horas automatizadas. **Custo:** ~$0,15 (Claude Sonnet) + ~$0,60 (envio via SendGrid).

---

## Custo estimado

| Componente | Custo |
|---|---|
| Claude Sonnet (personalizacao, ~1k tokens/lead) | $0,003/lead |
| SendGrid | ~$0,001/e-mail |
| Google Maps API | ~$0,01/consulta |
| LinkedIn Sales Navigator (V1.2+) | plano fixo mensal |
| **Total por lead por toque** | **~$0,015** |
| **Total por sequencia de 5 toques** | **~$0,075** |

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 3, 6, 7 — ultima verificacao 2026-04-23.*
