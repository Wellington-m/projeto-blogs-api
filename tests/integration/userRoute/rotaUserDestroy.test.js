const request = require('supertest');
const api = require('../../../src/api');
const { registerUser } = require('../../helpers/registerData');
const { sequelize: sequelizeCli } = require('../../helpers/constants');
const shell = require('shelljs');

describe('DELETE Route: user/me - delete logged in user', () => {
  beforeAll(async () => {
    shell.exec(sequelizeCli.beforetest, { silent: 'false' });
    await registerUser();
  });

  afterAll(() => {
    shell.exec(sequelizeCli.posttest, { silent: false });
  });

  it('Is possible to delete the logged in user', async () => {
    const {
      body: { token },
    } = await request(api).post('/login').send({
      email: 'brett@email.com',
      password: '123456',
    });

    const response = await request(api)
      .del('/user/me')
      .set('Authorization', token);

    expect(response.status).toBe(204);
  });
});
