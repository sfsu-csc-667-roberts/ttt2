const Games = require('./games');
const Users = require('./users');

module.exports = {
  Games,
  Users
};

// Route
const Db = require('../db');

Db.Games.create().then(result => {});
