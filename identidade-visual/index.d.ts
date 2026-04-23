/**
 * buscou.ai — Design System (type declarations)
 *
 * Tipos auxiliares exportados pelos componentes do DS. Apontados pelo
 * package.json `types` pra evitar TS checker processar os .tsx fonte
 * do DS (que nao tem @types/react local — seus tipos vivem no consumer).
 */

import type * as React from "react";

export interface Colors {
  [key: string]: string;
}
export const colors: Colors;

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
export const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export type CardVariant = "default" | "elevated" | "outline" | "accent";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
}
export const Card: React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
>;
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>>;
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  showCursor?: boolean;
  ambient?: boolean;
}
export const SearchBar: React.ForwardRefExoticComponent<
  SearchBarProps & React.RefAttributes<HTMLInputElement>
>;

export type BadgeVariant =
  | "neutral"
  | "ai"
  | "brand"
  | "coral"
  | "warn"
  | "success";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}
export const Badge: React.ForwardRefExoticComponent<
  BadgeProps & React.RefAttributes<HTMLSpanElement>
>;
