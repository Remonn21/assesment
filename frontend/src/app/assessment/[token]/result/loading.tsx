import { ResultReportSkeleton } from "@/features/results/ResultReportSkeleton";

export default function ResultLoading() {
  return (
    <div role="status" aria-label="Loading your results">
      <ResultReportSkeleton />
    </div>
  );
}
