/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Action` table. All the data in the column will be lost.
  - Added the required column `image` to the `AvailableTriggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerId` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_triggerId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "triggerId",
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "AvailableTriggers" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Zap" ADD COLUMN     "triggerId" TEXT NOT NULL;
