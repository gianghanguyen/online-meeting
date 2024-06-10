/*
  Warnings:

  - You are about to drop the column `inviteLink` on the `group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "group" DROP COLUMN "inviteLink",
ADD COLUMN     "token" TEXT;
