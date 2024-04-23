/*
  Warnings:

  - You are about to drop the column `fileId` on the `Carousel` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `CatalogProduct` table. All the data in the column will be lost.
  - Added the required column `catalogProductid` to the `file_upload` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Carousel" DROP CONSTRAINT "Carousel_fileId_fkey";

-- DropForeignKey
ALTER TABLE "CatalogProduct" DROP CONSTRAINT "CatalogProduct_fileId_fkey";

-- AlterTable
ALTER TABLE "Carousel" DROP COLUMN "fileId";

-- AlterTable
ALTER TABLE "CatalogProduct" DROP COLUMN "fileId";

-- AlterTable
ALTER TABLE "file_upload" ADD COLUMN     "carouselId" TEXT,
ADD COLUMN     "catalogProductid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_catalogProductid_fkey" FOREIGN KEY ("catalogProductid") REFERENCES "CatalogProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "Carousel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
