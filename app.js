const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = require('./config/winston');


const app = express();
app.use(bodyParser.json());
//app.use(morgan('dev', { stream: winston.stream }));
app.use(morgan('common', { stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' }) }));
const db = require('./src/database/connection');

db.authenticate()
  .then(() => console.log('connected to Db!'))
  .catch((err) => {
    console.log(err);
    logger.error(err);
  });


const Movie = db.import('./src/models/movie');
const Director = require('./src/models/director');

app.get('/api/movies', (req, res) => {
  const promiseObject = Movie.findAll();
  promiseObject.then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      throw (new Error('No data sent from table.'));
    }
  }).catch((err) => {
    res.status(404).send({ data: { error: "Internal error! can't retrieve movies." } });
    logger.error(err);
  });
});

app.get('/api/movies/:id', (req, res) => {
  const givenId = req.params.id;
  const promiseObject = Movie.findOne({ where: { id: givenId } });
  promiseObject.then((result) => {
    console.log(result);
    console.log(Object.keys(result));
    res.status(200).send(result);
  }).catch((error) => {
    console.log(error);
    logger.error(error);
    const errorMessage = { data: { errorMessage: `Resource with id ${req.params.id} doesn't exist` } };
    res.status(404).send(errorMessage);
  });
});

app.put('/api/movies/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const movieId = req.params.id;
  const fields = Object.keys(fieldsToUpdate);
  let msg;
  let statusCode;
  const promiseObject = Movie.findOne({ where: { id: movieId } });
  promiseObject.then((result) => {
    console.log('inside exists block', result);
    if (result !== null) {
      Movie.update(fieldsToUpdate, { where: { id: movieId } })
        .then((updateResult) => {
          if (updateResult[0]) {
            msg = `All the fields i.e. ${fields.join(', ')} are updated successfully`;
            statusCode = 200;
          } else {
            msg = `Error: one of the '${fields.join(', ')}' is incorrect. OR field has "SAME" value. Please check the field name or Value of the field again`;
            statusCode = 400;
          }
          res.status(statusCode).send({ data: { message: msg } });
        }).catch((err) => {
          console.log(err);
          logger.error(error);
        });
    } else {
      msg = `Error: Item with id ${req.params.id} doesn't exitst.`;
      res.status(404).send({ data: { message: msg } });
    }
  }).catch((error) => {
    console.log(error);
    logger.error(error);
  });
});

app.post('/api/movies/', (req, res) => {
  const movieToAdd = req.body;
  console.log(movieToAdd);
  const promiseObject = Movie.create(movieToAdd);
  promiseObject.then((result) => {
    let msg;
    let statusCode;
    console.log('result', result);
    // eslint-disable-next-line no-underscore-dangle
    if (result._options.isNewRecord === true) {
      msg = `Resource have been created with id ${result.dataValues.id}`;
      statusCode = 201;
      const resultJson = { data: { message: msg } };
      res.status(statusCode).send(resultJson);
    }
  }).catch((error) => {
    console.log(error);
    logger.error(error);
    const msg = 'Error: can\'t resource. Make sure you check the given "fields" and user previleges again or the resource already exists.';
    const statusCode = 400;
    const resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  });
});

app.delete('/api/movies/:id', (req, res) => {
  const givenId = req.params.id;
  const promiseObject = Movie.destroy({ where: { id: givenId } });
  let msg = '';
  let statusCode;
  let resultJson = {};

  promiseObject.then((result) => {
    if (result) {
      msg = `Resource with id ${req.params.id} is deleted sucessfully.`;
      statusCode = 200;
    } else {
      throw new Error(`Can't delete the resource with id ${req.params.id}. Either is moved or doesn't exist.`);
    }
  }).catch((err) => {
    msg = `Can't delete the resource with id ${req.params.id}. Either is moved or doesn't exist.`;
    statusCode = 404;
    logger.error(err);
  }).finally(() => {
    resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  });
});


app.get('/api/directors', (req, res) => {
  const promiseObject = Director.findAll();
  promiseObject.then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      throw (new Error('No data sent from table.'));
    }
  }).catch((err) => {
    console.log(err);
    logger.error(err);
    res.status(404).send({ data: { error: "Internal error! can't retrieve Directors." } });
  });
});

app.get('/api/directors/:id', (req, res) => {
  const givenId = req.params.id;
  const promiseObject = Director.findOne({ where: { id: givenId } });
  promiseObject.then((result) => {
    console.log(result);
    res.status(200).send(result);
  }).catch((error) => {
    console.log(error);
    logger.error(error);
    const errorMessage = { data: { errorMessage: `Resource with id ${req.params.id} doesn't exist` } };
    res.status(404).send(errorMessage);
  });
});

app.put('/api/directors/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const movieId = req.params.id;
  const fields = Object.keys(fieldsToUpdate);
  let msg;
  let statusCode;
  const promiseObject = Director.findOne({ where: { id: movieId } });
  promiseObject.then((result) => {
    console.log('inside exists block', result);
    if (result !== null) {
      Director.update(fieldsToUpdate, { where: { id: movieId } })
        .then((updateResult) => {
          if (updateResult[0]) {
            msg = `All the fields i.e. ${fields.join(', ')} are updated successfully`;
            statusCode = 200;
          } else {
            msg = `Error: one of the '${fields.join(', ')}' is incorrect. OR field has "SAME" value. Please check the field name or Value of the field again`;
            statusCode = 400;
          }
          res.status(statusCode).send({ data: { message: msg } });
        }).catch((err) => {
          logger.error(err);
          console.log(err);
        });
    } else {
      msg = `Error: Item with id ${req.params.id} doesn't exitst.`;
      res.status(404).send({ data: { message: msg } });
    }
  }).catch((error) => {
    logger.error(error);
    console.log(error);
  });
});


app.post('/api/directors/', (req, res) => {
  const directorToAdd = req.body;
  console.log(directorToAdd);
  const promiseObject = Director.create(directorToAdd);
  promiseObject.then((result) => {
    let msg;
    let statusCode;
    console.log('result', result);
    // eslint-disable-next-line no-underscore-dangle
    if (result._options.isNewRecord === true) {
      msg = `Resource have been created with id ${result.dataValues.id}`;
      statusCode = 201;
      const resultJson = { data: { message: msg } };
      res.status(statusCode).send(resultJson);
    }
  }).catch((error) => {
    logger.error(error);
    console.log(error);
    const msg = 'Error: can\'t resource. Make sure you check the given "director_name" field  and user previleges again or the resource already exists.';
    const statusCode = 400;
    const resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  });
});


app.delete('/api/directors/:id', (req, res) => {
  const givenId = req.params.id;
  const promiseObject = Director.destroy({ where: { id: givenId } });
  let msg = '';
  let statusCode;
  let resultJson;
  promiseObject.then((result) => {
    if (result) {
      msg = `Resource with id ${req.params.id} is deleted sucessfully.`;
      statusCode = 200;
    } else {
      msg = `Error: Can't delete the resource with id ${req.params.id}. Either is moved or doesn't exist.`;
      statusCode = 404;
    }
    resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  }).catch((err) => {
    msg = `Can't delete the resource with id ${req.params.id}. Either is moved or doesn't exist.`;
    statusCode = 404;
    logger.error(err);
  }).finally(() => {
    resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Movie and Director RESTful API server started on ${port}`);
});
