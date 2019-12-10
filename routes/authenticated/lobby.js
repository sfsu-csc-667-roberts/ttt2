const express = require('express');
const router = express.Router();

const isLoggedIn = require('../../auth/middleware/isLoggedIn');

router.get('/', isLoggedIn, function(_, response) {
  response.render('authenticated/lobby', { title: 'Express' });
});

module.exports = router;
