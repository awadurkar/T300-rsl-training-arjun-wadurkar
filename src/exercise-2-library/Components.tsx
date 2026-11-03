import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import {
  badgeBase,
  badgeVariants,
  buttonBase,
  buttonSizes,
  buttonVariants,
  libraryCard,
} from "./styles.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export function Button({
  variant = "primary",
  size = "medium",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[buttonBase, buttonVariants[variant], buttonSizes[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Card({ className, ...props }: CardProps) {
  return (
    <article
      className={[libraryCard, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof badgeVariants;
};

export function Badge({
  variant = "success",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[badgeBase, badgeVariants[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
