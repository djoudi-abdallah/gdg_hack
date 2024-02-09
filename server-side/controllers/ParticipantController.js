const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new participant
exports.createParticipant = async (req, res) => {
  try {
    const { name, email, skills, interests, userId } = req.body;

    const participant = await prisma.participant.create({
      data: {
        name,
        email,
        skills,
        interests,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(participant);
  } catch (error) {
    console.error('Error creating participant:', error);
    res.status(500).json({ error: 'Unable to create participant.' });
  }
};

// Retrieve all participants
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await prisma.participant.findMany();
    res.status(200).json(participants);
  } catch (error) {
    console.error('Error retrieving participants:', error);
    res.status(500).json({ error: 'Unable to retrieve participants.' });
  }
};

// Retrieve a specific participant by ID
exports.getParticipantById = async (req, res) => {
  try {
    const participantId = parseInt(req.params.id);

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found.' });
    }

    res.status(200).json(participant);
  } catch (error) {
    console.error('Error retrieving participant:', error);
    res.status(500).json({ error: 'Unable to retrieve participant.' });
  }
};

// Update an existing participant
exports.updateParticipant = async (req, res) => {
  try {
    const participantId = parseInt(req.params.id);
    const { name, email, skills, interests, userId } = req.body;

    const updatedParticipant = await prisma.participant.update({
      where: { id: participantId },
      data: {
        name,
        email,
        skills,
        interests,
        user: { connect: { id: userId } },
      },
    });

    res.status(200).json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant:', error);
    res.status(500).json({ error: 'Unable to update participant.' });
  }
};

// Delete a participant by ID
exports.deleteParticipant = async (req, res) => {
  try {
    const participantId = parseInt(req.params.id);

    await prisma.participant.delete({
      where: { id: participantId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting participant:', error);
    res.status(500).json({ error: 'Unable to delete participant.' });
  }
};
