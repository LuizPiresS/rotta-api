/*
  Warnings:

  - You are about to drop the `Carousel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "file_upload" DROP CONSTRAINT "file_upload_carouselId_fkey";

-- DropForeignKey
ALTER TABLE "file_upload" DROP CONSTRAINT "file_upload_catalogProductid_fkey";

-- DropTable
DROP TABLE "Carousel";

-- DropTable
DROP TABLE "CatalogProduct";

-- CreateTable
CREATE TABLE "catalog_product" (
    "id" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "catalog_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carousel" (
    "id" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "carousel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_catalogProductid_fkey" FOREIGN KEY ("catalogProductid") REFERENCES "catalog_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "carousel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
