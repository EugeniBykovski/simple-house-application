-- CreateTable
CREATE TABLE "AdvertMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdvertMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdvertMessage_userId_idx" ON "AdvertMessage"("userId");

-- AddForeignKey
ALTER TABLE "AdvertMessage" ADD CONSTRAINT "AdvertMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
