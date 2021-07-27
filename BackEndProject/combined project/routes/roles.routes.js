const express = require("express");
const router = new express.Router();
const Myroles = require("../database/models/roles.model");
const rolesController = require("../app/controllers/roles.controller");

router.post("/add", rolesController.add);

router.get("/all", rolesController.all);

module.exports = router;
