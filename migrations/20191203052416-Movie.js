'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Movie", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(100),
      },
      runtime: {
        type: Sequelize.INTEGER(10),
      },
      metascore: {
        type: Sequelize.STRING(10),
      },
      votes: {
        type: Sequelize.INTEGER(11),
      },
      gross_earning_mil: {
        type: Sequelize.STRING(20),
      },
      director_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Director',
          key: 'id'  
        }
      },
      actor: {
        type: Sequelize.STRING(200),
      },
      year: {
        type: Sequelize.INTEGER(4)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
