const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.get('/', userController.findAll);

module.exports = userRoute;