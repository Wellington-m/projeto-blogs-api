const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const { registerBlogPost, registerPostCategory, registerCategory } = require('../../helpers/registerData');
const { User, BlogPost } = require('../../../src/database/models');
const {sequelize: sequelizeCli} = require('../../helpers/constants');

describe('PUT Route: /post/:id - Update a post', () => {
    beforeAll(async () => {
        shell.exec(sequelizeCli.beforetest, {
            silent: false,
        });

        await User.bulkCreate([
          {
            displayName: 'Brett Wiltshire',
            email: 'brett@email.com',
            password: '123456',
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          },
          {
            displayName: 'Michael Schumacher',
            email: 'MichaelSchumacher@gmail.com',
            password: '123456',
            image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
          }
        ]);

        await registerBlogPost();

        await BlogPost.create({
          title: 'Title for user 2',
          content: 'User 2 content',
          userId: 2
        }); 

        await registerCategory();
        await registerPostCategory();
    });

    afterAll(() => {
      shell.exec(sequelizeCli.posttest, {
        silent: false,
      });
    });

    it('isnt possible update a post without inform title', async () => {
        const { body: { token } } = await request(api).post('/login').send({
          email: 'brett@email.com',
          password: '123456',
        });

        const response = await request(api).put('/post/1').set('Authorization', token).send({
          content: "Thor"
        });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Some required fields are missing');
    });
    it('isnt possible update a post without inform content', async () => {
      const { body: { token } } = await request(api).post('/login').send({
        email: 'brett@email.com',
        password: '123456',
      });

      const response = await request(api).put('/post/1').set('Authorization', token).send({
        title: "O vingador mais forte",
      });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Some required fields are missing');
    });
    it('isnt possible update a post from other user', async () => {
      const { body: { token } } = await request(api).post('/login').send({
        email: 'brett@email.com',
        password: '123456',
      });

      const response = await request(api).put('/post/2').set('Authorization', token).send({
        title: "O vingador mais forte",
        content: "É o thor"
      });
      
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized user');
    });
    it('is possible update a post', async () => {
      const { body: { token } } = await request(api).post('/login').send({
        email: 'brett@email.com',
        password: '123456',
      });

      const response = await request(api).put('/post/1').set('Authorization', token).send({
        title: "O vingador mais forte",
        content: "É o thor"
      });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
      expect(response.body.title).toBe('O vingador mais forte');
      expect(response.body.content).toBe('É o thor');
    });
});