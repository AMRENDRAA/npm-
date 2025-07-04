const mongoose = require("mongoose");

//Define the mongodb connection URL
require("dotenv").config();
const mongoURI = process.env.MONGODB_URL;
// const mongoURI = process.env.MONGODB_LOCAL_URL;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to server");
});
db.on("error", (err) => {
  console.log("error", err);
});
db.on("disconnected", () => {
  console.log("Disconnected ");
});

// export

module.exports = db;
