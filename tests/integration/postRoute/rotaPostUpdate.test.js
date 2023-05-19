const frisby = require('frisby');
const {sequelize: sequelizeCli, apiURL} = require('../../helpers/constants');
const shell = require('shelljs');

describe('PUT Rota: /post/:id - Update a post', () => {
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

    it('isnt possible update a post without inform title', async () => {
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
        .put(`${apiURL}/post/1`, {
            content: "Thor"
        })
        .expect('status', 400);

        const result = JSON.parse(body);

        expect(result.message).toBe('Some required fields are missing');
    });
    it('isnt possible update a post without inform content', async () => {
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
        .put(`${apiURL}/post/1`, {
            title: "O vingador mais forte",
        })
        .expect('status', 400);

        const result = JSON.parse(body);

        expect(result.message).toBe('Some required fields are missing');
    });
    it('isnt possible update a post from other user', async () => {
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
        .put(`${apiURL}/post/3`, {
            title: "O vingador mais forte",
            content: "É o thor"
        })
        .expect('status', 401);

        const result = JSON.parse(body);

        expect(result.message).toBe('Unauthorized user');
    });
    it('is possible update a post', async () => {
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
        .put(`${apiURL}/post/2`, {
            title: "O vingador mais forte",
            content: "É o thor"
        })
        .expect('status', 200);

        const result = JSON.parse(body);

        expect(result).toHaveProperty('id', 'title', 'content', 'userId', 'published', 'updated');
    });
});