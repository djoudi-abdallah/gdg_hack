const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new mentor
exports.createMentor = async (req, res) => {
  try {
    const { name, email, skills, userId } = req.body;

    const mentor = await prisma.mentor.create({
      data: {
        name,
        email,
        skills,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(mentor);
  } catch (error) {
    console.error("Error creating mentor:", error);
    res.status(500).json({ error: "Unable to create mentor." });
  }
};

// Retrieve all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await prisma.mentor.findMany();
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error retrieving mentors:", error);
    res.status(500).json({ error: "Unable to retrieve mentors." });
  }
};

// Retrieve a specific mentor by ID
exports.getMentorById = async (req, res) => {
  try {
    const mentorId = parseInt(req.params.id);

    const mentor = await prisma.mentor.findUnique({
      where: { id: mentorId },
    });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found." });
    }

    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error retrieving mentor:", error);
    res.status(500).json({ error: "Unable to retrieve mentor." });
  }
};

// Update an existing mentor
exports.updateMentor = async (req, res) => {
  try {
    const mentorId = parseInt(req.params.id);
    const { name, email, skills, userId } = req.body;

    const updatedMentor = await prisma.mentor.update({
      where: { id: mentorId },
      data: {
        name,
        email,
        skills,
        user: { connect: { id: userId } },
      },
    });

    res.status(200).json(updatedMentor);
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ error: "Unable to update mentor." });
  }
};

// Delete a mentor by ID
exports.deleteMentor = async (req, res) => {
  try {
    const mentorId = parseInt(req.params.id);

    await prisma.mentor.delete({
      where: { id: mentorId },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ error: "Unable to delete mentor." });
  }
};
