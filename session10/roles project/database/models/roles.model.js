const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  roleTitle: { type: String, unique: true, required: true, trim: true },
});

const Myroles = mongoose.model("Myroles", rolesSchema);

module.exports = Myroles;
