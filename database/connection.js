
const Sequelize = require("sequelize");

const sequelize = new Sequelize("moviesdatabase", "ayaz", "password", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;



