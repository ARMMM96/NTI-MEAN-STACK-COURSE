const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

router.post("/addTask", taskController.add);
router.get("/tasks", taskController.allTasks);
router.get("/task/:id", taskController.singleTask);
router.delete("/deletetask/:id", taskController.deleteTask);
router.patch("/task/:id", taskController.editTask);

module.exports = router;
