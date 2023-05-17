const frisby = require('frisby');
const { sequelize: sequelizeCli, apiURL } = require('../../helpers/constants');
const shell = require('shelljs');

describe('DELETE Rota: user/me - Deletar usuário logado', () => {

  beforeAll(() => {
    shell.exec([
      sequelizeCli.drop,
      sequelizeCli.create,
      sequelizeCli.migrate,
      sequelizeCli.seed,
    ].join('&&'), { silent: 'false' })
  });

    it('É possível deletar o usuário logado', async () => {
        const { json: { token } } = await frisby.post(`${apiURL}/login`, {
          email: "lewishamilton@gmail.com",
          password: "123456"
        }).expect('status', 200);
        
        const { body } = await frisby.setup({
          request: {
              headers: {
                  'Authorization': token,
              }
          }
        }).del(`${apiURL}/user/me`).expect('status', 204);
    });
});