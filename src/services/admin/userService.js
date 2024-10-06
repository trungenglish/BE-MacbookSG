const User = require('../../models/userModel');

const getUsersService = async () => {
    try {
        const results = await User.find({});
        return {
            EC: 0,
            EM: "Lấy danh sách users thành công",
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