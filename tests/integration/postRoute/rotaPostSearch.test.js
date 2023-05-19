const frisby = require('frisby');
const shell = require('shelljs');
const {sequelize: sequelizeCli ,apiURL} = require('../../helpers/constants');

describe('GET Rota: /post/search - Procurar um post pelo título ou conteúdo', () => {   
    beforeEach(() => {
        shell.exec([
            sequelizeCli.pretest,
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed
        ].join('&&'), {
            silent: 'false',
        });
    });
    
    it('Encontra um post', async () => {
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
        .get(`${apiURL}/post/search?q=ano`)
        .expect('status', 200);

        const result = JSON.parse(body);
        expect(result[0]).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
        expect(result[0].user).toHaveProperty('id', 'displayName', 'email', 'image');
        expect(result[0].categories[0]).toHaveProperty('id');
        expect(result[0].categories[0]).toHaveProperty('name');
    });
    it('Não encontra um post', async () => {
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
        .get(`${apiURL}/post/search?q=nenhumpost`)
        .expect('status', 200);

        const result = JSON.parse(body);

        expect(result).toHaveLength(0);
    });
});