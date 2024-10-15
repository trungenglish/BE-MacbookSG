const {getAllProductService,
    createProductService,
    deleteProductService,
    updateProductService,
    updateAvailableProductsService
} = require("../services/productService");

const getAllProduct = async (req, res) => {
    const data = await getAllProductService();
    return res.status(200).json(data);
}

const createProduct = async (req, res) => {
    const {name, price, imgUrls, description, idCategory, quantity, discount} = req.body;
    const data = await createProductService(name, price, imgUrls, description, idCategory, quantity, discount);
    return res.status(200).json(data);
}

const updateProduct = async (req, res) => {
    const {name, price, imgUrls, description, idCategory, quantity, discount} = req.body;
    const data = await updateProductService(name, price, imgUrls, description, idCategory, quantity, discount);
    return res.status(200).json(data);
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const data = await deleteProductService(id);
    return res.status(200).json(data);
}

const updateAvailableProducts = async (req, res) => {
    const {id} = req.params;
    const data = await updateAvailableProductsService(id);
    return res.status(200).json(data);
}

module.exports = {
    getAllProduct, createProduct, updateProduct, deleteProduct, updateAvailableProducts
}
