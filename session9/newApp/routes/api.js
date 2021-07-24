const passport = require("passport");
const mongoose = require("mongoose");

const config = require("../config/database");
require("../config/passport")(passport);

jwt = require("jsonwebtoken");
express = require("express");
const router = new express.Router();
User = require("../models/user");
Data = require("../models/data");

router.post("/singup", async (req, res) => {
  let userData = new User(req.body);
  try {
    await userData.save();
    res.send(userData);
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    user = await User.findOne({ userName: req.body.userName });
    if (!user) res.send("not found");
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch && !err) {
        const token = jwt.sign(user.toJSON(), config.secret);
        res.send({
          token: "jwt " + token,
        });
      } else res.send(err);
    });
    // res.send(result)
  } catch (e) {
    res.send(e.message);
  }
});
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send("tset");
  }
);

module.exports = router;
