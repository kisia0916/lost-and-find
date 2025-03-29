-- CreateTable
CREATE TABLE "Drop" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "pictureURL" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("id")
);
