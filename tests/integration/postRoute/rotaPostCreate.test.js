const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const { User, Category } = require('../../../src/database/models');
const { sequelize: sequelizeCli } = require('../../helpers/constants');

describe('POST Route: /post - Create a post', () => {
  beforeAll(async () => {
    shell.exec(sequelizeCli.beforetest, {
      silent: false,
    });

    await User.create({
      displayName: 'lewis',
      email: 'lewishamilton@gmail.com',
      password: '123456',
      image: 'teste',
    });

    await Category.create({
      name: 'Categoria 1',
    });
  });

  afterAll(() => {
    shell.exec(sequelizeCli.posttest, {
      silent: false,
    });
  });

  it('isnt possible create a post without title', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .post('/post')
      .set('Authorization', token)
      .send({
        content: 'O campeão do ano!',
        categoryIds: [1],
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Some required fields are missing');
  });

  it('isnt possible create a post without content', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .post('/post')
      .set('Authorization', token)
      .send({
        title: 'teste',
        categoryIds: [1],
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Some required fields are missing');
  });

  it('isnt possible create a post without category', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .post('/post')
      .set('Authorization', token)
      .send({
        title: 'teste',
        content: 'Thor: o vingador mais forte',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Some required fields are missing');
  });

  it('isnt possible create a post with invalid categoryId', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .post('/post')
      .set('Authorization', token)
      .send({
        title: 'Teste titulo',
        content: 'O campeão do ano!',
        categoryIds: [10],
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"categoryIds" not found');
  });

  it('is possible create a post', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api)
      .post('/post')
      .set('Authorization', token)
      .send({
        title: 'Teste titulo',
        content: 'O campeão do ano!',
        categoryIds: [1],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      'id',
      'title',
      'content',
      'userId',
      'published',
      'updated'
    );
  });
});
