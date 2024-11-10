const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    idOrder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    paymentMethod:{
        type: String,
        enum: ['Momo', 'Zalopay', 'QrCode', 'Bank Transfer'], // Các phương thức thanh toán khác nhau
        required: true,
    },
    status:{
        type: String,
        enum: ['Chờ xử lý', 'Thanh toán đã bị hủy', 'Thanh toán thất bại', 'Thanh toán thất bại', 'Thanh toán đang được xử lý.g'],
        default: 'Chờ xử lý',
    },
    }, { timestamps: true }
);

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;