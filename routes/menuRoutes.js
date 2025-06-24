const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu is found");

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      error: err,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const savedmenu = await MenuItem.create(data);

    console.log("Saved ");

    res.status(200).json({
      status: "sucess",
      data: savedmenu,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
});
module.exports = router;
