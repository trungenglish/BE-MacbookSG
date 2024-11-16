const Product = require("../models/productModel");
const ProductVariant = require("../models/productVariantModel");

const filterIncreaseService = async (idCategory) => {
    try{
        const products = await Product.find({idCategory: idCategory}).populate('idCategory');

        const productIds = products.map(product => product._id);

        const productVariantsDefault = await ProductVariant.find({
            isDefault: true,
            idPro: { $in: productIds }
        }).populate('idPro');

        const filterIncrease = productVariantsDefault.sort((a, b) => {
            return a.price - b.price;
        });

        return {
            EC: 0,
            EM: "Lấy sản phẩm thành công",
            data: filterIncrease
        }
    }catch (error){
        return {
            EC: 1,
            EM: "Không thể lấy sản phẩm",
            data: [],
        };
    }
}

const filterDecreaseService = async (idCategory) => {
    try{
        const products = await Product.find({idCategory: idCategory}).populate('idCategory');

        const productIds = products.map(product => product._id);

        const productVariantsDefault = await ProductVariant.find({
            isDefault: true,
            idPro: { $in: productIds }
        }).populate('idPro');

        const filterIncrease = productVariantsDefault.sort((a, b) => {
            return b.price - a.price;
        });

        return {
            EC: 0,
            EM: "Lấy sản phẩm thành công",
            data: filterIncrease
        }
    }catch (error){
        return {
            EC: 1,
            EM: "Không thể lấy sản phẩm",
            data: [],
        };
    }
}


module.exports = {
    filterIncreaseService, filterDecreaseService
}