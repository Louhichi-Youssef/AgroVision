require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');

const buildMongoUri = () => {
    if (process.env.MONGO_URI) return process.env.MONGO_URI;

    const { MONGO_USER, MONGO_PASSWORD, MONGO_HOSTS, MONGO_REPLICA_SET, MONGO_DB } = process.env;
    if (!MONGO_USER || !MONGO_PASSWORD || !MONGO_HOSTS || !MONGO_REPLICA_SET || !MONGO_DB) {
        return 'mongodb://localhost:27017/agrovision';
    }

    const user = encodeURIComponent(MONGO_USER);
    const pass = encodeURIComponent(MONGO_PASSWORD);
    return `mongodb://${user}:${pass}@${MONGO_HOSTS}/${MONGO_DB}?ssl=true&replicaSet=${MONGO_REPLICA_SET}&authSource=admin&retryWrites=true&w=majority`;
};

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/weather', weatherRoutes);

// Handle unhandled promise rejections (like MongoDB SRV issues)
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Database Connection with retry logic and longer timeout for slower networks
const connectDB = async () => {
    try {
        await mongoose.connect(buildMongoUri(), {
            serverSelectionTimeoutMS: 10000, // 10s instead of 30s to fail faster and use offline mode
        });
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('⚠️ Running in offline-first mode (some features may be limited)');
    }
};

connectDB();

// Basic Route
app.get('/', (req, res) => {
    res.send('AgroVision API is running...');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
