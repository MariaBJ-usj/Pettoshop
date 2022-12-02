const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  username: {
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
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;