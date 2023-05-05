const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const shell = require('shelljs');
const { sequelize: sequelizeCli, apiURL } = require('../helpers/constants');

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
        }).expect('status', 200);

        expect(typeof token).toBe('string');

        try {
            const decoded = jwt.verify(token, 'secret');
            expect(decoded).toHaveProperty('id');
          } catch (error) {
            console.log(error);
            throw Error('Seu `token` não consegue ser verificado');
          }
    });

    it('Não é possível fazer login sem todos os campos preenchidos', async () => {
        const { body } = await frisby.post(`${apiURL}/login`, {
            email: '',
            password: '',
        }).expect('status', 400);
        const result = JSON.parse(body);
        expect(result.message).toBe('Some required fields are missing');
    });

    it('Não é possível fazer login com um usuário que não existe', async () => {
        const { body } = await frisby.post(`${apiURL}/login`, {
            email: 'naotemcadastro@algumacoisa.com',
            password: 'teste',
        }).expect('status', 400);
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid fields');
    });
});