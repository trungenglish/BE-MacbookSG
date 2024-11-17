const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        enum: ['đang xử lý', 'hoàn thành', 'hủy đơn'],
        default: 'đang xử lý',
    },
    }, { timestamps: true }
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;