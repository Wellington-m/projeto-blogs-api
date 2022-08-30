const express = require('express');
const userController = require('../controllers/userController');
const createUserValidation = require('../middlewares/createUserValidation');

const userRoute = express.Router();

userRoute.post('/', createUserValidation, userController.create);

module.exports = userRoute;