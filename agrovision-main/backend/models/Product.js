const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true }, // Keeping as string to match existing DT format
    image: { type: String, required: true },
    tag: { type: String, required: true },
    desc: { type: String, required: true },
    isOffer: { type: Boolean, default: false },
    discount: { type: String },
    stock: { type: Number, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
