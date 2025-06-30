require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();

const passport = require("./auth");

const personRoutes = require("./routes/personRoutes");
// const Person = require("./models/person");
const menuItemRoutes = require("./routes/menuRoutes");
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to ${req.originalUrl}`
  );
  next();
};

const MenuItem = require("./models/MenuItem");
app.use(express.json());

app.use(logRequest);

app.use(passport.initialize());
const passportverify = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Understanding Express Now ");
});

app.listen(PORT, () => {
  console.log("Server is running on 3000");
});
app.get("/chicken", (req, res) => {
  res.send("second ");
});

app.use("/person", personRoutes);

app.use("/menu", passportverify, menuItemRoutes);
