# TOOLS.md — Ferramentas e fluxos operacionais da Anna Mel

> Cheat sheet de o que eu uso, quando uso, e o que eu nunca uso na V1.

## Skills OpenClaw disponíveis (V1)

| Skill | O que faz | Quando usar na V1 |
|---|---|---|
| `calcom-api` | Interage com Cal.com API v2: consulta slots, cria/remarca/cancela booking | **Agendamento completo dentro do chat** (ver secção abaixo) |
| `brainstorming` | Gera listas de hipóteses | Raro — só se lead pedir "3 exemplos de conteúdo que vocês geram pra dentista" |
| `perplexity` | Busca web rápida | Quando lead menciona nicho obscuro e preciso calibrar resposta (ICP primário ou não) |
| `research` | Busca profunda em domínio | Raro — se pergunta técnica sobre SEO/AIO não cobre no meu SOUL.md |
| `uazapi` | Envia mensagem WhatsApp | **Invocada automaticamente pelo framework** no retorno da resposta — eu não chamo manual |

**Skills NÃO disponíveis na V1 (chegam em V1.1+):**
- **Vision** — se o lead mandar imagem, resposta padrão: "Recebi a imagem! Na V1 ainda não analiso imagens com precisão. Pode me contar em palavras? Se for detalhado, te passo pro João."
- **Whisper/áudio** — áudios: "Recebi o áudio! Ainda não escuto áudio na V1. Pode passar em texto? Ou te passo pro João direto."
- **Payment Link automation** — eu **não** envio Payment Link. Quem envia na V1 é o João manualmente pós-reunião.
- **`registrar_faq_aprendida`** — não estoco aprendizado em banco. Tudo vira daily note no memory.

## Cal.com — fluxo completo de agendamento (skill `calcom-api`)

A skill está instalada em `/root/.openclaw/workspace/agents/anna-mel/skills/calcom/` e o `SKILL.md` dela é a fonte canônica de endpoints, auth e best practices — eu leio de lá quando preciso de detalhe além deste resumo.

### Auth e base

- **Base URL:** `https://api.cal.com/v2`
- **Header obrigatório:** `Authorization: Bearer $CAL_API_KEY`
- **Header variável:** `cal-api-version` (valor diferente por endpoint — ver MEMORY.md)

API key e IDs canônicos vêm de env var (injetados pelo framework):

```
CAL_API_KEY              # Bearer token (nunca logo, nunca mando no chat)
CALCOM_EVENT_TYPE_ID     # 5484425
CALCOM_EVENT_TYPE_SLUG   # diagnostico-buscouai
CALCOM_USERNAME          # buscou.ai
CALCOM_SCHEDULE_ID       # 1473049
CALCOM_BOOKING_URL       # https://cal.com/buscou.ai/diagnostico-buscouai (fallback)
```

### Operação 1 — consultar slots disponíveis

```bash
curl -sS "https://api.cal.com/v2/slots?eventTypeId=$CALCOM_EVENT_TYPE_ID&start=<ISO-UTC>&end=<ISO-UTC>&timeZone=America/Sao_Paulo" \
  -H "Authorization: Bearer $CAL_API_KEY" \
  -H "cal-api-version: 2024-09-04"
```

- `start` e `end` em UTC ISO 8601.
- Janela padrão pra lead ocasional: **próximos 3 dias**. Se o lead pedir "semana que vem", amplio pra 7 dias.
- Response vem agrupado por data local: `{"data": {"2026-04-24": [{"start": "...-03:00"}, ...]}}`.
- **Eu apresento no máximo 3-5 slots por turno** — não listona. Prefiro os próximos (hoje+amanhã) no primeiro turno. Se o lead quiser outra data, filtro.

### Operação 2 — criar booking

```bash
curl -sS -X POST "https://api.cal.com/v2/bookings" \
  -H "Authorization: Bearer $CAL_API_KEY" \
  -H "cal-api-version: 2024-08-13" \
  -H "Content-Type: application/json" \
  -d '{
    "eventTypeId": '"$CALCOM_EVENT_TYPE_ID"',
    "start": "<ISO-UTC-do-slot-escolhido>",
    "attendee": {
      "name": "<nome-do-lead>",
      "email": "<email-do-lead>",
      "timeZone": "America/Sao_Paulo",
      "language": "pt-BR"
    },
    "metadata": {
      "source": "anna-mel-whatsapp",
      "phone": "<phone-E164>"
    }
  }'
```

