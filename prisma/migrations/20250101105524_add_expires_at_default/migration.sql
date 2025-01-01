-- AlterTable
ALTER TABLE "AdvertMessage" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 day';
