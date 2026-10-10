import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUniqueViolation } from '../common/prisma-errors';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import {
  participantWithResult,
  toParticipantReport,
  toParticipantSummary,
} from './participant.mapper';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    const participants = await this.prisma.participant.findMany({
      orderBy: { createdAt: 'desc' },
      include: participantWithResult,
    });
    return participants.map(toParticipantSummary);
  }

  async create(dto: CreateParticipantDto) {
    try {
      const participant = await this.prisma.participant.create({
        data: dto,
        include: participantWithResult,
      });
      return toParticipantSummary(participant);
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ConflictException(
          'A participant with this email already exists',
        );
      }
      throw error;
    }
  }

  async getReport(id: string) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      include: participantWithResult,
    });
    if (!participant) throw new NotFoundException('Participant not found');
    const groups = await this.prisma.wordGroup.findMany({
      orderBy: { position: 'asc' },
      include: { words: true },
    });
    return toParticipantReport(participant, groups);
  }
}
