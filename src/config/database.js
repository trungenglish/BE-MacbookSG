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

class Database{
    constructor() {
        console.log("🔄 [DEBUG] Constructor gọi...");
        if (!Database.instance) {
            this._connect();
            Database.instance = this;
        }else {
            console.log("⚠️ [DEBUG] Instance đã tồn tại!");
        }
        return Database.instance;
    }

    async _connect() {
        try {
            await mongoose.connect(process.env.DB_HOST);

            const state = Number(mongoose.connection.readyState);

            console.log(dbState.find(f => f.value === state).label, "to database");
        } catch (error) {
            console.error("❌ Error connecting to database:", error);
        }
    }
    getConnection() {
        return mongoose.connection;
    }
}


module.exports = Database;