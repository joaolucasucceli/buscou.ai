import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { WHATSAPP_NUMBER_HUMAN } from "@/lib/constants";

/**
 * Dobra 7 — CTA final.
 * source: VERDADE_UNICA_BUSCOU.md §2 (frase central) + §11 (contato)
 *       + Decision Log - 2026-04-23 - Venda Consultiva.md
 */
export function CTAFinal() {
  return (
    <section
      className="py-24 md:py-32 px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-12 items-center text-center">
        <h2
          className="text-3xl md:text-5xl font-semibold"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.035em",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1.15,
          }}
        >
          Hoje alguem esta buscando o que voce vende.
          <br />
          Voce prefere continuar{" "}
          <span
            style={{
              color: "var(--color-coral)",
              borderBottom: "2px solid var(--color-coral)",
              paddingBottom: "2px",
            }}
          >
            invisivel
          </span>{" "}
          ou aparecer?
        </h2>

        <p
          className="text-base md:text-lg max-w-xl"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          Agenda seu diagnostico. 30-60 min por video-call. Voce sai da
          reuniao sabendo exatamente onde aparece hoje — e recebe uma
          proposta personalizada em 24h.
        </p>

        <WhatsAppCTA size="lg" variant="primary">
          Agendar no WhatsApp: {WHATSAPP_NUMBER_HUMAN} →
        </WhatsAppCTA>

        <div
          className="pt-8 mt-8 border-t w-full max-w-lg"
          style={{
            borderColor: "var(--color-border, rgba(255,255,255,0.08))",
          }}
        >
          <p
            className="text-xs md:text-sm"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            buscou.ai — tecnologia que faz voce aparecer.
          </p>
        </div>
      </div>
    </section>
  );
}
