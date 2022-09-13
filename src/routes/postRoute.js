const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const postController = require('../controllers/postController');
const createPostValidation = require('../middlewares/createPostValidation');

const postRoute = express.Router();

postRoute.get('/', tokenValidation, postController.findBlogPostsAndCategories);
postRoute.post('/', tokenValidation, createPostValidation, postController.createBlogPost);

module.exports = postRoute;