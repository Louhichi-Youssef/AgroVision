const mongoose = require('mongoose');

const sellerRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    phone: { type: String, required: true },
    productType: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    stock: { type: Number, default: 1 },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    productImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SellerRequest', sellerRequestSchema);
