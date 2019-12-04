const movieData = require('./movies.json');

const directorObjectsToInsert = [];
const movieObjectsToInsert = [];

const convertToRequiredFormat = () => {
  const listOfDirector = [];
  movieData.forEach((movie) => {
    if (listOfDirector.indexOf(movie.Director) === -1) {
      listOfDirector.push(movie.Director);
    }
  });

  let count = 1;
  listOfDirector.forEach((element) => {
    const rowObject = {};
    rowObject.id = count;
    rowObject.director_name = element;
    count += 1;
    directorObjectsToInsert.push(rowObject);
  });

  movieData.forEach((movie) => {
    const singleMovie = {};
    let fieldCount = 0;
    const databaseFields = ['id', 'title', 'description', 'runtime', 'genre', 'rating', 'metascore',
      'votes', 'gross_earning_mil', 'director_id', 'actor', 'year'];
    const fieldsMovie = Object.keys(movie);
    fieldsMovie.forEach((field) => {
      if (field === 'Director') {
        const directorId = listOfDirector.indexOf(movie[field]) + 1;
        singleMovie.director_id = directorId;
      } else {
        singleMovie[databaseFields[fieldCount]] = movie[field];
      }
      fieldCount += 1;
    });
    movieObjectsToInsert.push(singleMovie);
  });
};

convertToRequiredFormat();

module.exports = { directorObjectsToInsert, movieObjectsToInsert };
