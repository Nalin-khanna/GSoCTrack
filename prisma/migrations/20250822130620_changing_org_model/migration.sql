/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `guideUrl` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `ideasUrl` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `ircChannel` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `mailingList` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Organization" DROP COLUMN "contactEmail",
DROP COLUMN "guideUrl",
DROP COLUMN "ideasUrl",
DROP COLUMN "ircChannel",
DROP COLUMN "mailingList";
