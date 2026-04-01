const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || 'mysecret123';

// Register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ fullName, email, password, role: role || 'user' });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
