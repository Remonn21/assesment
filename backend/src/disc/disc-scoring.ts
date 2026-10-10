import type { Dimension } from '../generated/prisma/enums';

export type DimensionScores = Record<Dimension, number>;

export const POINTS_BY_RANK = [4, 3, 2, 1];
const TIE_BREAK_ORDER: Dimension[] = ['D', 'I', 'S', 'C'];

export function scoreRankedGroups(
  rankedGroups: Dimension[][],
): DimensionScores {
  const scores: DimensionScores = { D: 0, I: 0, S: 0, C: 0 };
  for (const group of rankedGroups) {
    group.forEach((dimension, index) => {
      scores[dimension] += POINTS_BY_RANK[index];
    });
  }
  return scores;
}

export function rankDimensions(scores: DimensionScores): Dimension[] {
  // Array sort is stable so equal scores keep TIE_BREAK_ORDER (D > I > S > C).
  return [...TIE_BREAK_ORDER].sort((a, b) => scores[b] - scores[a]);
}

export function profileCodeOf(ranking: Dimension[]): string {
  return `${ranking[0]}${ranking[1]}`;
}
