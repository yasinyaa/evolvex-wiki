/*
  Warnings:

  - You are about to drop the `TagsOnDocuments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."TagsOnDocuments" DROP CONSTRAINT "TagsOnDocuments_documentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TagsOnDocuments" DROP CONSTRAINT "TagsOnDocuments_tagId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "tagId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."TagsOnDocuments";

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
