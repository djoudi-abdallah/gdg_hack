const express = require('express');
const router = express.Router();
const judgeFeedbackController = require('../controllers/JudgefeedbackController');

// Route for creating a new judge feedback
router.post('/', judgeFeedbackController.createJudgeFeedback);

// Route for retrieving all judge feedbacks
router.get('/', judgeFeedbackController.getAllJudgeFeedbacks);

// Route for retrieving a specific judge feedback by ID
router.get('/:id', judgeFeedbackController.getJudgeFeedbackById);

// Route for updating an existing judge feedback
router.put('/:id', judgeFeedbackController.updateJudgeFeedback);

// Route for deleting a judge feedback by ID
router.delete('/:id', judgeFeedbackController.deleteJudgeFeedback);

module.exports = router;
