const postService = require('../services/postService');

const findBlogPostsAndCategories = async (_req, res) => {
  const result = await postService.findBlogPostsAndCategories();
  console.log(result);
};

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req;
  const result = await postService.createBlogPost({ title, content, categoryIds, userId });
  if (!result) return res.status(400).json({ message: '"categoryIds" not found' });
  return res.status(201).json(result);
};

module.exports = { createBlogPost, findBlogPostsAndCategories };