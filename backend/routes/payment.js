const express = require("express");
const Stripe = require("stripe");
const Purchase = require("../models/Purchase.js");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Pay for a single module
router.post("/module-pay", async (req, res) => {
  const { courseId, moduleIndex, userId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const module = course.modules[moduleIndex];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: module.title },
          unit_amount: module.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/course/${courseId}?success=1`,
    cancel_url: `http://localhost:5173/course/${courseId}?cancel=1`,
  });

  res.json({ url: session.url });
});

// Full course pay
router.post("/course-pay", async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: `${course.name} - FULL COURSE` },
          unit_amount: course.fullCoursePrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/course/${courseId}?full=1`,
    cancel_url: `http://localhost:5173/course/${courseId}?cancel=1`,
  });

  res.json({ url: session.url });
});

router.post("/confirm-purchase", async (req, res) => {
  try {
    const { userId, module, full } = req.body;

    let purchase = await Purchase.findOne({ userId });

    if (!purchase) {
      purchase = await Purchase.create({ userId });
    }

    if (full) {
      purchase.fullCoursePurchased = true;
      purchase.purchasedModules = [...Array(20).keys()].map(i => i + 1);
    } else {
      purchase.purchasedModules.push(Number(module));
    }

    await purchase.save();

    res.json({ message: "Purchase recorded" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/purchase/:userId", async (req, res) => {
  const purchase = await Purchase.findOne({ userId: req.params.userId });

  res.json(purchase || { purchasedModules: [], fullCoursePurchased: false });
});


module.exports = router;