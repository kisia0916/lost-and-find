/*
  Warnings:

  - Added the required column `date` to the `Drop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Drop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Drop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drop" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
