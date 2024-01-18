const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    image: String,
  },
  { collection: "bye", timestamps: true }
);

const User = mongoose.model("bye", UserSchema);

module.exports = User;
