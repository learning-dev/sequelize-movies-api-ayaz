
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Movies', 'description', {
    type: Sequelize.STRING(255),
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Movies', 'description', {
    type: Sequelize.STRING(100),
  }),
};
