const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/MentorController');

// Route for creating a new mentor
router.post('/', mentorController.createMentor);

// Route for retrieving all mentors
router.get('/', mentorController.getAllMentors);

// Route for retrieving a specific mentor by ID
router.get('/:id', mentorController.getMentorById);

// Route for updating an existing mentor
router.put('/:id', mentorController.updateMentor);

// Route for deleting a mentor by ID
router.delete('/:id', mentorController.deleteMentor);

module.exports = router;
