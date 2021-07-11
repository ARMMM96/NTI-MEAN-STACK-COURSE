const { MongoClient } = require("mongodb");
const dbUrl = "mongodb://127.0.0.1:27017";
dbName = "G8DB";

MongoClient.connect(dbUrl, {}, (error, client) => {
  if (error) return console.log(error);
  const myDb = client.db(dbName);

  //   myDb
  //     .collection("test")
  //     .insertMany([{ name: "marwa", age: 36 }])
  //     .then(() => console.log("inserted"))
  //     .catch((e) => console.log(e));

  //   myDb
  //     .collection("test")
  //     .find()
  //     .toArray((err, data) => {
  //       if (err) return console.log(err);
  //       console.log(data);
  //     });

  myDb.collection("test").findOne({ name: "marwa" }, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
  });
});
