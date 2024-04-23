-- CreateTable
CREATE TABLE "FileUpload" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "contentLength" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "FileUpload_pkey" PRIMARY KEY ("id")
);
