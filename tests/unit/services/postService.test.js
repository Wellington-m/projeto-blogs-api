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

    blogPostModel.create = jest.fn(({ title, content, userId }) => {
      const createdPost = {
        id: 1,
        title,
        content,
        userId,
      };
      return Promise.resolve({ dataValues: createdPost });
    });

    PostCategoryModel.bulkCreate = jest.fn((postCategoryIds) => Promise.resolve());

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
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          content: expect.any(String),
          userId: expect.any(Number),
          published: expect.any(String),
          updated: expect.any(String),
          user: expect.objectContaining({
            id: expect.any(Number),
            displayName: expect.any(String),
            email: expect.any(String),
            image: expect.any(String),
          }),
          categories: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            })
          ]),
        })
      ])
    );
  });

  it('findBlogPostAndCategoryById return correct values', async () => {
    const { dataValues } = await findBlogPostAndCategoryById(1);
    expect(dataValues).toHaveProperty("id", 1);
    expect(dataValues).toHaveProperty("title", "Post do Ano");
    expect(dataValues).toHaveProperty("content", "Melhor post do ano");
    expect(dataValues).toHaveProperty("userId", 1);
    expect(dataValues).toHaveProperty("published", "2011-08-01");
    expect(dataValues).toHaveProperty("updated", "2011-08-01");
    expect(dataValues.user).toHaveProperty("id", 1);
    expect(dataValues.user).toHaveProperty("displayName", "Lewis Hamilton");
    expect(dataValues.user).toHaveProperty("email", "lewishamilton@gmail.com");
    expect(dataValues.user).toHaveProperty("image", "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg");
    expect(dataValues.categories[0]).toHaveProperty("id", 1);
    expect(dataValues.categories[0]).toHaveProperty("name", "Inovação");
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