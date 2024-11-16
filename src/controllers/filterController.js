const {filterIncreaseService} = require("../services/filterService");

const filterIncrease = async (req, res) => {
    const { id } = req.params;
    const data = await filterIncreaseService(id);
    return res.status(200).json(data);
}

const filterDecrease = async (req, res) => {
    const { id } = req.params;
    const data = await filterIncreaseService(id);
    return res.status(200).json(data);
}

module.exports = {
    filterIncrease, filterDecrease
}