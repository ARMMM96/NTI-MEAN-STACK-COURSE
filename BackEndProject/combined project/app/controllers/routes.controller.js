const Myroutes = require("../../database/models/allRoutes.model");

class Routes {
  static add = async (req, res) => {
    try {
      let routes = new Myroutes(req.body);
      await routes.save();
      res.send(routes);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static all = async (req, res) => {
    try {
      let data = await Myroutes.find();
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  };

  static addRole = async (req, res) => {
    try {
      _id = req.params.id;
      role = req.body.role;
      let r = await Myroutes.findById(_id);
      r.roles = r.roles.concat(role);
      await r.save();
      res.send(r);
    } catch (e) {
      res.send(e.message);
    }
  };
}

module.exports = Routes;
