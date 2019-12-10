const express = require('express');
const router = express.Router();

const isLoggedIn = require('../../auth/middleware/isLoggedIn');

router.get('/:id', isLoggedIn, function(request, response) {
  const { id } = request.params;

  response.render('authenticated/games/index', { id });
});

module.exports = router;
