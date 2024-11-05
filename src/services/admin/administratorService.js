const Admin = require("../../models/adminModel")

const getAdministrators = async () => {
    try {
        const results = await Admin.find({}).select("-password");
        return {
            EC: 0,
            EM: "Lấy danh sách quản trị viên thành công",
            data: results,
        };
    }catch (error) {
        console.error("Error in getUsersService: ", error);
        return {
            EC: 1,
            EM: "Không thể lấy danh sách người dùng",
            data: [],
        };
    }
}

const updateAdministratorService = async (_id, name, username, email, phone,  password, role) => {
    try {
        const result = await Admin.updateOne(
            {_id: _id},
            { $set: {name: name, username: username, email: email, phone: phone, password: password, role: role}}
        )
        return {
            EC: 0,
            EM: "Cập nhật quản trị viên thành công",
            data: result,
        };
    } catch (error){
        return {
            EC: 1,
            EM: "Không thể cập nhật quản trị viên",
            data: [],
        };
    }
}

const deleteAdministratorService = async (_id) => {
    try {
        const result = await Admin.deleteOne({_id: _id});
        return {
            EC: 0,
            EM: "Xóa tài khoản thành công",
            data: result,
        };
    } catch (error){
        return {
            EC: 1,
            EM: "Không thể tài khoản",
            data: [],
        };
    }
}

module.exports = {
    getAdministrators, deleteAdministratorService, updateAdministratorService
}