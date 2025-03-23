require('dotenv').config();

const Database = require('./config/database');
const db1 = new Database();
const db2 = new Database();
const db3 = new Database();

const express = require('express');
const apiRoutes = require('./routes/index');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;
const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? '0.0.0.0' : 'localhost';

//config cors
const corsOptions = {
    origin: [
        'https://trungenglishmacbooksgclient.vercel.app',
        'https://trungenglishmacbooksgadmin.vercel.app',
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,  // Nếu bạn đang truyền cookies hoặc session
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(compression());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app. use('/api/v1',apiRoutes);

app.listen(port, host, () => {
    console.log(`🚀 Backend is running on http://${host}:${port}`);
});

// (async() => {
// //test connection
//     try {
//         await connection();
//         app.listen(port, host, () => {
//             console.log(`Backend zero app listening on port ${port}`)
//         })
//     } catch (error) {
//         console.log(">>> Error connect to db: ", error);
//     }
// })()