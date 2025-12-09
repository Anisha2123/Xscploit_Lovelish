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

    const userId = link.notes.userId;
    const courseId = link.notes.courseId;
    const moduleIndex = Number(link.notes.moduleIndex);

    // 🔥 1) Update / Insert Payment Entry
    await Payment.findOneAndUpdate(
      { paymentLinkId: link.id },
      {
        userId,
        courseSlug: courseId,
        moduleIndex: link.notes.moduleIndex,  // <-- JUST A NUMBER
        paymentId: payment.id,
        status: "paid"
      },
      { upsert: true }
    );

    // 🔥 2) Update Purchase — This is what UI depends on
    await Purchase.findOneAndUpdate(
      { userId, courseId },
      {
        $addToSet: { moduleIndex: link.notes.moduleIndex },  // <-- ARRAY update
        status: "paid",
        paymentId: payment.id
      },
      { upsert: true }
    );

    console.log("🎉 Purchase updated for UI unlock → module:", moduleIndex);
  }

  res.json({ status: "ok" });
});


app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/pay", paymentRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
