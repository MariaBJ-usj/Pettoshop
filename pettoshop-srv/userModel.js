const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String
  },
  password: {
    type: mongoose.Schema.Types.String
  },
  firstname: {
    type: mongoose.Schema.Types.String
  },
  lastname: {
    type: mongoose.Schema.Types.String
  },
  address: {
    type: mongoose.Schema.Types.String
  },
  city: {
    type: mongoose.Schema.Types.String
  },
  country: {
    type: mongoose.Schema.Types.String
  },
  postalcode: {
    type: mongoose.Schema.Types.String
  },
  phone: {
    type: mongoose.Schema.Types.String
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;