import { BadRequestException } from '@nestjs/common';
import { GroupWithWords, toRankedDimensions } from './ranked-groups';

const groups: GroupWithWords[] = [
  {
    id: 1,
    words: [
      { id: 11, dimension: 'C' },
      { id: 12, dimension: 'D' },
      { id: 13, dimension: 'S' },
      { id: 14, dimension: 'I' },
    ],
  },
  {
    id: 2,
    words: [
      { id: 21, dimension: 'C' },
      { id: 22, dimension: 'D' },
      { id: 23, dimension: 'S' },
      { id: 24, dimension: 'I' },
    ],
  },
];

describe('toRankedDimensions', () => {
  it('maps each group’s ranked word ids to their dimensions', () => {
    const result = toRankedDimensions(groups, [
      { groupId: 2, wordIds: [24, 23, 22, 21] },
      { groupId: 1, wordIds: [12, 11, 14, 13] },
    ]);
    expect(result).toEqual([
      ['D', 'C', 'I', 'S'],
      ['I', 'S', 'D', 'C'],
    ]);
  });

  it('rejects a submission with a missing group', () => {
    expect(() =>
      toRankedDimensions(groups, [{ groupId: 1, wordIds: [11, 12, 13, 14] }]),
    ).toThrow(BadRequestException);
  });

  it('rejects the same group submitted twice', () => {
    expect(() =>
      toRankedDimensions(groups, [
        { groupId: 1, wordIds: [11, 12, 13, 14] },
        { groupId: 1, wordIds: [11, 12, 13, 14] },
      ]),
    ).toThrow(BadRequestException);
  });

  it('rejects a word that belongs to another group', () => {
    expect(() =>
      toRankedDimensions(groups, [
        { groupId: 1, wordIds: [11, 12, 13, 24] },
        { groupId: 2, wordIds: [21, 22, 23, 14] },
      ]),
    ).toThrow(BadRequestException);
  });
});
