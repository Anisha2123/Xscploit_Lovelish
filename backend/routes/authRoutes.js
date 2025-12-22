
import { Router } from "express";

// const { signup, login } = require("../controllers/authController.js");
import authController from "../controllers.js/authController.js";
import Otp from "../models/Otp.js";
const { signup, login, sendOtp} = authController ;
// import 
// import { sendOtpEmail } from "../utils/brevoMailer.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtp)

// SEND OTP
// router.post("/send-otp", async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ error: "EMAIL_REQUIRED" });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   await Otp.deleteMany({ email });

//   await Otp.create({
//     email,
//     otp,
//     expiresAt: new Date(Date.now() + 5 * 60 * 1000),
//   });

//   await sendOtpEmail(email, otp);

//   res.json({ message: "OTP_SENT" });
// });

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    console.log(`verify-otp hit`)
    const { email, otp } = req.body;
    const now = new Date();

    const record = await Otp.findOne({ email });

    /* ❌ NO OTP REQUESTED */
    if (!record) {
      return res.status(400).json({ error: "OTP_NOT_FOUND" });
    }

    /* 🔒 ACCOUNT LOCKED */
    if (record.lockedUntil && record.lockedUntil > now) {
      return res.status(423).json({
        error: "OTP_LOCKED",
        retryAfter: Math.ceil(
          (record.lockedUntil.getTime() - now.getTime()) / 1000
        ),
      });
    }

    /* ⌛ OTP EXPIRED */
    if (record.expiresAt < now) {
      return res.status(400).json({ error: "OTP_EXPIRED" });
    }

    /* ❌ WRONG OTP */
    if (record.otp !== otp) {
      record.attempts += 1;

      /* 🔥 LOCK AFTER 5 ATTEMPTS */
      if (record.attempts >= 5) {
        record.lockedUntil = new Date(now.getTime() + 15 * 60 * 1000); // 15 min
      }

      await record.save();

      return res.status(401).json({
        error: record.attempts >= 5 ? "OTP_LOCKED" : "INVALID_OTP",
        attemptsLeft: Math.max(0, 5 - record.attempts),
      });
    }

    /* ✅ SUCCESS */
    await Otp.deleteOne({ email });

    return res.json({ success: true, message: "OTP_VERIFIED" });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return res.status(500).json({ error: "VERIFY_OTP_FAILED" });
  }
});




export default router;
