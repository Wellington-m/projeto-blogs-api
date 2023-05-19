const shell = require('shelljs');
const { sequelize: sequelizeCli, apiURL } = require('../../helpers/constants');
const frisby = require('frisby');

describe('GET Rota: user/ - Listar todos os usuários', () => {
    beforeAll(() => {
        shell.exec([
            sequelizeCli.pretest,
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed
        ].join('&&'), {
            silent: process.env.DEBUG === 'false',
        });
    });
    it('Token não foi informado', async () => {
        const { body } = await frisby
        .setup({
            request: {
                headers: {
                    'Authorization': '',
                }
            }
        })
        .get(`${apiURL}/user`)
        .expect('status', 401);

        const result = JSON.parse(body);
        expect(result.message).toBe('Token not found');
    });
    it('Token for inválido ou expirado', async () => {
        const { body } = await frisby.setup({
            request: {
                headers: {
                    'Authorization': 'InvalidToken',
                }
            }
        })
        .get(`${apiURL}/user`)
        .expect('status', 401);

        const result = JSON.parse(body);
        expect(result.message).toBe('Expired or invalid token');
    });
    it('Com Token válido é retornado os usuários', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, {
            email: 'lewishamilton@gmail.com',
            password: '123456',
        }).expect('status', 200);
        
        const { body } = await frisby.setup({
            request: {
                headers: {
                    'Authorization': token
                }
            }
        })
        .get(`${apiURL}/user`)
        .expect('status', 200);

        const result = JSON.parse(body);
        expect(result[0]).toHaveProperty('id', 'displayName', 'email', 'image');
    });
});