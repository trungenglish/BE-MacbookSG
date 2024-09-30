require('dotenv').config();

const connection = require('./config/database');
const express = require('express');
const apiRoutes = require('./routes/index');

const app = express();
const port = process.env.PORT || 8888;
const  hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app. use('/api/v1',apiRoutes);

(async() => {
//test connection
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to db: ", error);
    }
})()