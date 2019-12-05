module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Directors', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    director_name: Sequelize.STRING(200),
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Directors'),
};
