import { DIMENSIONS, MAX_DIMENSION_SCORE } from "@/lib/disc";
import type { Dimension, DimensionScores } from "@/lib/types";

export function DimensionRanking({
  ranking,
  scores,
}: {
  ranking: Dimension[];
  scores: DimensionScores;
}) {
  return (
    <ol className="divide-y divide-line">
      {ranking.map((dimension, index) => (
        <li key={dimension} className="flex items-center gap-3 py-3">
          <span className="w-5 text-sm text-muted tabular-nums">{index + 1}</span>
          <span className={`size-2.5 rounded-full ${DIMENSIONS[dimension].bgClass}`} />
          <span className="flex-1">
            <span className="font-semibold">{dimension}</span>{" "}
            <span className="text-muted">{DIMENSIONS[dimension].label}</span>
          </span>
          <span className="tabular-nums">
            <span className="font-semibold">{scores[dimension]}</span>
            <span className="text-sm text-muted"> / {MAX_DIMENSION_SCORE}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
