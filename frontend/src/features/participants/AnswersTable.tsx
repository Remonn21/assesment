import { DIMENSIONS } from "@/lib/disc";
import type { ParticipantReport } from "@/lib/types";

export function AnswersTable({ answers }: { answers: ParticipantReport["answers"] }) {
  return (
    <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {answers.map((group) => (
        <li key={group.position}>
          <h3 className="mb-2 text-sm text-muted">Group {group.position}</h3>
          <ol className="divide-y divide-line rounded-lg border border-line">
            {group.words.map((word) => (
              <li key={word.text} className="flex items-center gap-3 px-3 py-2 text-sm">
                <span className="flex-1">{word.text}</span>
                <span className="flex w-8 items-center gap-1.5 font-semibold">
                  <span
                    aria-hidden
                    className={`size-2 rounded-full ${DIMENSIONS[word.dimension].bgClass}`}
                  />
                  <abbr title={DIMENSIONS[word.dimension].label} className="no-underline">
                    {word.dimension}
                  </abbr>
                </span>
                <span className="w-12 text-end text-muted tabular-nums">
                  {word.points} {word.points === 1 ? "pt" : "pts"}
                </span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
