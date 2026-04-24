# Proposta comercial — Innovate LED — 2026-04-24

HTML estático standalone gerado pós-reunião de diagnóstico com Mary Alves (Innovate LED, ES).

## Como abrir

Abrir `index.html` direto no navegador (Chrome/Firefox/Safari). Sem build step.

## Como imprimir

Ctrl+P (ou Cmd+P). O HTML tem `@media print` que:

- Troca fundo dark pra fundo claro
- Usa mint `#00B37A` (não `#00E5A0`) pra manter contraste em fundo branco
- Remove grid decorativa de fundo
- Esconde o header sticky
- Aplica page-break pra seções não cortarem no meio

Papel: A4 com margens 18mm × 16mm.

## Stack

- HTML estático único arquivo
- Tokens CSS inline (espelho de `identidade-visual/index.css`)
- Google Fonts: Geist, Geist Mono, Instrument Serif
- Zero dependência externa além das fontes
- Logo em texto via `.brand` (não carrega SVG externo)
- Ícone WhatsApp inline SVG

## Estrutura

1. Capa
2. Contexto da reunião
3. Diagnóstico
4. Metodologia aplicada (nicho LED + ES)
5. Escopo (com integração CRM como brinde)
6. Valores (R$ 2.000 à vista com benefício networking R$ 1.000 off, ou R$ 3.000 em 12x, + R$ 300/mês infra)
7. Timeline (7d / 30d / 60-90d)
8. Permanência (o que fica com o cliente)
9. CTA WhatsApp + validade 7 dias
10. Rodapé

## Canônico

- Preços refletem Decision Log de 2026-04-24 (Benefício Parceiro Networking — R$ 1.000 off à vista)
- Linguagem: implementação única + infra mensal separadas, sem "plano"/"agência"/"consultoria"
- Nome da marca: `buscou.ai` minúsculo em todas as ocorrências
- Frase canônica "Se alguém buscou, quem apareceu foi você?" na capa

## Issue Linear

[BAI-72 — Enviar proposta HTML Innovate LED via WhatsApp](https://linear.app/joao-lucas-ucceli/issue/BAI-72)
Umbrella: [BAI-71 — Innovate LED — primeira venda](https://linear.app/joao-lucas-ucceli/issue/BAI-71)

## Envio

Proposta enviada via WhatsApp pra Mary (+55 27 99696-0847). Formato: link do HTML renderizado ou arquivo exportado como PDF via "Imprimir → Salvar como PDF".
