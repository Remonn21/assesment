import type { Dimension } from '../generated/prisma/enums';
import {
  profileCodeOf,
  rankDimensions,
  scoreRankedGroups,
} from './disc-scoring';

const GROUP_COUNT = 14;
const repeat = (group: Dimension[]) =>
  Array.from({ length: GROUP_COUNT }, () => group);

describe('scoreRankedGroups', () => {
  it('reproduces the Excel sheet totals for its sample 4/3/2/1 input', () => {
    expect(scoreRankedGroups(repeat(['C', 'D', 'S', 'I']))).toEqual({
      C: 56,
      D: 42,
      S: 28,
      I: 14,
    });
  });

  it('always distributes exactly 140 points', () => {
    const rankings: Dimension[][] = [
      ...repeat(['I', 'S', 'D', 'C']).slice(0, 7),
      ...repeat(['S', 'C', 'I', 'D']).slice(0, 7),
    ];
    const scores = scoreRankedGroups(rankings);
    expect(scores.D + scores.I + scores.S + scores.C).toBe(140);
  });
});

describe('rankDimensions', () => {
  it('orders dimensions from highest to lowest score', () => {
    expect(rankDimensions({ D: 20, I: 50, S: 40, C: 30 })).toEqual([
      'I',
      'S',
      'C',
      'D',
    ]);
  });

  it('breaks ties in D > I > S > C order', () => {
    expect(rankDimensions({ D: 35, I: 35, S: 35, C: 35 })).toEqual([
      'D',
      'I',
      'S',
      'C',
    ]);
    expect(rankDimensions({ D: 20, I: 40, S: 40, C: 40 })).toEqual([
      'I',
      'S',
      'C',
      'D',
    ]);
    expect(rankDimensions({ D: 30, I: 30, S: 50, C: 30 })).toEqual([
      'S',
      'D',
      'I',
      'C',
    ]);
  });
});

describe('profileCodeOf', () => {
  it('joins the two highest dimensions', () => {
    expect(profileCodeOf(['C', 'D', 'S', 'I'])).toBe('CD');
  });
});
