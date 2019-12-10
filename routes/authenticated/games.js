const express = require('express');
const router = express.Router();

const isLoggedIn = require('../../auth/middleware/isLoggedIn');
const Games = require('../../db/games');

router.get('/', isLoggedIn, (_, response) => {
  Games.findAll()
    .then(games => response.json(games))
    .catch(error => response.json({ error }));
});

router.post('/create', isLoggedIn, (request, response) => {
  Games.create(request.user.id)
    .then(({ game_id: gameId }) => response.redirect(`/games/${gameId}`))
    .catch(error => response.json({ error }));
});

const checkIfInGame = (users, userId) => users.find(user => user.id === userId);

router.get('/:id', isLoggedIn, function(request, response) {
  const { id: gameId } = request.params;
  const { id: userId } = request.user;

  Games.find(gameId).then(({ users }) => {
    if (checkIfInGame(users, userId)) {
      response.render('authenticated/games/index', { id: gameId, users });
    } else if (users.length == 2) {
      // Two people are already in this game
      response.redirect('/lobby');
    } else {
      Games.join(gameId, userId).then(({ users }) =>
        response.render('authenticated/games/index', { id: gameId, users })
      );
    }
  });
});

module.exports = router;
