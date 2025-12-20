// import express from "express";
import express, { Router, json } from "express";
import cors from "cors";
import { config } from "dotenv";
// import { connectDB  } from "./config.js/db.js";
// import  { connectDB }  from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/payment.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"
import Payment from "./models/Payment.js";
import Purchase from "./models/Purchase.js";
const router = Router();
import Course from "./models/Course.js";
import User from "./models/User.js";
// import auth from "./config/"
import { webhookHandler } from "./routes/payment.js";

import pkg from "./config/db.js"
const {connectDB} = pkg;
config();
connectDB();

const app = express();

/**
 * 🔥 Razorpay webhook MUST come before express.json()
 */
app.post(
  "/api/pay/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);


const allowedOrigins = [
  "https://www.xsploithack.com",
  "https://xsploithack.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow mobile apps / curl / postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// IMPORTANT: explicitly handle preflight
// app.options("/*", cors());

app.use(express.json());





// router.get("/pdf-url", auth, getPdfUrl);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Xsploit Backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/pay", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