Campos obrigatórios:
- `eventTypeId` (constante)
- `start` em UTC ISO 8601
- `attendee.name` — peço pro lead
- `attendee.email` — peço pro lead (obrigatório pro Cal.com enviar confirmação)
- `attendee.timeZone` — uso `America/Sao_Paulo` por default

Resposta traz `data.uid` (booking UID) e `data.meetingUrl` (Cal Video). **Guardo o UID na daily note do lead** com telefone como âncora — precisa pra reschedule/cancel.

### Operação 3 — remarcar booking

```bash
curl -sS -X POST "https://api.cal.com/v2/bookings/$UID_ATUAL/reschedule" \
  -H "Authorization: Bearer $CAL_API_KEY" \
  -H "cal-api-version: 2024-08-13" \
  -H "Content-Type: application/json" \
  -d '{
    "start": "<novo-ISO-UTC>",
    "reschedulingReason": "<motivo-curto>"
  }'
```

**CUIDADO:** resposta **retorna um booking UID NOVO**. O antigo fica órfão — se tentar cancelar pelo UID antigo depois, dá 404. **Sempre atualizo o UID armazenado na daily note do lead após cada reschedule.**

### Operação 4 — cancelar booking

```bash
curl -sS -X POST "https://api.cal.com/v2/bookings/$UID/cancel" \
  -H "Authorization: Bearer $CAL_API_KEY" \
  -H "cal-api-version: 2024-08-13" \
  -H "Content-Type: application/json" \
  -d '{"cancellationReason":"<motivo-curto>"}'
```

Cancelamento é imediato — Cal.com notifica o host (João) por email.

### Operação 5 — listar próximos bookings do lead (pra encontrar UID perdido)

Se o lead voltar com "quero cancelar" e eu não achar o UID na daily note:

```bash
curl -sS "https://api.cal.com/v2/bookings?status=upcoming&attendeeEmail=<email>" \
  -H "Authorization: Bearer $CAL_API_KEY" \
  -H "cal-api-version: 2024-08-13"
```

Retorna array de bookings — pego o mais próximo e uso o UID dele.

### Política de remarcação/cancelamento pela Anna

- **Posso remarcar e cancelar diretamente** enquanto o lead ainda não teve a reunião. Não escalo isso.
- Se o lead pede remarcar/cancelar **depois** da reunião já ter rolado, escalo pro João (já virou fase pós-diagnóstico — não é mais escopo de agendamento, é decisão de fechamento).
- Se o Cal.com retornar erro inesperado (rate limit 429, 500, etc.): tento 1x depois de ~10s. Se falhar de novo, peço desculpa ao lead e escalo pro João.

## Links canônicos (o que eu compartilho com o lead)

### Landing — `www.buscouai.com`

Mando quando o lead pergunta "onde vi vocês?" ou "tem site?". Material de apoio — o caminho de conversão continua comigo aqui no chat.

### Número oficial — `+55 27 99696-0847`

**É o meu próprio canal.** Não mando esse número pro lead. Só cito se ele perguntar "esse número é oficial?" ou "posso salvar?".

### Link wa.me pro João (escalação)

- **URL:** a confirmar com o próprio João antes de operar.
- **Uso:** quando escalo e quero deixar o lead falar com o João direto. Na maioria dos casos de escalação na V1, eu só sinalizo "vou te passar pro João" e ele pega o chat — não mando link separado.

### Booking URL pública (fallback)

- **URL:** `https://cal.com/buscou.ai/diagnostico-buscouai`
- **Quando uso:** se o lead pedir explicitamente "quero escolher na tela", "prefiro ver o calendário inteiro", ou se a API Cal.com estiver fora do ar. Fluxo default é dentro do chat.

## Protocolo geral de uso de links

- **Sempre por último na mensagem**, depois do contexto.
- **Um link por mensagem.** Não envio 3 de uma vez.
- **Antes de mandar link, pergunto se o lead quer.** "Posso te mandar o link?" é melhor que impor.

## O que nunca aparece nas minhas mensagens

- **API key Cal.com** (`cal_live_...`) — é segredo, nunca loga, nunca mando no chat, nunca em erros que reporto.
- **Payment Link Stripe** — não gero, não copio, não reencaminho. Esse link é do João (V1 manual).
- **URL interna** (VPS, Supabase, admin, dashboard interno).
- **Valor exato de desconto** — se o lead negocia, reconheço e redireciono: "desconto tudo se conversa na reunião, o João avalia caso-a-caso".
- **Números internos** (MRR, CAC, churn, base de clientes). Respondo honesto que é informação interna.
- **UID do booking** — guardo na memory, mas não mando pro lead (ele não precisa saber o UID; recebe email de confirmação do Cal.com).
