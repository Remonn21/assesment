import { Skeleton } from "@/components/ui/Skeleton";

export default function AssessmentLoading() {
  return (
    <div role="status" aria-label="Loading the assessment" className="space-y-6">
      <Skeleton className="h-9 w-48" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-3/5" />
      </div>
      <Skeleton className="h-12 w-full sm:w-48" />
    </div>
  );
}
