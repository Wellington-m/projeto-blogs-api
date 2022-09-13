const { BlogPost: blogPostModel, PostCategory: PostCategoryModel } = require('../database/models');

const findByPk = async (id) => {
  const result = await blogPostModel.findByPk(id);
  if (!result) return false;
  return result;
};

const createBlogPost = async ({ title, content, categoryIds, userId }) => {
  const { dataValues } = await blogPostModel.create({ title, content, userId });
  const postCategoryIds = categoryIds.reduce((acc, curr, index) => {
    acc[index] = { postId: dataValues.id, categoryId: curr };
    return acc;
  }, []);
  await PostCategoryModel.bulkCreate(postCategoryIds);
  const result = await findByPk(dataValues.id);
  return result;
};

module.exports = { findByPk, createBlogPost };