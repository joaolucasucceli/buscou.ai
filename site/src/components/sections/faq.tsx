"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Dobra 6 — FAQ (processo consultivo).
 * source: Site Publico.md §"Bloco 8 — FAQ"
 *       + 03 - Oferta/Oferta Comercial.md §"Objecoes e respostas"
 */
const faqs = [
  {
    q: "Como funciona a reuniao?",
    a: "Sao 30-60 min por video-call. A gente faz uma busca ao vivo pra mostrar onde voce aparece hoje (e onde nao aparece), entende seu negocio com perguntas diretas, e explica como o blog + motor se aplicam ao seu caso especifico.",
  },
  {
    q: "Quanto tempo leva do primeiro contato ate o blog estar no ar?",
    a: "Ate 7 dias do primeiro contato ate o pagamento (reuniao + proposta em 24h + aceite). Apos o pagamento, blog no ar em ate 7 dias.",
  },
  {
    q: "Preciso preparar algo antes da reuniao?",
    a: "Nao. Ideal ter o dominio atual em mente e lembrar 2-3 concorrentes locais. O resto a gente descobre na conversa.",
  },
  {
    q: "Vou receber algo por escrito?",
    a: "Sim. Em ate 24h pos-reuniao voce recebe no WhatsApp uma proposta personalizada com contexto da nossa conversa, metodologia aplicada ao seu negocio, escopo e valores. Vale 7 dias.",
  },
  {
    q: "Funciona pra qualquer nicho?",
    a: "Melhor para negocios locais — clinicas, imobiliarias, advogados, servicos. Se seu cliente busca no Google, funciona. Se nao for fit, entregamos o diagnostico mesmo assim.",
  },
  {
    q: "E se eu nao tiver certeza ainda?",
    a: "Agenda mesmo. A reuniao nao tem compromisso de compra — voce sai sabendo onde aparece hoje no Google e nas IAs, e se decidir nao fechar, o diagnostico vale por si.",
  },
];

export function FAQ() {
  return (
    <section
      className="py-24 md:py-32 px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-16">
        <h2
          className="text-3xl md:text-5xl font-semibold text-center"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.035em",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1.1,
          }}
        >
          Duvidas comuns
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger
                className="text-left text-base md:text-lg"
                style={{
                  color: "var(--color-text)",
                  fontFamily:
                    "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent
                className="text-sm md:text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
