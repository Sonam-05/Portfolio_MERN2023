const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
},{timestamps : true});

const skillsModel = mongoose.model("skills", SkillsSchema);
module.exports = skillsModel;

