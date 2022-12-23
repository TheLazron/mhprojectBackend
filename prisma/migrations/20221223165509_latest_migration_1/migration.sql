/*
  Warnings:

  - You are about to drop the `AryTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AryTable";

-- CreateTable
CREATE TABLE "dummytable1" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "dummytable1_pkey" PRIMARY KEY ("id")
);
