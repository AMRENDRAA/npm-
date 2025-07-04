const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

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

  // Comment added
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

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const savedPerson = await newPerson.save();
    console.log("data saved ");

    const { password, ...userWithoutPassword } = savedPerson.toObject();
    const token = generateToken({ username: savedPerson.username });

    console.log("Token is: ", token);

    res.status(200).json({
      status: "success",
      token: token,
      data: userWithoutPassword,
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

// Login route

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username

    const user = await Person.findOne({ username: username });

    if (!user) {
      return res.status(401).json({
        error: "Invalid username or password ",
      });
    }

    //generate Token

    const Payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(Payload);

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

//profile route

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("user data ", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});
module.exports = router;
