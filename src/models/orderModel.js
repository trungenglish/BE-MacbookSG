const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
    },
    }, { timestamps: true }
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;