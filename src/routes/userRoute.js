const express = require('express');
const userController = require('../controllers/userController');
const loginValidation = require('../middlewares/loginValidation');

const userRoute = express.Router();

userRoute.post('/', loginValidation, userController.findByEmail);

module.exports = userRoute;