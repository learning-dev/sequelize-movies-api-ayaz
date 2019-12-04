const db = require('./src/database/connection');
const build = require('./src/database/populateDb');

db.authenticate()
  .then(() => console.log('connected to Db!'))
  .catch((err) => {
    console.log(err);
  });

build();
