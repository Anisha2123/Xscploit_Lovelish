import mongoose, { Schema, model } from "mongoose";

const moduleSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 3999 },
  pdfUrl: { type: String }, // PDF shown AFTER payment
});

const courseSchema = new Schema({
  name: { type: String, required: true },
  shortDescription: String,
  modules: [moduleSchema],
    slug: { type: String, unique: true },   // ← Add this
  fullCoursePrice: { type: Number, required: true },
});  

// ✅ IMPORTANT FIX
export default mongoose.models.Courses1 || model("Courses1", courseSchema, "courses1");
