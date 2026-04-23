import { Card, CardBody } from "@/components/card";

/**
 * Dobra 2 — Problema.
 * source: Proposta de Valor.md "A dor do cliente" + Conceito e Posicionamento.md
 */
const pains = [
  {
    icon: "🔎",
    title: "Concorrente ja fez SEO",
    body: "Quem faz conteudo consistente aparece. Quem nao faz, nao aparece — simples assim.",
  },
  {
    icon: "🤖",
    title: "A IA responde com outro negocio",
    body: "ChatGPT, Gemini, Perplexity citam quem esta otimizado. Se voce nao esta, o cliente nunca ouve seu nome.",
  },
  {
    icon: "👻",
    title: "Voce fica invisivel",
    body: "Na hora da decisao, o cliente escolhe quem apareceu primeiro. Nao e sempre o melhor — e quem aparece.",
  },
];

export function Problema() {
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
          Quando seu cliente busca, quem aparece?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((p) => (
            <Card key={p.title} variant="outline">
              <CardBody>
                <div className="flex flex-col gap-4">
                  <span className="text-3xl" aria-hidden>
                    {p.icon}
                  </span>
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      color: "var(--color-text)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm md:text-base"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {p.body}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <p
          className="text-lg md:text-xl text-center max-w-2xl mx-auto italic"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
          }}
        >
          Ter site nao e aparecer. Aparecer e sistema.
        </p>
      </div>
    </section>
  );
}
