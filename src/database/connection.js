
const Sequelize = require("sequelize");

const sequelize = new Sequelize("movies-database", "ayaz", "password", {
  host: "localhost",
  dialect: "msql",
  operatorAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;


