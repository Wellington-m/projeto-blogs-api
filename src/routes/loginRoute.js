const express = require('express');
const userController = require('../controllers/userController');
const loginValidation = require('../middlewares/loginValidation');

const loginRoute = express.Router();

loginRoute.post('/', loginValidation, userController.login);

module.exports = loginRoute;