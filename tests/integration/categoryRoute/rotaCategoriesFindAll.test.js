const frisby = require('frisby');
const { sequelize: sequelizeCLI, apiURL } = require('../../helpers/constants');
const shell = require('shelljs');

describe('GET Rota: categories/ - Localizar todas as categorias', () => {

  beforeEach(() => {
    shell.exec([
      sequelizeCLI.drop,
      sequelizeCLI.create,
      sequelizeCLI.migrate,
      sequelizeCLI.seed,
    ].join('&&'), {
      silent: 'false',
    })
  });

  it('Houver categorias cadastradas retorna um array com as categorias', async () => {
      const { json: { token } } = await frisby.post(`${apiURL}/login`, {
          email: "lewishamilton@gmail.com",
          password: "123456"
        })
        .expect('status', 200);

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
      sequelizeCLI.drop,
      sequelizeCLI.create,
      sequelizeCLI.migrate,
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