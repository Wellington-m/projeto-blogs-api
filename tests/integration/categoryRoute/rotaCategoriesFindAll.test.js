const request = require('supertest');
const api = require('../../../src/api');
const shell = require('shelljs');
const { User, Category } = require('../../../src/database/models');
const { sequelize: sequelizeCli } = require('../../helpers/constants');

describe('GET Rota: categories/ - Localizar todas as categorias', () => {
  beforeAll(async () => {
    shell.exec(sequelizeCli.beforetest, { silent: false });

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

  it('Não houver categorias cadastradas retorna um array vazio', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .get('/categories')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it('Houver categorias cadastradas retorna um array com as categorias', async () => {
    Category.create({
      name: 'Categoria 1',
    });

    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .get('/categories')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});
