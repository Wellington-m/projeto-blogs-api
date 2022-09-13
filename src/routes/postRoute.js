const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const postController = require('../controllers/postController');
const createPostValidation = require('../middlewares/createPostValidation');
const updatePostValidation = require('../middlewares/updatePostValidation');

const postRoute = express.Router();

postRoute.get('/:id', tokenValidation, postController.findBlogPostAndCategoryById);
postRoute.get('/', tokenValidation, postController.findBlogPostsAndCategories);
postRoute.put('/:id', tokenValidation, updatePostValidation, postController.update);
postRoute.post('/', tokenValidation, createPostValidation, postController.createBlogPost);

module.exports = postRoute;