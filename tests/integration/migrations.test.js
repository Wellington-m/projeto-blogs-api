const Sequelize = require('sequelize');
const sequelizeConfig = require('../../src/database/config/config');
const { sequelize: sequelizeCli } = require('../helpers/constants');
const queries = require('../helpers/queries');
const shell = require('shelljs');

describe("Cria migrations para as entidades User, Categories, BlogPosts e PostCategories", () => {
    beforeAll(() => {
        database = new Sequelize(sequelizeConfig.test)
    });

    beforeEach(() => {
        shell.exec([
          sequelizeCli.drop,
          sequelizeCli.create,
          sequelizeCli.migrate
        ].join(' && '),
          { silent: process.env.DEBUG === "false" }); // Imprime erros(stderr) somente se for verdadeiro
      });

    it("É possível fazer um INSERT e um SELECT na tabela User", async () => {
        const insertQuery = await database.query(queries.insert.user, { type: 'INSERT' });
        expect(insertQuery).toEqual([1, 1]);

        const [result] = await database.query(queries.select.user, { type: 'SELECT' })
        expect(result).toEqual(queries.expect.user);
    });

    it("É possível fazer um INSERT e um SELECT na tabela Categories", async () => {
        const insertQuery = await database.query(queries.insert.categories, { type: 'INSERT' });
        expect(insertQuery).toEqual([1, 1]);

        const [result] = await database.query(queries.select.categories, { type: 'SELECT' });
        expect(result).toEqual(queries.expect.categories);
    });
})