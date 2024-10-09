const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    idOrder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    paymentMethod:{
        type: String,
        enum: ['Momo', 'QrCode', 'Bank Transfer'], // Các phương thức thanh toán khác nhau
        required: true,
    },
    status:{
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
    },
    }, { timestamps: true }
);

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;