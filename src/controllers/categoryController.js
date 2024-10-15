const {getAllCateService, createCateService, updateCateService, deleteCateService } = require('../services/categoryService');

const getAllCate = async (req, res) => {
    const data = await getAllCateService();
    return res.status(200).json(data);
}

const createCate = async (req, res) => {
    const { name } = req.body;
    const data = await createCateService(name);
    return res.status(200).json(data);
}

const updateCate = async (req, res) => {
    const { _id, name } = req.body;
    const data = await updateCateService(_id, name);
    return res.status(200).json(data);
}

const deleteCate = async (req, res) => {
    const { id } = req.params;
    const data = await deleteCateService(id);
    return res.status(200).json(data);
}

module.exports = {
    createCate, updateCate, deleteCate, getAllCate
}