export type Dimension = "D" | "I" | "S" | "C";
export type DimensionScores = Record<Dimension, number>;
export type Role = "FACILITATOR" | "MANAGER";

export interface ResultReport {
  profile: {
    code: string;
    name: string;
    description: string | null;
    keywords: string[];
  };
  scores: DimensionScores;
  ranking: Dimension[];
  completedAt: string;
}

export interface AssessmentGroup {
  id: number;
  words: { id: number; text: string }[];
}

export interface Assessment {
  participantName: string;
  completed: boolean;
  groups: AssessmentGroup[];
}

export interface RankedGroup {
  groupId: number;
  wordIds: number[];
}

export interface ParticipantSummary {
  id: string;
  name: string;
  email: string;
  inviteToken: string;
  status: "COMPLETED" | "PENDING";
  invitedAt: string;
  result: ResultReport | null;
}

export interface ParticipantReport extends ParticipantSummary {
  answers: {
    position: number;
    words: { text: string; dimension: Dimension; rank: number; points: number }[];
  }[];
}

export interface DashboardSummary {
  totalInvited: number;
  completed: number;
  pending: number;
  completionRate: number;
  averageScores: DimensionScores;
  primaryDimensionCounts: DimensionScores;
  profileDistribution: { code: string; name: string; count: number }[];
}

export interface LoginResponse {
  accessToken: string;
  user: { id: string; name: string; email: string; role: Role };
}
