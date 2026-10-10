import { ResultReport } from "@/features/results/ResultReport";
import { getResult } from "@/lib/api/assessment";
import { notFoundIfMissing } from "@/lib/api/client";

export default async function ResultPage({ params }: PageProps<"/assessment/[token]/result">) {
  const { token } = await params;
  const report = await getResult(token).catch(notFoundIfMissing);

  return (
    <>
      <h1 className="sr-only">Your DISC results</h1>
      <ResultReport report={report} label="Your DISC profile" />
    </>
  );
}
