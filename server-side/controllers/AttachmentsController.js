const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new attachment
exports.createAttachment = async (req, res) => {
  try {
    const { name, url, submissionId } = req.body;

    const attachment = await prisma.attachment.create({
      data: {
        name,
        url,
        submition: { connect: { id: submissionId } },
      },
    });

    res.status(201).json(attachment);
  } catch (error) {
    console.error('Error creating attachment:', error);
    res.status(500).json({ error: 'Unable to create attachment.' });
  }
};

// Retrieve all attachments
exports.getAllAttachments = async (req, res) => {
  try {
    const attachments = await prisma.attachment.findMany();
    res.status(200).json(attachments);
  } catch (error) {
    console.error('Error retrieving attachments:', error);
    res.status(500).json({ error: 'Unable to retrieve attachments.' });
  }
};

// Retrieve a specific attachment by ID
exports.getAttachmentById = async (req, res) => {
  try {
    const attachmentId = parseInt(req.params.id);

    const attachment = await prisma.attachment.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found.' });
    }

    res.status(200).json(attachment);
  } catch (error) {
    console.error('Error retrieving attachment:', error);
    res.status(500).json({ error: 'Unable to retrieve attachment.' });
  }
};

// Update an existing attachment
exports.updateAttachment = async (req, res) => {
  try {
    const attachmentId = parseInt(req.params.id);
    const { name, url, submissionId } = req.body;

    const updatedAttachment = await prisma.attachment.update({
      where: { id: attachmentId },
      data: {
        name,
        url,
        submition: { connect: { id: submissionId } },
      },
    });

    res.status(200).json(updatedAttachment);
  } catch (error) {
    console.error('Error updating attachment:', error);
    res.status(500).json({ error: 'Unable to update attachment.' });
  }
};

// Delete an attachment by ID
exports.deleteAttachment = async (req, res) => {
  try {
    const attachmentId = parseInt(req.params.id);

    await prisma.attachment.delete({
      where: { id: attachmentId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting attachment:', error);
    res.status(500).json({ error: 'Unable to delete attachment.' });
  }
};
