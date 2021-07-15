const express = require("express");
const router = new express.Router();
const User = require("../models/users.model");
const authUser = require("../middleware/auth");

router.post("/add", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.send({
      apiStatus: true,
      data: userData,
      message: "data inserted",
    });
  } catch (e) {
    res.send({
      apiStatus: false,
      data: e,
      message: "error adding ",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    user = await User.loginUser(req.body.email, req.body.password);
    console.log(user);
    // genrate token
    token = await user.generateToken();
    res.send({
      data: { user, token },
      msg: "logged in",
    });
  } catch (e) {
    res.send({
      data: e.message,
      msg: "error  login route",
    });
  }
});

router.get("/me", authUser, (req, res) => {
  res.send(req.user);
});

module.exports = router;
