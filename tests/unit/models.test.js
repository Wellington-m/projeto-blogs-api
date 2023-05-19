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
          sequelizeCli.pretest,
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

    it("É possível fazer um INSERT e um SELECT na tabela BlogPosts", async () => {
        const insertQueryUser = await database.query(queries.insert.user, { type: 'INSERT' });
        expect(insertQueryUser).toEqual([1, 1]);

        const insertQuery = await database.query(queries.insert.blogPosts, { type: 'INSERT' });
        expect(insertQuery).toEqual([1, 1]);

        const [result] = await database.query(queries.select.blogPosts, { type: 'SELECT' });
        expect(result).toEqual(expect.objectContaining(queries.expect.blogPosts.general));

        expect(Date.parse(result.published)).toEqual(queries.expect.blogPosts.published);
        expect(Date.parse(result.updated)).toEqual(queries.expect.blogPosts.updated);

    });

    it("É possível fazer um INSERT e um SELECT na tabela PostCategories", async () => {
        const insertQueryUser = await database.query(queries.insert.user, { type: 'INSERT' });
        expect(insertQueryUser).toEqual([1, 1]);

        const insertQueryCategories = await database.query(queries.insert.categories, { type: 'INSERT' });
        expect(insertQueryCategories).toEqual([1, 1]);

        const insertQueryBlogPosts = await database.query(queries.insert.blogPosts, { type: 'INSERT' });
        expect(insertQueryBlogPosts).toEqual([1, 1]);

        const insertQueryPostCategories = await database.query(queries.insert.postCategories, { type: 'INSERT' });
        expect(insertQueryPostCategories).toEqual([0, 1]);

        const [result] = await database.query(queries.select.postCategories, { type: 'SELECT' });
        expect(result).toEqual(queries.expect.postCategories);
    });
})