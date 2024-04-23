/*
  Warnings:

  - You are about to drop the `FileUpload` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fileId` to the `Carousel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `CatalogProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carousel" ADD COLUMN     "fileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CatalogProduct" ADD COLUMN     "fileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "FileUpload";

-- CreateTable
CREATE TABLE "file_upload" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "contentLength" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "file_upload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CatalogProduct" ADD CONSTRAINT "CatalogProduct_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carousel" ADD CONSTRAINT "Carousel_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
