const frisby = require('frisby');
const shell = require('shelljs');
// const userService = require('../../src/services/userService');
const { User: userModel } = require('../../../src/database/models');
const { sequelize: sequelizeCli, apiURL } = require('../../helpers/constants');

describe.skip('GET Rota: user/:id - procurar usuário pelo ID', () => {
    beforeAll(() => {
        shell.exec([
            sequelizeCli.pretest,
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed
        ].join(' && '),
          { silent: process.env.DEBUG === "false" });
    });

    it('Não é possível acessar a rota User sem um token', async () => {
        const { body } = await frisby
        .setup({
          request: {
            headers: {
              'Authorization': ''
            }
          }
        })
        .get(`${apiURL}/user/1`)
        .expect('status', 401);

        const result = JSON.parse(body);
        expect(result.message).toBe('Token not found');
    });

    it('Não é possível acessar a rota User com Token inválido ou expirado', async () => {
        const { body } = await frisby
        .setup({
            request: {
                headers: {
                    'Authorization': 'tokenInvalido'
                }
            }
        })
        .get(`${apiURL}/user/1`)
        .expect('status', 401);

        const result = JSON.parse(body);
        expect(result.message).toBe('Expired or invalid token');
    });

    it('É possível encontrar um usuário pelo ID', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, { 
            email: 'lewishamilton@gmail.com',
            password: '123456',
        }).expect('status', 200);

        const { body } = await frisby
        .setup({
            request: {
                headers: {
                    'Authorization': token
                }
            }
        })
        .get(`${apiURL}/user/1`)
        .expect('status', 200);

        const result = JSON.parse(body);
        expect(result).toHaveProperty('id', 'displayName', 'email', 'image');
    });

    it('É exibida a mensagem correta caso o usuário não exista', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, { 
            email: 'lewishamilton@gmail.com',
            password: '123456',
        }).expect('status', 200);

        const { body } = await frisby
        .setup({
            request: {
                headers: {
                    'Authorization': token
                }
            }
        })
        .get(`${apiURL}/user/10`)
        .expect('status', 404);

        const result = JSON.parse(body);
        expect(result.message).toBe('User does not exist');
    });
    // it('É exibida a mensagem correta em caso de erro da aplicação', async () => {
    //     jest.spyOn(userModel, 'findByPk').mockImplementationOnce(() => Promise.reject('fail'));

    //     const { json: { token } } = await frisby.post(`${apiURL}/login`, { 
    //         email: 'lewishamilton@gmail.com',
    //         password: '123456',
    //     }).expect('status', 200);

    //     const { body } = await frisby
    //     .setup({
    //         request: {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         }
    //     })
    //     .get(`${apiURL}/user/1`)
    //     .expect('status', 500);
    // });
});