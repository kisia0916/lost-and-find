/*
  Warnings:

  - You are about to drop the column `createdAT` on the `Drop` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Drop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drop" DROP COLUMN "createdAT",
ADD COLUMN     "createdAt" TEXT NOT NULL;
