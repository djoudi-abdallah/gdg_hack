const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new participant feedback
exports.createParticipantFeedback = async (req, res) => {
  try {
    const { eventId, participantId, feedback } = req.body;

    const participantFeedback = await prisma.participantfeedback.create({
      data: {
        event: { connect: { id: eventId } },
        participant: { connect: { id: participantId } },
        feedback,
      },
    });

    res.status(201).json(participantFeedback);
  } catch (error) {
    console.error('Error creating participant feedback:', error);
    res.status(500).json({ error: 'Unable to create participant feedback.' });
  }
};

// Retrieve all participant feedbacks
exports.getAllParticipantFeedbacks = async (req, res) => {
  try {
    const participantFeedbacks = await prisma.participantfeedback.findMany();
    res.status(200).json(participantFeedbacks);
  } catch (error) {
    console.error('Error retrieving participant feedbacks:', error);
    res.status(500).json({ error: 'Unable to retrieve participant feedbacks.' });
  }
};

// Retrieve a specific participant feedback by ID
exports.getParticipantFeedbackById = async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id);

    const participantFeedback = await prisma.participantfeedback.findUnique({
      where: { id: feedbackId },
    });

    if (!participantFeedback) {
      return res.status(404).json({ error: 'Participant feedback not found.' });
    }

    res.status(200).json(participantFeedback);
  } catch (error) {
    console.error('Error retrieving participant feedback:', error);
    res.status(500).json({ error: 'Unable to retrieve participant feedback.' });
  }
};

// Update an existing participant feedback
exports.updateParticipantFeedback = async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id);
    const { feedback } = req.body;

    const updatedParticipantFeedback = await prisma.participantfeedback.update({
      where: { id: feedbackId },
      data: { feedback },
    });

    res.status(200).json(updatedParticipantFeedback);
  } catch (error) {
    console.error('Error updating participant feedback:', error);
    res.status(500).json({ error: 'Unable to update participant feedback.' });
  }
};

// Delete a participant feedback by ID
exports.deleteParticipantFeedback = async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id);

    await prisma.participantfeedback.delete({
      where: { id: feedbackId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting participant feedback:', error);
    res.status(500).json({ error: 'Unable to delete participant feedback.' });
  }
};
