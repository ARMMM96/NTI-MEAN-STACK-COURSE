const conOptions = { useCreateIndex:true, useFindAndModify:true, useUnifiedTopology:true, useNewUrlParser:true}
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODBURL, conOptions)