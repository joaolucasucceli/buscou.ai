import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.buscouai.com"),
  title: "buscou.ai — Se alguem buscou, quem apareceu foi voce?",
  description:
    "Tecnologia que coloca seu negocio nos resultados de busca do Google e nas respostas de IA (ChatGPT, Gemini, Perplexity, Claude, AI Overviews). Blog + motor publicando 90 conteudos/mes automaticamente.",
  openGraph: {
    title: "buscou.ai — Se alguem buscou, quem apareceu foi voce?",
    description:
      "Tecnologia que coloca seu negocio nos resultados de busca e em respostas de IA automaticamente. 90 conteudos/mes sem esforco.",
    type: "website",
    locale: "pt_BR",
    url: "https://www.buscouai.com",
    siteName: "buscou.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "buscou.ai — Se alguem buscou, quem apareceu foi voce?",
    description:
      "Tecnologia que coloca seu negocio nos resultados de busca e em respostas de IA automaticamente.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090D",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "buscou.ai",
  legalName: "BuscouAI",
  url: "https://www.buscouai.com",
  logo: "https://www.buscouai.com/buscou-ai-primary-dark.svg",
  description:
    "Tecnologia que coloca seu negocio nos resultados de busca do Google e nas respostas de IA.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-27-99696-0847",
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* source: Decision Log - 2026-04-23 - Contato Oficial.md */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
