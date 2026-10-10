import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnswersTable } from "@/features/participants/AnswersTable";
import { CopyLinkButton } from "@/features/participants/CopyLinkButton";
import { StatusBadge } from "@/features/participants/StatusBadge";
import { ResultReport } from "@/features/results/ResultReport";
import { notFoundIfMissing } from "@/lib/api/client";
import { getParticipantReport } from "@/lib/api/participants";
import { formatDate } from "@/lib/format";

export default async function ParticipantReportPage({
  params,
}: PageProps<"/facilitator/participants/[id]">) {
  const { id } = await params;
  const participant = await getParticipantReport(id).catch(notFoundIfMissing);

  return (
    <>
      <PageHeader
        title={
          <>
            <bdi>{participant.name}</bdi>
            <StatusBadge status={participant.status} />
          </>
        }
      >
        {participant.email}, invited {formatDate(participant.invitedAt)}
        {participant.result && `, completed ${formatDate(participant.result.completedAt)}`}
      </PageHeader>

      {participant.result ? (
        <>
          <ResultReport report={participant.result} label="DISC profile" />
          <Card title="Answers" description="Each group in the order the participant ranked it">
            <AnswersTable answers={participant.answers} />
          </Card>
        </>
      ) : (
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-muted"><bdi>{participant.name}</bdi> hasn&apos;t completed the assessment yet.</p>
            <CopyLinkButton token={participant.inviteToken} />
          </div>
        </Card>
      )}
    </>
  );
}
