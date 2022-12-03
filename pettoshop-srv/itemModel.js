const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;