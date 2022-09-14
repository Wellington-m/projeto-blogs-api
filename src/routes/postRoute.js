const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const postController = require('../controllers/postController');
const createPostValidation = require('../middlewares/createPostValidation');
const updatePostValidation = require('../middlewares/updatePostValidation');

const postRoute = express.Router();

postRoute.get('/search', tokenValidation, postController.search);
postRoute.get('/:id', tokenValidation, postController.findBlogPostAndCategoryById);
postRoute.get('/', tokenValidation, postController.findBlogPostsAndCategories);
postRoute.put('/:id', tokenValidation, updatePostValidation, postController.update);
postRoute.post('/', tokenValidation, createPostValidation, postController.createBlogPost);
postRoute.delete('/:id', tokenValidation, postController.destroy);

module.exports = postRoute;