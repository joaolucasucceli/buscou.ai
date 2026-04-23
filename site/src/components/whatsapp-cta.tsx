import { WHATSAPP_URL } from "@/lib/constants";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "ghost";

interface Props {
  size?: Size;
  variant?: Variant;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * CTA canonico de conversao — abre WhatsApp com mensagem pre-preenchida
 * de agendar diagnostico. Visual reusa as classes .btn do Design System.
 *
 * source: VERDADE_UNICA_BUSCOU.md §11 + Decision Log - 2026-04-23 - Venda Consultiva.md
 */
export function WhatsAppCTA({
  size = "md",
  variant = "primary",
  fullWidth,
  children,
  className = "",
}: Props) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {children}
    </a>
  );
}
