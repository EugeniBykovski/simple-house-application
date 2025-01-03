/*
  Warnings:

  - You are about to drop the `_ApartmentToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApartmentToUser" DROP CONSTRAINT "_ApartmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApartmentToUser" DROP CONSTRAINT "_ApartmentToUser_B_fkey";

-- AlterTable
ALTER TABLE "AdvertMessage" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 day';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apartmentId" TEXT,
ADD COLUMN     "contractCode" TEXT;

-- DropTable
DROP TABLE "_ApartmentToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
