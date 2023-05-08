const express = require('express');
const { registerCtrl, loginCtrl, forgotPasswordCtrl } = require('../controllers/userControllers');
const authMiddlewares = require('../middlewares/authMiddlewares');

const router = express.Router();

//routes
//register router
router.post('/register', registerCtrl);

//login router
router.post('/login', loginCtrl);

//forgotPassword router
router.put('/forgot-password', authMiddlewares, forgotPasswordCtrl);

module.exports = router;
