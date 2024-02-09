const express = require('express');
const router = express.Router();
const submissionController = require('./submissionController');
const authMiddleware = require("../middelw/authMiddleware");
const adminMiddleware = require("../middelw/adminMiddlware");

// Route for creating a new submission
router.post('/', authMiddleware,submissionController.createSubmission);

// Route for retrieving all submissions
router.get('/', submissionController.getAllSubmissions);

// Route for retrieving a specific submission by ID
router.get('/:id', submissionController.getSubmissionById);

// Route for updating an existing submission
router.put('/:id', adminMiddleware,submissionController.updateSubmission);

// Route for deleting a submission by ID
router.delete('/:id', adminMiddleware,submissionController.deleteSubmission);

module.exports = router;
