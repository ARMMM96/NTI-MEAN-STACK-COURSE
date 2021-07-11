const userModel = require("../models/user.model");

add = async (req, res) => {
  try {
    const userData = new userModel(req.body);
    await userData.save();
    res.status(200).send({
      apiStatus: true,
      message: "data inserted",
      data: userData,
    });
  } catch (e) {
    res.status(200).send({
      apiStatus: false,
      message: "error inserting data",
    });
  }
};

allUsers = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
      data: data,
      count: data.length,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};

singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findById(id);

    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "user not found",
        data: null,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};

deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findByIdAndDelete(id);

    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "user not found",
        data: null,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};
editUser = async (req, res) => {
  // name // password
  const myAllowedUpdates = ["name", "password"];
  const updates = Object.keys(req.body);
  isValid = updates.every((up) => myAllowedUpdates.includes(up));
  if (!isValid) res.status(500).send("not avalible");
  try {
    const user = await userModel.findByIdAndUpdate(req.param.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!user) res.send("Not exist");
    res.send("Updated");
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};

module.exports = {
  add,
  allUsers,
  singleUser,
  deleteUser,
  editUser,
};
