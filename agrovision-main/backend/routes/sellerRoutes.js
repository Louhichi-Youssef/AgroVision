const express = require('express');
const router = express.Router();
const SellerRequest = require('../models/SellerRequest');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Submit seller request with product image
router.post('/request', upload.single('productImage'), async (req, res) => {
    try {
        const { userId, companyName, phone, productType, description, price, stock } = req.body;
        const productImage = req.file ? `/uploads/${req.file.filename}` : '';

        const request = new SellerRequest({
            user: userId,
            companyName,
            phone,
            productType,
            description,
            price,
            stock,
            productImage // We need to add this to the model
        });

        await request.save();
        res.status(201).json({ message: 'Request submitted successfully', request });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all requests (admin use case)
router.get('/requests', async (req, res) => {
    try {
        const requests = await SellerRequest.find().populate('user', 'fullName email');
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve seller request
const Product = require('../models/Product');
router.post('/approve/:id', async (req, res) => {
    try {
        const request = await SellerRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Create new product from request
        const newProduct = new Product({
            name: `${request.productType} by ${request.companyName}`, // Default name format
            category: request.productType,
            price: `${request.price} DT`,
            image: `http://localhost:5000${request.productImage}`,
            tag: "Nouveau",
            desc: request.description,
            stock: request.stock,
            isOffer: false
        });

        await newProduct.save();

        // Mark request as approved
        request.status = 'approved';
        await request.save();

        res.json({ message: 'Request approved and product created', product: newProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reject seller request
router.post('/reject/:id', async (req, res) => {
    try {
        const request = await SellerRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = 'rejected';
        await request.save();

        res.json({ message: 'Request rejected' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
