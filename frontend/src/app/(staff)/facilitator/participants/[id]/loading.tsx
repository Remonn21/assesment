import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResultReportSkeleton } from "@/features/results/ResultReportSkeleton";

export default function ParticipantReportLoading() {
  return (
    <div role="status" aria-label="Loading report" className="flex flex-col gap-8">
      <PageHeaderSkeleton />
      <ResultReportSkeleton />
      <div className="rounded-xl border border-line bg-surface p-6">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-1 mb-4 h-5 w-72 max-w-full" />
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((group) => (
            <div key={group} className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-37 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
