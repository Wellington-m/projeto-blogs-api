const frisby = require('frisby');
const shell = require('shelljs');
const {sequelize: sequelizeCli, apiURL} = require('../../helpers/constants');

describe('DELETE Route: /post/:id - Delete a post', () => {
  beforeEach(() => {
    shell.exec([
        sequelizeCli.drop,
        sequelizeCli.create,
        sequelizeCli.migrate,
        sequelizeCli.seed,
    ].join('&&'), {
        silent: 'false',
    })
});

  it('isnt possible delete another users post', async () => {
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
    .del(`${apiURL}/post/3`)
    .expect('status', 401);

    const result = JSON.parse(body);
    expect(result.message).toBe('Unauthorized user');

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