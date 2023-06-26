const { destroy } = require('../../../src/services/postService');

const {
  BlogPost: blogPostModel
} = require('../../../src/database/models');

const { postResult } = require('../../helpers/mockData');


describe('Post Service Destroy', () => {
  beforeAll(() => {
    const mockFindByPk = jest
      .fn()
      .mockResolvedValue({ dataValues: postResult})
      .mockResolvedValueOnce(null);
    
    const mockDestroy = jest.fn();

    blogPostModel.findByPk = mockFindByPk;
    blogPostModel.destroy = mockDestroy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Destroy return Post does not exist', async () => {
    const data = {blogPostId: 1, userId: 1};
    const result = await destroy(data);
    expect(result).toBe('Post does not exist');
  });

  it('Destroy return Unauthorized user', async () => {
    const data = {blogPostId: 1, userId: 2};
    const result = await destroy(data);
    expect(result).toBe('Unauthorized user');
  });

  it('Destroy delete a post', async () => {
    const data = {blogPostId: 1, userId: 1};
    const result = await destroy(data);
    expect(result).toBe(true);
  });
});