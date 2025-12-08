
const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  userId: String,
  email: String,
  courseName: String,
  courseSlug: String,
  moduleIndex: Number,
  amount: Number,
  paymentId: String,
  method: String,
  status: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
