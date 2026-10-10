import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';
import type { Dimension } from '../src/generated/prisma/enums';
import { shuffle } from '../src/common/shuffle';
import {
  profileCodeOf,
  rankDimensions,
  scoreRankedGroups,
} from '../src/disc/disc-scoring';
import { SAMPLE_PARTICIPANTS } from './data/sample-participants';
import { DISC_GROUPS } from './data/disc-groups';
import { DISC_PROFILES } from './data/disc-profiles';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function seedProfiles() {
  for (const { code, name, keywords } of DISC_PROFILES) {
    await prisma.profile.upsert({
      where: { code },
      create: { code, name, keywords },
      update: { name, keywords },
    });
  }
}

async function seedWordGroups() {
  if ((await prisma.wordGroup.count()) > 0) return;
  for (const [index, group] of DISC_GROUPS.entries()) {
    await prisma.wordGroup.create({
      data: {
        position: index + 1,
        words: {
          create: Object.entries(group).map(([dimension, text]) => ({
            text,
            dimension: dimension as Dimension,
          })),
        },
      },
    });
  }
}

async function seedStaff() {
  const password = process.env.SEED_STAFF_PASSWORD;
  if (!password) throw new Error('SEED_STAFF_PASSWORD is required');
  const passwordHash = await bcrypt.hash(password, 10);
  const staff = [
    {
      email: 'facilitator@testing.com',
      name: 'Remon Ehab',
      role: 'FACILITATOR' as const,
    },
    {
      email: 'admin@testing.com',
      name: 'Remon Ehab',
      role: 'MANAGER' as const,
    },
  ];
  for (const user of staff) {
    await prisma.user.upsert({
      where: { email: user.email },
      create: { ...user, passwordHash },
      update: { name: user.name, passwordHash },
    });
  }
}

async function seedSampleParticipants() {
  const groups = await prisma.wordGroup.findMany({
    orderBy: { position: 'asc' },
    include: { words: true },
  });
  for (const { name, email, completed } of SAMPLE_PARTICIPANTS) {
    const participant = await prisma.participant.upsert({
      where: { email },
      create: { name, email },
      update: {},
      include: { result: true },
    });
    if (!completed || participant.result) continue;

    const rankedWords = groups.map((group) => ({
      groupId: group.id,
      words: shuffle(group.words),
    }));
    const scores = scoreRankedGroups(
      rankedWords.map(({ words }) => words.map((word) => word.dimension)),
    );
    await prisma.result.create({
      data: {
        participantId: participant.id,
        scoreD: scores.D,
        scoreI: scores.I,
        scoreS: scores.S,
        scoreC: scores.C,
        profileCode: profileCodeOf(rankDimensions(scores)),
        rankings: rankedWords.map(({ groupId, words }) => ({
          groupId,
          wordIds: words.map((word) => word.id),
        })),
      },
    });
  }
}

async function main() {
  await seedProfiles();
  await seedWordGroups();
  await seedStaff();
  await seedSampleParticipants();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
