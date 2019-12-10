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

router.get('/:id', isLoggedIn, function(request, response) {
  const { id } = request.params;

  response.render('authenticated/games/index', { id });
});

module.exports = router;
