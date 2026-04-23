/**
 * Dobra 4 — Como funciona (funil consultivo).
 * source: Decision Log - 2026-04-23 - Venda Consultiva.md §"Fluxo canonico"
 *       + VERDADE_UNICA_BUSCOU.md §8
 */
const steps = [
  {
    num: "01",
    title: "Agendar diagnostico",
    body: "Voce clica no CTA, abre WhatsApp, combina horario. Sem formulario, sem cadastro.",
  },
  {
    num: "02",
    title: "Reuniao de diagnostico",
    body: "30-60 min por video-call. Busca ao vivo pra mostrar onde voce aparece hoje + metodologia aplicada ao seu caso.",
  },
  {
    num: "03",
    title: "Proposta personalizada",
    body: "Em ate 24h voce recebe no WhatsApp: contexto da conversa, metodologia, escopo e valores. Vale 7 dias.",
  },
  {
    num: "04",
    title: "Blog no ar",
    body: "Apos o aceite, onboarding guiado. Em ate 7 dias seu blog esta publicado, motor publicando 3x/dia.",
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
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
          Como funciona
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col gap-4 relative">
              <span
                className="text-4xl md:text-5xl font-semibold"
                style={{
                  color: "var(--color-ai)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "-0.04em",
                }}
              >
                {s.num}
              </span>

              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 right-0 w-12 h-px -translate-y-1/2 translate-x-1/2"
                  style={{
                    background: "var(--color-border, rgba(255,255,255,0.12))",
                  }}
                  aria-hidden
                />
              )}

              <h3
                className="text-lg md:text-xl font-semibold"
                style={{
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm md:text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
