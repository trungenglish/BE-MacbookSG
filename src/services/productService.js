const Product = require('../models/productModel')
const ProductVariant = require('../models/productVariantModel')
const OrderItem = require('../models/orderItemModel')
const ProductDetail = require('../models/productDetailModel')

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

const createProductService = async (name, description, idCategory, images, defaultVariant, variants, specifications) => {
    try {
        const existingProduct  = await Product.findOne({ name });
        if (existingProduct){
            console.log(`Product exist ${name}`);
            return {
                EC: 1,
                EM: "Product already exists"
            };
        }

        const productDetail = new ProductDetail(specifications);
        const savedProductDetail = await productDetail.save();

        const product = new Product({
            name,
            description,
            idCategory,
            images: images || [],
            idProductDetail: savedProductDetail._id,
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
            condition: defaultVariant.conditon,
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
                productDetail: savedProductDetail,
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

const updateProductService = async (_id, name, description, idCategory, images, defaultVariant, variants, specifications) => {
    try {
        // Cập nhật thông tin cơ bản của sản phẩm
        const updatedProduct = await Product.findOneAndUpdate(
            { _id },
            {
                $set: {
                    name: name,
                    description: description,
                    idCategory: idCategory,
                    images: images || []
                }
            },
            { new: true }
        );

        // Kiểm tra nếu product không tồn tại
        if (!updatedProduct) {
            return {
                EC: 1,
                EM: "Sản phẩm không tồn tại",
                data: null,
            };
        }

        // Kiểm tra nếu sản phẩm đang được sử dụng trong đơn hàng (OrderItem)
        const orderItems = await OrderItem.find({ idProVariant: _id });
        if (orderItems.length > 0) {
            return {
                EC: 1,
                EM: "Không thể xóa sản phẩm khi vẫn còn đơn hàng",
            };
        }

        // Cập nhật defaultVariant
        const updatedDefaultVariant = await ProductVariant.findOneAndUpdate(
            { idPro: _id, isDefault: true },
            {
                $set: {
                    color: defaultVariant.color,
                    storage: defaultVariant.storage,
                    price: defaultVariant.price,
                    priceAfterDiscount: defaultVariant.priceAfterDiscount,
                    quantity: defaultVariant.quantity,
                    discount: defaultVariant.discount,
                    condition: defaultVariant.condition,
                    isActive: defaultVariant.isActive,
                }
            },
            { new: true, upsert: true }
        );

        // Cập nhật thông tin specifications (ProductDetail)
        let updatedSpecifications = null;
        if (specifications) {
            updatedSpecifications = await ProductDetail.findOneAndUpdate(
                { _id: updatedProduct.idProductDetail },
                {
                    $set: specifications
                },
                { new: true }
            );
        }

        // Xử lý variants:
        // 1. Nếu variants không có thay đổi, chỉ cập nhật các variant hiện có
        if (variants && variants.length > 0) {
            // Cập nhật các variant có sẵn
            for (let variant of variants) {
                await ProductVariant.findOneAndUpdate(
                    { _id: variant._id },  // Dựa vào _id để cập nhật variant cụ thể
                    {
                        $set: {
                            color: variant.color,
                            storage: variant.storage,
                            price: variant.price,
                            priceAfterDiscount: variant.priceAfterDiscount,
                            quantity: variant.quantity,
                            discount: variant.discount,
                            condition: variant.condition,
                            isActive: variant.isActive,
                        }
                    },
                    { new: true }
                );
            }

            // Thêm mới variant nếu có
            const newVariants = variants.filter(variant => !variant._id);  // Lọc những variant chưa có _id
            const insertedVariants = newVariants.length > 0 ? await ProductVariant.insertMany(
                newVariants.map(variant => ({
                    ...variant,
                    idPro: _id,
                    isDefault: false
                }))
            ) : [];

            return {
                EC: 0,
                EM: "Cập nhật sản phẩm thành công",
                data: {
                    product: updatedProduct,
                    defaultVariant: updatedDefaultVariant,
                    variants: [...newVariants, ...insertedVariants],
                },
            };
        } else {
            return {
                EC: 0,
                EM: "Cập nhật sản phẩm thành công (không có variants mới)",
                data: {
                    product: updatedProduct,
                    defaultVariant: updatedDefaultVariant,
                },
            };
        }
    } catch (error) {
        console.error(`Error in updating product: ${error.message}`);
        return {
            EC: 1,
            EM: "Không thể cập nhật sản phẩm",
            data: [],
        };
    }
};

const deleteProductService = async (_id) => {
    try {
        const orderItems = await OrderItem.find({idProVariant: _id});
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
        const mainProduct = await Product.findById(_id)
            .populate('idCategory')
            .populate('idProductDetail');
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