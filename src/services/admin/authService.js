require('dotenv').config();

const Admin = require('../../models/adminModel')
const bcrypt = require('bcrypt');
const {generateToken, verifyToken} = require('../../helpers/jwt.helper');
const saltRounds = 10;

const loginService = async (username, password) => {
    try {
        const admin = await Admin.findOne({username: username});
        if (admin) {
            //compare password
            const isMatchPassword = await bcrypt.compare(password, admin.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password is incorrect"
                }
            }else {
                const payload = {
                    _id: admin._id,
                    email: admin.email,
                    username: admin.username,
                    name: admin.name,
                    role: admin.role
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
                    admin: {
                        username: admin.username,
                        email: admin.email,
                        name: admin.name,
                        role: admin.role
                    }
                }
            }
        }else{
            return {
                EC: 1,
                EM: "Username/Password is incorrect"
            }
        }
    }catch(error) {
        console.error(`Error logging admin: ${error.message}`);
        return {
            EC: -1,
            EM: "An error occurred while logging the admin account"
        };
    }
}

const createAdminService = async (name, username, email, phone, password, role) => {
    try {
        console.log("Create admin service",name, username, email, phone, password, role);
        //check if admin exist
        const existingAdmin = await Admin.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (existingAdmin) {
            console.log(`User exist ${email}`);
            return {
                EC: 1,
                EM: "Email or Username already exists"
            };
        }
        //hash password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        let result = await Admin.create({
            name: name,
            username: username,
            email: email,
            phone: phone,
            password: hashPassword,
            role: role
        })
        return {
            EC: 0,
            EM: "Admin account created successfully",
            admin: result
        }
    }catch (error){
        console.error(`Error creating admin: ${error.message}`);
        return {
            EC: -1,
            EM: "An error occurred while creating the admin account"
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
            username: decoded.username,
            name: decoded.name,
            role: decoded.role,
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
    loginService, createAdminService, refreshTokenService
}