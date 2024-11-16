const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
        idOrder:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        idProVariant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductVariant',
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
            min: 1,
        },
        priceAtPurchase:{
            type: Number,
            required: true,
        }
    }, { timestamps: true }
);

const OrderItemModel = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItemModel;