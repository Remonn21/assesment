import { redirect } from "next/navigation";
import { AssessmentFlow } from "@/features/assessment/AssessmentFlow";
import { getAssessment } from "@/lib/api/assessment";
import { notFoundIfMissing } from "@/lib/api/client";

export default async function AssessmentPage({ params }: PageProps<"/assessment/[token]">) {
  const { token } = await params;
  const assessment = await getAssessment(token).catch(notFoundIfMissing);
  if (assessment.completed) redirect(`/assessment/${token}/result`);

  return (
    <AssessmentFlow
      token={token}
      participantName={assessment.participantName}
      groups={assessment.groups}
    />
  );
}
