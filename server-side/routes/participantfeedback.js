const express = require('express');
const router = express.Router();
const participantFeedbackController = require('../controllers/ParticipantfeedbackController');

// Route for creating a new participant feedback
router.post('/', participantFeedbackController.createParticipantFeedback);

// Route for retrieving all participant feedbacks
router.get('/', participantFeedbackController.getAllParticipantFeedbacks);

// Route for retrieving a specific participant feedback by ID
router.get('/:id', participantFeedbackController.getParticipantFeedbackById);

// Route for updating an existing participant feedback
router.put('/:id', participantFeedbackController.updateParticipantFeedback);

// Route for deleting a participant feedback by ID
router.delete('/:id', participantFeedbackController.deleteParticipantFeedback);

module.exports = router;
