const request = require('supertest');
const api = require('../../../src/api');
const { User } = require('../../../src/database/models');

describe('POST Rota: categories/ - Cadastrar uma categoria', () => {
    it('Não é possível cadastrar uma categoria sem nome', async () => {
      const user = await User.create({
        displayName: "ola",
        email: "lewishamilton@gmail.com",
        password: "123456",
        image: "teste"
      });

      const { body: { token } } = await request(api)
        .post('/login')
        .send({
          email: "lewishamilton@gmail.com",
          password: "123456",
        });

      const response = await request(api)
        .post('/categories')
        .set('Authorization', token)
        .send({});

      expect(response.status).toBe(400);

    });
    it('É possível cadastrar uma categoria com sucesso', async () => {
      const { body: { token } } = await request(api)
        .post('/login')
        .send({
          email: "lewishamilton@gmail.com",
          password: "123456",
        });

        const response = await request(api)
        .post('/categories')
        .set('Authorization', token)
        .send({
          name: 'Teste'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(['id']);
        expect(response.body).toHaveProperty('name');
    });
});