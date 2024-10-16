const {createOrderService, getAllOrderService} = require("../services/orderService");

const getAllOrder = async (req, res) => {
    const data = await getAllOrderService()
    return res.status(200).json(data)
}

const createOrder = async (req, res) => {
    const {items, idUser, quantity, totalPrice, status} = req.body
    const data = await createOrderService(items, idUser, quantity, totalPrice, status)
    return res.status(200).json(data)
}

module.exports = {
    getAllOrder, createOrder
}