const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { teamName, eventId } = req.body;

    const team = await prisma.team.create({
      data: {
        teamName,
        event: { connect: { id: eventId } }, // Associate the team with an event
      },
    });

    res.status(201).json(team);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Unable to create team.' });
  }
};



exports.getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        submissions: true, // Include the submissions associated with each team
      },
    });
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error retrieving teams:', error);
    res.status(500).json({ error: 'Unable to retrieve teams.' });
  }
};


// Retrieve a specific team by ID
exports.getTeamById = async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        submissions: true // Include the associated submissions
      }
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found.' });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error('Error retrieving team:', error);
    res.status(500).json({ error: 'Unable to retrieve team.' });
  }
};


// Update an existing team
exports.updateTeam = async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);
    const { teamName, eventId } = req.body;

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        teamName,
        event: { connect: { id: eventId } }, // Associate the team with an event
      },
    });

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Unable to update team.' });
  }
};

// Delete a team by ID
exports.deleteTeam = async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);

    await prisma.team.delete({
      where: { id: teamId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Unable to delete team.' });
  }
};
