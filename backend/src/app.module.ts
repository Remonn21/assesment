import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssessmentModule } from './assessment/assessment.module';
import { AuthModule } from './auth/auth.module';
import { validateEnv } from './config/env.validation';
import { DashboardModule } from './dashboard/dashboard.module';
import { ParticipantsModule } from './participants/participants.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    AuthModule,
    AssessmentModule,
    ParticipantsModule,
    DashboardModule,
  ],
})
export class AppModule {}
