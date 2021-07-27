const mongoose = require("mongoose");

const routesSchema = new mongoose.Schema({
  url_name: { type: String, uniqe: true, required: true, trim: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Myroles" }],
});

const Myroutes = mongoose.model("Myroutes", routesSchema);

module.exports = Myroutes;
