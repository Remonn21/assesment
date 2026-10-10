import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUniqueViolation } from '../common/prisma-errors';
import { shuffle } from '../common/shuffle';
import {
  profileCodeOf,
  rankDimensions,
  scoreRankedGroups,
} from '../disc/disc-scoring';
import { resultWithProfile, toResultReport } from '../disc/result-report';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';
import { toRankedDimensions } from './ranked-groups';

@Injectable()
export class AssessmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAssessment(token: string) {
    const participant = await this.findParticipant(token);
    const groups = await this.prisma.wordGroup.findMany({
      orderBy: { position: 'asc' },
      include: { words: { select: { id: true, text: true } } },
    });
    return {
      participantName: participant.name,
      completed: participant.result !== null,
      groups: groups.map((group) => ({
        id: group.id,
        words: shuffle(group.words),
      })),
    };
  }

  async submit(token: string, dto: SubmitAssessmentDto) {
    const participant = await this.findParticipant(token);
    if (participant.result) throw this.alreadyCompleted();

    const groups = await this.prisma.wordGroup.findMany({
      include: { words: true },
    });
    const scores = scoreRankedGroups(toRankedDimensions(groups, dto.groups));

    try {
      const result = await this.prisma.result.create({
        data: {
          participantId: participant.id,
          scoreD: scores.D,
          scoreI: scores.I,
          scoreS: scores.S,
          scoreC: scores.C,
          profileCode: profileCodeOf(rankDimensions(scores)),
          rankings: dto.groups.map(({ groupId, wordIds }) => ({
            groupId,
            wordIds,
          })),
        },
        include: resultWithProfile,
      });
      return toResultReport(result);
    } catch (error) {
      if (isUniqueViolation(error)) throw this.alreadyCompleted();
      throw error;
    }
  }

  async getResult(token: string) {
    const participant = await this.findParticipant(token);
    if (!participant.result) {
      throw new NotFoundException('Assessment not completed yet');
    }
    return toResultReport(participant.result);
  }

  private async findParticipant(token: string) {
    const participant = await this.prisma.participant.findUnique({
      where: { inviteToken: token },
      include: { result: { include: resultWithProfile } },
    });
    if (!participant) throw new NotFoundException('Invitation not found');
    return participant;
  }

  private alreadyCompleted() {
    return new ConflictException('Assessment already completed');
  }
}
