const Myroles = require("../../database/models/roles.model");

class Roles {
  static add = async (req, res) => {
    try {
      let role = new Myroles(req.body);
      await role.save();
      res.send(role);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static all = async (req, res) => {
    try {
      let data = await Myroles.find();
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  };
}

module.exports = Roles;
