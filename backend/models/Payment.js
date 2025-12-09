
const mongoose = require("mongoose");
// const { default: paymentLink } = require("razorpay/dist/types/paymentLink");
const paymentSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Payment", paymentSchema);
