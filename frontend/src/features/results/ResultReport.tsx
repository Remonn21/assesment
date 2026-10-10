import { DimensionBarChart } from "@/components/charts/DimensionBarChart";
import { Card } from "@/components/ui/Card";
import { MAX_DIMENSION_SCORE } from "@/lib/disc";
import type { ResultReport as Report } from "@/lib/types";
import { DimensionRanking } from "./DimensionRanking";
import { ProfileHeader } from "./ProfileHeader";

export function ResultReport({ report, label }: { report: Report; label: string }) {
  return (
    <div className="@container space-y-6">
      <ProfileHeader label={label} profile={report.profile} />
      <div className="grid gap-6 @3xl:grid-cols-2">
        <Card title="Scores">
          <DimensionBarChart values={report.scores} valueLabel="Score" max={MAX_DIMENSION_SCORE} />
        </Card>
        <Card title="Ranking">
          <DimensionRanking ranking={report.ranking} scores={report.scores} />
        </Card>
      </div>
    </div>
  );
}
