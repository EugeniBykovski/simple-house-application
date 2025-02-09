-- AlterTable
ALTER TABLE "AdvertMessage" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 day';

-- AlterTable
ALTER TABLE "Apartment" ADD COLUMN     "createdBy" TEXT;

-- AlterTable
ALTER TABLE "Entrance" ADD COLUMN     "createdBy" TEXT;

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "createdBy" TEXT;

-- CreateTable
CREATE TABLE "UserApartment" (
    "userId" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,

    CONSTRAINT "UserApartment_pkey" PRIMARY KEY ("userId","apartmentId")
);

-- AddForeignKey
ALTER TABLE "UserApartment" ADD CONSTRAINT "UserApartment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserApartment" ADD CONSTRAINT "UserApartment_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
