const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Myroles",
    default: "60fc84e39cd5a91964ebd7d9",
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
