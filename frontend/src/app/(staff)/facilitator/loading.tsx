import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function FacilitatorLoading() {
  return (
    <div role="status" aria-label="Loading participants" className="flex flex-col gap-8">
      <PageHeaderSkeleton />
      <Skeleton className="h-44 rounded-xl" />
      <TableSkeleton rows={6} />
    </div>
  );
}
