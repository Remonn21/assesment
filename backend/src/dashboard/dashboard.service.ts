import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildDashboardSummary } from './dashboard-summary';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const [totalInvited, results, profiles] = await Promise.all([
      this.prisma.participant.count(),
      this.prisma.result.findMany({
        select: {
          scoreD: true,
          scoreI: true,
          scoreS: true,
          scoreC: true,
          profileCode: true,
        },
      }),
      this.prisma.profile.findMany({ select: { code: true, name: true } }),
    ]);
    return buildDashboardSummary(totalInvited, results, profiles);
  }
}
