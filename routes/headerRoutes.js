const express = require("express");
const { addSkillCtrl, getAllSkillsCtrl, deleteSkillCtrl, deleteAllSkillsCtrl, updateSkillCtrl } = require("../controllers/headerControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

//routes
//addSkill router
router.post('/addSkill', addSkillCtrl);

//updateSkill router
router.put('/updateSkill/:id', updateSkillCtrl)

//getSkills router
router.get('/getSkills', getAllSkillsCtrl);

//deleteSkill router
router.delete('/deleteSkill/:id', deleteSkillCtrl);

//deleteAllSkills router
router.delete('/deleteAllSkills', deleteAllSkillsCtrl);

module.exports = router;