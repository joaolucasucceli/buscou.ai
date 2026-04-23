/**
 * Card local — reproducao do Card do DS (visual identico via tokens).
 * Turbopack nao resolve .tsx direto do @buscou/design-system, entao copia local.
 */
import type { HTMLAttributes } from "react";

type Variant = "default" | "elevated" | "outline" | "accent";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
}

export function Card({ variant = "default", className = "", ...props }: CardProps) {
  const classes = [
    "card-local",
    variant !== "default" ? `card-local--${variant}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classes} {...props} />;
}

export function CardBody({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card-local__body ${className}`} {...props} />;
}
