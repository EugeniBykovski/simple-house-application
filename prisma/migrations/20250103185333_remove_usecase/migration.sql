/*
  Warnings:

  - You are about to drop the column `useCase` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdvertMessage" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 day';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "useCase";

-- DropEnum
DROP TYPE "UseCase";
