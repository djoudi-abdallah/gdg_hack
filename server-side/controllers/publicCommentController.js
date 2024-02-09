const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new public comment
exports.createPublicComment = async (req, res) => {
  try {
    const { submissionId, eventId, comment } = req.body;

    const publicComment = await prisma.publicComment.create({
      data: {
        submission: { connect: { id: submissionId } },
        event: { connect: { id: eventId } },
        comment,
      },
    });

    res.status(201).json(publicComment);
  } catch (error) {
    console.error('Error creating public comment:', error);
    res.status(500).json({ error: 'Unable to create public comment.' });
  }
};

// Retrieve all public comments
exports.getAllPublicComments = async (req, res) => {
  try {
    const publicComments = await prisma.publicComment.findMany();
    res.status(200).json(publicComments);
  } catch (error) {
    console.error('Error retrieving public comments:', error);
    res.status(500).json({ error: 'Unable to retrieve public comments.' });
  }
};

// Retrieve a specific public comment by ID
exports.getPublicCommentById = async (req, res) => {
  try {
    const publicCommentId = parseInt(req.params.id);

    const publicComment = await prisma.publicComment.findUnique({
      where: { id: publicCommentId },
    });

    if (!publicComment) {
      return res.status(404).json({ error: 'Public comment not found.' });
    }

    res.status(200).json(publicComment);
  } catch (error) {
    console.error('Error retrieving public comment:', error);
    res.status(500).json({ error: 'Unable to retrieve public comment.' });
  }
};

// Update an existing public comment
exports.updatePublicComment = async (req, res) => {
  try {
    const publicCommentId = parseInt(req.params.id);
    const { submissionId, eventId, comment } = req.body;

    const updatedPublicComment = await prisma.publicComment.update({
      where: { id: publicCommentId },
      data: {
        submission: { connect: { id: submissionId } },
        event: { connect: { id: eventId } },
        comment,
      },
    });

    res.status(200).json(updatedPublicComment);
  } catch (error) {
    console.error('Error updating public comment:', error);
    res.status(500).json({ error: 'Unable to update public comment.' });
  }
};

// Delete a public comment by ID
exports.deletePublicComment = async (req, res) => {
  try {
    const publicCommentId = parseInt(req.params.id);

    await prisma.publicComment.delete({
      where: { id: publicCommentId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting public comment:', error);
    res.status(500).json({ error: 'Unable to delete public comment.' });
  }
};
