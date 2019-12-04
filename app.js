const express = require('express');
const bodyParser = require('body-parser');

const db = require('./src/database/connection');

db.authenticate()
  .then(() => console.log('connected to Db!'))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());

const Movie = db.import('./src/models/movie');

console.log(Movie);

app.get('/api/movies', (req, res) => {
  const promiseObject = Movie.findAll();
  promiseObject.then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      throw (new Error('No data sent from table.'));
    }
  }).catch((err) => res.status(404).send({ data: { error: "Internal error! can't retrieve movies." } }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Movie and Director RESTful API server started on ${port}`);
});
