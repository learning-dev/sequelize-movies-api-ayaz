'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Movies", {
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
      genre: {
        type: Sequelize.STRING(100),
      },
      rating:{
        type: Sequelize.FLOAT(3),
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
          model: 'Directors',
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
    return queryInterface.dropTable("Movies");
  }
};
