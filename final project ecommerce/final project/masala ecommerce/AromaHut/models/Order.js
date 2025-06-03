const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerName: String,
  buyerEmail: String,
  buyerPhone: String,
  buyerAddress: String,
  buyerTown: String,
  buyerPostalCode: String, // New field for postal code
  productName: String,
  productPrice: String,
  productQuantity: String,
  orderDate: { type: Date, default: Date.now },
  razorpayOrderId: String,
  razorpayPaymentId: String
});

module.exports = mongoose.model("Order", orderSchema);