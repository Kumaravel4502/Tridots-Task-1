const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["Vegetables", "Fruits & Nuts", "Dairy & creams", "Packages Food", "Staples"],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
