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
    params: {
      id: 1,
    },
  };

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

  it('destroy return a 401 status and correct message', async () => {
    postService.destroy = jest.fn().mockResolvedValue('Unauthorized user');
    await destroy(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unauthorized user' });
  });

  it('destroy return a 404 status and correct message', async () => {
    postService.destroy = jest.fn().mockResolvedValue('Post does not exist');
    await destroy(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Post does not exist' });
  });

  it('destroy return a 204 status', async () => {
    postService.destroy = jest.fn().mockResolvedValue(true);
    await destroy(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });
});