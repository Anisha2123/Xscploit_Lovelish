import { Router, json } from "express";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";

const router = Router();
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



import { createHmac } from "crypto";
import dotenv from "dotenv";
dotenv.config(); // 👈 MUST BE FIRST
import Razorpay from "razorpay";
import Payment from "../models/Payment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import axios from "axios";
const {get} =axios ;

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
console.log("Razor:", process.env.RAZORPAY_KEY, process.env.RAZORPAY_SECRET);


// Verify Module Payment (Hosted Payment Link)
router.post("/module/verify", async (req, res) => {
  const { userId, courseId, moduleIndex, paymentId } = req.body;
  console.log("VERIFY BODY:", req.body);

  try {
    const course = await Course.findOne({slug:courseId});
    if (!course) {
      console.log(`course not found`);
    }
    const user = await User.findOne({userId});

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
console.log(`email is ${user.email}`);


    // 2. Fetch payment link details
    const response = await get(
      `https://api.razorpay.com/v1/payment_links/${paymentId}`,
      {
        auth: {
          username: process.env.RAZORPAY_KEY,
          password: process.env.RAZORPAY_SECRET,
        },
      }
    );
    console.log(`payment checking`);

    // Check if a payment exists with same amount
    const paid = response.data.status === "paid";

    if (!paid) {
      return res.json({ success: false, message: "Payment not found" });
    }
    console.log(`will start saving in db`);

    // Save in DB
    await Payment.create({
      userId,
      courseSlug: courseId,
      moduleIndex,
      paymentId,
      amount: response.data.amount / 100,
      email: response.data.customer.email,
      timestamp: new Date(),
    });

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
 
// GET user's purchased modules for a specific course


// router.get("/payments/user", async (req, res) => {
//     console.log(`paymets/user started`);
//   try {
//     const { userId, courseSlug } = req.query;

//     const purchase = await Purchase.findOne({ userId, courseId: courseSlug });

//     if (!purchase) {
//       return res.json({ unlockedModules: [] });
//     }

//     res.json({
//       unlockedModules: purchase.moduleIndex || []
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.get("/payments/user", async (req, res) => {
  console.log("payments/user started");

  try {
    const { userId, courseSlug } = req.query;

    const purchase = await Purchase.findOne({
      userId,
      courseId: courseSlug
    });

    if (!purchase) {
    return res.json({
      unlockedModules: [],
      fullCoursePurchased: false
    });
  }

    // 🔥 FULL COURSE PURCHASE → unlock everything
    if (purchase.fullCoursePurchased) {
      return res.json({
        unlockedModules: purchase.modulesUnlocked || [],
    fullCoursePurchased: purchase.fullCoursePurchased || false
      });
    }

    // 🔥 PARTIAL PURCHASE → unlock selected modules
    return res.json({
      unlockedModules: purchase.modulesUnlocked || [],
    fullCoursePurchased: purchase.fullCoursePurchased || false
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/module/create", async (req, res) => {
  try {
    const { userId, courseId, moduleIndex, price, slug } = req.body;

    console.log("✅ MODULE CREATE HIT", {
      userId,
      courseId,
      moduleIndex,
      price,
      slug,
      frontendUrl: process.env.FRONTEND_URL,
      razorKey: process.env.RAZORPAY_KEY ? "FOUND" : "MISSING",
    });

    if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
      throw new Error("Razorpay keys missing in env");
    }
    console.log("CALLBACK URL =>", `${process.env.FRONTEND_URL}/course/${slug}`);

    const paymentLink = await razor.paymentLink.create({
      amount: Number(price) * 100,
      currency: "INR",
      description: `Payment for Module ${moduleIndex + 1}`,
     
      notes: {
        userId,
        courseId,
        moduleIndex,
        paymentType: "MODULE",
      },
      
      callback_url: `${process.env.FRONTEND_URL}/course/${slug}`,
      callback_method: "get",
    });

    console.log("✅ PAYMENT LINK CREATED:", paymentLink.short_url);

    return res.json({
      success: true,
      paymentLink: paymentLink.short_url,
      paymentLinkId: paymentLink.id,
    });

  } catch (err) {
    console.error("❌ MODULE PAYMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Payment failed",
    });
  }
});


router.post("/course/create", async (req, res) => {
  console.log(`course create link started`);
  const { userId, courseId, price, slug } = req.body;
  console.log({
  userId,
  courseId,
  price,
  slug,
  amountCalculated: price * 100
});


  const paymentLink = await razor.paymentLink.create({
    amount: price * 100,
    currency: "INR",
    description: `Payment for Module  ${courseId}`,
    
    // NOTES IS VERY IMPORTANT – STORES USER & COURSE INFO
    notes: {    
      userId,
      courseId,
      paymentType: "FULL"
    },
    callback_url: `${process.env.VITE_FRONTEND_URL}/course/${slug}`,
    callback_method: "get"
  });

  res.json({
    success: true,
    paymentLink: paymentLink.short_url,   // open this in frontend
    paymentLinkId: paymentLink.id         // used in webhook confirmation
  });
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

function verifyRazorpaySig(req, res, buf) {
  const expectedSig = createHmac("sha256", process.env.RZP_WEBHOOK_SECRET)
    .update(buf)
    .digest("hex");

  const receivedSig = req.headers["x-razorpay-signature"];

  if (expectedSig !== receivedSig) {
    throw new Error("Invalid Razorpay Signature");
  }
}

router.post("/webhook", json({ verify: verifyRazorpaySig }), async (req, res) => {
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


export default router;