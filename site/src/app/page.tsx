import { Hero } from "@/components/sections/hero";
import { Problema } from "@/components/sections/problema";
import { Produto } from "@/components/sections/produto";
import { ComoFunciona } from "@/components/sections/como-funciona";
import { Recebe } from "@/components/sections/recebe";
import { FAQ } from "@/components/sections/faq";
import { CTAFinal } from "@/components/sections/cta-final";

export default function Home() {
  return (
    <main style={{ background: "var(--color-bg)" }}>
      <Hero />
      <Problema />
      <Produto />
      <ComoFunciona />
      <Recebe />
      <FAQ />
      <CTAFinal />
    </main>
  );
}
