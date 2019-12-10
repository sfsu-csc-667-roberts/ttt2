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

const FIND_SQL = 'SELECT * FROM games WHERE id = $1';
const FIND_USERS_SQL =
  'SELECT game_users.*, users.email FROM game_users, users WHERE game_id = $1 AND game_users.user_id = users.id';

const find = id => {
  return Promise.all([
    connection.one(FIND_SQL, [id]),
    connection.any(FIND_USERS_SQL, [id])
  ]).then(([game, users]) => ({
    game,
    users: users.map(({ id, email }) => ({ id, email }))
  }));
};

const join = (gameId, userId) => {
  return connection
    .one(INSERT_USER_SQL, [gameId, userId])
    .then(_ => connection.any(FIND_USERS_SQL, [gameId]))
    .then(users => ({ users: users.map(({ id, email }) => ({ id, email })) }));
};

module.exports = {
  create,
  findAll,
  find,
  join
};
