const request = require('supertest');
const jwt = require('jsonwebtoken');
const shell = require('shelljs');
const { User } = require('../../../src/database/models');
const api = require('../../../src/api');
const { sequelize: sequelizeCli } = require('../../helpers/constants');

describe('Rota login', () => {
  beforeAll(async () => {
    shell.exec(sequelizeCli.beforetest, {
      silent: process.env.DEBUG === 'false',
    });

    await User.create({
      displayName: 'ola',
      email: 'lewishamilton@gmail.com',
      password: '123456',
      image: 'teste',
    });
  });

  afterAll(() => {
    shell.exec(sequelizeCli.posttest, {
      silent: false,
    });
  });

  it('is possible to login with success', async () => {
    const response = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const { token } = response.body;

    expect(response.status).toBe(200);
    expect(typeof token).toBe('string');

    try {
      const decoded = jwt.verify(token, 'secret');
      expect(decoded).toHaveProperty('id');
    } catch (error) {
      console.log(error);
      throw Error('Seu `token` não consegue ser verificado');
    }
  });

  it('is not possible to login without all fields filled in', async () => {
    const response = await request(api).post('/login').send({
      email: '',
      password: '',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Some required fields are missing');
  });

  it('is not possible to login with user that does not exist', async () => {
    const response = await request(api).post('/login').send({
      email: 'naotemcadastro@algumacoisa.com',
      password: 'teste',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid fields');
  });
});
