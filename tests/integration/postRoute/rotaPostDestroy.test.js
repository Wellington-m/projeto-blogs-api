const request = require('supertest');
const shell = require('shelljs');
const api = require('../../../src/api');
const {sequelize: sequelizeCli} = require('../../helpers/constants');
const { User, BlogPost } = require('../../../src/database/models');

describe('DELETE Route: /post/:id - Delete a post', () => {
  beforeAll(async () => {
    shell.exec(sequelizeCli.beforetest, {
      silent: false,
    });

    await User.bulkCreate([
      {
        displayName: 'lewis',
        email: 'lewishamilton@gmail.com',
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

    await BlogPost.create({
      title: 'teste',
      content: 'teste delete post',
      userId: 2,
    });
  });

  it('isnt possible delete another users post', async () => {
    const { body: { token } } = await request(api).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });

    const response = await request(api).del('/post/1').set('Authorization', token);
    
    expect(response.status).toBe(401);

    //expect(result.message).toBe('Unauthorized user');

  });
  it('isnt possible delete a post that does not exist', async () => {
    const { json: { token } } = await frisby.post(`${apiURL}/login`, {
      email: 'lewishamilton@gmail.com',
      password: '123456',
    })
    .expect('status', 200);

    const { body } = await frisby.setup({
      request: {
          headers: {
              'Authorization': token,
          }
      }
    })
    .del(`${apiURL}/post/10`)
    .expect('status', 404);

    const result = JSON.parse(body);
    expect(result.message).toBe('Post does not exist');
  });
  it('is possible delete a post', async () => {
    const { json: { token } } = await frisby.post(`${apiURL}/login`, {
      email: 'lewishamilton@gmail.com',
      password: '123456',
    })
    .expect('status', 200);

    const { body } = await frisby.setup({
      request: {
          headers: {
              'Authorization': token,
          }
      }
    })
    .del(`${apiURL}/post/1`)
    .expect('status', 204);

  });
});