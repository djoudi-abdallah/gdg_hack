const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new judge
exports.createJudge = async (req, res) => {
  try {
    const { name, email, fields, eventId, userId, isLead } = req.body;

    const judge = await prisma.judge.create({
      data: {
        name,
        email,
        fields,
        event: { connect: { id: eventId } },
        user: { connect: { id: userId } },
        isLead,
      },
    });

    res.status(201).json(judge);
  } catch (error) {
    console.error('Error creating judge:', error);
    res.status(500).json({ error: 'Unable to create judge.' });
  }
};

// Retrieve all judges
exports.getAllJudges = async (req, res) => {
  try {
    const judges = await prisma.judge.findMany();
    res.status(200).json(judges);
  } catch (error) {
    console.error('Error retrieving judges:', error);
    res.status(500).json({ error: 'Unable to retrieve judges.' });
  }
};

// Retrieve a specific judge by ID
exports.getJudgeById = async (req, res) => {
  try {
    const judgeId = parseInt(req.params.id);

    const judge = await prisma.judge.findUnique({
      where: { id: judgeId },
    });

    if (!judge) {
      return res.status(404).json({ error: 'Judge not found.' });
    }

    res.status(200).json(judge);
  } catch (error) {
    console.error('Error retrieving judge:', error);
    res.status(500).json({ error: 'Unable to retrieve judge.' });
  }
};

// Update an existing judge
exports.updateJudge = async (req, res) => {
  try {
    const judgeId = parseInt(req.params.id);
    const { name, email, fields, eventId, userId, isLead } = req.body;

    const updatedJudge = await prisma.judge.update({
      where: { id: judgeId },
      data: {
        name,
        email,
        fields,
        event: { connect: { id: eventId } },
        user: { connect: { id: userId } },
        isLead,
      },
    });

    res.status(200).json(updatedJudge);
  } catch (error) {
    console.error('Error updating judge:', error);
    res.status(500).json({ error: 'Unable to update judge.' });
  }
};

// Delete a judge by ID
exports.deleteJudge = async (req, res) => {
  try {
    const judgeId = parseInt(req.params.id);

    await prisma.judge.delete({
      where: { id: judgeId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting judge:', error);
    res.status(500).json({ error: 'Unable to delete judge.' });
  }
};
