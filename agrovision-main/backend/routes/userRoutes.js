const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (Admin only)
router.get('/all', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update cart
router.post('/cart', async (req, res) => {
    try {
        const { userId, cart } = req.body; // cart should be [{ product: id, quantity: n }]
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.cart = cart;
        await user.save();
        res.json({ message: 'Cart updated', cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update favorites
router.post('/favorites', async (req, res) => {
    try {
        const { userId, favorites } = req.body; // favorites should be [id]
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.favorites = favorites;
        await user.save();
        res.json({ message: 'Favorites updated', favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user data (cart and favorites)
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('cart.product')
            .populate('favorites');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            cart: user.cart,
            favorites: user.favorites
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
