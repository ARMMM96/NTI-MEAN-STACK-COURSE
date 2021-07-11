const express = require("express");
const app = express();
require("../db/connection");
const userRoute = require("../routes/user.route");
const taskRoute = require("../routes/task.route");

app.use(express.json());
app.use(userRoute);

app.use(taskRoute);

module.exports = app;
