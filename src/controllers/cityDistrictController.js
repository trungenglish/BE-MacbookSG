const axios = require('axios')

const getCity = async (req, res) => {
    const data = await axios.get("https://provinces.open-api.vn/api/")
    return res.status(200).json(data.data)
}

const getDistrict = async (req, res) => {
    const data = await axios.get("https://provinces.open-api.vn/api/d/")
    return res.status(200).json(data.data)
}

module.exports = {
    getCity, getDistrict
};