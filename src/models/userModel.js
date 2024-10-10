const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name: {
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
        city: {
            type: String,
        }
    },{
        timestamps: true
    }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
