require('dotenv').config();

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const options = {
    amount: parseInt(amount),
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error("Razorpay Order Error:", err);
      return res.status(500).json({ error: "Failed to create order" });
    }
    res.json(order);
  });
});

app.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    buyerName,
    buyerEmail,
    buyerPhone,
    buyerAddress,
    productName,
    productQuantity,
    productPrice,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature ||
      !buyerName || !buyerEmail || !buyerPhone || !buyerAddress ||
      !productName || !productQuantity || !productPrice) {
    return res.status(400).json({ status: "failed", error: "Missing required fields" });
  }

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      const addressParts = buyerAddress.split(", ");
      const order = new Order({
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerAddress: addressParts[0],
        buyerTown: addressParts[1],
        buyerPostalCode: addressParts[2],
        productName,
        productPrice,
        productQuantity,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      });

      await order.save();
      await sendOrderEmail(order);

      return res.json({ status: "success", message: "Payment verified & order saved!" });
    } catch (error) {
      console.error("MongoDB Save Error:", error);
      return res.status(500).json({ status: "failed", error: "Database error" });
    }
  } else {
    return res.status(400).json({ status: "failed", message: "Payment verification failed" });
  }
});

async function sendOrderEmail(order) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${order.buyerEmail}, your-email@gmail.com`,
      subject: "Order Confirmation - AromaHut",
      text: `Thank you for your purchase!\n\nOrder Details:\nProduct: ${order.productName}\nQuantity: ${order.productQuantity}\nTotal: ₹${order.productPrice}\n\nShipping To:\n${order.buyerName}\n${order.buyerAddress}, ${order.buyerTown}, ${order.buyerPostalCode}`
    };

    await transporter.sendMail(mailOptions);
    console.log("📩 Order email sent!");
  } catch (error) {
    console.error("Email Sending Error:", error);
    throw error;
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
