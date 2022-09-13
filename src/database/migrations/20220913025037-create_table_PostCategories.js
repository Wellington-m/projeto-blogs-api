'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `CREATE TABLE PostCategories (
        postId INT NOT NULL,
        categoryId INT NOT NULL,
        PRIMARY KEY (postId, categoryId),
        CONSTRAINT fk_blogPosts FOREIGN KEY (postId) REFERENCES BlogPosts (id),
        CONSTRAINT fk_categories FOREIGN KEY (categoryId) REFERENCES Categories (id)
      );`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `DROP TABLE PostCategories;`
    );
  }
};
