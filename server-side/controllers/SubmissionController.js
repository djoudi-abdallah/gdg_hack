const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new submission
exports.createSubmission = async (req, res) => {
  try {
    const { teamId, projectTitle, description, attachments, challengeId } = req.body;

    // Extract the user type from the token
    const userType = req.user.typeUser; // Assuming the user type is stored in req.user

    // If the user type is "participant", check if they are a team lead
    if (userType === 'participant') {
      // Find the participant using the user ID from the token
      const participant = await prisma.participant.findUnique({
        where: { userid: req.user.id }, // Assuming the user ID is stored in req.user.id
        include: { team: true }, // Include the associated team
      });

      // If the participant is not a team lead, return an error
      if (!participant || !participant.isTeamlead || !participant.team || participant.team.id !== teamId) {
        return res.status(403).json({ error: 'Only team leads can create submissions for their team.' });
      }
    }

    // Create the submission
    const submission = await prisma.submission.create({
      data: {
        team: { connect: { id: teamId } },
        projectTitle,
        description,
        attachments,
        challenge: { connect: { id: challengeId } },
      },
    });

    res.status(201).json(submission);
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ error: 'Unable to create submission.' });
  }
};

// Retrieve all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await prisma.submission.findMany();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    res.status(500).json({ error: 'Unable to retrieve submissions.' });
  }
};

// Retrieve a specific submission by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error('Error retrieving submission:', error);
    res.status(500).json({ error: 'Unable to retrieve submission.' });
  }
};

// Update an existing submission
exports.updateSubmission = async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);
    const { teamId, projectTitle, description, attachments, challengeId } = req.body;

    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        team: { connect: { id: teamId } },
        projectTitle,
        description,
        attachments,
        challenge: { connect: { id: challengeId } },
      },
    });

    res.status(200).json(updatedSubmission);
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ error: 'Unable to update submission.' });
  }
};

// Delete a submission by ID
exports.deleteSubmission = async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);

    await prisma.submission.delete({
      where: { id: submissionId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Unable to delete submission.' });
  }
};
