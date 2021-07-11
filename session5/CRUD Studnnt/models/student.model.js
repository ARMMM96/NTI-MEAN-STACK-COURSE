const mongoose = require("mongoose");
const validator = require("validator");

const Student = mongoose.model("Student", {
  name: {
    type: String,
    trim: true,
    lowerCase: true,
    unique: true,
    required: [true, "Student name is required"],
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
    required: [true, "Please add a password"],
    minlength: 6,
    validate(value) {
      const isStrongPassword = validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      });
      if (!isStrongPassword) throw new Error("Please Enter a strong Password");
    },
  },
  gender: {
    type: String,
    trim: true,
    required: true,
    enum: ["male", "female"],
  },
  birthDate: {
    type: String,
    required: true,
  },
  courses: {
    type: Array,
    required: true,
  },
});

module.exports = Student;
