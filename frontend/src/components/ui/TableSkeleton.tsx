import { Skeleton } from "./Skeleton";

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="px-6 pt-6 pb-4">
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="h-10 border-y border-line bg-surface-muted" />
      <div className="divide-y divide-line">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex items-center gap-6 px-6 py-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48 max-w-full" />
            </div>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="hidden h-4 w-40 sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
