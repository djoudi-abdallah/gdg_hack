const express = require("express");
const usercontroller = require("../controllers/UserController");
const router = express.Router();
const signupMiddleware = require("../middelw/signupMiddleware");
const adminMiddleware = require("../middelw/adminMiddlware");
const authMiddleware = require("../middelw/authMiddleware");

router.post("/login", usercontroller.loginUser);
router.get("/:id", authMiddleware, usercontroller.getUserById);
router.get("/", adminMiddleware, usercontroller.getAllUsers);
router.post("/", signupMiddleware, usercontroller.createUser);
router.put("/:id", authMiddleware, usercontroller.updateUser);
router.delete("/:id", authMiddleware, usercontroller.deleteUser);

module.exports = router;
