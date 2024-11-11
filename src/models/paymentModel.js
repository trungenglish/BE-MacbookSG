const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    idOrder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    paymentMethod:{
        type: String,
        enum: ['Momo', 'ZaloPay', 'QrCode', 'Bank Transfer'],
        required: true,
    },
    paymentStatus:{
        type: String,
        enum: ['Đang chờ thanh toán', 'Thanh toán thành công', 'Thanh toán thất bại', 'Thanh toán đang được xử lý'],
        default: 'Đang chờ thanh toán',
    },
    amount: {
        type: Number,
        required: true,
    },
    appTransId: {
        type: String,
        required: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
    },
    }, { timestamps: true }
);

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;