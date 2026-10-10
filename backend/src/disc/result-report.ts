import type { Prisma } from '../generated/prisma/client';
import type { Dimension } from '../generated/prisma/enums';
import { DimensionScores, rankDimensions } from './disc-scoring';

export const resultWithProfile = {
  profile: true,
} satisfies Prisma.ResultInclude;

type ResultWithProfile = Prisma.ResultGetPayload<{
  include: typeof resultWithProfile;
}>;

export type Rankings = { groupId: number; wordIds: number[] }[];

export interface ResultReport {
  profile: {
    code: string;
    name: string;
    description: string | null;
    keywords: string[];
  };
  scores: DimensionScores;
  ranking: Dimension[];
  completedAt: Date;
}

export function toResultReport(result: ResultWithProfile): ResultReport {
  const scores = {
    D: result.scoreD,
    I: result.scoreI,
    S: result.scoreS,
    C: result.scoreC,
  };
  const { code, name, description, keywords } = result.profile;
  return {
    profile: { code, name, description, keywords },
    scores,
    ranking: rankDimensions(scores),
    completedAt: result.completedAt,
  };
}
