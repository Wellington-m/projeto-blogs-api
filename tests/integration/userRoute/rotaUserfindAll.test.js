const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const { registerUser } = require('../../helpers/registerData');
const { sequelize: sequelizeCli } = require('../../helpers/constants');

describe('GET Route: user/ - list all users', () => {
  beforeAll(() => {
    shell.exec(sequelizeCli.beforetest, {
      silent: process.env.DEBUG === 'false',
    });
  });

  afterAll(() => {
    shell.exec(sequelizeCli.posttest, { silent: false });
  });

  it('Token was not informed', async () => {
    const response = await request(api).get('/user');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token not found');
  });

  it('Token is invalid or expired', async () => {
    const response = await request(api)
      .get('/user')
      .set('Authorization', 'invalidToken');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Expired or invalid token');
  });

  it('Valid token is returned all users', async () => {
    await registerUser();
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'brett@email.com',
      password: '123456',
    });

    const response = await request(api)
      .get('/user')
      .set('Authorization', token);

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty(
      'id',
      'displayName',
      'email',
      'image'
    );
  });
});
