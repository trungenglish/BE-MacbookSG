const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        priceAfterDiscount: {
            type: Number,
            require: true,
            min: 0,
        },
        imgUrls: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
        },
        idCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    }, { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
