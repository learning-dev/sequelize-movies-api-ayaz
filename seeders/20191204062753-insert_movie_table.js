const movieObjects = require('../src/database/makeObjects').movieObjectsToInsert;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', movieObjects);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {});
  },
};
