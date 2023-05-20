const request = require('supertest');
const api = require('../../../src/api');
const { User } = require('../../../src/database/models');
const { sequelize: sequelizeCli } = require('../../helpers/constants');
const shell = require('shelljs');

describe('POST Rota: categories/ - Cadastrar uma categoria', () => {
  beforeAll(async () => {
    shell.exec(sequelizeCli.beforetest, {
      silent: false,
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

  it('Não é possível cadastrar uma categoria sem nome', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .post('/categories')
      .set('Authorization', token)
      .send({});

    expect(response.status).toBe(400);
  });
  it('É possível cadastrar uma categoria com sucesso', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .post('/categories')
      .set('Authorization', token)
      .send({
        name: 'Teste',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(['id']);
    expect(response.body).toHaveProperty('name');
  });
});
