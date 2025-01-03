-- AlterTable
ALTER TABLE "AdvertMessage" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 day';

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrance" (
    "id" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "entranceNumber" TEXT NOT NULL,

    CONSTRAINT "Entrance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "entranceId" TEXT NOT NULL,
    "apartmentNumber" TEXT NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApartmentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "House_street_houseNumber_key" ON "House"("street", "houseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Entrance_houseId_entranceNumber_key" ON "Entrance"("houseId", "entranceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_entranceId_apartmentNumber_key" ON "Apartment"("entranceId", "apartmentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_ApartmentToUser_AB_unique" ON "_ApartmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ApartmentToUser_B_index" ON "_ApartmentToUser"("B");

-- AddForeignKey
ALTER TABLE "Entrance" ADD CONSTRAINT "Entrance_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_entranceId_fkey" FOREIGN KEY ("entranceId") REFERENCES "Entrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApartmentToUser" ADD CONSTRAINT "_ApartmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApartmentToUser" ADD CONSTRAINT "_ApartmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
