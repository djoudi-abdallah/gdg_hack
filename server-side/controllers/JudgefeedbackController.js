const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new judge feedback
exports.createJudgeFeedback = async (req, res) => {
  try {
    const { submissionId, judgeId, eventId, comment, rating } = req.body;

    const judgeFeedback = await prisma.judgeFeedback.create({
      data: {
        submission: { connect: { id: submissionId } },
        judge: { connect: { id: judgeId } },
        event: { connect: { id: eventId } },
        comment,
        rating,
      },
    });

    res.status(201).json(judgeFeedback);
  } catch (error) {
    console.error('Error creating judge feedback:', error);
    res.status(500).json({ error: 'Unable to create judge feedback.' });
  }
};

// Retrieve all judge feedbacks
exports.getAllJudgeFeedbacks = async (req, res) => {
  try {
    const judgeFeedbacks = await prisma.judgeFeedback.findMany();
    res.status(200).json(judgeFeedbacks);
  } catch (error) {
    console.error('Error retrieving judge feedbacks:', error);
    res.status(500).json({ error: 'Unable to retrieve judge feedbacks.' });
  }
};

// Retrieve a specific judge feedback by ID
exports.getJudgeFeedbackById = async (req, res) => {
  try {
    const judgeFeedbackId = parseInt(req.params.id);

    const judgeFeedback = await prisma.judgeFeedback.findUnique({
      where: { id: judgeFeedbackId },
    });

    if (!judgeFeedback) {
      return res.status(404).json({ error: 'Judge feedback not found.' });
    }

    res.status(200).json(judgeFeedback);
  } catch (error) {
    console.error('Error retrieving judge feedback:', error);
    res.status(500).json({ error: 'Unable to retrieve judge feedback.' });
  }
};

// Update an existing judge feedback
exports.updateJudgeFeedback = async (req, res) => {
  try {
    const judgeFeedbackId = parseInt(req.params.id);
    const { submissionId, judgeId, eventId, comment, rating } = req.body;

    const updatedJudgeFeedback = await prisma.judgeFeedback.update({
      where: { id: judgeFeedbackId },
      data: {
        submission: { connect: { id: submissionId } },
        judge: { connect: { id: judgeId } },
        event: { connect: { id: eventId } },
        comment,
        rating,
      },
    });

    res.status(200).json(updatedJudgeFeedback);
  } catch (error) {
    console.error('Error updating judge feedback:', error);
    res.status(500).json({ error: 'Unable to update judge feedback.' });
  }
};

// Delete a judge feedback by ID
exports.deleteJudgeFeedback = async (req, res) => {
  try {
    const judgeFeedbackId = parseInt(req.params.id);

    await prisma.judgeFeedback.delete({
      where: { id: judgeFeedbackId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting judge feedback:', error);
    res.status(500).json({ error: 'Unable to delete judge feedback.' });
  }
};
