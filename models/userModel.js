const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter a first Name"],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter a last Name"],
      lowercase: true,
    },
    telephone: {
      type: String,
      required: [true, "Please enter a phone number"],
    },
    role: {
      type: String,
      required: [true, "Please enter a role"],
    }
  },
  { timestamps: true }
  
);

module.exports = mongoose.model("User", userSchema);
