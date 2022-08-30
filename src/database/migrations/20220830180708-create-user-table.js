'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `CREATE TABLE Users (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        displayName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
      );`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `DROP TABLE classes;`
    );
  }
};
