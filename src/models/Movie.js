
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING(100),
    description: DataTypes.STRING(100),
    runtime: DataTypes.INTEGER(10),
    genre: DataTypes.STRING(10),
    rating: DataTypes.FLOAT(3),
    metascore: DataTypes.STRING(10),
    votes: DataTypes.INTEGER(11),
    gross_earning_mil: DataTypes.STRING(20),
    director_id: DataTypes.INTEGER(11),
    actor: DataTypes.STRING(200),
    year: DataTypes.INTEGER(4),
  }, {});

  // eslint-disable-next-line func-names
  Movie.associate = function (models) {
    Movie.belongsTo(models.Director, { foreignKey: 'id', as: 'director_id' });
  };
  return Movie;
};
