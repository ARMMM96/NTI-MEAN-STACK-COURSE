// userId , type=> txt, meeting, ..., content, image, video, likes, comments =>{details, time},status, timestamps
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    taskTitle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    taskType: {
      type: String,
      enum: ["meeting", "task", "online meeting"],
      required: true,
    },
    taskDetails: {
      content: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },
      video: {
        type: String,
        default: "",
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        comment: {
          details: {
            type: String,
          },
          createdAt: {
            type: Date,
            default: new Date(),
          },
        },
      },
    ],
    deadLine: {
      type: Date,
    },
    pirority: {
      type: String,
      enum: ["A", "B", "C", "D"],
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
