const express = require("express");
const Stripe = require("stripe");
const Purchase = require("../models/Purchase.js");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Pay for a single module
router.post("/pay/module-pay", async (req, res) => {
  try {
    const { courseId, moduleIndex, userId } = req.body;

    const course = await Course.findById(courseId);
    const module = course.modules[moduleIndex];

    const order = await razorpay.orders.create({
      amount: module.price * 100,   // ₹ → paise
      currency: "INR",
      receipt: `module_${courseId}_${moduleIndex}`,
    });

    res.json({
      orderId: order.id,
      amount: module.price * 100,
      key: process.env.RAZORPAY_KEY_ID,
      courseName: course.name,
      moduleName: module.title,
      userId,
      courseId,
      moduleIndex,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Payment creation failed" });
  }
});


// Full course pay
router.post("/pay/course-pay", async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const course = await Course.findById(courseId);

    const order = await razorpay.orders.create({
      amount: course.fullCoursePrice * 100,
      currency: "INR",
      receipt: `course_${courseId}`,
    });

    res.json({
      orderId: order.id,
      amount: course.fullCoursePrice * 100,
      key: process.env.RAZORPAY_KEY_ID,
      courseName: course.name,
      userId,
      courseId,
    });
  } catch (err) {
    res.status(500).json({ message: "Payment creation failed" });
  }
});



const crypto = require("crypto");

const Razorpay = require("razorpay");
const Payment = require("../models/Payment.js");
const Course = require("../models/Course.js");
const User = require("../models/User.js");
const axios = require("axios");

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
console.log("Razor:", process.env.RAZORPAY_KEY, process.env.RAZORPAY_SECRET);


// Verify Module Payment (Hosted Payment Link)
router.post("/module/verify", async (req, res) => {
  const { userId, courseId, moduleIndex } = req.body;
  console.log(`came to verify`);
  console.log("VERIFY BODY:", req.body);


  try {
    const course = await Course.findOne({slug:courseId});
    if (!course) {
      console.log(`course not found`);
    }
    const user = await User.findOne({userId});
    console.log(`${userId}`);
    if (!user) {
      console.log(`user not found`);
    }
    if (moduleIndex === undefined || moduleIndex === null) {
  console.log("INVALID moduleIndex →", moduleIndex);
  return res.status(400).json({ success: false, message: "Invalid module index" });
}
    const module = course.modules[moduleIndex];
     
    if (!module) {
  console.log("Module not found", moduleIndex);
  return res.status(400).json({ success: false, message: "Module not found" });
}

console.log("Module found:", moduleIndex, module);

if (!module.paymentLink) {
  console.log("No paymentLink in module:", moduleIndex, module);
  return res.status(400).json({ success: false, message: "Payment link missing" });
}

console.log("Payment link FOUND →", module.paymentLink);


    console.log(`everything found`);
    console.log(`email is ${user.email}`);
    console.log(`username is ${process.env.RAZORPAY_KEY}`)
    console.log(`password is ${process.env.RAZORPAY_SECRET}`)

     // 1. Get payment link ID from module
     console.log(`paymenlink is ${module.paymentLink}`);

    const linkUrl = module.paymentLink;              // e.g. https://rzp.io/l/abcd123
    const linkId = linkUrl.split("/").pop();         // abcd123
  
    console.log(`lnkid is ${linkId}`);
    console.log(`linkurl is ${linkUrl}`);

    // 2. Fetch payment link details
    const response = await axios.get(
      `https://api.razorpay.com/v1/payment_links/${linkId}`,
      {
        auth: {
          username: process.env.RAZORPAY_KEY,
          password: process.env.RAZORPAY_SECRET,
        },
      }
    );
    console.log(`payment checking`);

    // Check if a payment exists with same amount
    const paid = response.data.items.find(
      (p) =>
        p.status === "captured" &&
        p.amount === module.price * 100
    );

    if (!paid) {
      return res.json({ success: false, message: "Payment not found" });
    }
    console.log(`will start saving in db`);

    // Save in DB
    await Payment.create({
      userId,
      email: user.email,
      courseName: course.name,
      courseSlug: course.slug,
      moduleIndex,
      amount: module.price,
      paymentId: paid.id,
      method: paid.method,
      status: paid.status,
      timestamp: new Date(),
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
 


router.get("/purchase/:userId", async (req, res) => {
  const purchase = await Purchase.findOne({ userId: req.params.userId });

  res.json(purchase || { purchasedModules: [], fullCoursePurchased: false });
});

router.get("/courses/:courseId/module/:index/unlocked", async (req, res) => {
  const { courseId, index } = req.params;
  const userId = req.query.userId;

  const payment = await Payment.findOne({
    userId,
    courseId,
    moduleIndex: index,
    status: "PAID"
  });

  res.json({ unlocked: !!payment });
});



module.exports = router;