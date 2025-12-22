import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";
const userSchema = new Schema(
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
    },
    authProvider: {
    type: String,
    enum: ["email", "google", "github"],
    default: "email",
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
  },
  { timestamps: true }
);

export default model("User", userSchema);
