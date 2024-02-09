const express = require('express');
const router = express.Router();
const participantController = require('../controllers/ParticipantController');

// Route for creating a new participant
router.post('/', participantController.createParticipant);

// Route for retrieving all participants
router.get('/', participantController.getAllParticipants);

// Route for retrieving a specific participant by ID
router.get('/:id', participantController.getParticipantById);

// Route for updating an existing participant
router.put('/:id', participantController.updateParticipant);

// Route for deleting a participant by ID
router.delete('/:id', participantController.deleteParticipant);

module.exports = router;
