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

const { postResult, allPosts, postResultById } = require('../../helpers/mockData');

describe('Post Service test', () => {
  beforeAll(() => {
    const categoryMap = {
      1: { id: 1, name: 'Categoria 1' },
      2: { id: 2, name: 'Categoria 2' },
    };

    categoryModel.findByPk = jest.fn((id) => Promise.resolve(categoryMap[id] || null));

    PostCategoryModel.bulkCreate = jest.fn((postCategoryIds) => Promise.resolve());

    blogPostModel.create = jest.fn(({ title, content, userId }) => {
      const createdPost = {
        id: 1,
        title,
        content,
        userId,
      };
      return Promise.resolve({ dataValues: createdPost });
    });

    blogPostModel.findByPk = jest
    .fn()
    .mockResolvedValue({ dataValues: postResult })
    .mockResolvedValueOnce({ dataValues: postResult })
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce({ dataValues: postResultById });

    blogPostModel.findAll = jest
    .fn()
    .mockResolvedValue({ dataValues: allPosts });

  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('findByPk return correct values', async () => {
    const { dataValues: firstCall} = await findByPk(1);
    const secondCall = await findByPk(2);
    expect(firstCall).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      content: expect.any(String),
      userId: expect.any(Number),
      published: expect.any(String),
      updated: expect.any(String),
    }))
    expect(secondCall).toBe(false);
    expect(blogPostModel.findByPk).toHaveBeenCalledTimes(2);
  });

  it('findBlogPostsAndCategories return correct values', async () => {
    const { dataValues: result} = await findBlogPostsAndCategories();
    expect(result).toEqual(allPosts);
  });

  it('findBlogPostAndCategoryById return correct values', async () => {
    const { dataValues } = await findBlogPostAndCategoryById(1);
    expect(dataValues).toEqual(postResultById);
  });

  it('search returns the correct values', async () => {
    const { dataValues } = await search('ano');
    expect(dataValues[0]).toEqual(allPosts[0]);
  });

  it('createBlogPost return false with inválid category', async () => {
    const dataMock = {
      title: 'Teste',
      content: 'Test',
      categoryIds: [3],
      userId: 1,
    }
    const result = await createBlogPost(dataMock);
    expect(result).toBe(false);
  });

  it('createBlogPost return correct values', async () => {
    const dataMock = {
      title: postResult.title,
      content: postResult.content,
      categoryIds: [1, 2],
      userId: postResult.userId,
    }
    const { dataValues } = await createBlogPost(dataMock);
    expect(dataValues).toHaveProperty('content', 'O campeão do ano!');
    expect(dataValues).toHaveProperty('id', 1);
    expect(dataValues).toHaveProperty('published', '2023-06-15');
    expect(dataValues).toHaveProperty('title', 'Fórmula 1');
    expect(dataValues).toHaveProperty('updated', '2023-06-15');
    expect(dataValues).toHaveProperty('userId', 1);
    expect(blogPostModel.findByPk).toHaveBeenCalledTimes(1);
  });
});
