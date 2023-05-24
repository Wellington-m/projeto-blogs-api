const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const faker = require('../../helpers/faker');
const { sequelize: sequelizeCli } = require('../../helpers/constants');

describe('POST Route: user/ - Register user', () => {
  beforeAll(() => {
    shell.exec(sequelizeCli.beforetest, {
      silent: process.env.DEBUG === 'false',
    });
  });

  afterAll(() => {
    shell.exec(sequelizeCli.posttest, {
      silent: false,
    });
  });

  it('Is possible to create a user', async () => {
    const response = await request(api).post('/user').send({
      displayName: faker.displayName,
      email: faker.email,
      password: faker.password,
      image: faker.image,
    });

    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('Is not possible to create a user that already exist', async () => {
    const { displayName, email, password, image } = faker;

    await request(api).post('/user').send({
      displayName,
      email,
      password,
      image,
    });

    const response = await request(api).post('/user').send({
      displayName,
      email,
      password,
      image,
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already registered');
  });

  it('Is not possible create a user without name', async () => {
    const { email, password, image } = faker;
    const response = await request(api).post('/user').send({
      email,
      password,
      image,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"displayName" length must be at least 8 characters long'
    );
  });

  it('Is not possible create a user without email', async () => {
    const { displayName, password, image } = faker;
    const response = await request(api).post('/user').send({
      displayName,
      password,
      image,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"email" must be a valid email');
  });

  it('Is not possible create a user without password', async () => {
    const { displayName, email, image } = faker;
    const response = await request(api).post('/user').send({
      displayName,
      email,
      image,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"password" length must be at least 6 characters long'
    );
  });
});
