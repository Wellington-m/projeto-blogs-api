const frisby = require('frisby');
const shell = require('shelljs');
const {sequelize: sequelizeCli, apiURL} = require('../../helpers/constants');

describe('GET Rota: /post/:id - Procurar um post pelo id', () => {
    beforeAll(() => {
        shell.exec([
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed,
        ].join('&&'), {
            silent: 'false',
        })
    });

    it('Post não existe', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, {
            email: 'lewishamilton@gmail.com',
            password: '123456',
        }).expect('status', 200);

        const { body } = await frisby.setup({
            request: {
                headers: {
                    'Authorization': token,
                }
            }
        })
        .get(`${apiURL}/post/5`)
        .expect('status', 404);

        const result = JSON.parse(body);

        expect(result.message).toBe('Post does not exist');
    });
    it('Post existe e retorna as informações corretas', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, {
            email: 'lewishamilton@gmail.com',
            password: '123456',
        }).expect('status', 200);

        const { body } = await frisby.setup({
            request: {
                headers: {
                    'Authorization': token,
                }
            }
        })
        .get(`${apiURL}/post/1`)
        .expect('status', 200);

        const result = JSON.parse(body);

        expect(result).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
        expect(result.user).toHaveProperty('id', 'displayName', 'email', 'image');
        expect(result.categories[0]).toHaveProperty('id');
        expect(result.categories[0]).toHaveProperty('name');
    });
});