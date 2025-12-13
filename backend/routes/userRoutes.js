const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Payment = require("../models/Payment");

// Get user profile info
router.get("/:userId", async (req, res) => {
    console.log(`profile userid hit`);
    console.log(req.body)
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's purchased courses
router.get("/:userId/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.params.userId });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's payments
router.get("/:userId/payments", async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
