require('dotenv').config();

const connection = require('./config/database');
const express = require('express');
const apiRoutes = require('./routes/index');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;
const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? '0.0.0.0' : 'localhost';

//config cors
const corsOptions = {
    origin: [
        'https://trungenglishmacbooksgadmin.vercel.app',
        'https://trungenglishmacbooksg.vercel.app'
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};

app.use(cors(corsOptions));

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app. use('/api/v1',apiRoutes);


(async() => {
//test connection
    try {
        await connection();
        app.listen(port, host, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to db: ", error);
    }
})()