import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  caption?: string;
  highlight?: boolean;
  children?: ReactNode;
}

export function StatCard({ label, value, icon, caption, highlight, children }: StatCardProps) {
  return (
    <div className="relative flex flex-col gap-2 overflow-hidden rounded-xl border border-line bg-surface p-5">
      {highlight && <div aria-hidden className="absolute inset-0 bg-accent/5" />}
      <div className="relative flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        {icon}
      </div>
      <div className="relative mt-2">
        <p className="text-2xl font-bold tracking-tight tabular-nums">{value}</p>
        {caption && <p className="mt-1 text-xs font-medium text-muted">{caption}</p>}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}
