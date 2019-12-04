'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn("Movies", 'description', {
          type: Sequelize.STRING(255),
        });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Movies", 'description', {
        type: Sequelize.STRING(100),
    });
  }
};
