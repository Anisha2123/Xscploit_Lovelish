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
    }
  },
  { timestamps: true }
);

export default model("User", userSchema);
