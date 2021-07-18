const express = require("express");
const router = new express.Router();
const userController = require("../app/controllers/user.controller");
const auth = require("../app/middleware/auth");

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.post("/user/activate/:otp", userController.activateUser);

router.post("/user/logout", auth, userController.logout);
router.post("/user/logoutAll", auth, userController.logoutAll);
router.post("/user/delete", auth, userController.deleteAccount);
router.post("/user/me", auth, userController.me);
router.post("/user/deactivate", auth, userController.deactivate);

// router.get("/user/all", userControllerObj.showAll);

module.exports = router;
