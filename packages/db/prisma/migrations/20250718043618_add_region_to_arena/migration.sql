-- CreateEnum
CREATE TYPE "Region" AS ENUM ('office', 'garden');

-- AlterTable
ALTER TABLE "Arena" ADD COLUMN     "region" "Region" NOT NULL DEFAULT 'office';
