const directorObjects = require('../src/database/makeObjects').directorObjectsToInsert;

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Directors', directorObjects),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Directors', null, {}),
};
