const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
        idOrder:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        idProduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity:{
            type: Number,
            required: true,
        },
        priceAtPurchase:{
            type: Number,
            required: true,
        }
    }, { timestamps: true }
);

const OrderItemModel = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItemModel;