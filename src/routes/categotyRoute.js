const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRoute = express.Router();

categoryRoute.post('/', categoryController.create);

module.exports = categoryRoute;