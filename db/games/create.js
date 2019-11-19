const connection = require('../connection');

const SQL =
  "INSERT INTO games (username, password) VALUES ('jrob', 'jrobiscool')";

const create = () => {
  return connection.one(SQL);
};

module.exports = create;
