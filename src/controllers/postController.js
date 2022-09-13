const postService = require('../services/postService');

const findBlogPostsAndCategories = async (req, res) => {
  const result = await postService.findBlogPostsAndCategories(req.id);
  return res.status(200).json(result);
};

const findBlogPostAndCategoryById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.findBlogPostAndCategoryById(id);
  return res.status(200).json(result);
};

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req;
  const result = await postService.createBlogPost({ title, content, categoryIds, userId });
  if (!result) return res.status(400).json({ message: '"categoryIds" not found' });
  return res.status(201).json(result);
};

module.exports = { findBlogPostsAndCategories, findBlogPostAndCategoryById, createBlogPost };