const express = require("express");
const app = express();
require("../db/connection");
const studentRoute = require("../routes/student.route");

app.use(express.json());
app.use(studentRoute);

module.exports = app;
