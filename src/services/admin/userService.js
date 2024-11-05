const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

const getUsersService = async () => {
    try {
        const results = await User.find({}).select("-password");
        return {
            EC: 0,
            EM: "Lấy danh sách người dùng thành công",
            data: results,
        };
    }catch (error) {
        return {
            EC: 1,
            EM: "Không thể lấy danh sách người dùng",
            data: [],
        };
    }
}

const putUpdateService = async (_id, name, phone, city) => {
    try {
        const results = await User.updateOne(
            {_id:_id},
            { $set:{name: name, phone: phone, city: city}})
        return {
            EC: 0,
            EM: "Cập nhật danh sách người dùng thành công",
            data: results,
        };
    }catch (error){
        return {
            EC: 1,
            EM: "Không thể cập nhật nguời dùng",
            data: [],
        };
    }
}

const deleteUserService = async (id) => {
    try {
        const result = await User.deleteOne({_id: id});
        if (result.deletedCount === 0) {
            return {
                EC: 1,
                EM: "Người dùng không tồn tại hoặc đã bị xóa",
                data: [],
            };
        }
        return {
            EC: 0,
            EM: "Xóa người dùng thành công",
            data: result,
        };
    }catch (error) {
        return {
            EC: 1,
            EM: "Không thể xóa người dùng",
            data: [],
        };
    }
}

const countUserService = async () => {
    try {
        const result = await User.countDocuments();
        return {
            EC: 0,
            EM: "Lấy số lượng người dùng thành công",
            data: result,
        };
    }catch (error) {
        return {
            EC: 1,
            EM: "Không thể lấy số lượng người dùng",
            data: [],
        };
    }
}

module.exports = {
    getUsersService, putUpdateService, deleteUserService, countUserService
}