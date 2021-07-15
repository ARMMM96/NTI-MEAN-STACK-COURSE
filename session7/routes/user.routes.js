const express = require("express");
const router = new express.Router();
const User = require("../database/models/user.moodel");

router.post("/user/register", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.send("done");
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/user/all", async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
