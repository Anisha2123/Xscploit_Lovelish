// import express from "express";
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// import { connectDB  } from "./config.js/db.js";
const { connectDB } = require("./config.js/db.js");
const authRoutes = require("./routes/authRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const paymentRoutes = require("./routes/payment.js");
const userRoutes = require("./routes/userRoutes.js");
const Payment = require("./models/Payment.js");
const Purchase = require("./models/Purchase.js");
const router = express.Router();
const Course = require("./models/Course.js");
const User = require("./models/User.js");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());







app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/pay", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", require("./routes/contactRoutes.js"));


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
