import Image from "next/image";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="flex flex-col items-center gap-10 text-center max-w-3xl">
        <Image
          src="/buscou-ai-primary-dark.svg"
          alt="buscou.ai"
          width={220}
          height={48}
          priority
        />

        <h1
          className="text-4xl md:text-6xl font-semibold"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.035em",
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
          className="text-base md:text-lg"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          em breve.
        </p>
      </div>
    </main>
  );
}
