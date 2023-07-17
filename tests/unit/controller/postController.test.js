const { 
  createBlogPost,
  destroy,
  findBlogPostAndCategoryById,
  findBlogPostsAndCategories,
  search,
  update
} = require('../../../src/controllers/postController');

const postService = require('../../../src/services/postService');

const { postResult } = require('../../helpers/mockData');

describe('Post Controller test', () => {
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockRequest = {
    body: {
      title: 'Titulo test',
      content: 'Content Test',
      categoryIds: 1,
    },
    id: 1,
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createBlogPost return a 400 status code and an error message', async () => {
    postService.createBlogPost = jest.fn().mockResolvedValue(false);
    await createBlogPost(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '"categoryIds" not found' });
  });

  it('createBlogPost return a 201 status code and the result', async () => {
    postService.createBlogPost = jest.fn().mockResolvedValue(postResult);
    await createBlogPost(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(postResult);
  });
});