const express = require('express');
const userController = require('../controllers/userController');
const createUserValidation = require('../middlewares/createUserValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const userRoute = express.Router();

userRoute.post('/', createUserValidation, userController.create);
userRoute.get('/', tokenValidation, userController.findAll);

module.exports = userRoute;