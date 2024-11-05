const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['quản trị', 'hỗ trợ khách hàng', 'quản lý tài chính']
        }
    },{
        timestamps: true
    }
);

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;