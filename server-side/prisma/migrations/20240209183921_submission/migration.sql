/*
  Warnings:

  - A unique constraint covering the columns `[teamid]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Submission_teamid_key" ON "Submission"("teamid");
