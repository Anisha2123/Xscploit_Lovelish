
import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  email: String,
  otp: String,
  expiresAt: Date,
  resendAfter: Date,
  attempts: { type: Number, default: 0 },

  lockedUntil: { type: Date, default: null },
});

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model("Otp", OtpSchema);
