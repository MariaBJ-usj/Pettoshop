const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  item_id: {
    type: Number
  },
  uder_id: {
    type: Number
  },
  quantity: {
    type: Number
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;