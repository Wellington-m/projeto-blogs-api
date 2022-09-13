const postService = require('../services/postService');

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req;
  const result = await postService.createBlogPost({ title, content, categoryIds, userId });
  return res.status(201).json({ result });
};

module.exports = { createBlogPost };