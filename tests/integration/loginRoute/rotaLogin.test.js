const request = require('supertest');
const jwt = require('jsonwebtoken');
const shell = require('shelljs');
const { User } = require('../../../src/database/models');
const api = require('../../../src/api');
const { sequelize: sequelizeCli } = require('../../helpers/constants');

describe.skip('Rota login', () => {
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

  it('É possível fazer login com sucesso', async () => {
    const response = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456s',
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

  it('Não é possível fazer login sem todos os campos preenchidos', async () => {
    const { body } = await frisby
      .post(`${apiURL}/login`, {
        email: '',
        password: '',
      })
      .expect('status', 400);
    const result = JSON.parse(body);
    expect(result.message).toBe('Some required fields are missing');
  });

  it('Não é possível fazer login com um usuário que não existe', async () => {
    const { body } = await frisby
      .post(`${apiURL}/login`, {
        email: 'naotemcadastro@algumacoisa.com',
        password: 'teste',
      })
      .expect('status', 400);
    const result = JSON.parse(body);
    expect(result.message).toBe('Invalid fields');
  });
});
