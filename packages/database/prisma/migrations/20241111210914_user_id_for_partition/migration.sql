/*
  Warnings:

  - Added the required column `userId` to the `ZapRunOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapRunOutbox" ADD COLUMN     "userId" TEXT NOT NULL;
