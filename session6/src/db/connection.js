const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGODBURL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.log(e);
}
