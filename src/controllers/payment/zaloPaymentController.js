const {createZaloPaymentService,callbackZaloPaymentService} = require("../../services/payment/zaloPaymentService");

const createZaloPayment = async (req, res) => {
    const {items, idUser, quantity, totalPrice} = req.body;
    const data = await createZaloPaymentService(items, idUser, quantity, totalPrice)
    return res.status(200).json(data)
}

const callbackZaloPayment = async (req, res) => {
    const {dataStr} = req.body.data;
    const {reqMac} = req.body.mac;
    const data = await callbackZaloPaymentService(dataStr, reqMac)
    return res.status(200).json(data)
}

module.exports = {
    createZaloPayment, callbackZaloPayment
}
