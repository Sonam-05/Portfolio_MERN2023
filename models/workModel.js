const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : true
    }
}, {timestamps : true});

const workModel = mongoose.model('works', workSchema);
module.exports = workModel;