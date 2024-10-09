const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: true }
)

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
