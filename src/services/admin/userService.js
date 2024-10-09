const User = require('../../models/userModel');

const getUsersService = async () => {
    try {
        const results = await User.find({}).select("-password");
        return {
            EC: 0,
            EM: "Lấy danh sách người dùng thành công",
            data: results,
        };
    }catch (error) {
        console.error("Error in getUsersService: ", error);
        return {
            EC: 1,
            EM: "Không thể lấy danh sách users",
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
        console.error("Error in putUpdateService: ", error);
        return {
            EC: 1,
            EM: "Không thể cập nhật users",
            data: [],
        };
    }
}


module.exports = {
    getUsersService, putUpdateService
}