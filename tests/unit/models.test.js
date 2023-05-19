const {
  User,
  Category,
  BlogPost,
  PostCategory,
} = require("../../src/database/models");
const { registerUser } = require("../helpers/registerData");
const { sequelize: sequelizeCli } = require("../helpers/constants");
const shell = require("shelljs");
const { insert, result } = require("../helpers/queries");

describe("Cria migrations para as entidades User, Categories, BlogPosts e PostCategories", () => {
  beforeEach(() => {
    shell.exec(sequelizeCli.beforetest, {
      silent: false,
    });
  });

  afterEach(() => {
    shell.exec(sequelizeCli.posttest, {
      silent: false,
    });
  });

  it("É possível fazer um INSERT e um SELECT na tabela User", async () => {
    const { displayName } = insert.user;
    const userCreated = await registerUser();

    expect(userCreated).toHaveProperty(
      "displayName",
      "email",
      "password",
      "image"
    );

    const [userFind] = await User.findAll({
      where: {
        displayName,
      },
    });

    expect(userFind.dataValues).toEqual(result.user);
  });

  it("É possível fazer um INSERT e um SELECT na tabela Categories", async () => {
    const { name } = insert.categories;
    const categoryCreate = await Category.create({
      name,
    });

    expect(categoryCreate).toHaveProperty("name");

    const [categoryFind] = await Category.findAll({
      where: {
        name,
      },
    });

    expect(categoryFind.dataValues).toEqual(result.categories);
  });

  it("É possível fazer um INSERT e um SELECT na tabela BlogPosts", async () => {
    const { displayName, email, password, image } = insert.user;
    const userCreate = await User.create({
      displayName,
      email,
      password,
      image,
    });

    expect(userCreate).toHaveProperty(
      "displayName",
      "email",
      "password",
      "image"
    );

    const { title, content, userId, published, updated } = insert.blogPosts;
    const blogPostsCreate = await User.create({
      title,
      content,
      userId,
      published,
      updated,
    });

    expect(blogPostsCreate).toHaveProperty(
      "title",
      "content",
      "userId",
      "published",
      "updated"
    );

    const blogPostFind = await BlogPost.findAll({
      where: {
        title,
      },
    });

    const result = blogPostFind.dataValues;

    expect().toEqual(result.blogPosts.general);

    expect(blogPostResult.published).toEqual(result.blogPosts.published);
    expect(blogPostResult.updated).toEqual(result.blogPosts.published);
  });

  it("É possível fazer um INSERT e um SELECT na tabela PostCategories", async () => {
    const insertQueryUser = await database.query(queries.insert.user, {
      type: "INSERT",
    });
    expect(insertQueryUser).toEqual([1, 1]);

    const insertQueryCategories = await database.query(
      queries.insert.categories,
      { type: "INSERT" }
    );
    expect(insertQueryCategories).toEqual([1, 1]);

    const insertQueryBlogPosts = await database.query(
      queries.insert.blogPosts,
      { type: "INSERT" }
    );
    expect(insertQueryBlogPosts).toEqual([1, 1]);

    const insertQueryPostCategories = await database.query(
      queries.insert.postCategories,
      { type: "INSERT" }
    );
    expect(insertQueryPostCategories).toEqual([0, 1]);

    const [result] = await database.query(queries.select.postCategories, {
      type: "SELECT",
    });
    expect(result).toEqual(queries.expect.postCategories);
  });
});
