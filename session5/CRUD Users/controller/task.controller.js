const taskModel = require("../models/task.model");

add = async (req, res) => {
  try {
    const taskData = new taskModel(req.body);
    await taskData.save();
    res.status(200).send({
      apiStatus: true,
      message: "data inserted",
      data: taskData,
    });
  } catch (e) {
    res.status(200).send({
      apiStatus: false,
      message: "error inserting data",
      data: e,
    });
  }
};

allTasks = async (req, res) => {
  try {
    const data = await taskModel.find();
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

singleTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await taskModel.findById(id);
    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "task not found",
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

deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await taskModel.findOneAndDelete(id);
    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "task not found",
        data: null,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "task deleted",
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

editTask = async (req, res) => {
  const myAllowedUpdates = ["content", "description"];
  const updates = Object.keys(req.body);
  isValid = updates.every((up) => myAllowedUpdates.includes(up));
  if (!isValid) res.status(500).send("not avaliable");
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!task) res.send("Not exist");
    res.send("Updated");
  } catch (e) {
    res.send(e);
  }
};
module.exports = {
  add,
  allTasks,
  singleTask,
  deleteTask,
  editTask,
};
