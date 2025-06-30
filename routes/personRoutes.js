const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
router.get("", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched ");
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const workType = req.params.worktype;

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response fetched ");
      res.status(200).json({
        status: "Success",
        data: response,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Invalid work type",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // person document model

    const newPerson = new Person(data);

    const savedPerson = await newPerson.save();
    console.log("data saved ");
    res.status(200).json({
      status: "sucess",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL Parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({
        error: "person not found",
      });
    }
    console.log("Data updated ");
    res.status(200).json({
      data: response,
    });
  } catch (err) {
    console.log("erorr");
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("deleted successfully");
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

module.exports = router;
