require('dotenv').config();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const {generateToken, verifyToken} = require("../../helpers/jwt.helper");
const saltRounds = 10;

const createUserService = async(name, email, password, phone, city) => {
    try {
        const user = await User.findOne({ email });
        if (user){
            console.log(`User exist ${email}`);
            return {
                EC: 1,
                EM: "Email already exists"
            };
        }
        const hashPassword = await bcrypt.hash(password,saltRounds)
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
            city: city
        });
        return  {
            EC: 0,
            EM: "Tạo tài khoản thành công",
            user: result
        }
    } catch (error){
        console.error(`Error creating user: ${error.message}`);
        return {
            EC: -1,
            EM: "An error occurred while creating the user account"
        };
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
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                }
                const access_token = await generateToken(
                    payload,
                    process.env.JWT_SECRET,
                    process.env.JWT_EXPIRE
                );
                const refreshToken = await generateToken(
                    payload,
                    process.env.JWT_SECRET_REFRESH,
                    process.env.JWT_EXPIRE_REFRESH
                );

                return {
                    EC: 0,
                    EM: "Login success",
                    access_token,
                    refreshToken,
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
        console.error(`Error logging user: ${error.message}`);
        return {
            EC: -1,
            EM: "An error occurred while logging the user account"
        };
    }
}

const getAccountService = async (_id) => {
    try {
        const user = await User.findById(_id).select("-password");
        if (!user) {
            throw new Error('Người dùng không tồn tại.');
        }
        return {
            EC: 0,
            EM: 'Lấy thông tin người dùng thành công',
            data: user,
        };
    } catch (error) {
        return {
            EC: 1,
            EM: error.message,
            data: null,
        };
    }
}

const refreshTokenService = async (refreshToken) => {
    try {
        if (!refreshToken) {
            return {
                EC: 1,
                EM: 'Token không hợp lệ',
            };
        }
        const decoded = await verifyToken(
            refreshToken,
            process.env.JWT_SECRET_REFRESH
        );
        const payload = {
            _id: decoded._id,
            email: decoded.email,
            name: decoded.name,
        };
        const access_token = await generateToken(
            payload,
            process.env.JWT_SECRET,
            process.env.JWT_EXPIRE
        );
        return {
            EC: 0,
            access_token,
        }
    }catch (error) {
        console.error(`Error refreshing token: ${error.message}`);
        return {
            EC: -1,
            EM: "An error occurred while refreshing the token"
        };
    }
}

module.exports = {
    createUserService, loginService, getAccountService, refreshTokenService
};