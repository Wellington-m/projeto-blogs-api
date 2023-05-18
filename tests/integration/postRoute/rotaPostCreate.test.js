const frisby = require('frisby');
const shell = require('shelljs');
const {sequelize: sequelizeCli, apiURL} = require('../../helpers/constants');

describe('POST Route: /post - Create a post', () => {
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
    it('isnt possible create a post without title, content and categoryId', async () => {
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
      .post(`${apiURL}/post`, {
        content: "O campeão do ano!",
        categoryIds: [1],
      })
      .expect('status', 400);

      const result = JSON.parse(body);

      expect(result.message).toBe('Some required fields are missing');

    });
    it('isnt possible create a post with invalid categoryId', async () => {
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
      .post(`${apiURL}/post`, {
        title: "Teste titulo",
        content: "O campeão do ano!",
        categoryIds: [10],
      })
      .expect('status', 400);

      const result = JSON.parse(body);
      expect(result.message).toBe('"categoryIds" not found');

    });
    it('is possible create a post', async () => {
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
      .post(`${apiURL}/post`, {
        title: "Teste titulo",
        content: "O campeão do ano!",
        categoryIds: [1],
      })
      .expect('status', 201);

      const result = JSON.parse(body);
      expect(result).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
    });
});