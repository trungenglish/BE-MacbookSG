const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
        idProduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        idUser:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        rating:{
            type: Number,
            required: true,
        },
        comment:{
            type: String,
            required: true,
        }
    }, { timestamps: true }
);

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;