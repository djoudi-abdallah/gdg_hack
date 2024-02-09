const express = require('express');
const router = express.Router();
const publicCommentController = require('../controllers/publicCommentController');

// Route for creating a new public comment
router.post('/', publicCommentController.createPublicComment);

// Route for retrieving all public comments
router.get('/', publicCommentController.getAllPublicComments);

// Route for retrieving a specific public comment by ID
router.get('/:id', publicCommentController.getPublicCommentById);

// Route for updating an existing public comment
router.put('/:id', publicCommentController.updatePublicComment);

// Route for deleting a public comment by ID
router.delete('/:id', publicCommentController.deletePublicComment);

module.exports = router;
