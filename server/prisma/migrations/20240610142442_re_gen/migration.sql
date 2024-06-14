/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `group` will be added. If there are existing duplicate values, this will fail.
  - Made the column `token` on table `group` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "group" ALTER COLUMN "token" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "group_token_key" ON "group"("token");
