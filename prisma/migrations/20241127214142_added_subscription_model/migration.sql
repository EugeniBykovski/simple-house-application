-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('ADMIN', 'CAN_EDIT', 'READ_ONLY', 'OWNER');

-- CreateEnum
CREATE TYPE "UseCase" AS ENUM ('WORK', 'STUDY', 'PERSONAL_USE');

-- CreateEnum
CREATE TYPE "NotifyType" AS ENUM ('NEW_USER_IN_WORKSPACE', 'USER_LEFT_WORKSPACE', 'NEW_TASK', 'NEW_MIND_MAP', 'NEW_ROLE', 'NEW_ASSIGNMENT_TASK', 'NEW_ASSIGNMENT_MIND_MAP');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "useCase" "UseCase";

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userRole" "UserPermission" NOT NULL DEFAULT 'READ_ONLY',

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("userId","workspaceId")
);

-- CreateIndex
CREATE INDEX "Workspace_creatorId_idx" ON "Workspace"("creatorId");

-- CreateIndex
CREATE INDEX "Subscription_workspaceId_idx" ON "Subscription"("workspaceId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
