const {getAllCateService, createCateService, updateCateService, deleteCateService } = require('../services/categoryService');
const ResponseFactory = require('../core/response/ResponseFactory');

const getAllCate = async (req, res) => {
    try {
        const result = await getAllCateService();
        if (result.EC !== 0){
            return res
            .status(400)
            .json(ResponseFactory.error(result.EM));
        }
        return res
            .status(200)
            .json(ResponseFactory.success(result.EM, result.data));
    } catch (error) {
        return res
            .status(500)
            .json(ResponseFactory.error('Internal server error'));
    }
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