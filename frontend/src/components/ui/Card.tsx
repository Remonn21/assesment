import type { ReactNode } from "react";

interface CardProps {
  id?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  flush?: boolean;
  children: ReactNode;
  className?: string;
}

export function Card({
  id,
  title,
  description,
  action,
  flush = false,
  children,
  className = "",
}: CardProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-6 overflow-hidden rounded-xl border border-line bg-surface ${className}`}
    >
      {title && (
        <header className="flex flex-wrap items-start justify-between gap-3 px-6 pt-6 pb-4">
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={flush ? "" : `px-6 pb-6 ${title ? "" : "pt-6"}`}>{children}</div>
    </section>
  );
}
