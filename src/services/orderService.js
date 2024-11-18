const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const {startSession} = require("mongoose");

const getAllOrderService = async () => {
    try {
        const result = await OrderItem.find()
            .populate({
                path: "idOrder",
                populate: { path: "idUser" } })
            .populate("idProduct");

        const orderMap = {};

        result.forEach(item => {
            const idOrder = item.idOrder._id;
            if (!orderMap[idOrder]) {
                orderMap[idOrder] = {
                    _id: idOrder,
                    idUser: item.idOrder.idUser,
                    totalPrice: item.idOrder.totalPrice,
                    status: item.idOrder.status,
                    address: item.idOrder.address,
                    note: item.idOrder.note,
                    createdAt: item.createdAt,
                    products: [],
                };
            }

            orderMap[idOrder].products.push({
                _id: item.idProduct._id,
                name: item.idProduct.name,
                price: item.idProduct.price,
                quantity: item.quantity,
                priceAtPurchase: item.priceAtPurchase,
            })
        })

        const resultArray = Object.values(orderMap)
        return {
            EC: 0,
            EM: "Lấy order thành công",
            data: resultArray
        }
    }catch (error){
        return {
            EC: 1,
            EM: "Không thể lấy order",
            data: [],
        };
    }
}

const getOrderByIdService = async (userId) => {
    try {
        const result = await OrderItem.find()
            .populate({
                path: "idOrder",
                match: { idUser: userId },
                populate: { path: "idUser" }
            })
            .populate("idProduct");

        const orderMap = {};

        result.forEach(item => {
            if (!item.idOrder) return; // Skip if order doesn't match the userId

            const idOrder = item.idOrder._id;
            if (!orderMap[idOrder]) {
                orderMap[idOrder] = {
                    _id: idOrder,
                    idUser: item.idOrder.idUser,
                    totalPrice: item.idOrder.totalPrice,
                    status: item.idOrder.status,
                    address: item.idOrder.address,
                    note: item.idOrder.note,
                    createdAt: item.createdAt,
                    products: [],
                };
            }

            orderMap[idOrder].products.push({
                _id: item.idProduct._id,
                name: item.idProduct.name,
                price: item.idProduct.price,
                quantity: item.quantity,
                storage: item.idProduct.storage,
                color: item.idProduct.color,
                priceAtPurchase: item.priceAtPurchase,
            });
        });

        const resultArray = Object.values(orderMap);
        return {
            EC: 0,
            EM: "Lấy order theo ID thành công",
            data: resultArray
        };
    } catch (error) {
        return {
            EC: 1,
            EM: "Không thể lấy order theo ID",
            data: [],
        };
    }
};


const createOrderService = async (items, idUser, quantity, totalPrice, status) => {
    if (!items || items.length === 0) {
        return {
            EC: 1,
            EM: "Không thể tạo đơn hàng vì không có sản phẩm",
        };
    }

    const session = await startSession();
    session.startTransaction();

    try {
        //step 1: new Order
        const newOrder = await Order.create([{
            idUser: idUser,
            totalPrice: totalPrice,
            status: status
        }], { session });
        //step 2:
        const orderItem = await OrderItem.insertMany(items.map(item => ({
            idOrder: newOrder[0]._id,
            idProduct: item.idProduct,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
        })), { session });

        await session.commitTransaction();
        await session.endSession();

        return{
            EC: 0,
            EM: "Tạo đơn hàng thành công",
            data: {
                order: newOrder[0],
                orderItem },
        };
    } catch(error) {
        await session.abortTransaction();
        await session.endSession();
        console.log(`Error in creating order: ${error.message}`);
        return {
            EC: 1,
            EM: "Không thể tạo order",
        };
    }
}

const deleteOrderService = async (_id) => {
    try {
        const result = await Order.find({idProduct: _id});
    } catch (error) {
        return {
            EC: 1,
            EM: "Không thể xóa order",
        };
    }
}

module.exports = {
    getAllOrderService, createOrderService, deleteOrderService, getOrderByIdService
}