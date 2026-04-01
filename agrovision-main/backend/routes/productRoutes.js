const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed products (one-time or for testing)
router.post('/seed', async (req, res) => {
    const initialProducts = [
        {
            name: "Engrais Bio NPK 10-10-10",
            category: "Fertilisants",
            price: "45.00 DT",
            image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=800&auto=format&fit=crop",
            tag: "Premium",
            desc: "Fertilisant organique haute performance pour toutes cultures.",
            isOffer: true,
            discount: "15%"
        },
        {
            name: "Graines de Tomate Hybride",
            category: "Semences",
            price: "12.50 DT",
            image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800&auto=format&fit=crop",
            tag: "Bestseller",
            desc: "Semences résistantes aux maladies avec haut rendement.",
            isOffer: false
        },
        {
            name: "Capteur d'Humidité Intelligent",
            category: "Technologie",
            price: "180.00 DT",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
            tag: "High-Tech",
            desc: "Analyse en temps réel de l'humidité du sol via application.",
            isOffer: true,
            discount: "10%"
        },
        {
            name: "Sécateur Ergonomique Pro",
            category: "Outils",
            price: "35.00 DT",
            image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=800&auto=format&fit=crop",
            tag: "Indispensable",
            desc: "Outil de coupe en acier trempé pour une précision maximale.",
            isOffer: false
        },
        {
            name: "Système d'Irrigation Solaire",
            category: "Technologie",
            price: "1250.00 DT",
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop",
            tag: "Éco-responsable",
            desc: "Kit complet d'irrigation alimenté par énergie solaire.",
            isOffer: true,
            discount: "20%"
        },
        {
            name: "Bio-Pesticide Neem Oil",
            category: "Protection",
            price: "28.00 DT",
            image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?q=80&w=800&auto=format&fit=crop",
            tag: "Naturel",
            desc: "Protection naturelle contre les insectes et parasites.",
            isOffer: false
        }
    ];

    try {
        await Product.deleteMany(); // Clear existing
        const products = await Product.insertMany(initialProducts);
        res.status(201).json(products);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
