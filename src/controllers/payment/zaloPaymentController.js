const {createZaloPaymentService,callbackZaloPaymentService} = require("../../services/payment/zaloPaymentService");

const createZaloPayment = async (req, res) => {
    const {items, quantity, totalPrice, address, note} = req.body;
    const {_id} = req.user;
    const data = await createZaloPaymentService(items, _id, quantity, totalPrice, address, note)
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
