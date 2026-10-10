import Link from "next/link";
import { DIMENSION_ORDER, DIMENSIONS } from "@/lib/disc";
import { formatDate } from "@/lib/format";
import type { ParticipantSummary } from "@/lib/types";
import { CopyLinkButton } from "./CopyLinkButton";
import { StatusBadge } from "./StatusBadge";

const headCell = "px-6 py-3 text-xs font-semibold tracking-wider text-muted uppercase";

export function ParticipantsTable({ participants }: { participants: ParticipantSummary[] }) {
  if (participants.length === 0) {
    return (
      <p className="px-6 pb-10 text-center text-muted">
        No participants yet. Add one to send an invite link.
      </p>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full min-w-3xl text-start text-sm">
        <thead className="border-y border-line bg-surface-muted">
          <tr>
            <th className={headCell}>Participant</th>
            <th className={headCell}>Status</th>
            <th className={headCell}>Profile</th>
            {DIMENSION_ORDER.map((dimension) => (
              <th key={dimension} className={`${headCell} px-3 text-end`}>
                <abbr title={DIMENSIONS[dimension].label} className="no-underline">
                  {dimension}
                </abbr>
              </th>
            ))}
            <th className={headCell}>Invited</th>
            <th className={headCell}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {participants.map((participant) => (
            <tr key={participant.id} className="transition-colors hover:bg-surface-muted">
              <td className="px-6 py-4">
                <p dir="auto" className="font-medium">{participant.name}</p>
                <p className="text-muted">{participant.email}</p>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={participant.status} />
              </td>
              <td className="px-6 py-4 font-semibold">{participant.result?.profile.code ?? "–"}</td>
              {DIMENSION_ORDER.map((dimension) => (
                <td key={dimension} className="px-3 py-4 text-end tabular-nums">
                  {participant.result?.scores[dimension] ?? "–"}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-muted">
                {formatDate(participant.invitedAt)}
              </td>
              <td className="px-6 py-4 text-end">
                {participant.result ? (
                  <Link
                    href={`/facilitator/participants/${participant.id}`}
                    className="font-medium whitespace-nowrap text-accent-text hover:underline"
                  >
                    View report
                  </Link>
                ) : (
                  <CopyLinkButton token={participant.inviteToken} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
