const {
  create,
  destroy,
  findAll,
  findByPk,
  login
} = require('../../../src/controllers/userController');

const userService = require('../../../src/services/userService');

describe('User Controller test', () => {
  const mockRequest = {
    body: {
      displayName: 'Name teste',
      email: 'email@email.com',
      password: '123456',
      image: 'urlToImage',
    }
  };
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create return a 409 status code and the correct message', async () => {
    userService.create = jest.fn().mockResolvedValue(null);
    await create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User already registered' });
  });

  it('create return a 201 status code and a token', async () => {
    userService.create = jest.fn().mockResolvedValue('tokenMocked');
    await create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ token: 'tokenMocked'});
  });

  it('create return a 500 status code and the correct message', async () => {
    userService.create = jest.fn().mockRejectedValue(new Error('Server error'));
    await create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error'});
  });
});