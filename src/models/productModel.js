const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: {
            type: String,
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
        images: {
            type: [String],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        idProductDetail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductDetail',
        },
    }, { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
