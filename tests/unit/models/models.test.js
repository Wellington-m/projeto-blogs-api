const {
  User,
  Category,
  BlogPost,
  PostCategory,
} = require('../../../src/database/models');
const {
  registerUser,
  registerCategory,
  registerBlogPost,
  registerPostCategory,
} = require('../../helpers/registerData');
const { sequelize: sequelizeCli } = require('../../helpers/constants');
const shell = require('shelljs');
const { insert, result } = require('../../helpers/queries');

describe('Cria migrations para as entidades User, Categories, BlogPosts e PostCategories', () => {
  beforeEach(() => {
    shell.exec(sequelizeCli.beforetest, {
      silent: false,
    });
  });

  afterAll(() => {
    shell.exec(sequelizeCli.posttest, {
      silent: false,
    });
  });

  it('É possível fazer um INSERT e um SELECT na tabela User', async () => {
    const { displayName } = insert.user;
    const userCreated = await registerUser();

    expect(userCreated).toHaveProperty(
      'displayName',
      'email',
      'password',
      'image'
    );

    const [userFind] = await User.findAll({
      where: {
        displayName,
      },
    });

    expect(userFind.dataValues).toEqual(result.user);
  });

  it('É possível fazer um INSERT e um SELECT na tabela Categories', async () => {
    const { name } = insert.categories;
    const categoryCreated = await registerCategory();

    expect(categoryCreated).toHaveProperty('name');

    const [categoryFind] = await Category.findAll({
      where: {
        name,
      },
    });

    expect(categoryFind.dataValues).toEqual(result.categories);
  });

  it('É possível fazer um INSERT e um SELECT na tabela BlogPosts', async () => {
    const userCreated = await registerUser();

    expect(userCreated).toHaveProperty(
      'displayName',
      'email',
      'password',
      'image'
    );

    const blogPostsCreated = await registerBlogPost();

    expect(blogPostsCreated).toHaveProperty(
      'title',
      'content',
      'userId',
      'published',
      'updated'
    );

    const { title } = insert.blogPosts;
    const [blogPostFind] = await BlogPost.findAll({
      where: {
        title,
      },
    });

    expect(blogPostFind.dataValues).toEqual(
      expect.objectContaining(result.blogPosts.general)
    );

    expect(blogPostFind.dataValues).toEqual(
      expect.objectContaining({
        published: expect.any(String),
        updated: expect.any(String),
      })
    );
  });

  it('É possível fazer um INSERT e um SELECT na tabela PostCategories', async () => {
    const postCategoryCreated = await registerPostCategory();

    expect(postCategoryCreated).toHaveProperty('postId');
    expect(postCategoryCreated).toHaveProperty('categoryId');

    const [postCategoriesFind] = await PostCategory.findAll();

    expect(postCategoriesFind.dataValues).toEqual(result.postCategories);
  });
});
