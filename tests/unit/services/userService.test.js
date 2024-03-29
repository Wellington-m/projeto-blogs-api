jest.mock('../../../src/database/models');

const { User: userModel } = require('../../../src/database/models');
const { create, destroy, findAll, findByEmail, findByPk } = require('../../../src/services/userService');
const { allUsers, userResult } = require('../../helpers/mockUserData');

describe('Post Service User', () => {
  beforeAll(() => {
    const mockFindAll = jest
      .fn()
      .mockResolvedValue([{ dataValues: allUsers }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ dataValues: userResult }])
      .mockResolvedValueOnce([{ dataValues: userResult }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ dataValues: allUsers }])
      .mockResolvedValueOnce([{ dataValues: allUsers[0] }])
      .mockResolvedValueOnce([]);

    const mockFindByPk = jest
      .fn()
      .mockResolvedValue(userResult)
      .mockResolvedValueOnce(null);
    
    const mockCreate = jest
      .fn()
      .mockResolvedValue(userResult);

    const mockDestroy = jest.fn();

    userModel.findAll = mockFindAll;
    userModel.findByPk = mockFindByPk;
    userModel.create = mockCreate;
    userModel.destroy = mockDestroy;
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('findByEmail returns null when there is no user', async () => {
    const data = { email: 'lewishamilton@gmail.com', password: '1234567' };
    const result = await findByEmail(data);
    expect(result).toBe(null);
  });

  it('findByEmail returns null when password is incorrect', async () => {
    const data = { email: 'lewishamilton@gmail.com', password: '1234567' };
    const result = await findByEmail(data);
    expect(result).toBe(null);
  });

  it('findByEmail returns token', async () => {
    const data = { email: 'lewishamilton@gmail.com', password: '123456' };
    const result = await findByEmail(data);
    expect(typeof result).toBe('string');
    expect(result).toHaveLength(137);
  });

  it('findByPk returns correct value if not find a user', async () => {
    const result = await findByPk(5);
    expect(result).toBeNull();
  });

  it('findByPk returns correct value', async () => {
    const result = await findByPk(1);
    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('displayName', "Lewis Hamilton");
    expect(result).toHaveProperty('email', "lewishamilton@gmail.com");
    expect(result).toHaveProperty('image', "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg");
  });

  it('findAll returns null if no users was found', async () => {
    const result = await findAll();
    expect(result).toBeNull();
  });

  it('findAll returns correct values', async () => {
    const [result] = await findAll();
    expect(result.dataValues).toEqual(allUsers);
  });

  it('create returns null if no user was found', async () => {
    const { displayName, email, password, image } = allUsers[0];
    const result = await create({ displayName, email, password, image });
    expect(result).toBeNull();
  });

  it('create returns a valid token if create user', async () => {
    const { displayName, email, password, image } = allUsers[0];
    const result = await create({ displayName, email, password, image });
    expect(typeof result).toBe('string');
    expect(result).toHaveLength(137);
  });

  it('destroy returns true', async () => {
    const result = await destroy(1);
    expect(result).toBe(true);
  });
});