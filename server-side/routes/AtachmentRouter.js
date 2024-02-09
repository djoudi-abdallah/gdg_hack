const express = require("express");
const router = express.Router();
const attachmentController = require("../controllers/AttachmentsController");

// Route for creating a new attachment
router.post("/", attachmentController.createAttachment);

// Route for retrieving all attachments
router.get("/", attachmentController.getAllAttachments);

// Route for retrieving a specific attachment by ID
router.get("/:id", attachmentController.getAttachmentById);

// Route for updating an existing attachment
router.put("/:id", attachmentController.updateAttachment);

// Route for deleting an attachment by ID
router.delete("/:id", attachmentController.deleteAttachment);

module.exports = router;
