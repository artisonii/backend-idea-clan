const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: { type: String, Required: true },
  email: {
    type: String,
    Required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },

  password: { type: String, Required: true },
  role: {
    type: String,
    Required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
