const express = require('express');
const router = express.Router();
const critereController = require('../controllers/CritereController');

// Route for creating a new criterion
router.post('/', critereController.createCritere);

// Route for retrieving all criteria
router.get('/', critereController.getAllCriteria);

// Route for retrieving a specific criterion by ID
router.get('/:id', critereController.getCritereById);

// Route for updating an existing criterion
router.put('/:id', critereController.updateCritere);

// Route for deleting a criterion by ID
router.delete('/:id', critereController.deleteCritere);

module.exports = router;
