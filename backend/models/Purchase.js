
const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
    userId: String,
  courseId: String,
  moduleIndex: { type: [Number], default: [] },
  amount: Number,
  paymentId: String,
  orderId: String,
  status: String,
});

module.exports = mongoose.model("Purchase", purchaseSchema);
