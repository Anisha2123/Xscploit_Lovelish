// import express from "express";
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// import { connectDB  } from "./config.js/db.js";
const { connectDB } = require("./config.js/db.js");
const authRoutes = require("./routes/authRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const paymentRoutes = require("./routes/payment.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/pay", paymentRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
