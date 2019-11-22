const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  account: {
    activated: {
      type: Boolean,
      default: false,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
