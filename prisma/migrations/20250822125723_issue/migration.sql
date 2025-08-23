/*
  Warnings:

  - Added the required column `assigned` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorLogin` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Issue" ADD COLUMN     "assigned" BOOLEAN NOT NULL,
ADD COLUMN     "authorLogin" TEXT NOT NULL,
ADD COLUMN     "authorUrl" TEXT,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT;
