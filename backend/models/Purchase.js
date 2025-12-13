
const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  userId: String,
  courseId: String,

  modulesUnlocked: [Number],   // for partial purchases
  fullCoursePurchased: {
    type: Boolean,
    default: false
  },

  status: String,
  paymentId: String
});


module.exports = mongoose.model("Purchase", purchaseSchema);
