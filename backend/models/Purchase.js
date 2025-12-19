
import { Schema, model } from "mongoose";
const purchaseSchema = new Schema({
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


export default model("Purchase", purchaseSchema);
