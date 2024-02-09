const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/ChallengeController');

// Route for creating a new challenge
router.post('/', challengeController.createChallenge);

// Route for retrieving all challenges
router.get('/', challengeController.getAllChallenges);

// Route for retrieving a specific challenge by ID
router.get('/:id', challengeController.getChallengeById);

// Route for updating an existing challenge
router.put('/:id', challengeController.updateChallenge);

// Route for deleting a challenge by ID
router.delete('/:id', challengeController.deleteChallenge);

module.exports = router;
