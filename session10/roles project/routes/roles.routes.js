const express = require("express");
const router = new express.Router();
const Myroles = require("../database/models/roles.model");

router.post("/add", async (req, res) => {
  try {
    let role = new Myroles(req.body);
    await role.save();
    res.send(role);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    let data = await Myroles.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
