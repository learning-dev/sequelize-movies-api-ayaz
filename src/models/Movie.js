module.exports = ( ) => {
    const Movie = sequelize.define('Movie', {
    id:{
      type: Sequelize.INTEGER(2),
      allowNull: false, 
      autoIncrement: true, 
      primaryKey: true
    },
    title: Sequelize.STRING(100),
    description: Sequelize.STRING(100),
    runtime: Sequelize.INTEGER(10),
    metascore: Sequelize.STRING(10),
    votes: Sequelize.INTEGER(11),
    gross_earning_mil: Sequelize.STRING(20),
    director_id: Sequelize.INTEGER(11),
    actor: Sequelize.STRING(200),
    year: Sequelize.INTEGER(4)
  });

  Movie.associate = function(models) {
    Movie.belongsTo(models.Director, {foreignKey: 'id', as: 'director_id'})
  };
  return Movie;
}
