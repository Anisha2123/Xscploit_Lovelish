
const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  purchasedModules: { type: [Number], default: [] },
  fullCoursePurchased: { type: Boolean, default: false }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
