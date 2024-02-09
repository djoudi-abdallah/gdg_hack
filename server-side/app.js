const { PrismaClient } = require("@prisma/client");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/UserRouter");
const eventRouter = require("./routes/EventRouter");
const teamRouter = require("./routes/TeamRouter");
const attachmentRouter = require("./routes/AtachmentRouter");
const judgeRouter = require("./routes/JudgeRouter");
const participantRouter = require("./routes/ParticipantRouter");
const mentorRouter = require("./routes/MentorRouter");
const judgeFeedbackRouter = require("./routes/JudgefeedbackRouter");
const publicCommentRouter = require("./routes/publicCommentRouter");
const challengeRouter = require("./routes/ChallengeRouter");
const critereRouter = require('./routes/CritereRouter');
const participantFeedbackRouter = require('./routes/participantfeedback');
app.use('/participant-feedbacks', participantFeedbackRouter);
app.use("/criteria", critereRouter);
app.use("/challenges", challengeRouter);
app.use("/public-comments", publicCommentRouter);
app.use("/judge-feedbacks", judgeFeedbackRouter);
app.use("/mentors", mentorRouter);
app.use("/participants", participantRouter);
app.use("/judges", judgeRouter);
app.use("/attachments", attachmentRouter);
app.use("/teams", teamRouter);
app.use("/events", eventRouter);
app.use("/users", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Close Prisma client when the application exits
