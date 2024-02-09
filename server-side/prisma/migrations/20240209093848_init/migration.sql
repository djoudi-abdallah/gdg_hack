-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "profession" TEXT,
    "dateOfBirth" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "dateBegin" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamName" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "teamid" INTEGER NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "challengeid" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "submisionid" INTEGER NOT NULL,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Judge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fields" TEXT[],
    "eventid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "isLead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Judge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "skills" TEXT[],
    "interests" TEXT[],
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "skills" TEXT[],
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeFeedback" (
    "id" SERIAL NOT NULL,
    "submissionid" INTEGER NOT NULL,
    "judgeid" INTEGER NOT NULL,
    "eventid" INTEGER NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JudgeFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicFeedback" (
    "id" SERIAL NOT NULL,
    "submissionid" INTEGER NOT NULL,
    "eventid" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "PublicFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventid" INTEGER NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Critere" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "challengeid" INTEGER NOT NULL,
    "teamid" INTEGER NOT NULL,
    "note" INTEGER NOT NULL DEFAULT 0,
    "eventid" INTEGER NOT NULL,

    CONSTRAINT "Critere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participantfeedback" (
    "id" SERIAL NOT NULL,
    "eventid" INTEGER NOT NULL,
    "participantid" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "Participantfeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToParticipant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToMentor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ParticipantToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Judge_email_key" ON "Judge"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Judge_userid_key" ON "Judge"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userid_key" ON "Participant"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_userid_key" ON "Mentor"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "JudgeFeedback_submissionid_key" ON "JudgeFeedback"("submissionid");

-- CreateIndex
CREATE UNIQUE INDEX "Critere_teamid_key" ON "Critere"("teamid");

-- CreateIndex
CREATE UNIQUE INDEX "Critere_eventid_key" ON "Critere"("eventid");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToParticipant_AB_unique" ON "_EventToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToParticipant_B_index" ON "_EventToParticipant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToMentor_AB_unique" ON "_EventToMentor"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToMentor_B_index" ON "_EventToMentor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipantToTeam_AB_unique" ON "_ParticipantToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipantToTeam_B_index" ON "_ParticipantToTeam"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_challengeid_fkey" FOREIGN KEY ("challengeid") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_submisionid_fkey" FOREIGN KEY ("submisionid") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeFeedback" ADD CONSTRAINT "JudgeFeedback_submissionid_fkey" FOREIGN KEY ("submissionid") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeFeedback" ADD CONSTRAINT "JudgeFeedback_judgeid_fkey" FOREIGN KEY ("judgeid") REFERENCES "Judge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeFeedback" ADD CONSTRAINT "JudgeFeedback_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicFeedback" ADD CONSTRAINT "PublicFeedback_submissionid_fkey" FOREIGN KEY ("submissionid") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicFeedback" ADD CONSTRAINT "PublicFeedback_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Critere" ADD CONSTRAINT "Critere_challengeid_fkey" FOREIGN KEY ("challengeid") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Critere" ADD CONSTRAINT "Critere_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Critere" ADD CONSTRAINT "Critere_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participantfeedback" ADD CONSTRAINT "Participantfeedback_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participantfeedback" ADD CONSTRAINT "Participantfeedback_participantid_fkey" FOREIGN KEY ("participantid") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToParticipant" ADD CONSTRAINT "_EventToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToParticipant" ADD CONSTRAINT "_EventToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMentor" ADD CONSTRAINT "_EventToMentor_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMentor" ADD CONSTRAINT "_EventToMentor_B_fkey" FOREIGN KEY ("B") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTeam" ADD CONSTRAINT "_ParticipantToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTeam" ADD CONSTRAINT "_ParticipantToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
