jest.mock('../../../src/database/models');

const { User: userModel } = require('../../../src/database/models');
const { create, destroy, findAll, findByEmail, findByPk } = require('../../../src/services/userService');
const { allUsers, userResult } = require('../../helpers/mockUserData');

describe('Post Service User', () => {
  beforeAll(() => {
    const mockFindAll = jest
      .fn()
      .mockResolvedValue([{ dataValues: userResult }])
      .mockResolvedValueOnce([]);

    userModel.findAll = mockFindAll;
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
});