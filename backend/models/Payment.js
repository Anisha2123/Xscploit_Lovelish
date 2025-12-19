
import { Schema, model } from "mongoose";
// const { default: paymentLink } = require("razorpay/dist/types/paymentLink");
const paymentSchema = new Schema({
  userId: String,
  email: String,
  courseName: String,
  courseSlug: String,
  moduleIndex: { type: [Number], default: [] },
  paymentLinkId: String,
  paymentId: String,
  method: String,
  status: { type: String, default: "pending" },
  timestamp: { type: Date, default: Date.now }
});

export default model("Payment", paymentSchema);
