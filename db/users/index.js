const bcrypt = require('bcrypt');

const db = require('../connection');

const CREATE_SQL = 'INSERT INTO users (email, password) VALUES ($1, $2)';
const create = (email, password) => {
  const hash = bcrypt.hashSync(password, 10);

  return db.one(CREATE_SQL, [email.toLowerCase(), hash]);
};

const FIND_BY_ID_SQL = 'SELECT * FROM users WHERE id=$1';
const findById = id => db.one(FIND_BY_ID_SQL, [id]);

const FIND_BY_EMAIL_SQL = 'SELECT * FROM users WHERE email=$1';
const findByEmail = email => db.any(FIND_BY_EMAIL_SQL, [email]);

module.exports = {
  create,
  findById,
  findByEmail
};
