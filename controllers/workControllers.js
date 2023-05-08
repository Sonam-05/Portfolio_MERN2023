const colors = require('colors')
const fs = require('fs');
const workModel = require("../models/workModel");

//createWorkCtrl
const createWorkCtrl = async (req, res) => {
    try {
        const { name, description,link, photo } = req.body;

        if (!name) {
            return res.status(201).send({ success: false, message: 'name is required' });
        }
        if (!description) {
            return res.status(201).send({ success: false, message: 'description is required' });
        }
        if (!link) {
            return res.status(201).send({ success: false, message: 'link is required' });
        }
        if (!photo) {
            return res.status(201).send({ success: false, message: 'photo is required' });
        }

        const work = new workModel(req.body);
        await work.save();
        return res.status(200).send({ success: true, message: `${name} work created successfully`, work });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in createWorkCtrl api : ${error.message}`.bgRed })
    }
};

//updateWorkCtrl
const updateWorkCtrl = async (req, res) => {
    try{
        const {name , description,link, photo} = req.body;

        if(!name){
            return res.status(500).send({success : false, message : 'work name is required'});
        }
        if(!description){
            return res.status(500).send({ success : false, message : 'work description is required'})
        }
        if (!link) {
            return res.status(201).send({ success: false, message: 'link is required' });
        }
        if(!photo){
            return res.status(500).send({success : false, message : 'photo is required'});
        }
        const work = await workModel.findByIdAndUpdate(req.params.id, {...req.body}, {new : true});
        await work.save();
        return res.status(200).send({ success: true, message: `${name} work updated successfully`, work });
    }catch(error){
        res.status(500).send({ success : false, message : `Error in updateWorkCtrl api : ${error.message}`.bgRed})
    }
};

//deleteWorkCtrl
const deleteWorkCtrl = async (req, res) => {
    try{
        const work = await workModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({success : true, message : `${work.name} deleted successfully`});
    }catch(error){
        res.status(500).send({ success : false, message : `Error in updateWorkCtrl api : ${error.message}`.bgRed})
    }
}

//getSingleWorkCtrl
const getSingleWorkCtrl = async (req, res) => {
    try{
        const work = await workModel.findById(req.params.id);
        return res.status(200).send({success : true, message : 'Single work fetched successfully', work});
    }catch(error){
        res.status(500).send({ success : false, message : `Error in getSingleWorkCtrl api : ${error.message}`.bgRed})
    }
}

//getAllWorkCtrl
const getAllWorkCtrl = async (req, res) => {
    try{
        const works = await workModel.find({});
        return res.status(200).send({success : true, message : 'All works fetched successfully', works});
    }catch(error){
        res.status(500).send({ success : false, message : `Error in getAllWorkCtrl api : ${error.message}`.bgRed})
    }
}

//deleteAllWorkCtrl
const deleteAllWorkCtrl = async (req, res) => {
    try{
        await workModel.deleteMany({});
        res.status(200).send({success : true, message : 'All works deleted successfully'});
    }catch(error){
        res.status(500).send({success : false, message : `Error in deleteAllWorkCtrl : ${error.message}`.bgRed})
    }
}

// //getWorkPhotoCtrl
// const getWorkPhotoCtrl = async (req, res) => {
//     try {
//         const work = await workModel.findById(req.params.id).select("photo")
//         if (work.photo.data) {
//             res.set("Content-type", work.photo.contentType);
//             return res.status(200).send(work.photo.data)
//         }
//     } catch (error) {
//         res.status(500).send({ success: false, message: `get work photo api issue : ${error}`, error })
//     }
// }

module.exports = { createWorkCtrl, updateWorkCtrl, getSingleWorkCtrl, getAllWorkCtrl, deleteWorkCtrl, deleteAllWorkCtrl }