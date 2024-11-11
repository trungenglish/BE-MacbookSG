const {createMomoPaymentService} = require("../../services/payment/momoPaymentService");

const createMomoPayment = async (req, res) => {
    const {items, idUser, quantity, totalPrice} = req.body;
    const data = await createMomoPaymentService(items, idUser, quantity, totalPrice)
    return res.status(200).json(data)
}

module.exports = {
    createMomoPayment
}
