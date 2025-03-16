-- AlterTable
ALTER TABLE "AdvertMessage" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 day';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerified" SET DEFAULT NOW();
