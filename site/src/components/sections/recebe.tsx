import { Card, CardBody } from "@/components/card";
import { WhatsAppCTA } from "@/components/whatsapp-cta";

/**
 * Dobra 5 — O que voce recebe (sem preco exposto).
 * source: Decision Log - 2026-04-23 - Venda Consultiva.md §"Proposta personalizada"
 *       + VERDADE_UNICA_BUSCOU.md §4
 *       + Site Publico.md §"Bloco 7 — Como funciona o processo"
 */
const items = [
  {
    label: "📄 Blog",
    body: "Estrutura otimizada pra SEO + AIO, no seu dominio. Permanente.",
  },
  {
    label: "⚙️ Motor",
    body: "90 conteudos/mes, 3x/dia, automaticamente publicados.",
  },
  {
    label: "📊 Dashboard",
    body: "Rankings, trafego, impressoes e citacoes em IAs.",
  },
];

export function Recebe() {
  return (
    <section
      className="py-24 md:py-32 px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <h2
          className="text-3xl md:text-5xl font-semibold text-center max-w-3xl mx-auto"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.035em",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1.1,
          }}
        >
          O que voce recebe
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <Card key={it.label} variant="default">
              <CardBody>
                <div className="flex flex-col gap-3">
                  <span
                    className="text-xl"
                    style={{
                      fontFamily:
                        "var(--font-geist-sans), system-ui, sans-serif",
                      letterSpacing: "-0.02em",
                      color: "var(--color-text)",
                    }}
                  >
                    {it.label}
                  </span>
                  <p style={{ color: "var(--color-text-secondary)" }}>
                    {it.body}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <p
          className="text-sm md:text-base text-center max-w-xl mx-auto"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          Timeline: blog no ar em 7 dias · primeiros sinais em 30 dias ·
          rankings consolidados em 60-90 dias.
        </p>

        <div
          className="max-w-2xl mx-auto p-6 md:p-8 rounded-lg text-center"
          style={{
            background: "var(--color-surface, rgba(255,255,255,0.02))",
            border: "1px solid var(--color-border, rgba(255,255,255,0.08))",
          }}
        >
          <p
            className="text-base md:text-lg"
            style={{ color: "var(--color-text)" }}
          >
            Valores e escopo sao apresentados na{" "}
            <span style={{ color: "var(--color-ai)" }}>
              reuniao de diagnostico
            </span>{" "}
            e enviados por escrito na proposta personalizada — em ate 24h via
            WhatsApp.
          </p>
        </div>

        <div className="flex justify-center">
          <WhatsAppCTA size="lg" variant="primary">
            Agendar diagnostico →
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
}
