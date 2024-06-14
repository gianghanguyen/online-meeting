-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "avtUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "avtUrl" DROP NOT NULL;
