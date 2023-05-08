const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    }, 
    password : {
        type : String, 
        required : true
    },
    contact : {
        type : String, 
        required : true
    },
    address : {
        type : String, 
        required : true
    },
    answer : {
        type : String, 
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
}, {timestamps : true});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;