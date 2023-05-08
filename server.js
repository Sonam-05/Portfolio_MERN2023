const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/db');
const path = require('path')

const app = express();

//config
dotenv.config();

connectMongoDB();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//port
const port = process.env.PORT || 8080 ;

//route
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/header', require('./routes/headerRoutes'));
app.use('/api/v1/work', require('./routes/workRoutes'));

// static files
app.use(express.static(path.join(__dirname, './portfolio/build')))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './portfolio/build/index.html'))
})

//listen node application(server)
app.listen(port, () => {
    // console.log(`Server is running on port : ${process.env.PORT}  in mode : ${process.env.MODE}`.bgGreen)
});