
const Sequelize = require('sequelize');

const sequelize = new Sequelize('moviesdatabase', 'ayaz', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});


module.exports = sequelize;
global.sequelize = sequelize;
