import { BadRequestException } from '@nestjs/common';
import type { Dimension } from '../generated/prisma/enums';
import type { RankedGroupDto } from './dto/ranked-group.dto';

export interface GroupWithWords {
  id: number;
  words: { id: number; dimension: Dimension }[];
}

export function toRankedDimensions(
  groups: GroupWithWords[],
  submitted: RankedGroupDto[],
): Dimension[][] {
  if (submitted.length !== groups.length) {
    throw new BadRequestException(`Expected ${groups.length} ranked groups`);
  }
  const wordIdsByGroup = new Map(
    submitted.map((group) => [group.groupId, group.wordIds]),
  );
  return groups.map((group) => {
    const wordIds = wordIdsByGroup.get(group.id);
    if (!wordIds) throw new BadRequestException(`Group ${group.id} is missing`);
    const dimensionByWordId = new Map(
      group.words.map((word) => [word.id, word.dimension]),
    );
    return wordIds.map((wordId) => {
      const dimension = dimensionByWordId.get(wordId);
      if (!dimension) {
        throw new BadRequestException(
          `Word ${wordId} is not in group ${group.id}`,
        );
      }
      return dimension;
    });
  });
}
