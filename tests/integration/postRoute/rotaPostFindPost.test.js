const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const {sequelize: sequelizeCli} = require('../../helpers/constants');
const { registerUser, registerBlogPost ,registerCategory, registerPostCategory } = require('../../helpers/registerData');

describe('GET Rota: /post/ - Lista todos os posts', () => {
    beforeAll(async () => {
        shell.exec(sequelizeCli.beforetest, {
            silent: false,
        });

        await registerUser();
    });

    afterAll(() => {
      shell.exec(sequelizeCli.posttest, {
        silent: false,
      })
    });

    it('Returns an empty array if there is no registered post', async () => {
        const { body: { token } } = await request(api).post('/login').send({
          email: 'brett@email.com',
          password: '123456',
        });

        const response = await request(api).get('/post').set('Authorization', token);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });
    it('Returns an array with registered posts', async () => {
      await registerBlogPost();
      await registerCategory();
      await registerPostCategory();

        const { body: { token } } = await request(api).post('/login').send({
          email: 'brett@email.com',
          password: '123456',
        });

        const response = await request(api).get('/post').set('Authorization', token);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
        expect(response.body[0].user).toHaveProperty('id', 'displayName', 'email', 'image');
        expect(response.body[0].categories[0]).toHaveProperty('id');
        expect(response.body[0].categories[0]).toHaveProperty('name');
    });
});