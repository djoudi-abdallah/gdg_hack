
const express = require('express');
const router = express.Router();
const judgeController = require('../controllers/JudgeController');

// Route for creating a new judge
router.post('/', judgeController.createJudge);

// Route for retrieving all judges
router.get('/', judgeController.getAllJudges);

// Route for retrieving a specific judge by ID
router.get('/:id', judgeController.getJudgeById);

// Route for updating an existing judge
router.put('/:id', judgeController.updateJudge);

// Route for deleting a judge by ID
router.delete('/:id', judgeController.deleteJudge);

module.exports = router;
