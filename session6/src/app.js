require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
app.use(express.json());
const userRoutes = require("./routes/user.routes");
app.use(userRoutes);

module.exports = app;
