const express = require('express');
const router = express.Router();

const User = require('../db/users');
const passport = require('../auth');

router.get('/login', (_, response) => {
  response.render('unauthenticated/users/login');
});

router.get('/logout', (request, response) => {
  request.logout();
  response.redirect('/');
});

router.get('/register', (_, response) => {
  response.render('unauthenticated/users/register');
});

router.post('/register', (request, response) => {
  const { email, password } = request.body;

  User.findByEmail(email)
    .then(users => {
      if (users.length !== 0) {
        throw new Error('A user is already registered with that email address');
      }
    })
    .then(() => {
      return User.create(email, password);
    })
    .then(user => {
      request.login(request.body, error => {
        if (error) {
          throw error;
        }
        request.session.save(() => {
          response.redirect('/lobby');
        });
      });
    })
    .catch(function(err) {
      response.json({ error: err.message });
    });
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/lobby'
  })
);

module.exports = router;
