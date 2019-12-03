db = require('./src/database/connection');

db.authenticate()
  .then(() => console.log('connected to Db!'))
  .catch((err) => {
    console.log(err);
  });
const build = require('./src/database/populateDb');
build();





