const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    accountStatus: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      minLength: 11,
      maxLength: 11,
    },
    country: {
      type: String,
      enum: ["egypt", "plastine", "canda", "United States"],
    },
    tokens: [
      {
        token: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  lastUser = await User.findOne({}).sort({ _id: -1 });
  const user = this;
  if (!lastUser) user.userId = 1;
  else user.userId = lastUser.userId + 1;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

userSchema.statics.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("email not found");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("invalid pass");

  return user;
};

const jwt = require("jsonwebtoken");
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTKEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
