jest.mock('../../../src/services/categoryService');

const { findAll, create } = require('../../../src/controllers/categoryController');
const categoryService = require('../../../src/services/categoryService');
const { findAllResult, createResult } = require('../../helpers/mockData');

describe('Category Controller test', () => {
  const mockRequest = {
    body: {
      name: 'Test Category',
    },
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findAll should return a 200 status code and the result', async () => {
    categoryService.findAll = jest.fn().mockResolvedValue(findAllResult);
    await findAll(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(findAllResult);
  });

  it('findAll should return a 500 status code and an error message when an error occurs', async () => {
    categoryService.findAll = jest.fn().mockRejectedValue(new Error('Server error'));
    await findAll(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error' });
  });

  it('create should return a 201 status code and the result', async() => {
    categoryService.create = jest.fn().mockResolvedValue({ dataValues: createResult});

    await create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(createResult);
  });

  it('create should return a 500 status code and an error message when an error occurs', async() => {
    categoryService.create = jest.fn().mockRejectedValue(new Error('Server error'));
    await create(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
});