const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const { registerUser, registerBlogPost, registerCategory, registerPostCategory } = require('../../helpers/registerData');
const {sequelize: sequelizeCli, apiURL} = require('../../helpers/constants');

describe('GET Rota: /post/:id - Procurar um post pelo id', () => {
    beforeAll(async () => {
        shell.exec(sequelizeCli.beforetest, {
            silent: false,
        });

        await registerUser();
        await registerBlogPost();
        await registerCategory();
        await registerPostCategory();
    });

    afterAll(() => {
      shell.exec(sequelizeCli.posttest, {
        silent: false})
    });

    it('post does not exist', async () => {
        const { body: { token } } = await request(api).post('/login').send({
          email: 'brett@email.com',
          password: '123456',
        });

        const response = await request(api).get('/post/5').set('Authorization', token);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Post does not exist');
    });
    it('Post exists and returns the correct information', async () => {
        const { body: { token } } = await request(api).post('/login').send({
          email: 'brett@email.com',
          password: '123456',
        });

        const response = await request(api).get('/post/1').set('Authorization', token);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
        expect(response.body.user).toHaveProperty('id', 'displayName', 'email', 'image');
        expect(response.body.categories[0]).toHaveProperty('id');
        expect(response.body.categories[0]).toHaveProperty('name');
    });
});