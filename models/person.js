const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//deFINE SCHEMA

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  Salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  //Hash the password if it has been modified (or is new )
  if (!person.isModified("password")) return next();

  try {
    // Hashpassword generate

    const salt = await bcrypt.genSalt(10);

    //Hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //override the plain password with the hashed one
    person.password = hashedPassword;

    console.log("Hashing is working ");
    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
//
