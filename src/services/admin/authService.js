require('dotenv').config();

const Admin = require('../../models/adminModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                    // username: admin.username,
                    // name: admin.name,
                    // role: admin.role
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
                        username: admin.username,
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

const createAdminService = async (name, username, email, password, role) => {
    try {
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

const getAccountService = async (_id) => {
    try {
        const admin = await Admin.findById(_id).select("-password");
        if (!admin) {
            throw new Error('Người dùng không tồn tại.');
        }
        return {
            EC: 0,
            EM: 'Lấy thông tin người dùng thành công',
            data: admin,
        };
    } catch (error) {
        return {
            EC: 1,
            EM: error.message,
            data: null,
        };
    }
}

module.exports = {
    loginService, createAdminService, getAccountService
}