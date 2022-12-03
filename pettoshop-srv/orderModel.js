const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  quantity: {
    type: Number
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;