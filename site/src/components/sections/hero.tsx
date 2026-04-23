import Image from "next/image";
import { SearchBar } from "@/components/search-bar";
import { WhatsAppCTA } from "@/components/whatsapp-cta";

/**
 * Dobra 1 — Hero.
 * source: VERDADE_UNICA_BUSCOU.md §2 (frase central) + §8 (fluxo consultivo) + §11 (contato)
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="flex flex-col items-center gap-10 text-center max-w-3xl">
        <Image
          src="/buscou-ai-primary-dark.svg"
          alt="buscou.ai"
          width={180}
          height={40}
          priority
        />

        <div className="w-full max-w-md">
          <SearchBar showCursor placeholder="buscouai.com/" />
        </div>

        <h1
          className="text-4xl md:text-6xl font-semibold"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.04em",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1.05,
          }}
        >
          Se alguem buscou,{" "}
          <span
            style={{
              borderBottom: "2px solid var(--color-ai)",
              paddingBottom: "2px",
            }}
          >
            quem apareceu foi voce?
          </span>
        </h1>

        <p
          className="text-base md:text-lg max-w-xl"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          Blog + motor que publicam 90 conteudos/mes pra voce aparecer no
          Google e na IA.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <WhatsAppCTA size="lg" variant="primary">
            Agendar diagnostico →
          </WhatsAppCTA>

          <a
            href="#como-funciona"
            className="text-sm hover:opacity-70 transition-opacity"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Ver como funciona ↓
          </a>
        </div>
      </div>
    </section>
  );
}
