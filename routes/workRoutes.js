const express = require("express");
// const formidable = require('express-formidable');
const { createWorkCtrl, updateWorkCtrl, deleteWorkCtrl, getAllWorkCtrl, deleteAllWorkCtrl, getSingleWorkCtrl } = require("../controllers/workControllers");

const router = express.Router();

//routes
//create-work router
router.post('/create-work', createWorkCtrl);

//update-work router
router.put('/update-work/:id', updateWorkCtrl);

//delete-work router
router.delete('/delete-work/:id', deleteWorkCtrl);

//get-single-works router
router.get('/get-single-work/:id', getSingleWorkCtrl);


//get-all-works router
router.get('/get-all-works', getAllWorkCtrl);

//delete-all-work
router.delete('/delete-all-work', deleteAllWorkCtrl)

module.exports = router;