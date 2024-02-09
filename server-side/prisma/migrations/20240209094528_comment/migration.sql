/*
  Warnings:

  - You are about to drop the `PublicFeedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublicFeedback" DROP CONSTRAINT "PublicFeedback_eventid_fkey";

-- DropForeignKey
ALTER TABLE "PublicFeedback" DROP CONSTRAINT "PublicFeedback_submissionid_fkey";

-- DropTable
DROP TABLE "PublicFeedback";

-- CreateTable
CREATE TABLE "PublicComment" (
    "id" SERIAL NOT NULL,
    "submissionid" INTEGER NOT NULL,
    "eventid" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "PublicComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PublicComment" ADD CONSTRAINT "PublicComment_submissionid_fkey" FOREIGN KEY ("submissionid") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicComment" ADD CONSTRAINT "PublicComment_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
