// import express from "express";
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// import { connectDB  } from "./config.js/db.js";
const { connectDB } = require("./config.js/db.js");
const authRoutes = require("./routes/authRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const paymentRoutes = require("./routes/payment.js");
const Payment = require("./models/Payment.js");
const Purchase = require("./models/Purchase.js");
const router = express.Router();
const Course = require("./models/Course.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());



function verifyRazorpaySig(req, res, buf) {
  const expectedSig = crypto
    .createHmac("sha256", process.env.RZP_WEBHOOK_SECRET)
    .update(buf)
    .digest("hex");

  const receivedSig = req.headers["x-razorpay-signature"];

  if (expectedSig !== receivedSig) {
    throw new Error("Invalid Razorpay Signature");
  }
}

app.post("/pay/webhook", express.json({ verify: verifyRazorpaySig }), async (req, res) => {
  const event = req.body.event;
  console.log("WEBHOOK HIT:", event);

  if (event === "payment_link.paid") {
    const link = req.body.payload.payment_link.entity;
    const payment = req.body.payload.payment.entity;

    const { userId, courseId, moduleIndex, paymentType } = link.notes;
 
    // 🔥 1) Update / Insert Payment Entry
    await Payment.findOneAndUpdate(
      { paymentLinkId: link.id },
      {
        userId,
        courseSlug: courseId,
        moduleIndex: paymentType === "MODULE" ? Number(moduleIndex) : null,
        paymentId: payment.id,
        paymentType,
        status: "paid"
      },
      { upsert: true }
    );

     // 2️⃣ Update purchase logic
      if (paymentType === "MODULE") {
        await Purchase.findOneAndUpdate(
          { userId, courseId },
          {
            $addToSet: { modulesUnlocked: Number(moduleIndex) },
            status: "partial"
          },
          { upsert: true }
        );

        console.log("✅ Module unlocked:", moduleIndex);
      }

      if (paymentType === "FULL") {

        const course = await Course.findOne({ slug: courseId });

  const allModuleIndexes = course.modules.map((_, idx) => idx);

        await Purchase.findOneAndUpdate(
          { userId, courseId },
          {
            fullCoursePurchased: true,
            modulesUnlocked: allModuleIndexes,
            status: "paid"
          },
          { upsert: true }
        );

        console.log("🎉 Full course unlocked");
      }
    }

  res.json({ status: "ok" });
});


app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/pay", paymentRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
