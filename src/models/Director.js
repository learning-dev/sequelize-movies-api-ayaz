
const Sequelize = require("sequelize");

module.exports =  sequelize.define("Director", {
  id:{
    type: Sequelize.INTEGER(12),
    allowNull: false,
    autoIncrement: true, 
    primaryKey: true
  },
  director_name: Sequelize.STRING(200)
});
  

