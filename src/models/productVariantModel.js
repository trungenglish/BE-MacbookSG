const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
    idPro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    storage: {
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
        default: 0,  // Để tránh yêu cầu giá trị mặc định nếu không có giảm giá
        min: 0,
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
    },
    isDefault: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

productVariantSchema.pre('save', function(next) {
    if (this.priceAfterDiscount > this.price) {
        return next(new Error('Price after discount cannot be greater than the original price.'));
    }
    next();
});

const ProductVariantModel = mongoose.model('ProductVariant', productVariantSchema);

module.exports = ProductVariantModel;
