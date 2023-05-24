const {
  User,
  Category,
  BlogPost,
  PostCategory,
} = require('../../src/database/models');
const { insert } = require('./queries');

const registerUser = async () => {
  const { displayName, email, password, image } = insert.user;
  const userCreated = await User.create({
    displayName,
    email,
    password,
    image,
  });

  return userCreated;
};
const registerCategory = async () => {
  const { name } = insert.categories;
  const categoryCreated = await Category.create({
    name,
  });

  return categoryCreated;
};
const registerBlogPost = async () => {
  const { title, content, userId, published, updated } = insert.blogPosts;
  const blogPostsCreated = await BlogPost.create({
    title,
    content,
    userId,
    published,
    updated,
  });

  return blogPostsCreated;
};
const registerPostCategory = async () => {
  const { categoryId, postId } = insert.postCategories;
  const postCategoryCreated = await PostCategory.create({
    categoryId,
    postId,
  });

  return postCategoryCreated;
};

module.exports = {
  registerUser,
  registerCategory,
  registerBlogPost,
  registerPostCategory,
};
