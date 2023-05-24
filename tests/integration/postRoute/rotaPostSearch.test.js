const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const { registerUser, registerBlogPost, registerCategory, registerPostCategory } = require('../../helpers/registerData');
const {sequelize: sequelizeCli ,apiURL} = require('../../helpers/constants');

describe('GET Route: /post/search - Search for a post by title or content', () => {   
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
        silent: false,
      });
    });
    
    it('Cant find a post', async () => {
      const { body: { token } } = await request(api).post('/login').send({
        email: 'brett@email.com',
        password: '123456',
      });

      const response = await request(api).get('/post/search?q=nenhumpost').set('Authorization', token);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
  });

    it('Find a post', async () => {
        const { body: { token } } = await request(api).post('/login').send({
          email: 'brett@email.com',
          password: '123456',
        });

        const response = await request(api).get('/post/search?q=article').set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
        expect(response.body[0].user).toHaveProperty('id', 'displayName', 'email', 'image');
        expect(response.body[0].categories[0]).toHaveProperty('id');
        expect(response.body[0].categories[0]).toHaveProperty('name');
    });

});