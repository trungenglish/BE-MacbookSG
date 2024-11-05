const Product = require('../models/productModel')
const OrderItem = require('../models/orderItemModel')

const getAllProductService = async () => {
    try {
        const result = await Product.find().populate('idCategory');
        return {
            EC: 0,
            EM: "Lấy sản phẩm thành công",
            data: result
        }
    }catch (error) {
        return {
            EC: 1,
            EM: "Không thể lấy danh mục",
            data: [],
        };
    }
}

const getProductByCategoryService = async (idCategory) => {
    try{
        const result = await Product.find({idCategory: idCategory}).populate('idCategory');
        return {
            EC: 0,
            EM: "Lấy sản phẩm thành công",
            data: result
        }
    }catch (error){
        return {
            EC: 1,
            EM: "Không thể lấy sản phẩm",
            data: [],
        };
    }
}

const createProductService = async (name, condition, price, imgUrls, description, idCategory, quantity, discount) => {
    try {
        const product = await Product.findOne({ name });
        if (product){
            console.log(`Product exist ${name}`);
            return {
                EC: 1,
                EM: "Product already exists"
            };
        }

        const priceAfterDiscount = price - (price * discount / 100);

        const result = await Product.create({
            name: name,
            condition: condition,
            price: price,
            priceAfterDiscount: priceAfterDiscount,
            imgUrls: imgUrls,
            description: description,
            idCategory: idCategory,
            quantity: quantity,
            discount: discount,
        })
        return {
            EC: 0,
            EM: "Tạo sản phẩm thành công",
            data: result,
        };
    }catch (error) {
        console.error(`Error in creating product: ",  ${error.message}`);
        return {
            EC: 1,
            EM: "Không thể tạo sản phẩm",
        };
    }
}

const updateProductService = async (_id, name, condition, price, priceAfterDiscount, imgUrls, description, idCategory, quantity, discount) => {
    try {
        const result = await Product.findOneAndUpdate(
            {_id: _id},
            {
                $set: {
                    name: name,
                    condition: condition,
                    price: price,
                    priceAfterDiscount: priceAfterDiscount,
                    imgUrls: imgUrls,
                    description: description,
                    idCategory: idCategory,
                    quantity: quantity,
                    discount: discount
                }
            },
            {new: true}
        )
        return {
            EC: 0,
            EM: "Cập nhật sản phẩm thành công",
            data: result,
        };
    } catch (error) {
        return {
            EC: 1,
            EM: "Không thể cập nhật sản phẩm",
            data: [],
        };
    }
}

const deleteProductService = async (_id) => {
    try {
        const orderItems = await OrderItem.find({idProduct: _id});
        if (orderItems.length > 0) {
           return {
               EC: 1,
               EM: "Không thể xóa sản phẩm khi vẫn còn đơn hàng",
           };
        }
        const result = await Product.deleteOne({_id: _id})
        if (result.deletedCount === 0) {
            return {
                EC: 1,
                EM: "Sản phẩm không tồn tại hoặc đã bị xóa",
            };
        }
        return {
            EC: 0,
            EM: "Xóa sản phẩm thành công",
            data: result,
        };
    } catch (error) {
        return {
            EC: 1,
            EM: "Không thể xóa sản phẩm",
            data: [],
        };
    }
}

const updateAvailableProductsService = async (_id, isActive) => {
    try{
        const result = await Product.findOneAndUpdate(
            {_id: _id},
            {
                $set: {
                    isActive: isActive
                }
            },
            {new: true}
        )
        if (!result) {
            return {
                EC: 1,
                EM: "Sản phẩm không tồn tại",
            };
        }
        return {
            EC: 0,
            EM: "Cập nhật trạng thái bán thành công",
            data: result,
        };
    }catch (error) {
        return {
            EC: 1,
            EM: "Không thể cập nhật trạng thái bán",
            data: [],
        };
    }
}

const countProductService = async () => {
    try {
        const result = await Product.countDocuments();
        return {
            EC: 0,
            EM: "Đếm sản phẩm thành công",
            data: result
        }
    }catch (error) {
        return {
            EC: 1,
            EM: "Không thể đếm sản phẩm",
            data: [],
        };
    }
}


module.exports = {
    getAllProductService, createProductService, updateProductService, deleteProductService,
    updateAvailableProductsService, getProductByCategoryService, countProductService
}