const request = require('supertest');
const api = require('../../../src/api');

describe.skip('GET Rota: categories/ - Localizar todas as categorias', () => {

  it('Houver categorias cadastradas retorna um array com as categorias', async () => {
      
    const { body: { token } } = await request(api)
      .post('/login')
      .send({
        email: "lewishamilton@gmail.com",
        password: "123456",
      })

        const { body } = await frisby.setup({
          request: {
            headers: {
              'Authorization': token,
            }
          }
        })
        .get(`${apiURL}/categories`)
        .expect('status', 200);

        const result = JSON.parse(body);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name');
  });

  it('Não houver categorias cadastradas retorna um array vazio', async () => {
    const { json: { token } } = await frisby.post(`${apiURL}/login`, {
      email: "lewishamilton@gmail.com",
      password: "123456"
    })
    .expect('status', 200);

    shell.exec([
      sequelizeCli.pretest,
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
    .get(`${apiURL}/categories`)
    .expect('status', 200);

    const result = JSON.parse(body);
    expect(result).toHaveLength(0);

  });
});