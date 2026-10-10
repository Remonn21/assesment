import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "quiet";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-line bg-surface text-ink hover:bg-paper",
  quiet: "text-muted hover:bg-paper hover:text-ink",
};

export function buttonClasses(variant: Variant = "primary") {
  return `inline-flex h-12 items-center justify-center gap-2 rounded-md px-5 text-sm sm:h-10 sm:px-4 font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 ${VARIANTS[variant]}`;
}

export function Button({
  variant,
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${buttonClasses(variant)} ${className}`} {...props} />;
}
