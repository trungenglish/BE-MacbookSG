const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const {startSession} = require("mongoose");
const Order = require("../../models/orderModel");
const OrderItem = require("../../models/orderItemModel");

const config = {
    app_id: process.env.ZALO_APP_ID,
    key1: process.env.ZALO_APP_KEY1,
    key2: process.env.ZALO_APP_KEY2,
    endpoint: process.env.ZALO_APP_ENDPOINT
};

const createZaloPaymentService = async (items, idUser, quantity, totalPrice) => {
    if (!items || items.length === 0) {
        return {
            EC: 1,
            EM: "Không thể tạo đơn hàng vì không có sản phẩm",
        };
    }

    const session = await startSession();
    session.startTransaction();

    try {
        //Step 1: new Order
        const newOrder = await Order.create([{
            idUser: idUser,
            totalPrice: totalPrice,
        }], {session});
        // Step 2: Thêm sản phẩm vào OrderItem
        const orderItem = await OrderItem.insertMany(items.map(item => ({
            idOrder: newOrder[0]._id,
            idProduct: item.idProduct,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
        })), {session});

        await session.commitTransaction();
        await session.endSession();

        //Step 3: Tạo yêu cầu thanh toán ZaloPay


        const embed_data = {
            redirecturl: "https://trungenglishmacbooksgclient.vercel.app/homepage",
        };

        const itemData = items.map(item => ({
            product_id: item.idProduct,
            quantity: item.quantity,
            price: item.priceAtPurchase
        }));
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: idUser,
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(itemData),
            embed_data: JSON.stringify(embed_data),
            amount: totalPrice,
            description: `MacbookSG - Thanh toán đơn hàng #${transID}`,
            bank_code: "zalopayapp",
            callback_url: "https://be-macbooksg.onrender.com/api/v1/admin/callback"
        };

        // tạo chữ ký HMAC
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        try {
            const result = await axios.post(config.endpoint, null, { params: order })
            if (result.data.return_code !== 1) {
                return {
                    EC: 1,
                    EM: "Không thể tạo yêu cầu thanh toán ZaloPay, mã lỗi: " + result.data.return_code,
                };
            }
            return {
                EC: 0,
                EM: "Tạo đơn hàng và yêu cầu thanh toán ZaloPay thành công",
                data: {
                    order: newOrder[0],
                    orderItem: orderItem,
                    result: result.data
                }
            };
        }catch (error) {
            console.error("ZaloPay API error:", error.message);
            return {
                EC: 1,
                EM: "Không thể tạo yêu cầu thanh toán ZaloPay do lỗi hệ thống.",
            };
        }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        console.log(`Error in creating order: ${error.message}`);
        return {
            EC: 1,
            EM: "Không thể tạo order",
        };
    }
}

const callbackZaloPaymentService = async (dataStr, reqMac) => {
    let result = {};

    try {
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        console.log("mac =", mac);

        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
        }
        else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            let dataJson = JSON.parse(dataStr, config.key2);
            console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }
}

module.exports = {
    createZaloPaymentService, callbackZaloPaymentService
}