const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
    lowerCase: true,
    unique: true,
    required: [true, "must have a name"],
  },
  email: {
    type: String,
    trim: true,
    lowerCase: true,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("invalid email");
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    enum: ["male", "female"],
  },
});

module.exports = User;
