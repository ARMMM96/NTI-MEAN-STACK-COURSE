const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/add", userController.add);
router.get("/users", userController.allUsers);
router.get("/users/:id", userController.singleUser);
router.delete("/users/:id", userController.deleteUser);
router.patch("/users/:id", userController.editUser);

module.exports = router;
