const Product = require('../models/productModel')
const ProductVariant = require('../models/productVariantModel')
const OrderItem = require('../models/orderItemModel')

const getAllProductService = async () => {
    try {
        const result = await Product.find()
            .populate('idCategory')
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
        const products = await Product.find({idCategory: idCategory}).populate('idCategory');

        const productIds = products.map(product => product._id);

        const productVariantsDefault = await ProductVariant.find({
            isDefault: true,
            idPro: { $in: productIds }
        }).populate('idPro');

        return {
            EC: 0,
            EM: "Lấy sản phẩm thành công",
            data: productVariantsDefault
        }
    }catch (error){
        return {
            EC: 1,
            EM: "Không thể lấy sản phẩm",
            data: [],
        };
    }
}

const createProductService = async (name, description, idCategory, images, defaultVariant, variants) => {
    try {
        const existingProduct  = await Product.findOne({ name });
        if (existingProduct){
            console.log(`Product exist ${name}`);
            return {
                EC: 1,
                EM: "Product already exists"
            };
        }

        const product = new Product({
            name,
            description,
            idCategory,
            images: images || [],
        });

        const savedProduct = await product.save();

        const saveDefaultVariant = await ProductVariant.create([{
            idPro: savedProduct._id,
            color: defaultVariant.color,
            storage: defaultVariant.storage,
            price: defaultVariant.price,
            priceAfterDiscount: defaultVariant.priceAfterDiscount,
            quantity: defaultVariant.quantity,
            discount: defaultVariant.discount,
            isActive: defaultVariant.isActive,
            isDefault: true,
        }])

        let savedVariants = [];

        if (variants && variants.length > 0) {
            const variantDocs = variants.map(variant => ({
                ...variant,
                idPro: savedProduct._id,
            }));
            savedVariants = await ProductVariant.insertMany(variantDocs);
        }

        return {
            EC: 0,
            EM: "Tạo sản phẩm thành công",
            data: {
                product: savedProduct,
                defaultVariant: saveDefaultVariant,
                variants: savedVariants,
            },
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
        const deletedProduct = await Product.deleteOne({_id: _id})
        if (deletedProduct.deletedCount === 0) {
            return {
                EC: 1,
                EM: "Sản phẩm không tồn tại hoặc đã bị xóa",
            };
        }

        const deletedProductVariant = await ProductVariant.deleteMany({idPro: _id})

        return {
            EC: 0,
            EM: "Xóa sản phẩm thành công",
            data: deletedProduct,
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

const getProductByIdService = async (_id) => {
    try {
        const mainProduct = await Product.findById(_id).populate('idCategory');

        if (!mainProduct) {
            return {
                EC: 1,
                EM: "Không tìm thấy sản phẩm",
                data: [],
            };
        }

        const variants = await ProductVariant.find({idPro: _id})
        return {
            EC: 0,
            EM: "Lấy sản phẩm thành công",
            data: {
                mainProduct,
                variants
            }
        }
    } catch (e) {
        return {
            EC: 1,
            EM: "Không thể lấy sản phẩm",
            data: [],
        };
    }
}

module.exports = {
    getAllProductService, createProductService, updateProductService, deleteProductService,
    updateAvailableProductsService, getProductByCategoryService, countProductService, getProductByIdService,
}