const { BlogPost: blogPostModel, PostCategory: PostCategoryModel } = require('../database/models');

const createBlogPost = async ({ title, content, categoryIds, userId }) => {
  const { dataValues } = await blogPostModel.create({ title, content, userId });
  const postCategoryIds = categoryIds.reduce((acc, curr, index) => {
    acc[index] = { postId: dataValues.id, categoryId: curr };
    return acc;
  }, []);
  const result = await PostCategoryModel.bulkCreate(postCategoryIds);

  return result;
};

module.exports = { createBlogPost };