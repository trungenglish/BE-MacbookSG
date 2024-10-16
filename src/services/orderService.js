const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const {startSession} = require("mongoose");

const getAllOrderService = async (req, res) => {
    try {
        const result = await Order.find().populate("idProduct");
        return {
            EC: 0,
            EM: "Lấy order thành công",
            data: result
        }
    }catch (error){
        return {
            EC: 1,
            EM: "Không thể lấy order",
            data: [],
        };
    }
}

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
            data: { order: newOrder[0], orderItem },
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

module.exports = {
    getAllOrderService, createOrderService
}