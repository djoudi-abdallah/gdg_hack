const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new challenge
exports.createChallenge = async (req, res) => {
  try {
    const { title, description, eventId } = req.body;

    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        event: { connect: { id: eventId } },
      },
    });

    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ error: 'Unable to create challenge.' });
  }
};

// Retrieve all challenges
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await prisma.challenge.findMany();
    res.status(200).json(challenges);
  } catch (error) {
    console.error('Error retrieving challenges:', error);
    res.status(500).json({ error: 'Unable to retrieve challenges.' });
  }
};

// Retrieve a specific challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found.' });
    }

    res.status(200).json(challenge);
  } catch (error) {
    console.error('Error retrieving challenge:', error);
    res.status(500).json({ error: 'Unable to retrieve challenge.' });
  }
};

// Update an existing challenge
exports.updateChallenge = async (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    const { title, description, eventId } = req.body;

    const updatedChallenge = await prisma.challenge.update({
      where: { id: challengeId },
      data: {
        title,
        description,
        event: { connect: { id: eventId } },
      },
    });

    res.status(200).json(updatedChallenge);
  } catch (error) {
    console.error('Error updating challenge:', error);
    res.status(500).json({ error: 'Unable to update challenge.' });
  }
};

// Delete a challenge by ID
exports.deleteChallenge = async (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);

    await prisma.challenge.delete({
      where: { id: challengeId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting challenge:', error);
    res.status(500).json({ error: 'Unable to delete challenge.' });
  }
};
