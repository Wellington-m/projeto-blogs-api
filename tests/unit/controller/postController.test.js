const { 
  createBlogPost,
  destroy,
  findBlogPostAndCategoryById,
  findBlogPostsAndCategories,
  search,
  update
} = require('../../../src/controllers/postController');

const postService = require('../../../src/services/postService');

const { postResult, postResultById } = require('../../helpers/mockData');

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
    query: 'teste',
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

  it('findBlogPostAndCategoryById return a status 404 and correct message', async () => {
    postService.findBlogPostAndCategoryById = jest.fn().mockResolvedValue(null);
    await findBlogPostAndCategoryById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Post does not exist' });
  });

  it('findBlogPostAndCategoryById return a status 200 and correct result', async () => {
    postService.findBlogPostAndCategoryById = jest.fn().mockResolvedValue(postResultById);
    await findBlogPostAndCategoryById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(postResultById);
  });

  it('findBlogPostsAndCategories', async () => {
    postService.findBlogPostsAndCategories = jest.fn().mockResolvedValue('teste');
    await findBlogPostsAndCategories(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith('teste');
  });

  it('search return a status 200 and correct result', async () => {
    postService.search = jest.fn().mockResolvedValue(postResultById);
    await search(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(postResultById);
  });
});