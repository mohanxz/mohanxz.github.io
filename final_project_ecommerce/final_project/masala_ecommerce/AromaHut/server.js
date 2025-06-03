require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const Order = require('./models/Order'); // Import the Order model

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// 🔐 Enable CORS for frontend domain
app.use(cors({
  origin: "https://mohanxz.github.io"
}));

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'your-mongo-uri-here';

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// ✅ Razorpay setup with env vars
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_123",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "your_key_secret"
});

// 🔁 For debug/demo: Returns total amount
app.post("/api/total", (req, res) => {
  const { totalAmount } = req.body;
  console.log("Received totalAmount:", totalAmount);
  res.json({ message: "Total amount received", totalAmount });
});

// 🛒 Create Razorpay Order
app.post("/create-order", (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const options = {
    amount: parseInt(amount),
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error("Razorpay Order Error:", err);
      return res.status(500).json({ error: "Failed to create order" });
    }
    res.json(order);
  });
});

// ✅ Payment verification route
app.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id, razorpay_payment_id, razorpay_signature,
    buyerName, buyerEmail, buyerPhone, buyerAddress,
    productName, productQuantity, productPrice
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature ||
      !buyerName || !buyerEmail || !buyerPhone || !buyerAddress ||
      !productName || !productQuantity || !productPrice) {
    return res.status(400).json({ status: "failed", error: "Missing required fields" });
  }

  const hmac = crypto.createHmac("sha256", razorpay.key_secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      const [address, town, postalCode] = buyerAddress.split(", ");
      const order = new Order({
        buyerName, buyerEmail, buyerPhone,
        buyerAddress: address, buyerTown: town, buyerPostalCode: postalCode,
        productName, productPrice, productQuantity,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id
      });

      await order.save();
      await sendOrderEmail(order);

      res.json({ status: "success", message: "Payment verified & order saved!" });
    } catch (error) {
      console.error("MongoDB Save Error:", error);
      res.status(500).json({ status: "failed", error: "Database error" });
    }
  } else {
    res.status(400).json({ status: "failed", message: "Payment verification failed" });
  }
});

// 📧 Send order confirmation email
async function sendOrderEmail(order) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "prasannavenkatesh652@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password"
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "prasannavenkatesh652@gmail.com",
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

// 🚀 Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
