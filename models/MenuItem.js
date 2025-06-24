const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
  menuItem: {
    type: String,

    unique: true,
    required: true,
  },
  price: Number,
  is_drink: {
    type: Boolean,
    default: false,
  },
  taste: {
    type: String,
    enum: ["Sweet", "spicy", "sour"],
  },
});

const menuItem = mongoose.model("menuItem", menuSchema);
//comment added

module.exports = menuItem;
