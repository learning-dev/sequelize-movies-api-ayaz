'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("Director", {
     id: {
       type: Sequelize.INTEGER(11),
       allowNull: false,
       autoIncrement: true, 
       primaryKey: true
     },
     director_name: Sequelize.STRING(200),
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Director");
  }
};
