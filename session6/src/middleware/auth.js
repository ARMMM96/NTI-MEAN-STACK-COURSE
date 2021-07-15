const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const auth = async (req, res, next) => {
  // get token from header
  // verify token => _id, token
  // search user has token, _id
  // authorized, data

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const myDecodedToken = jwt.verify(token, process.env.JWTKEY);
    const user = await User.findOne({
      _id: myDecodedToken._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.send({ msg: "unauth" });
  }
};

module.exports = auth;
