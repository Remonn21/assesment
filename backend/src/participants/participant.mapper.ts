import type { Prisma, Word, WordGroup } from '../generated/prisma/client';
import { POINTS_BY_RANK } from '../disc/disc-scoring';
import {
  Rankings,
  resultWithProfile,
  toResultReport,
} from '../disc/result-report';

export const participantWithResult = {
  result: { include: resultWithProfile },
} satisfies Prisma.ParticipantInclude;

type ParticipantWithResult = Prisma.ParticipantGetPayload<{
  include: typeof participantWithResult;
}>;

export function toParticipantSummary(participant: ParticipantWithResult) {
  const { id, name, email, inviteToken, createdAt, result } = participant;
  return {
    id,
    name,
    email,
    inviteToken,
    status: result ? ('COMPLETED' as const) : ('PENDING' as const),
    invitedAt: createdAt,
    result: result ? toResultReport(result) : null,
  };
}

export function toParticipantReport(
  participant: ParticipantWithResult,
  groups: (WordGroup & { words: Word[] })[],
) {
  const rankings = (participant.result?.rankings ?? []) as Rankings;
  const wordIdsByGroup = new Map(
    rankings.map(({ groupId, wordIds }) => [groupId, wordIds]),
  );

  const answers = groups
    .filter((group) => wordIdsByGroup.has(group.id))
    .map((group) => {
      const wordIds = wordIdsByGroup.get(group.id) ?? [];
      const rankedWords = [...group.words].sort(
        (a, b) => wordIds.indexOf(a.id) - wordIds.indexOf(b.id),
      );
      return {
        position: group.position,
        words: rankedWords.map((word, index) => ({
          text: word.text,
          dimension: word.dimension,
          rank: index + 1,
          points: POINTS_BY_RANK[index],
        })),
      };
    });

  return { ...toParticipantSummary(participant), answers };
}
