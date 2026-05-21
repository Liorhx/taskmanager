const express = require("express");

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getTask);

module.exports = router;
