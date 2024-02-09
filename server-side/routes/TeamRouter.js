const express = require("express");
const router = express.Router();
const teamController = require("../controllers/TeamController");
const adminMiddleware = require("../middelw/adminMiddlware");

// Route for creating a new team
router.post("/", adminMiddleware, teamController.createTeam);

// Route for retrieving all teams
router.get("/", teamController.getAllTeams);

// Route for retrieving a specific team by ID
router.get("/:id", teamController.getTeamById);

// Route for updating an existing team
router.put("/:id", adminMiddleware, teamController.updateTeam);

// Route for deleting a team by ID
router.delete("/:id", adminMiddleware, teamController.deleteTeam);

module.exports = router;
