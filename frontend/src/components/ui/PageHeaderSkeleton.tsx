import { Skeleton } from "./Skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-5 w-72 max-w-full" />
    </div>
  );
}
