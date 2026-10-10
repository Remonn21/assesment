-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FACILITATOR', 'MANAGER');

-- CreateEnum
CREATE TYPE "Dimension" AS ENUM ('D', 'I', 'S', 'C');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordGroup" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "WordGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "dimension" "Dimension" NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "keywords" TEXT[],

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "inviteToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "scoreD" INTEGER NOT NULL,
    "scoreI" INTEGER NOT NULL,
    "scoreS" INTEGER NOT NULL,
    "scoreC" INTEGER NOT NULL,
    "profileCode" TEXT NOT NULL,
    "rankings" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WordGroup_position_key" ON "WordGroup"("position");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_inviteToken_key" ON "Participant"("inviteToken");

-- CreateIndex
CREATE UNIQUE INDEX "Result_participantId_key" ON "Result"("participantId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "WordGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_profileCode_fkey" FOREIGN KEY ("profileCode") REFERENCES "Profile"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
