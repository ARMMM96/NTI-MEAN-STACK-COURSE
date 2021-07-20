const Task = require("../../database/models/task.model");
class TaskClass {
  static add = async (req, res) => {
    try {
      const taskToAdd = new Task({
        userId: req.user._id,
        ...req.body,
      });
      await taskToAdd.save();
      res.send({
        apiStatus: true,
        data: taskToAdd,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e.message,
      });
    }
  };
  static comment = async (req, res, next) => {
    try {
      const findTask = await Task.findOne({ taskTitle: req.body.taskTitle });
      if (!findTask) throw new Error("task not found");
      const newComment = req.body.comment;
      console.log(findTask.comments);
      console.log(newComment);
      findTask.comments.push({
        comment: {
          details: newComment,
        },
      });
      await findTask.save();
      res.send({
        apiStatus: true,
        data: findTask.comments,
      });
      next();
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e.message,
      });
    }
  };
  static getMyTasks = async (req, res) => {
    try {
      await req.user
        .populate({
          path: "userTasks",
        })
        .execPopulate();
      res.status(200).send({
        data: { user: req.user, tasks: req.user.userTasks },
      });
    } catch (e) {
      res.status(500).send({
        data: e.message,
      });
    }
  };
}
module.exports = TaskClass;
