const {
  create,
  destroy,
  findAll,
  findByPk,
  login
} = require('../../../src/controllers/userController');

const userService = require('../../../src/services/userService');
const { allUsers, userResult } = require('../../helpers/mockUserData');

describe('User Controller test', () => {
  const mockRequest = {
    body: {
      displayName: 'Name teste',
      email: 'email@email.com',
      password: '123456',
      image: 'urlToImage',
    },
    params: 1
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

  it('destroy return a 204 status code', async () => {
    userService.destroy = jest.fn().mockResolvedValue(true);
    await destroy(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });

  it('destroy return a 500 status code and the correct message', async () => {
    userService.destroy = jest.fn().mockRejectedValue(new Error('Server error'));
    await destroy(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error' });
  });

  it('findAll return a 204 status code and the correct message', async () => {
    userService.findAll = jest.fn().mockResolvedValue(null);
    await findAll(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No user was found!' });
  });

  it('findAll return a 200 status code and the correct result', async () => {
    userService.findAll = jest.fn().mockResolvedValue(allUsers);
    await findAll(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(allUsers);
  });

  it('findAll return a 500 status code and the correct message', async () => {
    userService.findAll = jest.fn().mockRejectedValue(new Error('Server error'));
    await findAll(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error' });
  });

  it('findByPk return a 404 status code and the correct message', async () => {
    userService.findByPk = jest.fn().mockResolvedValue(null);
    await findByPk(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User does not exist' });
  });

  it('findByPk return a 200 status code and the correct result', async () => {
    userService.findByPk = jest.fn().mockResolvedValue(userResult);
    await findByPk(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(userResult);
  });

  it('findByPk return a 500 status code and the correct message', async () => {
    userService.findByPk = jest.fn().mockRejectedValue(new Error('Server error'));
    await findByPk(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error' });
  });

  it('login return a 400 status code and the correct message', async () => {
    userService.findByEmail = jest.fn().mockResolvedValue(null);
    await login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid fields' });
  });

  it('login return a 200 status code and the correct result', async () => {
    userService.findByEmail = jest.fn().mockResolvedValue('token');
    await login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ token: 'token' });
  });

  it('login return a 500 status code and the correct message', async () => {
    userService.findByEmail = jest.fn().mockRejectedValue(new Error('Server error'));
    await login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
});