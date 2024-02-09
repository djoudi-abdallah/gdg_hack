const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, eventType, dateBegin, dateEnd, location, description } =
      req.body;

    const newEvent = await prisma.event.create({
      data: {
        eventName,
        eventType,
        dateBegin,
        dateEnd,
        location,
        description,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Unable to create event." });
  }
};
// Retrieve all events
exports.getAllEvents = async (req, res) => {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error retrieving events:', error);
      res.status(500).json({ error: 'Unable to retrieve events.' });
    }
  };
exports.getEventById = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ error: "Unable to retrieve event." });
  }
};
exports.updateEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const { eventName, eventType, dateBegin, dateEnd, location, description } =
      req.body;

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        eventName,
        eventType,
        dateBegin,
        dateEnd,
        location,
        description,
      },
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Unable to update event." });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);

    await prisma.event.delete({
      where: { id: eventId },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Unable to delete event." });
  }
};
