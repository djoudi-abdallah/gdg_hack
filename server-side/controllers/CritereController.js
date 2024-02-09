const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new criterium
exports.createCritere = async (req, res) => {
  try {
    const { title, challengeId, teamId, eventId } = req.body;

    const criterium = await prisma.critere.create({
      data: {
        title,
        challenge: { connect: { id: challengeId } },
        team: { connect: { id: teamId } },
        event: { connect: { id: eventId } },
      },
    });

    res.status(201).json(criterium);
  } catch (error) {
    console.error('Error creating criterium:', error);
    res.status(500).json({ error: 'Unable to create criterium.' });
  }
};

// Retrieve all criteria
exports.getAllCriteria = async (req, res) => {
  try {
    const criteria = await prisma.critere.findMany();
    res.status(200).json(criteria);
  } catch (error) {
    console.error('Error retrieving criteria:', error);
    res.status(500).json({ error: 'Unable to retrieve criteria.' });
  }
};

// Retrieve a specific criterium by ID
exports.getCritereById = async (req, res) => {
  try {
    const criteriumId = parseInt(req.params.id);

    const criterium = await prisma.critere.findUnique({
      where: { id: criteriumId },
    });

    if (!criterium) {
      return res.status(404).json({ error: 'Criterium not found.' });
    }

    res.status(200).json(criterium);
  } catch (error) {
    console.error('Error retrieving criterium:', error);
    res.status(500).json({ error: 'Unable to retrieve criterium.' });
  }
};

// Update an existing criterium
exports.updateCritere = async (req, res) => {
  try {
    const criteriumId = parseInt(req.params.id);
    const { title, teamId, eventId } = req.body;

    const updatedCritere = await prisma.critere.update({
      where: { id: criteriumId },
      data: {
        title,
        team: { connect: { id: teamId } },
        event: { connect: { id: eventId } },
      },
    });

    res.status(200).json(updatedCritere);
  } catch (error) {
    console.error('Error updating criterium:', error);
    res.status(500).json({ error: 'Unable to update criterium.' });
  }
};

// Delete a criterium by ID
exports.deleteCritere = async (req, res) => {
  try {
    const criteriumId = parseInt(req.params.id);

    await prisma.critere.delete({
      where: { id: criteriumId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting criterium:', error);
    res.status(500).json({ error: 'Unable to delete criterium.' });
  }
};
