const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");

const registerCtrl = async (req, res) => {
    try{
        const existingUser = await userModel.findOne({email : req.body.email});
        if(existingUser){
            return res.status(201).send({success : false, message : "User already exists, please sign in!!!"})
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const user = new userModel(req.body);
        await user.save();
        return res.status(200).send({success : true, message : 'User Registered Successfully'})
    }catch(error){
        res.status(500).send(`Error in registerCtrl api : ${error.message}`.bgRed);
    }
};

const loginCtrl = async (req, res) => {
    try{
        const user = await userModel.findOne({email : req.body.email});
        if(!user){
            return res.status(201).send({success : false, message : 'User not found'});
        }
        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordMatched){
            return res.status(201).send({success : false, message : 'Invalid Credentials'})
        }
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRETKEY, {expiresIn : "1d"})
        return res.status(200).send({success : true, message : 'Login Successful', token});
    }catch(error){
        res.status(500).send({success : false, message : `error in loginCtrl api : ${error.message}`.bgRed})
    }
}

const forgotPasswordCtrl = async (req, res) => {
    try{
        const user = await userModel.findOne({email : req.body.email});
        if(!(user.answer == req.body.answer)){
            return res.status(201).send({success : false, message : 'Invalid Credentials!!!'})
        }
        user.answer = req.body.answer;
        await userModel.findByIdAndUpdate(user._id, {password : req.body.password}, {new:true});
        return res.status(200).send({success : true, message : 'Password Reset Successful'}); 
    }catch(error){
        res.status(500).send({success : false, message : `error in forgotPasswordCtrl api : ${error.message}`.bgRed})
    }
}

module.exports = {registerCtrl, loginCtrl, forgotPasswordCtrl}