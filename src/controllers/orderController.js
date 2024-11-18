const {createOrderService, getAllOrderService, deleteOrderService, getOrderByIdService} = require("../services/orderService");

const getAllOrder = async (req, res) => {
    const data = await getAllOrderService()
    return res.status(200).json(data)
}

const getOrderById = async (req, res) => {
    const {_id} = req.user
    const data = await getOrderByIdService(_id)
    return res.status(200).json(data)
}

const createOrder = async (req, res) => {
    const {items, idUser, quantity, totalPrice, status} = req.body
    const data = await createOrderService(items, idUser, quantity, totalPrice, status)
    return res.status(200).json(data)
}

const deleteOrder = async (req, res) => {
    const {id} = req.params
    const data = await deleteOrderService(id)
    return res.status(200).json(data)
}

module.exports = {
    getAllOrder, createOrder, deleteOrder, getOrderById
}