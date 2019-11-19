const express = require('express');
const router = express.Router();

router.get('/login', function (request, response) {
  response.render('unauthenticated/users/login');
});

router.get('/register', function (request, response) {
  response.render('unauthenticated/users/register');
});

module.exports = router;
