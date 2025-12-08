
const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
    userId: String,
  courseId: String,
  moduleIndex: Number,     // null if full course
  amount: Number,
  paymentId: String,
  orderId: String,
  status: String,
});

module.exports = mongoose.model("Purchase", purchaseSchema);
