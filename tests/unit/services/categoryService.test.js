jest.mock('../../../src/database/models');

const { findAll, create } = require('../../../src/services/categoryService');
const { Category: categoryModel } = require('../../../src/database/models');
const { findAllResult, createResult } = require('../../helpers/mockData');

describe('Category Service test', () => {
  beforeAll(() => {
    categoryModel.findAll.mockImplementation(() => {
      return Promise.resolve(findAllResult);
    });

    categoryModel.create.mockImplementation(() => {
      return Promise.resolve(createResult);
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('is possible list all categories', async () => {
    const result = await findAll();
    expect(result).toEqual(findAllResult);
  });
  it('is possible create a categorie', async () => {
    const result = await create('Teste');
    expect(result).toEqual(createResult);
  });
});
