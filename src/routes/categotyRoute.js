const express = require('express');
const categoryController = require('../controllers/categoryController');
const tokenValidation = require('../middlewares/tokenValidation');
const createCategoryValidation = require('../middlewares/createCategoryValidation');

const categoryRoute = express.Router();

categoryRoute.get('/', tokenValidation, categoryController.findAll);
categoryRoute.post('/', tokenValidation, createCategoryValidation, categoryController.create);

module.exports = categoryRoute;