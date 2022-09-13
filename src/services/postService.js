const { 
  BlogPost: blogPostModel,
  PostCategory: PostCategoryModel,
  Category: categoryModel,
  User: userModel,
} = require('../database/models');

const findByPk = async (id) => {
  const result = await blogPostModel.findByPk(id);
  if (!result) return false;
  return result;
};

const findBlogPostsAndCategories = async () => {
  const result = await blogPostModel.findAll(
    { include: [
      { model: userModel, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: categoryModel, as: 'categories', through: { attributes: [] } },
    ],
    },
      );
  // if (!result) return false;
  return result;
};

const createBlogPost = async ({ title, content, categoryIds, userId }) => {
  const categoryIdsPromises = categoryIds.map((id) => categoryModel.findByPk(id));
  const categories = await Promise.all(categoryIdsPromises);
  if (categories.some((category) => category === null)) return false;
  const { dataValues } = await blogPostModel.create({ title, content, userId });
  const postCategoryIds = categoryIds.reduce((acc, curr, index) => {
    acc[index] = { postId: dataValues.id, categoryId: curr };
    return acc;
  }, []);
  await PostCategoryModel.bulkCreate(postCategoryIds);
  const result = await findByPk(dataValues.id);
  return result;
};

module.exports = { findByPk, findBlogPostsAndCategories, createBlogPost };