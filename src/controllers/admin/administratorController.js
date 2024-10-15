const {getAdministrators, deleteAdministratorService, updateAdministratorService} = require("../../services/admin/administratorService");

const getAllAdministrator = async (req, res) => {
    const data = await getAdministrators()
    return res.status(200).json(data);
}

const updateAdministrator = async (req, res) => {
    const {_id, name, username, email, phone, password, role} = req.body;
    const data = await updateAdministratorService(_id, name, username, email, phone, password, role);
    return res.status(200).json(data);
}

const deleteAdministrator = async (req, res) => {
    const {id} = req.params;
    const data = await deleteAdministratorService(id);
    return res.status(200).json(data);
}

module.exports = {
    getAllAdministrator, deleteAdministrator, updateAdministrator
}