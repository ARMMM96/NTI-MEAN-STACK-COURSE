const express = require("express");
const router = new express.Router();
const Myroutes = require("../database/models/allRoutes.model");

router.post("/add", async (req, res) => {
  try {
    let routes = new Myroutes(req.body);
    await routes.save();
    res.send(routes);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    let data = await Myroutes.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

router.post("/addRole/:id", async (req, res) => {
  try {
    _id = req.params.id;
    role = req.body.role;
    let r = await Myroutes.findById(_id);
    r.roles = r.roles.concat(role);
    await r.save();
    res.send(r);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
