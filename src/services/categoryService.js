const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const getAllCateService = async () => {
    try {
        const result = await Category.find();
        return {
            EC: 0,
            EM: "Lấy danh mục thành công",
            data: result,
        };
    } catch (error) {
        return {
            EC: 1,
            EM: "Không thể lấy danh mục",
            data: [],
        };
    }
}

const createCateService = async (name) => {
    try {
        const cate = await Category.findOne({ name });
        if (cate){
            console.log(`Category exist ${name}`);
            return {
                EC: 1,
                EM: "Category already exists"
            };
        }
        const result = await Category.create({name: name})
        return {
            EC: 0,
            EM: "Tạo danh mục thành công",
            cate: result,
        };
    }catch (error) {
        console.error(`Error in creating category: ",  ${error.message}`);
        return {
            EC: 1,
            EM: "Không thể tạo danh mục",
        };
    }
}

const updateCateService = async (_id, name) => {
    try {
        const result = await Category.findOneAndUpdate(
            {_id: _id},
            { $set: {name: name}},
            { new: true }
        )
        return {
            EC: 0,
            EM: "Cập nhật danh mục thành công",
            data: result,
        };
    } catch (error){
        return {
            EC: 1,
            EM: "Không thể cập nhật danh mục",
            data: [],
        };
    }
}

const deleteCateService = async (_id) => {
    try {
        const products = await Product.find({ idCategory: _id });
        if (products.length > 0) {
            return {
                EC: 1,
                EM: "Không thể xóa danh mục khi vẫn còn sản phẩm",
            };
        }
        const result = await Category.deleteOne({_id: _id})
        if (result.deletedCount === 0) {
            return {
                EC: 1,
                EM: "Danh mục không tồn tại hoặc đã bị xóa",
            };
        }
        return {
            EC: 0,
            EM: "Xóa danh mục thành công",
            data: result,
        };
    } catch (error) {
        return {
            EC: 1,
            EM: "Không thể xóa danh mục",
            data: [],
        };
    }
}

module.exports = {
    createCateService, updateCateService, deleteCateService, getAllCateService
}