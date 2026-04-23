import { Card, CardBody } from "@/components/card";

/**
 * Dobra 3 — Produto.
 * source: VERDADE_UNICA_BUSCOU.md §4
 */
const numbers = [
  { value: "90", label: "conteudos/mes" },
  { value: "720K", label: "caracteres/mes" },
  { value: "7 dias", label: "blog no ar" },
  { value: "30 dias", label: "primeiros sinais" },
];

export function Produto() {
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
          Blog{" "}
          <span style={{ color: "var(--color-ai)" }}>+</span>{" "}
          Motor publicando 90 conteudos/mes.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated">
            <CardBody>
              <div className="flex flex-col gap-4">
                <span
                  className="inline-block text-xs font-mono uppercase tracking-wider"
                  style={{
                    color: "var(--color-ai)",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  01 · Estrutura
                </span>
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Blog
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  Site otimizado tecnicamente pra SEO + AIO, integrado ao seu
                  dominio. Entregue uma vez, fica no ar permanente — mesmo se
                  voce pausar a infra do motor.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody>
              <div className="flex flex-col gap-4">
                <span
                  className="inline-block text-xs font-mono uppercase tracking-wider"
                  style={{
                    color: "var(--color-ai)",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  02 · Motor
                </span>
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  buscou.ai
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  3 conteudos por dia, 90 por mes, cada um entre 800 e 1.200
                  palavras. Publicacao automatica, otimizado pra aparecer no
                  Google e nas IAs.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {numbers.map((n) => (
            <div
              key={n.label}
              className="flex flex-col items-center gap-2 py-6 rounded-lg"
              style={{
                background: "var(--color-surface, rgba(255,255,255,0.02))",
                border: "1px solid var(--color-border, rgba(255,255,255,0.08))",
              }}
            >
              <span
                className="text-3xl md:text-4xl font-semibold"
                style={{
                  color: "var(--color-ai)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "-0.02em",
                }}
              >
                {n.value}
              </span>
              <span
                className="text-xs md:text-sm uppercase tracking-wider text-center"
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
