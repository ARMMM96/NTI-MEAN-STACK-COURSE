const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password") || user.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else return next();
});

userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) return cb(err);
    else return cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
