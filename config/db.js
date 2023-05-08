const mongoose = require('mongoose');
const colors = require('colors');

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
    }catch(error){
        console.log(error)
    }
}

module.exports = connectMongoDB;