const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userScaemah = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  birthDate: {
    type: Date,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    // match:
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.isEmail(value)) throw Error("invalid email");
    },
  },
  userStatus: { type: Boolean, default: false },
  image: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  addresses: [
    {
      adress: {
        addrType: { type: String },
        addDetails: { type: String },
      },
    },
  ],
  otp: {
    type: String,
    default: Date.now(),
  },
  userStatus: {
    type: Boolean,
    default: false,
  },
  //   role: {},
  tokens: [
    {
      token: { type: String },
    },
  ],
});

// hide some data
userScaemah.methods.toJSON = function () {
  const user = this.toObject();
  deleteElements = ["password"];
  deleteElements.forEach((element) => {
    delete user[element];
  });
  return user;
};

// bcrypt password
userScaemah.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.SALT)
    );
  }
});

// login
userScaemah.statics.findByCreditionals = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("invalid email");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("invalid password");

  const isActivated = user.userStatus;
  if (!isActivated) throw new Error("Please Activate your account");

  return user;
};

// generate token
userScaemah.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// relation

// cascade relations

const User = mongoose.model("User", userScaemah);
module.exports = User;
