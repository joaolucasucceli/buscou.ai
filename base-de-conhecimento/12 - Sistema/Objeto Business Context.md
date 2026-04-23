---
tipo: sistema
area: Arquitetura
tags: [sistema, business-context, objeto, agentes, contexto, cerebro]
atualizado: 2026-04-22
---

# Objeto Business Context — O Cerebro Compartilhado

> Este JSON e a UNICA FONTE DE VERDADE que todos os agentes leem. Vive na tabela `contextos_negocio.contexto_json`. E gerado pelo [[Onboarding Automatico]] e atualizado pelo [[Feedback Loop]].

---

## O que E

O `business_context` e um objeto JSON consolidado que contem TUDO que os agentes precisam saber sobre o cliente para executar sem ambiguidade. Em vez de cada agente consultar 10 tabelas, todos leem 1 objeto.

**Analogia**: E o "briefing do cliente" que voce daria a um funcionario novo. Com esse documento, ele consegue trabalhar no primeiro dia.

---

## Estrutura Completa

```json
{
  "identidade": {
    "nome": "Imobiliaria Praia do Canto",
    "nome_fantasia": "IPC Imoveis",
    "categoria": "Imobiliaria",
    "subcategoria": "Venda de imoveis",
    "descricao": "Imobiliaria especializada em imoveis de alto padrao na regiao de Vitoria-ES, com 15 anos de experiencia e mais de 500 imoveis vendidos.",
    "site": "https://ipcimoveis.com.br",
    "whatsapp": "+5527999998888",
    "instagram": "@ipcimoveis"
  },

  "localizacoes": {
    "cidade_principal": "Vitoria",
    "estado": "ES",
    "pais": "Brasil",
    "bairros_foco": ["Praia do Canto", "Jardim da Penha", "Mata da Praia", "Enseada do Sua"],
    "atende_online": false,
    "raio_km": 30,
    "multiplas_unidades": false
  },

  "oferta": {
    "servico_principal": "Venda de imoveis",
    "servicos_secundarios": ["Locacao", "Avaliacao", "Consultoria imobiliaria"],
    "ticket_medio": 2500,
    "modelo_atendimento": "orcamento",
    "sazonalidade": false,
    "servicos_lucrativos": ["Venda de imoveis", "Consultoria imobiliaria"]
  },

  "publico": {
    "persona": "Casal 30-45 anos comprando primeiro imovel ou fazendo upgrade",
    "dores": [
      "Nao sabe por onde comecar a busca",
      "Medo de golpe ou problema juridico",
      "Dificuldade de encontrar imovel no bairro desejado",
      "Processo burocrático demais"
    ],
    "objecoes": [
      "E muito caro",
      "Nao confio em imobiliaria",
      "Prefiro negociar direto com o dono",
      "Vou esperar o mercado melhorar"
    ],
    "termos_busca": [
      "comprar apartamento vitoria",
      "imoveis praia do canto",
      "apartamento 3 quartos jardim da penha",
      "melhor imobiliaria vitoria",
      "imovel alto padrao es"
    ],
    "resultados_desejados": [
      "Encontrar o imovel ideal sem estresse",
      "Seguranca juridica na compra",
      "Atendimento personalizado"
    ]
  },

  "marca": {
    "tom_de_voz": "profissional e acessivel",
    "palavras_usar": ["seguranca", "transparencia", "expertise", "exclusividade", "confianca"],
    "palavras_evitar": ["barato", "promocao", "urgente", "imperdivel"],
    "diferenciais": [
      "15 anos de mercado",
      "Mais de 500 imoveis vendidos",
      "Equipe com CRECI ativo",
      "Assessoria juridica inclusa"
    ]
  },

  "objetivos": {
    "objetivo_principal": "mais leads no WhatsApp",
    "servico_prioridade": "Venda de imoveis",
    "timeline": "resultados visiveis em 60 dias"
  },

  "concorrentes": [
    {
      "nome": "Imobiliaria Vitoria Premium",
      "site": "https://vitoriapremium.com.br",
      "principal": true
    },
    {
      "nome": "ES Imoveis",
      "site": "https://esimoveis.com.br",
      "principal": false
    },
    {
      "nome": "Lopes ES",
      "site": "https://lopes.com.br/es",
      "principal": false
    }
  ],

  "integracoes": {
    "google_analytics": true,
    "search_console": true,
    "google_business": true,
    "tag_manager": false,
    "stripe": true,
    "whatsapp": true,
    "calendario": true
  },

  "versao": 1,
  "gerado_em": "2026-04-22T10:00:00Z",
  "gerado_por": "onboarding"
}
```

---

## Como e Gerado

1. Cliente completa [[Onboarding Automatico]] (11 etapas)
2. Sistema consolida respostas brutas (tabela `respostas_onboarding`) em JSON estruturado
3. Funcao `gerar_contexto_negocio()` monta o objeto acima
4. Salva na tabela `contextos_negocio` com `versao: 1`
5. [[Agente Estrategista]] recebe e comeca a trabalhar

