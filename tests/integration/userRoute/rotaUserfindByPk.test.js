const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const { registerUser } = require('../../helpers/registerData');
const { sequelize: sequelizeCli } = require('../../helpers/constants');

describe('GET Route: user/:id - search user by ID', () => {
  beforeAll(() => {
    shell.exec(sequelizeCli.beforetest, {
      silent: process.env.DEBUG === 'false',
    });
  });

  afterAll(() => {
    shell.exec(sequelizeCli.posttest, { silent: false });
  });

  it('Is not possible access user route without a token', async () => {
    const response = await request(api).get('/user/1');
    expect(response.body.message).toBe('Token not found');
  });

  it('Is not possible access user route with invalid or expired Token', async () => {
    const response = await request(api)
      .get('/user')
      .set('Authorization', 'invalidToken');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Expired or invalid token');
  });

  it('Is possible find a user by ID', async () => {
    await registerUser();

    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'brett@email.com',
      password: '123456',
    });

    const response = await request(api)
      .get('/user/1')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'displayName', 'email', 'image');
  });

  it('Is displayed the correct message if user does not exist', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'brett@email.com',
      password: '123456',
    });

    const response = await request(api)
      .get('/user/10')
      .set('Authorization', token);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User does not exist');
  });
});
