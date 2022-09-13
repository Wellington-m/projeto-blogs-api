'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `DROP TABLE PostCategories;`
    );
  },
};
