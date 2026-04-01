const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders (Admin only)
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'fullName email')
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
