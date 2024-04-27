-- CreateTable
CREATE TABLE "email_token" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "email_token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_token" ADD CONSTRAINT "email_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
