
import User from "../models/User.js";
import { hash, compare } from "bcryptjs";
import pkg from 'jsonwebtoken';        
const { sign } = pkg;
import Otp from "../models/Otp.js";

import nodemailer from "nodemailer"
// const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



import superagent from "superagent";

export const sendOtp = async (req, res) => {
  console.log(`send otp hit`)
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "EMAIL_REQUIRED" });
    }

    const now = new Date();

    const existingOtp = await Otp.findOne({ email });

    /* 🔒 ACCOUNT LOCKED */
    if (existingOtp?.lockedUntil && existingOtp.lockedUntil > now) {
      return res.status(423).json({
        error: "OTP_LOCKED",
        retryAfter: Math.ceil(
          (existingOtp.lockedUntil.getTime() - now.getTime()) / 1000
        ),
      });
    }

    /* ⏳ RESEND COOLDOWN */
    if (existingOtp?.resendAfter && existingOtp.resendAfter > now) {
      return res.status(429).json({
        error: "RESEND_TOO_SOON",
        retryAfter: Math.ceil(
          (existingOtp.resendAfter.getTime() - now.getTime()) / 1000
        ),
      });
    }

    /* 🔐 GENERATE OTP */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
      { email },
      {
        otp,
        attempts: 0,
        lockedUntil: null,
        expiresAt: new Date(now.getTime() + 5 * 60 * 1000), // 5 min
        resendAfter: new Date(now.getTime() + 60 * 1000),  // 60 sec
      },
      { upsert: true, new: true }
    );

    /* 📧 SEND VIA BREVO */
    await superagent
      .post("https://api.brevo.com/v3/smtp/email")
      .set("api-key", process.env.BREVO_API_KEY)
      .set("accept", "application/json")
      .set("content-type", "application/json")
      .send({
        sender: {
          name: "Xsploit Security",
          email: process.env.SENDER_EMAIL, // MUST be verified
        },
        to: [{ email }],
        subject: "Your OTP Verification Code",
        htmlContent: `
          <div style="font-family:Arial;line-height:1.6">
            <h2>OTP Verification</h2>
            <p>Your one-time password is:</p>
            <h1>${otp}</h1>
            <p>This OTP is valid for <b>5 minutes</b>.</p>
            <p style="color:#888">Do not share this code.</p>
          </div>
        `,
      });

    return res.json({ success: true });

  } catch (err) {
    console.error("BREVO FULL ERROR:", err.response?.text || err.message);
    return res.status(500).json({ error: "OTP_FAILED" });
  }
};


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
     console.log(`sign rout hit `);
     console.log(req.body);
    // 1. Validate missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL_FORMAT" });
    }


    // 3. Validate password strength
    // At least 8 chars, 1 letter, 1 number
    const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
     console.log(`sign rout hit `);
     console.log(req.body);
    // 1. Validate missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL_FORMAT" });
    }


    // 3. Validate password strength
    // At least 8 chars, 1 letter, 1 number
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passRegex.test(password)) {
      return res.status(400).json({ error: "WEAK_PASSWORD" });
    }

    // 4. Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ error: "USER_EXISTS" });
    }

    // 5. Hash password
    const hashedPassword = await hash(password, 10);

    // 6. Auto-generate unique userId (like professional SaaS platforms)
    const userId = "USR-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // 7. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userId,
      isEmailVerified: true,
      authProvider: "email",
    });

    // 8. Respond
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      userId: newUser.userId,
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};

    // 4. Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ error: "USER_EXISTS" });
    }

    // 5. Hash password
    const hashedPassword = await hash(password, 10);

    // 6. Auto-generate unique userId (like professional SaaS platforms)
    const userId = "USR-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // 7. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userId,
      isEmailVerified: true,
      authProvider: "email",
    });

    // 8. Respond
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      userId: newUser.userId,
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log("🔥 HIT ROUTE:", req.method, req.url);
     console.log(`email is ${email}`);

    // === Email format validation ===
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL_FORMAT" });
    }

    // === Check if user exists ===
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }

    // === Password check ===
    const isMatch = await compare(password, user.password);
    if (!isMatch) { 
      return res.status(400).json({ error: "WRONG_PASSWORD" });
    }

    // === JWT Token ===
    const token = sign(
      { id: user._id, userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      userId: user.userId,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
};


export default { signup, login, sendOtp };