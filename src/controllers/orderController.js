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
    const {items, quantity, totalPrice, address, note} = req.body
    const {_id} = req.user;
    const data = await createOrderService(items, _id, quantity, totalPrice, address, note)
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