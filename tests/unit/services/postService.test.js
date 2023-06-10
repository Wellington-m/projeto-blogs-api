jest.mock('../../../src/database/models');

const {
  BlogPost: blogPostModel,
  PostCategory: PostCategoryModel,
  Category: categoryModel,
  User: userModel,
} = require('../../../src/database/models');

const {
  createBlogPost,
  destroy,
  findBlogPostAndCategoryById,
  findBlogPostsAndCategories,
  findByPk,
  search,
  update,
} = require('../../../src/services/postService');
