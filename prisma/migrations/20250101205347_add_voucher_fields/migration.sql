-- AlterTable
ALTER TABLE "AdvertMessage" ADD COLUMN     "voucherCode" TEXT,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 day';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "voucher" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "voucherCode" TEXT;
