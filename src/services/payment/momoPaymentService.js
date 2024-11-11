const OrderItem = require("../../models/orderItemModel");
const Order = require("../../models/orderModel");
const {v4: uuidv4} = require("uuid");
const crypto = require("crypto");
const axios = require("axios");
const {startSession} = require("mongoose");

const createMomoPaymentService = async (items, idUser, quantity, totalPrice) => {
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

        // Step 3: Tạo yêu cầu thanh toán MoMo
        //parameters
        var partnerCode = process.env.MOMO_PARTNER_CODE;
        var accessKey = process.env.MOMO_ACCESS_KEY;
        var secretkey = process.env.MOMO_SECRET_KEY;
        var requestId = uuidv4();
        var orderId = newOrder[0]._id;
        var orderInfo = "pay with MoMo";
        var redirectUrl = "https://momo.vn/return";
        var ipnUrl = "https://callback.url/notify";
        var amount = totalPrice;
        var requestType = "captureWallet"
        var extraData = "";

        //before sign HMAC SHA256 with format
        //raw signature
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData +
            "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode +
            "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)
        //signature
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
        console.log("--------------------SIGNATURE----------------")
        console.log(signature)

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'vi'
        });

        //option for axios
        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            },
            data: requestBody
        }


        try {
            const result = await axios(options);
            return {
                EC: 0,
                EM: "Tạo đơn hàng và yêu cầu thanh toán MoMo thành công",
                data: {
                    order: newOrder[0],
                    orderItem: orderItem,
                    result: result.data
                }
            };
        }catch (error) {
            console.log("Error while sending to MoMo:", error.response ? error.response.data : error.message);
            return {
                EC: 1,
                EM: "Không thể tạo đơn hàng vì có lỗi trong quá trình xử lý",
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

module.exports = {
    createMomoPaymentService
}

