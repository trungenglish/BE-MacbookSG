require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const createUserService = async(name, email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user){
            console.log(`User exist ${email}`);
            return null;
        }
        const hashPassword = await bcrypt.hash(password,saltRounds)
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        return result;
    } catch (error){
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService
};