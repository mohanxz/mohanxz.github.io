// orderStorage.js
const express = require('express');
const router = express.Router();
const { database, ref, push, set } = require('./firebase');

router.post('/store-order', async (req, res) => {
  try {
    const { orderData, paymentDetails } = req.body;
    
    // Validate required fields
    if (!orderData || !paymentDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create order object
    const order = {
      id: paymentDetails.razorpay_order_id,
      paymentId: paymentDetails.razorpay_payment_id,
      amount: orderData.amount / 100, // Convert from paise to rupees
      currency: orderData.currency,
      status: 'completed',
      createdAt: new Date().toISOString(),
      customer: orderData.buyer,
      items: orderData.items,
      shippingAddress: orderData.buyer.address
    };

    // Push to Firebase
    const ordersRef = ref(database, 'orders');
    const newOrderRef = push(ordersRef);
    await set(newOrderRef, order);

    res.status(200).json({ 
      success: true,
      orderId: order.id,
      firebaseId: newOrderRef.key
    });
  } catch (error) {
    console.error('Error storing order:', error);
    res.status(500).json({ error: 'Failed to store order' });
  }
});

module.exports = router;