const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/G8G8", {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
