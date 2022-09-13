const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const postController = require('../controllers/postController');

const postRoute = express.Router();

postRoute.post('/', tokenValidation, postController.createBlogPost);

module.exports = postRoute;