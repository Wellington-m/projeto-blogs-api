const frisby = require('frisby');
const { sequelize: sequelizeCli, apiURL } = require('../helpers/constants');
const { user } = require('../helpers/mockUser');
const shell = require('shelljs');

describe('POST Rota: user/ - Cadastrar usuário', () => {
    beforeAll(() => {
        shell.exec([
          sequelizeCli.drop,
          sequelizeCli.create,
          sequelizeCli.migrate,
          sequelizeCli.seed
        ].join(' && '),
          { silent: process.env.DEBUG === "false" });
    });
    it('É possível criar um usuário', async () => {
        const { displayName, email, password, image } = user;
        const { json } = await frisby.post(`${apiURL}/user/`, {
            displayName,
            email: email("teste@teste.com"),
            password,
            image
        }).expect('status', 201);

        expect(json).toHaveProperty('token');
        expect(typeof json.token).toBe('string');
    });  
    it('Usuário ja existe, retorna mensagem correta', async () => {
        const { displayName, email, password, image } = user;
        const { json } = await frisby.post(`${apiURL}/user/`, {
            displayName,
            email: email("lewishamilton@gmail.com"),
            password,
            image
        }).expect('status', 409);

        expect(json.message).toBe('User already registered');

    });  
    it('O nome não for informado, retorna a mensagem correta', async () => {
        const { email, password, image } = user;
        const { json } = await frisby.post(`${apiURL}/user/`, {
            email: email("teste@teste.com"),
            password,
            image
        }).expect('status', 400);

        expect(json.message).toBe('"displayName" length must be at least 8 characters long');
    });  
    it('O email não for informado, retorna a mensagem correta', async () => {
        const {displayName, password, image } = user;
        const { json } = await frisby.post(`${apiURL}/user/`, {
            displayName,
            password,
            image
        }).expect('status', 400);

        expect(json.message).toBe('"email" must be a valid email');
    });  
    it('A senha não for informada, retorna a mensagem correta', async () => {
        const { displayName, email, image } = user;
        const { json } = await frisby.post(`${apiURL}/user/`, {
            displayName,
            email: email("teste@teste.com"),
            image
        }).expect('status', 400);

        expect(json.message).toBe('"password" length must be at least 6 characters long');
    });  
});