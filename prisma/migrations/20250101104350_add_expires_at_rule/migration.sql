-- AlterTable
ALTER TABLE "AdvertMessage" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '1 day';
