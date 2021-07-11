const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller");

router.post("/addstudent", studentController.addStudent);
router.get("/students", studentController.allStudents);
router.get("/students/:id", studentController.singleStudent);
router.delete("/students/:id", studentController.deleteStudent);
router.patch("/editStudent/:id", studentController.editStudent);

module.exports = router;
