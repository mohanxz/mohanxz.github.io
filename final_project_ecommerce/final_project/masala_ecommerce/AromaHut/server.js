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
app.use(cors()); // Enable CORS (restrict origins in production)

const MONGO_URI = 'mongodb+srv://vr237585:2TXMJqRBKt8ukpTF@cluster123.c8r1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster123';

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

const razorpay = new Razorpay({
  key_id: "rzp_live_PJ1rolbjunHAfs", // Your actual test Key ID
  key_secret: "QZ2dI8FrB8DkkuQYWDhBCcCk", // Your actual test Key Secret
});

app.post("/api/total", (req, res) => {
  const { totalAmount } = req.body; // Extract totalAmount from request body
  console.log("Received totalAmount:", totalAmount); // Debug log

  // Respond with the received totalAmount
  res.json({ message: "Total amount received", totalAmount });
});

// Route to create an order
app.post("/create-order", (req, res) => {
  const { amount } = req.body; // Get the amount from the client request

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const options = {
    amount: parseInt(amount), // Convert to paise (Razorpay expects amount in smallest unit)
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`, // Generate unique receipt ID
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error("Razorpay Order Error:", err);
      return res.status(500).json({ error: "Failed to create order" });
    }
    res.json(order);
  });
});

// Route to verify payment
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
    productPrice  
  } = req.body;

  console.log("Request Body:", req.body); // Debug: Check what's being sent

  // Validate required fields
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || 
      !buyerName || !buyerEmail || !buyerPhone || !buyerAddress || 
      !productName || !productQuantity || !productPrice) {
    return res.status(400).json({
      status: "failed",
      error: "Missing required fields",
      missing: {
        razorpay_order_id: !razorpay_order_id,
        razorpay_payment_id: !razorpay_payment_id,
        razorpay_signature: !razorpay_signature,
        buyerName: !buyerName,
        buyerEmail: !buyerEmail,
        buyerPhone: !buyerPhone,
        buyerAddress: !buyerAddress,
        productName: !productName,
        productQuantity: !productQuantity,
        productPrice: !productPrice
      }
    });
  }

  const hmac = crypto.createHmac("sha256", razorpay.key_secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      // Parse buyerAddress (e.g., "123 Main St, Chennai, 600001")
      const addressParts = buyerAddress.split(", ");
      const address = addressParts[0]; // First part is the street address
      const town = addressParts[1]; // Second part is the town/city
      const postalCode = addressParts[2]; // Third part is the postal code

      const order = new Order({
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerAddress: address,
        buyerTown: town,
        buyerPostalCode: postalCode,
        productName,
        productPrice,
        productQuantity,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id
      });

      console.log("Order Before Save:", order); // Debug: Check the order before saving
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


// ✅ **Send Order Confirmation Email**
async function sendOrderEmail(order) {
  try {
    console.log("Order in sendOrderEmail:", order); // Debug: Check the order object
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
      text: `Thank you for your purchase!\n\nOrder Details:\nProduct: ${order.productName || "N/A"}\nQuantity: ${order.productQuantity || "N/A"}\nTotal: ₹${order.productPrice || "N/A"}\n\nShipping To:\n${order.buyerName}\n${order.buyerAddress}, ${order.buyerTown}, ${order.buyerPostalCode}`
    };

    await transporter.sendMail(mailOptions);
    console.log("📩 Order email sent!");
  } catch (error) {
    console.error("Email Sending Error:", error);
    throw error;
  }
}


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});