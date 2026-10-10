import type { ReactNode } from "react";

export function PageHeader({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <div>
      <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold">{title}</h1>
      {children && <div className="mt-1 text-muted">{children}</div>}
    </div>
  );
}
