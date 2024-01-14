const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const cors = require("cors");

router.use(cors());

router.post("/payments", async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate the amount (you may want to add more validation based on your requirements)
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, error: "Invalid amount" });
    }

    const instance = new Razorpay({
      key_id: "rzp_test_s43txngfMkfE7D",
      key_secret: "mMPlpfCyt71uW1cf7xHCeQY0",
    });

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
    });

    res.status(201).json({
      success: true,
      order,
      amount,
    });
  } catch (error) {
    console.error("Error in /payments route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
