const mongoose = require("mongoose");

//Define the mongodb connection URL

const mongoURI = "mongodb://localhost:27017/hotels";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
