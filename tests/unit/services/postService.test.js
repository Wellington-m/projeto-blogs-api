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

    blogPostModel.findByPk = jest.fn((id) => {
      const post = {
        id: 1,
        title: 'Fórmula 1',
        content: 'O campeão do ano!',
        userId: 1,
        published: '2023-06-15',
        updated: '2023-06-15'
      };
      return Promise.resolve({ dataValues: post });
    });
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Is not possible to create a post with inválid category', async () => {
    const dataMock = {
      title: 'Teste',
      content: 'Test',
      categoryIds: [3],
      userId: 1,
    }
    const result = await createBlogPost(dataMock);
    expect(result).toBe(false);
  });

  it('Is possible to create a post', async () => {
    const dataMock = {
      title: 'Fórmula 1',
      content: 'O campeão do ano!',
      categoryIds: [1, 2],
      userId: 1,
    }
    const { dataValues } = await createBlogPost(dataMock);
    expect(dataValues).toHaveProperty('content', 'O campeão do ano!');
    expect(dataValues).toHaveProperty('id', 1);
    expect(dataValues).toHaveProperty('published', '2023-06-15');
    expect(dataValues).toHaveProperty('title', 'Fórmula 1');
    expect(dataValues).toHaveProperty('updated', '2023-06-15');
    expect(dataValues).toHaveProperty('userId', 1);
  });
});
