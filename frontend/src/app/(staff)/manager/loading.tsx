import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function ManagerLoading() {
  return (
    <div role="status" aria-label="Loading overview" className="flex flex-col gap-8">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((card) => (
          <Skeleton key={card} className="h-34 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-84 rounded-xl" />
        <Skeleton className="h-84 rounded-xl" />
      </div>
      <Skeleton className="h-60 rounded-xl" />
      <TableSkeleton />
    </div>
  );
}
