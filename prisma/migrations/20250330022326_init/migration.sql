/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Drop` table. All the data in the column will be lost.
  - Changed the type of `date` on the `Drop` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Drop" DROP COLUMN "createdAt",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
