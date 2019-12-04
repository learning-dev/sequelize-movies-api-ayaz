'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Directors', 'director_name', {
      type: Sequelize.STRING(200),
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Directors', 'director_name', {
      type: Sequelize.STRING(200),
    });
  },
};


