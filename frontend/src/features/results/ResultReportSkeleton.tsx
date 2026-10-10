import { Skeleton } from "@/components/ui/Skeleton";

export function ResultReportSkeleton() {
  return (
    <div className="@container space-y-6">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface px-6 py-10">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-28 w-48" />
        <Skeleton className="h-4 w-44" />
        <Skeleton className="mt-2 h-9 w-36" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
      </div>
      <div className="grid gap-6 @3xl:grid-cols-2">
        <Skeleton className="h-84 rounded-xl" />
        <Skeleton className="h-84 rounded-xl" />
      </div>
    </div>
  );
}
