import type { Profile, Result } from '../generated/prisma/client';
import { Dimension } from '../generated/prisma/enums';
import { DimensionScores, rankDimensions } from '../disc/disc-scoring';

type ResultScores = Pick<
  Result,
  'scoreD' | 'scoreI' | 'scoreS' | 'scoreC' | 'profileCode'
>;

const DIMENSIONS = Object.values(Dimension);
const roundToOneDecimal = (value: number) => Math.round(value * 10) / 10;
const emptyScores = (): DimensionScores => ({ D: 0, I: 0, S: 0, C: 0 });

export function buildDashboardSummary(
  totalInvited: number,
  results: ResultScores[],
  profiles: Pick<Profile, 'code' | 'name'>[],
) {
  const completed = results.length;
  const totals = emptyScores();
  const primaryDimensionCounts = emptyScores();
  const profileCounts = new Map<string, number>();

  for (const result of results) {
    const scores: DimensionScores = {
      D: result.scoreD,
      I: result.scoreI,
      S: result.scoreS,
      C: result.scoreC,
    };
    for (const dimension of DIMENSIONS) {
      totals[dimension] += scores[dimension];
    }
    primaryDimensionCounts[rankDimensions(scores)[0]] += 1;
    profileCounts.set(
      result.profileCode,
      (profileCounts.get(result.profileCode) ?? 0) + 1,
    );
  }

  const averageScores = emptyScores();
  for (const dimension of DIMENSIONS) {
    averageScores[dimension] =
      completed > 0 ? roundToOneDecimal(totals[dimension] / completed) : 0;
  }

  return {
    totalInvited,
    completed,
    pending: totalInvited - completed,
    completionRate:
      totalInvited > 0
        ? roundToOneDecimal((completed / totalInvited) * 100)
        : 0,
    averageScores,
    primaryDimensionCounts,
    profileDistribution: profiles
      .map(({ code, name }) => ({
        code,
        name,
        count: profileCounts.get(code) ?? 0,
      }))
      .filter(({ count }) => count > 0)
      .sort((a, b) => b.count - a.count),
  };
}
