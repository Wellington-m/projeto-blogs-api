const frisby = require('frisby');
const { sequelize: sequelizeCli, apiURL } = require('../helpers/constants');
const shell = require('shelljs');

describe('POST Rota: categories/ - Cadastrar uma categoria', () => {
    beforeAll(() => {
        shell.exec([
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed
        ].join('&&'), {
            silent: 'false',
        })
    });

    it('Não é possível cadastrar uma categoria sem nome', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, {
            email: "lewishamilton@gmail.com",
            password: "123456",
        }).expect('status', 200);
        
        const { body } = await frisby.setup({
            request: {
                headers: {
                    'Authorization': token,
                }
            }
        }).post(`${apiURL}/categories`).expect('status', 400);

        const result = JSON.parse(body);
        expect(result.message).toBe('"name" is required');
    });
    it('É possível cadastrar uma categoria com sucesso', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, {
            email: "lewishamilton@gmail.com",
            password: "123456",
        }).expect('status', 200);

        const { body } = await frisby.setup({
            request: {
                headers: {
                    'Authorization': token,
                }
            }
        }).post(`${apiURL}/categories`, {
            name: 'Teste'
        }).expect('status', 201);

        const result = JSON.parse(body);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name');
    });
});