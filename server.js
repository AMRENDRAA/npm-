const express = require("express");
const db = require("./db");
const app = express();

const MenuItem = require("./models/MenuItem");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Understanding Express Now ");
});
app.listen(3000, () => {
  console.log("Server is running on 3000");
});
app.get("/chicken", (req, res) => {
  res.send("second ");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/menuRoutes");

app.use("/menu", menuItemRoutes);
