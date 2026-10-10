import { buildDashboardSummary } from './dashboard-summary';

const profiles = [
  { code: 'DI', name: 'المقنع' },
  { code: 'SC', name: 'المجتهد' },
  { code: 'CD', name: 'المحقق' },
];

const result = (
  D: number,
  I: number,
  S: number,
  C: number,
  profileCode: string,
) => ({
  scoreD: D,
  scoreI: I,
  scoreS: S,
  scoreC: C,
  profileCode,
});

describe('buildDashboardSummary', () => {
  it('returns zeros when nobody has been invited', () => {
    expect(buildDashboardSummary(0, [], profiles)).toEqual({
      totalInvited: 0,
      completed: 0,
      pending: 0,
      completionRate: 0,
      averageScores: { D: 0, I: 0, S: 0, C: 0 },
      primaryDimensionCounts: { D: 0, I: 0, S: 0, C: 0 },
      profileDistribution: [],
    });
  });

  it('computes counts, rounded percentages and averages', () => {
    const summary = buildDashboardSummary(
      3,
      [result(50, 40, 30, 20, 'DI'), result(20, 30, 45, 45, 'SC')],
      profiles,
    );
    expect(summary).toMatchObject({
      totalInvited: 3,
      completed: 2,
      pending: 1,
      completionRate: 66.7,
      averageScores: { D: 35, I: 35, S: 37.5, C: 32.5 },
      primaryDimensionCounts: { D: 1, I: 0, S: 1, C: 0 },
    });
  });

  it('lists only profiles that occur, most common first', () => {
    const summary = buildDashboardSummary(
      3,
      [
        result(20, 30, 45, 45, 'SC'),
        result(50, 40, 30, 20, 'DI'),
        result(20, 30, 46, 44, 'SC'),
      ],
      profiles,
    );
    expect(summary.profileDistribution).toEqual([
      { code: 'SC', name: 'المجتهد', count: 2 },
      { code: 'DI', name: 'المقنع', count: 1 },
    ]);
  });
});
