const createPayment = async (req, res) => {
    const {orderId, amount, orderInfo, redirectUrl} = req.body;
}

module.exports = {
    createPayment
}
