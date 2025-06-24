const mongoose = require("mongoose");

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
});
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
