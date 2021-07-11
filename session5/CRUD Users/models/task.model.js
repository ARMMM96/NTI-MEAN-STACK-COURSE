const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  title: {
    type: String,
    trim: true,
    lowerCase: true,
    unique: true,
    required: [true, "Must have a title"],
  },
  content: {
    type: String,
    lowerCase: true,
    required: true,
  },
  description: {
    type: String,
  },
});
module.exports = Task;
