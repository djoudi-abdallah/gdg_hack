// router.js
const express = require('express');
const router = express.Router();
const autogenerateController = require('../controllers/AutogenerateController');

// Create a new user
router.post('/generate', autogenerateController.createUsersFromFile);

module.exports = router;
