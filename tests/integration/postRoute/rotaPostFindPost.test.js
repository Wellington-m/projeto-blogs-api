const frisby = require('frisby');
const shell = require('shelljs');
const {sequelize: sequelizeCli, apiURL} = require('../../helpers/constants');

describe('GET Rota: /post/ - Lista todos os posts', () => {
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

    it('Retorna um array vazio caso não exista nenhum post cadastrado', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, {
            email: 'lewishamilton@gmail.com',
            password: '123456',
        })
        .expect('status', 200);

        shell.exec([
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
        ].join('&&'), {
            silent: 'false',
        })

        const { body } = await frisby.setup({
            request: {
                headers: {
                    'Authorization': token,
                }
            }
        })
        .get(`${apiURL}/post`)
        .expect('status', 200);

        const result = JSON.parse(body);

        expect(result).toHaveLength(0);
    });
    it('Retorna um array com os posts cadastrado', async () => {
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
        .get(`${apiURL}/post`)
        .expect('status', 200);

        const result = JSON.parse(body);

        expect(result[0]).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
        expect(result[0].user).toHaveProperty('id', 'displayName', 'email', 'image');
        expect(result[0].categories[0]).toHaveProperty('id');
        expect(result[0].categories[0]).toHaveProperty('name');
    });
});