const { getUsersService, putUpdateService} = require('../../services/admin/userService');

const getAllUsers = async (req, res) => {
    const data = await getUsersService();
    return res.status(200).json(data);
}

const updateUsers = async (req,res) => {
    const {_id, name, phone, city} = req.body;
    const data = await putUpdateService(_id, name, phone, city);
    return res.status(200).json(data);
}



module.exports = {
    getAllUsers
}