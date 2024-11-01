require('dotenv').config();

const mongoose = require('mongoose');

var dbState = [{
    value: 0,
    label: "disconnected"
    },
    {
        value: 1,
        label: "connected"
    },
    {
        value: 2,
        label: "connecting"
    },
    {
        value: 3,
        label: "disconnecting"
    }];

const connection = async () => {
    await mongoose.connect(process.env.DB_HOST);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, "to database"); //connected to db
}

module.exports = connection;