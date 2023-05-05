const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const shell = require('shelljs');
const { sequelize: sequelizeCli, apiURL } = require('../helpers/constants');
require('dotenv/config');

describe("Rota de login", () => {
    beforeAll(() => {
        shell.exec([
          sequelizeCli.drop,
          sequelizeCli.create,
          sequelizeCli.migrate,
          sequelizeCli.seed
        ].join(' && '),
          { silent: process.env.DEBUG === "false" });
    });

    it("É possível fazer login com sucesso", async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, { 
            email: 'lewishamilton@gmail.com',
            password: '123456',
        })
        .expect('status', 200);

        expect(typeof token).toBe('string');

        try {
            const decoded = jwt.verify(token, 'secret');
            expect(decoded).toHaveProperty('id');
          } catch (error) {
            console.log(error);
            throw Error('Seu `token` não consegue ser verificado');
          }
    });
});