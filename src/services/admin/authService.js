require('dotenv').config();

const Admin = require('../../models/adminModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const loginService = async (email, password) => {
    try {
        const admin = await Admin.findOne({email: email});
        if (admin) {
            //compare password
            const isMatchPassword = await bcrypt.compare(password,admin.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password is incorrect"
                }
            }else {
                const payload = {
                    email: admin.email,
                    name: admin.name,
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    admin: {
                        email: admin.email,
                        name: admin.name,
                    }
                }
            }
        }else{
            return {
                EC: 1,
                EM: "Email/Password is incorrect"
            }
        }
    }catch(error) {
            console.log(error);
            return null;
    }
}

module.exports = {
    loginService
}