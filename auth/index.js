const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../db/users/index');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(({ id, email }) => done(null, { id, email }));
});

const strategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  (email, password, done) => {
    User.findByEmail(email.toLowerCase()).then(([user, ..._]) => {
      if (user !== undefined && bcrypt.compareSync(password, user.password)) {
        return done(null, { id: user.id, email: user.email });
      } else {
        return done('That user was not found.', false);
      }
    });
  }
);

passport.use(strategy);

module.exports = passport;
