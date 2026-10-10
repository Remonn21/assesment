import { Badge } from "@/components/ui/Badge";
import type { ParticipantSummary } from "@/lib/types";

export function StatusBadge({ status }: { status: ParticipantSummary["status"] }) {
  return status === "COMPLETED" ? (
    <Badge tone="success">Completed</Badge>
  ) : (
    <Badge tone="warning">Pending</Badge>
  );
}
