'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PostCategories", {
      postId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        foreignKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        foreignKey: true,
      },
    }, {
      uniqueKeys: {
        Items_unique: {
          fields: ['postId', 'categoryId']
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PostCategories");
  }
};
