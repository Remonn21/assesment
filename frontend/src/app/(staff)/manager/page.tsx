import { UserPlus } from "lucide-react";
import Link from "next/link";
import { DimensionBarChart } from "@/components/charts/DimensionBarChart";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/features/dashboard/KpiGrid";
import { ProfileDistributionChart } from "@/features/dashboard/ProfileDistributionChart";
import { ParticipantsTable } from "@/features/participants/ParticipantsTable";
import { getDashboardSummary } from "@/lib/api/dashboard";
import { listParticipants } from "@/lib/api/participants";
import { MAX_DIMENSION_SCORE } from "@/lib/disc";

export default async function ManagerPage() {
  const [summary, participants] = await Promise.all([
    getDashboardSummary(),
    listParticipants(),
  ]);

  return (
    <>
      <PageHeader title="Overview">Completion and DISC results across all participants.</PageHeader>
      <KpiGrid summary={summary} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Average group scores" description={`Out of ${MAX_DIMENSION_SCORE} per dimension`}>
          <DimensionBarChart
            values={summary.averageScores}
            valueLabel="Average score"
            max={MAX_DIMENSION_SCORE}
          />
        </Card>
        <Card title="Participants by highest dimension" description="Each participant's top-scoring dimension">
          <DimensionBarChart values={summary.primaryDimensionCounts} valueLabel="Participants" />
        </Card>
      </div>
      <Card title="Distribution of DISC profiles">
        <ProfileDistributionChart distribution={summary.profileDistribution} />
      </Card>
      <Card
        title="Participant status"
        flush
        action={
          <Link href="/facilitator#invite" className={buttonClasses("secondary")}>
            <UserPlus />
            Add participant
          </Link>
        }
      >
        <ParticipantsTable participants={participants} />
      </Card>
    </>
  );
}
