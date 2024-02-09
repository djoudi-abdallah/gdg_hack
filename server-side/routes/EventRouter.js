const express = require("express");
const router = express.Router();
const eventController = require("../controllers/EventController");
const adminMiddleware = require("../middelw/adminMiddlware");

// Route for creating a new event
router.post("/", adminMiddleware, eventController.createEvent);

router.get("/", eventController.getAllEvents);
// Route for retrieving a specific event by ID
router.get("/:id", eventController.getEventById);

// Route for updating an existing event
router.put("/:id", adminMiddleware, eventController.updateEvent);

// Route for deleting an event by ID
router.delete("/:id", adminMiddleware, eventController.deleteEvent);

module.exports = router;
