const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: () => randomUUID(),   // Unique ID for each user
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
