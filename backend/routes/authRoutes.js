const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/userlogin', authController.userlogin);
authRouter.post('/hospitallogin', authController.hospitallogin);
authRouter.post('/adminlogin', authController.adminlogin);



module.exports = authRouter;