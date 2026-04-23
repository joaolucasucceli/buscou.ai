---
tipo: operacao
area: UX
tags: [operacao, jornada, cliente, ux, touchpoints]
atualizado: 2026-04-23
---

# Jornada do Cliente

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]] secoes 7 e 8. Este arquivo descreve o que o cliente ve, sente e faz em cada momento — e o que a tecnologia executa nos bastidores.

Relacionado: [[ICP - Cliente Ideal]] | [[Fluxo Operacional Completo]] | [[Site Publico]]

---

## Touchpoints (ordem cronologica)

### 1. Descoberta (Google, AI Overview, ChatGPT, indicacao)
- **Ve:** artigo do blog buscou.ai respondendo uma duvida dele sobre aparecer em buscas, ou mencao em IA.
- **Sente:** reconhecimento de autoridade — "esses caras praticam o que vendem".
- **Bastidores:** proprio pipeline produzindo 3 artigos/dia em dog-fooding.
- **Metrica:** impressoes GSC, citacoes em AI Overviews, leads no formulario.

### 2. Landing buscou.ai
- **Ve:** hero com "Se alguem buscou, quem apareceu foi voce?", resumo do produto (Blog + Motor, 90 conteudos/mes), oferta clara (R$ 2.500 / R$ 3.000), prova social, FAQ, checkout.
- **Sente:** clareza sobre preco, escopo e timeline. Sem formulario longo, sem "fale com um consultor".
- **Bastidores:** Next.js + Vercel Edge, analytics rastreando decisao em 5s.
- **Friccao:** se a pagina demora > 3s, perdemos o lead. Se a oferta nao esta no primeiro scroll, idem.
- **Metrica:** bounce < 40%, tempo na pagina > 2 min, conversao landing → checkout > 2%.

### 3. Decisao de compra
- **Ve:** checkout em uma tela, Pix ou cartao. Opcao de parcelar em 12x (cliente assume juros).
- **Sente:** compromisso — "agora e pra valer". Compra unica, sem pegadinha de mensalidade.
- **Bastidores:** gateway (Stripe ou Asaas) gera cobranca. [[Agente Pagamento]] escuta webhook.
- **Friccao:** cartao recusado → fallback imediato para Pix. Medo de assinatura → microcopy deixa claro "pagamento unico, sem renovacao".
- **Metrica:** conversao checkout → pagamento confirmado > 80%.

### 4. Call opcional (so se o cliente pedir)
- **Ve:** link discreto "ainda com duvida? agende 20 min" logo abaixo do checkout.
- **Sente:** opcao, nao obrigacao.
- **Bastidores:** Google Calendar + Meet. Humano usa diagnostico pre-gerado pelo [[Agente Estrategista]] a partir do dominio do prospect. Nao e qualificacao, e esclarecimento.
- **Metrica:** < 20% dos leads pede call; dos que pedem, > 60% compra.

### 5. Confirmacao de pagamento e boas-vindas
- **Ve:** e-mail + WhatsApp: "Pagamento confirmado. Seu blog entra no ar em ate 7 dias. Aqui esta o link para configurar em 10 minutos."
- **Sente:** empolgacao — a maquina comecou.
- **Bastidores:** [[Agente Pagamento]] confirma → Supabase cria projeto → Resend dispara e-mail → dashboard liberado.
- **Metrica:** abertura do e-mail > 80%, primeiro login em 24h > 70%.

### 6. Wizard de onboarding (24-48h)
- **Ve:** wizard em 5 passos: dominio (ou subdominio buscou.ai), nicho, tom desejado, concorrentes, GSC.
- **Sente:** participacao ativa, 10 min de esforco.
- **Bastidores:** dados alimentam [[Agente Estrategista]] que inicia pesquisa imediatamente.
- **Friccao:** cliente sem GSC → [[Agente Suporte]] guia em video + suporte humano se necessario.
- **Metrica:** conclusao em 48h > 85%.

### 7. Ativacao (ate 7 dias)
- **Ve:** "Seu blog esta no ar. Primeiro artigo publicado." Notificacao por e-mail + WhatsApp com link para a URL.
- **Sente:** validacao da compra.
- **Bastidores:** pipeline completo dispara, [[Agente Publicador]] sobe o primeiro artigo, sitemap enviado para o GSC.
- **Metrica:** time-to-first-value (TTFV) < 48h no caso medio, teto de 7 dias. Ver [[Time to Value]].

### 8. Producao continua (3 artigos/dia)
- **Ve:** dashboard mostrando artigos publicados, em producao, em revisao. Dia apos dia.
- **Sente:** maquina funcionando — nao precisa fazer nada.
- **Bastidores:** [[Agente Estrategista]] → Pesquisador → Redator → Revisor → Visual → Publicador → Distribuidor → Monitor, coordenados pelo [[Orquestrador]].
- **Metrica:** 90 artigos publicados/mes, ~720K caracteres.

### 9. Primeiros sinais (ate 30 dias)
- **Ve:** dashboard com: termos indexados, impressoes crescendo, primeiras posicoes, primeiras AI Overviews citando o blog.
- **Sente:** confianca — "ta acontecendo".
- **Bastidores:** [[Agente Monitor]] cruza dados do GSC + ferramentas AIO (Otterly, AthenaHQ, AI Overview Tracker).
- **Friccao:** cliente que espera pagina 1 em 7 dias. Onboarding ja educa: "Primeiros sinais em 30 dias, resultados fortes em 90 dias".
- **Metrica:** NPS no dia 30 > 7, churn involuntario < 5%.

### 10. Rotina mensal (90 dias em diante)
- **Ve:** relatorio mensal automatico + dashboard sempre atualizado. Opcao de chat com [[Agente Suporte]] ou e-mail humano.
- **Sente:** ROI crescente mes a mes, tranquilidade.
- **Bastidores:** ciclo completo dos 11 agentes rodando. Sem intervencao humana nos casos padrao.
- **Metrica:** engajamento com dashboard (logins > 4/mes), crescimento MoM de trafego organico.

### 11. Fim do ciclo de 12 meses (para parcelados)
- **Ve:** ultima parcela debitada. Motor continua ativo. Sem renovacao automatica.
- **Sente:** ja cobriu o investimento — a partir daqui e so ROI.
- **Bastidores:** [[Agente Pagamento]] sinaliza fim do parcelamento. Blog e motor seguem funcionando (compra foi unica, nao foi assinatura).
- **Oferta opcional:** contrato de manutencao anual (nao e venda automatica, e proativa do time humano). Fora do escopo V1.

---

## Mapa de emocoes por fase

| Fase | Emocao dominante | Risco principal |
|---|---|---|
| Descoberta | Curiosidade | Nao converter visita em landing |
| Decisao | Compromisso | Cartao recusado, duvida sobre escopo |
| Ativacao | Empolgacao | Abandono do wizard |
| Primeiros sinais | Validacao | Frustracao se timeline nao for educado |
| Rotina | Confianca | Desengajamento silencioso |

Cada touchpoint com friccao alta tem acionamento automatico de [[Agente Suporte]] ou alerta para humano via [[Orquestrador]].

---

## SLA unico (nao ha tiers)

Ver [[SLAs e Garantias]]. Resumo:
- Blog no ar em ate 7 dias.
- Primeiros sinais em ate 30 dias.
- 90 conteudos publicados por mes (media 3/dia).
- Uptime >= 99%.
- Suporte respondido em ate 24h (IA imediata; humano em ate 24h quando escalado).

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 5, 7, 8, 9 — ultima verificacao 2026-04-23.*
