const colors = require("colors");
const skillsModel = require("../models/skillsModel");

//addSkillCtrl
const addSkillCtrl = async (req, res) => {
    try{
        const skillExist = await skillsModel.findOne({name : req.body.name});
        if(skillExist){
            return res.status(201).send({status : false, message : `${req.body.name} skill is already present`})
        }
        const skill = new skillsModel(req.body);
        await skill.save();
        res.status(200).send({success : true, message : `${req.body.name} skill added successfully`});
    }catch(error){
        res.status(500).send({success : false, message : `Error in SkillsCtrl : ${error.message}`.bgRed})
    }
}

//updateSkillCtrl
const updateSkillCtrl = async (req, res) => {
    try{
        const skill = await skillsModel.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new : true});
        await skill.save();
        res.status(200).send({success : true, message : 'Skill updated successfully', skill});
    }catch(error){
        res.status(500).send({success : false, message : `Error in updateSkillCtrl : ${error.message}`.bgRed})
    }
}

//getAllSkillsCtrl
const getAllSkillsCtrl = async (req, res) => {
    try{
        const skills = await skillsModel.find();
        return res.status(200).send({success : true, message : 'All skills fetched successfully', skills})
    }catch(error){
        res.status(500).send({success : false, message : `Error in getAllSkillsCtrl : ${error.message}`.bgRed}) 
    }
}

//deleteSkill Ctrl
const deleteSkillCtrl = async (req, res) => {
    try{
        const skill = await skillsModel.findByIdAndDelete(req.params.id);
        res.status(200).send({success : true, message : `${skill.name} skill deleted successfully`});
    }catch(error){
        res.status(500).send({success : false, message : `Error in deleteSkillCtrl : ${error.message}`.bgRed}) 
    }
}

//deleteAllSkillsCtrl
const deleteAllSkillsCtrl = async (req, res) => {
    try{
        await skillsModel.deleteMany({});
        res.status(200).send({success : true, message : 'All skills deleted successfully'});
    }catch(error){
        res.status(500).send({success : false, message : `Error in deleteAllSkillsCtrl : ${error.message}`.bgRed})
    }
}

module.exports = {addSkillCtrl, updateSkillCtrl, getAllSkillsCtrl, deleteSkillCtrl, deleteAllSkillsCtrl}