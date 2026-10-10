import { CircleCheck, Clock, TrendingUp, Users } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import type { DashboardSummary } from "@/lib/types";

export function KpiGrid({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Completion rate"
        value={`${summary.completionRate}%`}
        icon={<TrendingUp className="size-5 text-accent" />}
        highlight
      >
        <ProgressBar value={summary.completionRate} label="Completion rate" />
      </StatCard>
      <StatCard
        label="Invited"
        value={summary.totalInvited}
        icon={<Users className="size-5 text-accent" />}
        caption="Participants with an invite link"
      />
      <StatCard
        label="Completed"
        value={summary.completed}
        icon={<CircleCheck className="size-5 text-success-text" />}
        caption="Finished all 14 groups"
      />
      <StatCard
        label="Pending"
        value={summary.pending}
        icon={<Clock className="size-5 text-warning-text" />}
        caption="Not finished yet"
      />
    </div>
  );
}
