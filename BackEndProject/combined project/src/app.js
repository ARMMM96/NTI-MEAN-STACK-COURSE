const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("../database/connection");
const userRoutes = require("../routes/user.routes");
const taskRoutes = require("../routes/task.routes");
const roleRoutes = require("../routes/roles.routes");
const myRoutes = require("../routes/routes.routes");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/role", roleRoutes);
app.use("/routes", myRoutes);

module.exports = app;
