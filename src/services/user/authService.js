require('dotenv').config();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const createUserService = async(name, email, password, phone) => {
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
            password: hashPassword,
            phone: phone
        });
        return result;
    } catch (error){
        console.log(error);
        return null;
    }

}

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({email: email});
        if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword){
                return {
                    EC: 2,
                    EM: "Email/Password is incorrect"
                }
            }else {
                const payload = {
                    email: user.email,
                    name: user.name,
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRE}
                )
                return {
                    EC: 0,
                    EM: "Login success",
                    access_token,
                    user: {
                        name: user.name,
                        email: user.email,
                    }
                }
            }
        } else{
            return {
                EC: 1,
                EM: "Email/Password is incorrect"
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Internal server error"
        };
    }
}

module.exports = {
    createUserService, loginService
};