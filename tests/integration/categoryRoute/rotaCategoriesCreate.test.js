const request = require('supertest');
const api = require('../../../src/api');
const { sequelize: sequelizeCli, apiURL } = require('../../helpers/constants');
const shell = require('shelljs');
const { User } = require('../../../src/database/models');

describe('POST Rota: categories/ - Cadastrar uma categoria', () => {
    beforeAll(() => {
        shell.exec([
            sequelizeCli.pretest,
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed
        ].join('&&'), {
            silent: 'false',
        })
    });

    fit('Não é possível cadastrar uma categoria sem nome', async () => {
      const user = await User.create({
        displayName: "ola",
        email: "teste@teste",
        password: "123456",
        image: "teste"
      });

      console.log(user);

      // const response = await request(api)
      //   .post('/login')
      //   .send({
      //     email: "lewishamilton@gmail.com",
      //     password: "123456",
      //   })

      //   console.log(response);
        
        // const { body } = await frisby.setup({
        //     request: {
        //         headers: {
        //             'Authorization': token,
        //         }
        //     }
        // }).post(`${apiURL}/categories`).expect('status', 400);

        // const result = JSON.parse(body);
        // expect(result.message).toBe('"name" is required');
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