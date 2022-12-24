/*
  Warnings:

  - Added the required column `isFull` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMembers` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "isFull" BOOLEAN NOT NULL,
ADD COLUMN     "totalMembers" INTEGER NOT NULL;