```
respostas_onboarding (brutas) → funcao de consolidacao → contextos_negocio (estruturado)
```

---

## Como e Versionado

Cada atualizacao significativa gera uma NOVA linha com `versao + 1`:

| Trigger | Quem atualiza | O que muda |
|---|---|---|
| Cliente edita dados no dashboard | Sistema | Secao alterada (ex: novo servico) |
| [[Feedback Loop]] detecta padrao | [[Agente Estrategista]] | `objetivos`, prioridades |
| [[Agente Monitor]] descobre insight | Sistema | `publico.termos_busca` (novos termos) |
| Cliente adiciona concorrente | Sistema | `concorrentes[]` |

**Regra**: versoes antigas NUNCA sao deletadas. Historico completo para auditoria.

### Campos de Versionamento na Tabela

```sql
-- Cada linha e uma versao completa do contexto
SELECT * FROM contextos_negocio
WHERE organizacao_id = 'xxx'
ORDER BY versao DESC
LIMIT 1; -- sempre pegar a mais recente
```

| Campo | Tipo | Descricao |
|---|---|---|
| `versao` | INTEGER | Numero sequencial (1, 2, 3...) |
| `gerado_por` | TEXT | Quem gerou: 'onboarding', 'feedback_loop', 'cliente', 'estrategista' |
| `contexto_json` | JSONB | Snapshot COMPLETO do contexto naquela versao |
| `criado_em` | TIMESTAMPTZ | Quando essa versao foi criada |

### Diff entre Versoes

Para debug e aprendizado, comparar versoes:

```sql
-- Pegar versao atual e anterior
WITH versoes AS (
  SELECT versao, contexto_json, gerado_por, criado_em,
         LAG(contexto_json) OVER (ORDER BY versao) AS versao_anterior
  FROM contextos_negocio
  WHERE organizacao_id = 'xxx'
)
SELECT * FROM versoes WHERE versao = (SELECT MAX(versao) FROM versoes);
```

**Cada versao registra**: o que mudou, quem mudou, quando mudou. Isso permite:
- **Debug**: "por que o sistema mudou de estrategia?"
- **Rollback**: "reverter para versao anterior se deu errado"
- **Aprendizado**: "quais mudancas geraram melhores resultados?"

---

## Como os Agentes Leem

Cada agente recebe o `business_context` como parte do seu prompt de sistema:

```
[System prompt do agente]
+ "Contexto do cliente: {business_context JSON}"
+ "Tarefa especifica: {job input}"
```

O [[Orquestrador]] e responsavel por:
1. Buscar a versao mais recente do `business_context`
2. Injetar no prompt de cada agente antes da execucao
3. Garantir que todos usam a mesma versao numa mesma "rodada"

Ver detalhes de quais campos cada agente usa: [[Inputs dos Agentes]]

---

## Regras de Imutabilidade

| Secao | Quem pode alterar | Como |
|---|---|---|
| `identidade` | Somente o cliente | Via dashboard → Settings |
| `localizacoes` | Somente o cliente | Via dashboard → Settings |
| `marca` | Somente o cliente | Via dashboard → Settings |
| `oferta` | Cliente + Sistema (sugestoes) | Dashboard + sugestoes do Estrategista |
| `publico` | Sistema (com aprovacao) | Feedback Loop sugere, cliente aprova |
| `objetivos` | Sistema (atualiza prioridades) | Feedback Loop ajusta automaticamente |
| `concorrentes` | Ambos | Cliente adiciona, Monitor detecta novos |
| `integracoes` | Sistema | Atualiza automaticamente quando conecta/desconecta |

**Regra de ouro**: O sistema NUNCA altera `identidade`, `localizacoes` ou `marca` sem aprovacao explicita do cliente. Essas secoes sao "sagradas".

---

## Validacao

Antes de qualquer agente usar, o sistema valida:

- [ ] `identidade.categoria` existe e e valida
- [ ] `localizacoes.cidade_principal` preenchido
- [ ] `oferta.servico_principal` preenchido
- [ ] `objetivos.objetivo_principal` preenchido
- [ ] `versao` e a mais recente

Se faltar campo critico → onboarding incompleto → bloquear execucao → notificar cliente.

---

## Notas Relacionadas

- [[Onboarding Automatico]] — Wizard que gera o contexto (11 etapas)
- [[Inputs dos Agentes]] — Quais campos cada agente consome
- [[Entidades e Schema - Fase 1 (Onboarding)]] — Tabela `contextos_negocio` no banco (Bloco B)
- [[Feedback Loop]] — Como o contexto evolui automaticamente
- [[Orquestrador]] — Quem injeta o contexto nos agentes
- [[Agente Estrategista]] — Primeiro agente a usar apos onboarding
