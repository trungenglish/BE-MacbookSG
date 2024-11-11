const {getAllProductService,
    createProductService,
    deleteProductService,
    updateProductService,
    updateAvailableProductsService, getProductByCategoryService, countProductService
} = require("../services/productService");

const getAllProduct = async (req, res) => {
    const data = await getAllProductService();
    return res.status(200).json(data);
}

const getProductByCategory = async (req, res) => {
    const { id } = req.params;
    const data = await getProductByCategoryService(id);
    return res.status(200).json(data);
}

const createProduct = async (req, res) => {
    const {name, condition, price, imgUrls, description, idCategory, quantity, discount} = req.body;
    const data = await createProductService(name, condition, price, imgUrls, description, idCategory, quantity, discount);
    return res.status(200).json(data);
}

const updateProduct = async (req, res) => {
    const {_id, name, condition, price, priceAfterDiscount, imgUrls, description, idCategory, quantity, discount} = req.body;
    const data = await updateProductService(_id, name, condition, price, priceAfterDiscount, imgUrls, description, idCategory, quantity, discount);
    return res.status(200).json(data);
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const data = await deleteProductService(id);
    return res.status(200).json(data);
}

const updateAvailableProducts = async (req, res) => {
    const {id} = req.params;
    const { isActive } = req.body;
    const data = await updateAvailableProductsService(id, isActive);
    return res.status(200).json(data);
}

const countProduct = async (req, res) => {
    const data = await countProductService();
    return res.status(200).json(data);
}

module.exports = {
    getAllProduct, createProduct, updateProduct, deleteProduct, updateAvailableProducts, getProductByCategory,
    countProduct
}
