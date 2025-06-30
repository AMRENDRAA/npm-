const express = require("express");
const db = require("./db");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const MenuItem = require("./models/MenuItem");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Understanding Express Now ");
});

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to ${req.orginalUrl}`
  );
  next();
};

app.listen(PORT, () => {
  console.log("Server is running on 3000");
});
app.get("/chicken", (req, res) => {
  res.send("second ");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/menuRoutes");

app.use("/menu", menuItemRoutes);
