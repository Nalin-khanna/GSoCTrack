/*
  Warnings:

  - You are about to drop the column `language` on the `Repo` table. All the data in the column will be lost.
  - Added the required column `forks_count` to the `Repo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Repo" DROP COLUMN "language",
ADD COLUMN     "forks_count" INTEGER NOT NULL;
