const connection = require('../connection');

const CREATE_SQL = 'INSERT INTO games DEFAULT VALUES RETURNING id';
const INSERT_USER_SQL =
  'INSERT INTO game_users (game_id, user_id) VALUES ($1, $2) RETURNING game_id';

const create = userId => {
  return connection
    .one(CREATE_SQL)
    .then(({ id: gameId }) =>
      connection.one(INSERT_USER_SQL, [gameId, userId])
    );
};

const FIND_ALL_SQL = 'SELECT * FROM games WHERE winner_id IS NULL';

const findAll = () => {
  return connection.any(FIND_ALL_SQL);
};

module.exports = {
  create,
  findAll
};
