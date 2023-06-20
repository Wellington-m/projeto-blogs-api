// Mock da função findBlogPostAndCategoryById
// jest.mock('../../../src/services/postService', () => ({
//   update: jest.requireActual('../../../src/services/postService').update // Mantém a importação real
// }));

const {
  update
} = require('../../../src/services/postService');

const {
  BlogPost: blogPostModel
} = require('../../../src/database/models');


const { postUpdated, postResult } = require('../../helpers/mockData');

describe('Post Service Update test', () => {
  beforeAll(() => {
    const mockFindByPk = jest
      .fn()
      .mockResolvedValue({ dataValues: postUpdated})
      .mockResolvedValueOnce({ dataValues: postResult });
    const mockUpdate = jest.fn();

    blogPostModel.findByPk = mockFindByPk;
    blogPostModel.update = mockUpdate;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('update return correct values', async () => {
    const dataMock = {
      title: 'Test',
      content: 'Test',
      blogPostId: 1,
      userId: 1,
    };

    const { dataValues } = await update(dataMock);
    expect(dataValues).toEqual(postUpdated);
  });

  it('update return false', async () => {
    const dataMock = {
      title: 'Test',
      content: 'Test',
      blogPostId: 1,
      userId: 2,
    };

    const result = await update(dataMock);
    expect(result).toBe(false);
  });
});