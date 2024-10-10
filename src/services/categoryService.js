const Category = require('../models/categoryModel')
const User = require("../models/userModel");

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

}

const deleteCateService = async (_id) => {

}

module.exports = {
    createCateService, updateCateService, deleteCateService
}