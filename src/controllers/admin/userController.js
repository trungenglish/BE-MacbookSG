const { getUsersService } = require('../../services/admin/userService');

const getUsers = async (req, res) => {
    const data = await getUsersService();
    return res.status(200).json(data);
}