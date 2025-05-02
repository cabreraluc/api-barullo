const mongoose = require("mongoose");

mongoose.connection.on("open", () => console.log("db connected"));

async function connectDb() {
  const url = process.env.MONGO_DB_URL;
  await mongoose.connect(url, { useNewUrlParser: true });
}

module.exports = connectDb;
